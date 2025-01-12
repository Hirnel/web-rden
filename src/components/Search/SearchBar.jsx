import React, { useState, useCallback } from "react";
import debounce from "lodash/debounce";
import "../../styles/components/_SearchBar.scss";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Debounce para retrasar las llamadas a `onSearch` y evitar múltiples peticiones innecesarias
  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value);
    }, 500), // 500ms de espera
    [onSearch]
  );

  const handleInputChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value); // Actualiza el estado local
    debouncedSearch(value); // Llama a la función debounced
  };

  return (
    <div className="search-bar-container">
      <input
        id="search-bar" // Agrega un atributo `id` único
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Buscar clases o subclases..."
        className="search-bar-input"
      />
    </div>
  );
};

export default SearchBar;
