import React, { useState } from "react";
import { ArcherContainer, ArcherElement } from "react-archer";
import "../../../../../../styles/components/_TalentTree.scss";

const TalentTree = ({ habilidades, selectedHabilidades, setSelectedHabilidades }) => {
  const [tooltipContent, setTooltipContent] = useState("");

  const handleMouseMove = (event, habilidad) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const tooltip = document.querySelector(".tooltip");
    if (tooltip) {
      tooltip.style.top = `${mouseY + 10}px`;
      tooltip.style.left = `${mouseX + 10}px`;
    }
    setTooltipContent(habilidad.descripcion);
  };

  const handleMouseLeave = () => {
    setTooltipContent("");
  };

  const handleSelect = (habilidad) => {
    const requisitosCumplidos =
      habilidad.Requisitos.length === 0 ||
      habilidad.Requisitos.some((req) =>
        selectedHabilidades.some(
          (selected) => selected.trim().toLowerCase() === req.trim().toLowerCase()
        )
      );

      setSelectedHabilidades((prev) => {
        if (prev.includes(habilidad.nombre)) {
          return prev.filter((nombre) => nombre !== habilidad.nombre);
        } else if (requisitosCumplidos) {
          return [...prev, habilidad.nombre];
        }
        return prev;
      });
    };


    return (
      <>
        <svg>
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M 0 0 L 10 3.5 L 0 7 Z" fill="#ffc107" />
            </marker>
          </defs>
        </svg>
  
        <ArcherContainer strokeWidth={2} markerEnd="url(#arrowhead)">
          <div className="talent-tree">
            {tooltipContent && <div className="tooltip visible">{tooltipContent}</div>}
  
            {[...new Set(habilidades.map((h) => h.nivel))].map((nivel) => (
              <div className="talent-row" key={nivel}>
                {habilidades
                  .filter((h) => h.nivel === nivel)
                  .map((habilidad, index) => (
                    <div key={index} className="habilidad-container">
                      {/* Nodo principal de la habilidad */}
                      <ArcherElement
                        id={habilidad.nombre}
                        relations={habilidad.Desbloquea.map((target) => ({
                          targetId: target,
                          targetAnchor: "top",
                          sourceAnchor: "bottom",
                          style: {
                            strokeColor: selectedHabilidades.includes(target)
                              ? "#28a745"
                              : "#ffc107",
                          },
                        }))}
                      >
                        <div
                          className={`talent-node ${selectedHabilidades.includes(habilidad.nombre) ? "active" : ""} ${habilidad.activa ? "ellipse" : "rectangle"
                            }`}
                          onMouseMove={(event) => handleMouseMove(event, habilidad)}
                          onMouseLeave={handleMouseLeave}
                          onClick={() => handleSelect(habilidad)}
                        >
                          <span>{habilidad.nombre}</span>
                        </div>
                      </ArcherElement>
  
                      {/* Renderización de opciones como nodos hijos debajo */}
                      {habilidad.efectos?.opciones && (
                        <div className="opciones-container">
                          {habilidad.efectos.opciones.map((opcion, opcionIndex) => (
                            <ArcherElement
                              key={`${habilidad.nombre}-${opcion.nombre}-${opcionIndex}`}
                              id={`${habilidad.nombre}-${opcion.nombre}`}
                              relations={opcion.Desbloquea?.map((target) => ({
                                targetId: target,
                                targetAnchor: "top",
                                sourceAnchor: "bottom",
                                style: {
                                  strokeColor: selectedHabilidades.includes(target)
                                    ? "#28a745"
                                    : "#ffc107",
                                },
                              })) || []}
                            >
                              <div
                                className={`talent-node option-node ${selectedHabilidades.includes(opcion.nombre) ? "active" : ""}`}
                                onMouseMove={(event) => handleMouseMove(event, opcion)}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => handleSelect(opcion)}
                              >
                                <span>{opcion.nombre}</span>
                                <ul>
                                  {Object.entries(opcion).map(([key, value], index) => {
                                    // Evitar mostrar el nombre duplicado
                                    if (key === "nombre") return null;
  
                                    // Descomposición para objetos o arrays
                                    if (typeof value === "object" && !Array.isArray(value)) {
                                      return (
                                        <li key={index}>
                                          <strong>{key}:</strong>
                                          <ul>
                                            {Object.entries(value).map(([subKey, subValue], subIndex) => (
                                              <li key={subIndex}>
                                                <strong>{subKey}:</strong> {subValue.toString()}
                                              </li>
                                            ))}
                                          </ul>
                                        </li>
                                      );
                                    }
  
                                    // Si es un array, lo muestra como lista
                                    if (Array.isArray(value)) {
                                      return (
                                        <li key={index}>
                                          <strong>{key}:</strong> {value.join(", ")}
                                        </li>
                                      );
                                    }
  
                                    // Para valores simples
                                    return (
                                      <li key={index}>
                                        <strong>{key}:</strong> {value.toString()}
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </ArcherElement>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </ArcherContainer>
      </>
    );
  };

export default TalentTree;
