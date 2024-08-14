import React from 'react';
import "./paginationComponent.css";

const PaginationComponent = ({total,from, to,current_page,last_page,siguiente, anterior}) => {
    return (     
         <div className='paginationComponent'>


        {total != 0 &&< div className = 'paginationComponentrowsPagination' > Mostrando {from}
        a {to}
        de {total} </div>}

        {total != 0 && <div className="paginationComponentpagination">
          {current_page != 1 && <a onClick={anterior}>❮</a>}

          {total != 0 && <a >Page {current_page}
          </a>}
          {last_page != current_page &&< a onClick = {
            siguiente
          } > ❯ </a>}
        </div>}

        {total == 0 && <div  className='paginationComponentEmpty'>

          No se encontraron registros
        </div>}
        </div>

    );
};
export default PaginationComponent;