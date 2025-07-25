import Field from "../common/Field";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

const SearchBox = ({
    searchTerm,
    onSearchChange,
    onClearSearch,
    placeholder = "Buscar...",
    helpText = "Escribí para buscar en tiempo real",
    noResultsText = "No se encontraron resultados",
    showResults = false,
    resultsCount = 0,
    totalCount = 0,
    className = "",
    containerClassName = "bg-cyan-100 px-4 lg:px-8 py-6 border-t-1 border-gray-300"
}) => {
    return (
        <div className={containerClassName}>
            <div className={`relative lg:w-1/2 mx-auto ${className}`}>
                <FontAwesomeIcon 
                    icon={faSearch} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400"
                    aria-hidden="true"
                />                        
                
                <Field
                    label=""
                    name="search"
                    type="text"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 pr-10 bg-white text-lg!"
                    aria-label="Campo de búsqueda"
                />                    
                
                {searchTerm && (
                    <button
                        onClick={onClearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded p-1"
                        aria-label="Limpiar búsqueda"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                )}
            </div>

            <div className="mt-2 text-xs text-gray-600 lg:w-1/2 mx-auto text-center lg:text-start">
                {searchTerm && showResults && resultsCount === 0 ? (
                    <span className="text-orange-600">
                        {noResultsText} "{searchTerm}"
                    </span>
                ) : searchTerm && showResults ? (
                    <span>
                        Mostrando {resultsCount} de {totalCount} resultados
                    </span>
                ) : (
                    <span>{helpText}</span>
                )}
            </div>
        </div>
    );
};

export default SearchBox;