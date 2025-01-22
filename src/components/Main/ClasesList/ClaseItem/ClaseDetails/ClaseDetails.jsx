import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import TalentTree from "./TalentTree"; //  no olvides esto porque no cargan los TalentTree
import "../../../../../styles/components/_ClaseDetails.scss";

const ClaseDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState({}); // almaceno los datos de clase o subclase y luego les hago llamadas 
  const [showTalentTree, setShowTalentTree] = useState(false); // estado para mostrar/ocultar el diagrama de talentos
  const [selectedHabilidades, setSelectedHabilidades] = useState([]); // estado para las habilidades seleccionadas
  const [error, setError] = useState(null);


  useEffect(() => {
    window.scrollTo(0, 0); // Mueve la barra de desplazamiento al inicio cuando pasa de ClaseItem a ClaseDetails, sin esto se queda la web muy abajo y tienes que subir a mano.
  }, [id]);

  useEffect(() => {
    if (!id) {
      setError("ID no válido para la clase o subclase.");
      return;
    }
    const fetchDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/clases/${id}`);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const fetchedData = await response.json();
        console.log("Datos cargados:", fetchedData); 
        setData(fetchedData);
      } catch (err) {
        console.error("Error al cargar los detalles:", err.message);
        setError(`No se pudo cargar la clase o subclase: ${err.message}`);
      }
    };

    fetchDetails();
  }, [id]);

  const toggleTalentTree = () => {
    if (showTalentTree) {
      // cuando oculto el arbol se limpian las que esten seleccionadas.
      setSelectedHabilidades([]);
    }
    setShowTalentTree((prev) => !prev); // alternar estado del arbol
  };

  if (error) {
    return <p>Error al cargar los detalles: {error}</p>;
  }

  if (Object.keys(data).length === 0) {
    return <p>Cargando detalles de la clase...</p>;
  }

  const renderTalentos = (habilidades) => (
    <ul>
        {habilidades.map((habilidad, index) => (
            <li key={index}>
                <div className="habilidad-container">
                    {/* descripciton de la habilidad */}
                    <div className="habilidad-descripcion">
                        <h4>
                            {habilidad.nombre} <span>(Nivel: {habilidad.nivel})</span>
                        </h4>
                        <p>{habilidad.descripcion}</p>

                        {/* renderizo efectos y opciones anidadas */}
                        {habilidad.efectos && Object.keys(habilidad.efectos).length > 0 ? (
                            <ul>
                                {Object.entries(habilidad.efectos).map(([key, value]) => (
                                    <li key={key}>
                                        <strong>{key}:</strong>{" "}
                                        {Array.isArray(value) ? (
                                            value.map((opcion, i) => (
                                                <div key={`${key}-${i}`}>
                                                    {typeof opcion === "object" ? (
                                                        <>
                                                            <p><strong>Nombre:</strong> {opcion.Nombre}</p>
                                                            <p><strong>Descripción:</strong> {opcion.Descripción}</p>
                                                            {opcion.Mejoras && Array.isArray(opcion.Mejoras) && (
                                                                <ul>
                                                                    {opcion.Mejoras.map((mejora, mejoraIndex) => (
                                                                        <li key={`mejora-${mejoraIndex}`}>
                                                                            <p><strong>{mejora.Nombre}:</strong> {mejora.Mejora}</p>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <p>{opcion.toString()}</p>
                                                    )}
                                                </div>
                                            ))
                                        ) : typeof value === "object" ? (
                                            <ul>
                                                {Object.entries(value).map(([subKey, subValue]) => (
                                                    <li key={subKey}>
                                                        <strong>{subKey}:</strong>{" "}
                                                        {typeof subValue === "object" ? (
                                                            JSON.stringify(subValue)
                                                        ) : (
                                                            subValue.toString()
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            value.toString()
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No se encontraron efectos para esta habilidad.</p>
                        )}

                        {/* tipo de habilidad */}
                        <p>
                            <strong>Tipo:</strong> {habilidad.activa ? "Activa" : "Pasiva"}
                        </p>
                    </div>

                    {/* img de la habilidad */}
                    {habilidad.imagen && (
                        <div className="habilidad-img-container">
                            <img
                                src={`http://localhost:3000${habilidad.imagen}`}
                                alt={habilidad.nombre}
                                className="habilidad-img"
                            />
                            <p className="habilidad-img-nombre">{habilidad.nombre}</p>
                        </div>
                    )}
                </div>
            </li>
        ))}
    </ul>
);


  const renderCompetencias = (competencias) => (
    <ul>
      {Object.entries(competencias).map(([key, value]) => (
        <li key={key}>
          <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value}
        </li>
      ))}
    </ul>
  );

  // verifica si el objeto cargado es una subclase
  const isSubclase = !!data.idSubclase;

  return (
    <div className="clase-details">
      <h2>{data.nombre}</h2>
      <p>{data.descripcion}</p>

      {/* mostrar imagen principal */}
      {data.imagen && (
        <img
          src={`http://localhost:3000${data.imagen}`}
          alt={data.nombre}
          className="clase-details-img"
        />
      )}

      {/* boton para mostrar el diagrama de talentos */}
      {isSubclase && (
        <div className="button-container">
          <button
            className="button-SEE-MORE talent-button"
            onClick={toggleTalentTree}
          >
            {showTalentTree ? "Ocultar Diagrama de Talentos" : "Crear Diagrama de Talentos"}
          </button>
        </div>
      )}

      {/* renderiza el diagrama de talentos leyendo la api  */}
      {isSubclase && showTalentTree && data.habilidades && (
        <div className="talent-tree-container">
          <h3>Árbol de Talentos</h3>
          <TalentTree
            habilidades={data.habilidades}
            selectedHabilidades={selectedHabilidades}
            setSelectedHabilidades={setSelectedHabilidades}
          />
        </div>
      )}

      {/* competencias (solo para clases basicas porque son las que tienen esa info) */}
      {!isSubclase && data.rasgosDeClase?.competencias && (
        <>
          <h3>Competencias</h3>
          {renderCompetencias(data.rasgosDeClase.competencias)}
        </>
      )}

      {/* habilidades */}
      {data.habilidades && data.habilidades.length > 0 && (
        <>
          <h3>Talentos detallados </h3>
          {renderTalentos(data.habilidades)}
        </>
      )}





      {/* progresión (solo para clases basicas porque son las que tienen esa info) */}
      {
        !isSubclase && data.progresion?.length > 0 && (
          <>
            <h3>Progresión</h3>
            <table>
              <thead>
                <tr>
                  {data.progresion.length > 0 &&
                    Object.keys(data.progresion[0]).map((key, index) => (
                      <th key={index}>{key}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {data.progresion.map((nivel, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.keys(nivel).map((key, colIndex) => (
                      <td key={colIndex}>
                        {Array.isArray(nivel[key]) ? nivel[key].join(", ") : nivel[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )
      }

      {/* Subclases (solo para clases básicas) */}
      {
        !isSubclase && data.subclases && data.subclases.length > 0 && (
          <>
            <h3>Subclases</h3>
            <ul>
              {data.subclases.map((subclase, index) => (
                <li key={subclase.idSubclase || `subclase-${index}`}>
                  <h4>{subclase.nombre}</h4>
                  <p>{subclase.descripcion}</p>
                  {subclase.imagen && (
                    <img
                      src={`http://localhost:3000${subclase.imagen}`}
                      alt={subclase.nombre}
                      className="subclase-img"
                    />
                  )}
                  <Link to={`/clases/${subclase.idSubclase || `subclase-${index}`}`} className="button-link">
                    <button className="button-SEE-MORE">
                      Ver más detalles de {subclase.nombre}
                    </button>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )
      }
    </div >
  );
};

export default ClaseDetails;
