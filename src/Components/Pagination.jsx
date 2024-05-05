export default function Pagination({ onPrev, onNext, currentPage, totalPages }) {
  return (
    <div className="pagination">
      <button onClick={() => onPrev()} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => onNext()} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}
