import "./Filter.css";
const Filter = ({ searchTerm, setSearchTerm, setFilterOption }) => {
  return (
    <section className="filter-section">
      <input
        type="text"
        name="search-bar"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <select
        name="filter-option"
        id=""
        onChange={(e) => {
          setFilterOption(e.target.value);
        }}
      >
        <option value="Title">Título</option>
        <option value="Year">Año</option>
        <option value="imdbID">Id</option>
      </select>
    </section>
  );
};

export default Filter;
