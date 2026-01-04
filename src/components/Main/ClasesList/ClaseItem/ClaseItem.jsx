import React from "react";
import "../../../../styles/components/_ClaseItem.scss";
import { Link } from "react-router-dom";

const FRONTEND_BASE_URL = import.meta.env.VITE_FRONTEND_URL

const ClaseItem = ({ clase }) => {
  const { id, nombre, imagen } = clase;

  return (
    <div className="clase-card">
      <div className="clase-img-container">
        {imagen && (
          <img
            src={`${FRONTEND_BASE_URL}/${imagen}`}
            alt={nombre}
            className="clase-img"
          />
        )}
      </div>
      <h3>{nombre}</h3>
      {/* link a la ruta de detalles de la clase */}
      <Link to={`/clases/${id}`}>
        <button className="button-SEE-MORE">VER MÁS</button>
      </Link>
    </div>
  );
};

export default ClaseItem;
