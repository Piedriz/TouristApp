import React from "react";

export default function Searchbar({ searches, setSearches, size }) {
  function handleSearch(e) {
    setSearches(e.target.value);
  }
  console.log(searches)
  const inputSize = `input-field col s${size}`;
  return (
    <div className={inputSize}>
      <i class="material-icons prefix">search</i>
      <input
        type="text"
        value={searches}
        placeholder="Buscar Sítio"
        onChange={handleSearch}
      />
    </div>
  );
}
