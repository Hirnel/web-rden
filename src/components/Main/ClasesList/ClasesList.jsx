import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/components/_ClasesList.scss";
import { ClasesContext } from "../../../context/clasesContext";
import { getAllClases } from "../../../services/clasesService";


const IMG_BASE_URL = import.meta.env.VITE_IMG_URL
const ClasesList = () => {
  const { clases, setClases } = useContext(ClasesContext);
  const [loading, setLoading] = useState(false); // Estado para manejar carga
  const [dataSaved, setDataSaved] = useState(false);
  const [error, setError] = useState(null);



  const fetchClasesBasicas = async () => {
    try {
      setLoading(true);
      const data = await getAllClases()
        // const response = await fetch("http://localhost:3000/api/clases/basicas");
        // if (!response.ok) {
        //   throw new Error(`Error ${response.status}: ${response.statusText}`);
        // }
        // const data = await response.json();
      setClases(data); // aqui ctualizo el estado global
      setDataSaved(true);
      setLoading(false); // aqui se finaliza la carga
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && !dataSaved) {
      fetchClasesBasicas(); // Cargo clases iniciales
    }
  }, [setClases]);

  if (loading) {
    return <p>Cargando clases...</p>;
  }

  if (error) {
    return <p>Error al cargar las clases: {error}</p>;
  }

  if (!clases.length) {
    return <p>No se encontraron clases. Intenta otra búsqueda.</p>;
  }

  return (
    <div className="clases-list">
      <h2>Clases Básicas de Érden</h2>
      <ul className="clases-grid">
  {clases.map((clase) => (
    <li key={clase.id} className="clase-card">
      {/* Imagen a sangrado */}
      <img
        src={`${IMG_BASE_URL}/${clase.imagen}`}
        alt={clase.nombre}
        className="clase-img"
        loading="lazy"
      />

      {/* Medallón decorativo (AQUÍ VA EL SIMBOLO DE LA CLASE CUANDO LO TENGA.) */}
      <div className="clase-medallon">
        {clase.icon && (
          <img src={clase.icon} alt="" aria-hidden="true" className="clase-medallon-icon" />
        )}
      </div>

      {/* Estandarte con el nombre */}
      <div className="clase-banner">
        <span>{clase.nombre}</span>
      </div>

      {/* Overlay clicable con CTA y tags (si existen) */}
      <Link
        to={`/clases/${clase.id}`}
        className="clase-overlay"
        aria-label={`Ver más sobre ${clase.nombre}`}
      >
        <div className="overlay-content">
          {/* <h3 className="clase-title">{clase.nombre}</h3> */}

          {Array.isArray(clase.tags) && clase.tags.length > 0 && (
            <ul className="clase-tags">
              {clase.tags.slice(0, 3).map((t, i) => (
                <li key={i} className="clase-tag">{t}</li>
              ))}
            </ul>
          )}

          {/* <span className="button-SEE-MORE">Ver más</span> */}
        </div>
      </Link>
    </li>
  ))}
</ul>
    </div>
  );
};

export default ClasesList;
