import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import "../../../styles/components/_ClasesList.scss";
import { ClasesContext } from "../../../context/clasesContext";

const ClasesList = () => {
  const { clases, setClases } = useContext(ClasesContext);
  const [loading, setLoading] = useState(true); // Estado para manejar carga
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClasesBasicas = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/clases/basicas");
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setClases(data); // Actualiza el estado global
        setLoading(false); // Finaliza la carga
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchClasesBasicas(); // Cargar clases iniciales
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
            <img
              src={`http://localhost:3000${clase.imagen}`}
              alt={clase.nombre}
              className="clase-img"
            />
            <h3>{clase.nombre}</h3>
            <Link to={`/clases/${clase.id}`}>
              <button className="button-SEE-MORE">Ver más</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClasesList;
