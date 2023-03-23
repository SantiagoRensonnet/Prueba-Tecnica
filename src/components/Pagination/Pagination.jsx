import "./Pagination.css";
const Pagination = ({ pageNumber, numberOfPages }) => {
  return (
    pageNumber < numberOfPages && (
      <section className="pagination-section">
        <p>{numberOfPages - pageNumber} pages left</p>
      </section>
    )
  );
};

export default Pagination;
