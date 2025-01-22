import React, { useContext } from "react";
import SearchBar from "../Search/SearchBar";
import { ClasesContext } from "../../context/clasesContext";
import "../../styles/components/_NavBar.scss";

const NavBar = () => {
  const { clases, setClases } = useContext(ClasesContext);

  const handleSearch = async (searchTerm) => {
    const term = searchTerm.trim().toLowerCase().replace(/\s+/g, "_");

    if (term === "") {
      // Si no buscas nada, recarga todas las clases
      try {
        const response = await fetch("http://localhost:3000/api/clases/basicas");
        const data = await response.json();
        setClases(data);
      } catch (err) {
        console.error("Error al cargar las clases básicas:", err);
      }
    } else {
      // Filtro para clases y subclases
      const filtered = clases.filter(
        (clase) =>
          (clase.id && clase.id.toLowerCase().includes(term)) ||
          (clase.subclases &&
            clase.subclases.some(
              (subclase) =>
                subclase.idSubclase &&
                subclase.idSubclase.toLowerCase().includes(term)
            ))
      );

      if (filtered.length > 0) {
        setClases(filtered);
      } else {
        try {
          // Si el filtro no encuentra nada, recargo todas las clases básicas
          const response = await fetch(
            "http://localhost:3000/api/clases/basicas"
          );
          const data = await response.json();
          setClases(data); // recargo
        } catch (err) {
          console.error("Error al cargar las clases básicas:", err);
        }
      }
    }
  };

  return (
    <nav className="navBar">
      <div className="nav_items">
        <a href="/">Inicio</a>
        <a href="/clases">Clases</a>
        <a href="/subClasesInfo">SubClases</a>
        <a href="/razas">Razas</a>
        <a href="/reinos">Reinos</a>
        <a href="/conquest">Conquest Of The Pine</a>
      </div>
      <SearchBar onSearch={handleSearch} />
    </nav>
  );
};

export default NavBar;
