import React from 'react'

type PropPagination ={
    currentPage: number,
    totalPages: number,
    onPageChange: (i:number)=>void
}

function Pagination({ currentPage, totalPages, onPageChange }:PropPagination) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-between gap-4 text-sm w-full">
      
      {/* Previous */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage===1}
          className={` transition ${currentPage > 1 ? 'text-gray-600 hover:text-black': 'text-white cursor-auto!'}`}
        >
          ‹ Previous
        </button>

      {/* Pages */}
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-7 h-7 rounded flex items-center justify-center transition
              ${
                page === currentPage
                  ? "bg-[#FF8C00] text-white font-semibold"
                  : "text-gray-600 hover:text-black"
              }
            `}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
    <button
        onClick={() => onPageChange(currentPage + 1)}
        className={`transition ${currentPage < totalPages ? 'text-gray-600 hover:text-black': 'text-white cursor-auto!'}`}
    >
        Next ›
    </button>
    </div>
  );
}


export default Pagination
