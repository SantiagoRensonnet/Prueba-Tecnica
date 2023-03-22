const Pagination = ({ pageNumber, numberOfPages }) => {
  return (
    pageNumber < numberOfPages && (
      <section className="pages-left-section">
        <p>{numberOfPages - pageNumber} pages left</p>
      </section>
    )
  );
};

export default Pagination;
