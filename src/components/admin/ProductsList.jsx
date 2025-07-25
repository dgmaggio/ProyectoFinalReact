import { useState } from 'react';
import Button from "../common/Button"
import { formatPrice } from '../../utils/formatPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

function ProductsList({ productos, onEdit, onDelete }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalItems = productos.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = productos.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  if (productos.length === 0) {
    return (
      <div className="bg-gray-100 px-4 lg:px-8 py-6 lg:py-12">
        <p className="text-center">No hay productos cargados.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 px-4 lg:px-8 py-6 lg:py-8 border-t-1 border-gray-300">
      <div className='mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between mb-4 lg:mb-6 gap-2 lg:gap-0'>
          <div className='text-center flex justify-center lg:justify-start'>
            <span className='self-center'>
              Mostrando {startIndex + 1} - {Math.min(endIndex, totalItems)} de {totalItems}
            </span>
          </div>

          <div className='text-center'>
            <label htmlFor="itemsPerPage" style={{ marginRight: '10px' }}>
              Productos por página:
            </label>
            <select
              className='bg-white border border-gray-300 rounded p-2'
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="border border-zinc-300 bg-white px-6 py-2 lg:px-8 rounded-xl justify-between">
          {currentProducts.map((producto) => (
            <div key={producto.id} className="grid grid-cols-3 lg:grid-cols-[20px_50px_2fr_100px_1fr_220px] gap-2 lg:gap-4 items-center px-2 py-3 even:bg-gray-100">
              <div className="lg:col-span-1 text-center hidden lg:block font-bold">
                #{producto.id}
              </div>

              <div className="w-10 h-10">
                <img 
                  src={producto.image} 
                  alt={producto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="col-span-2 lg:col-span-1">
                <div className="text-sm text-gray-500 lg:hidden">
                  ID: {producto.id} | {producto.category}
                </div>
                <div className="font-medium">{producto.title}</div>
                <div className='lg:hidden pt-1'>{formatPrice(producto.price)}</div>
              </div>

              <div className="lg:col-span-1 text-start lg:text-end hidden lg:block">
                {formatPrice(producto.price)}
              </div>

              <div className="lg:col-span-1 text-center hidden lg:block">
                {producto.category}
              </div>

              <div className="col-span-3 lg:col-span-1 flex gap-2 justify-center lg:justify-end">
                <Button
                  type="button"
                  className='px-2! py-2! h-10 w-10'
                  onClick={() => onEdit(producto)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </Button>
                <Button
                  type="button"
                  className='bg-red-400 hover:bg-red-800 px-3! py-2! h-10 w-10'
                  onClick={() => onDelete(producto.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className='mt-4 lg:mt-6 flex justify-center gap-1'>
            <Button
              onClick={goToPrevious}
              disabled={currentPage === 1}
              className={`${currentPage === 1 ? 'border border-gray-300 bg-white! cursor-not-allowed! h-10 w-10 p-1! text-gray-400!' : 'h-10 w-10 p-1! border border-gray-100'}`}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </Button>

            {getPageNumbers().map((page, index) => (
              <span key={index}>
                {page === '...' ? (
                  <span style={{ padding: '8px 12px' }}>...</span>
                ) : (
                  <Button
                    className={`${currentPage === page ? 'h-10 w-10 p-1! border border-gray-500 text-inherit! bg-white!' : 'border border-gray-300 text-inherit! bg-white! h-10 w-10 p-1!'}`}
                    onClick={() => goToPage(page)}
                  >
                    {page}
                  </Button>
                )}
              </span>
            ))}

            <Button
              onClick={goToNext}
              disabled={currentPage === totalPages}
              className={`${currentPage === totalPages ? 'border border-gray-300 bg-white! cursor-not-allowed! h-10 w-10 p-1! text-gray-400!' : 'h-10 w-10 p-1! border border-gray-100'}`}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </Button>
          </div>
        )}
      </div>
    </div>  
  );
}

export default ProductsList;