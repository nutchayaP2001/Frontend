// import { Pagination } from '@mui/material'
import React, { useState } from 'react'

const AppPagination = ({productPerPage,totalProduct,paginate}) => {
  const pageNumber = [];
  for(let i=1;i<=Math.ceil(totalProduct/productPerPage);i++){
    pageNumber.push(i);
  }
   const [activePage, setActivePage] = useState(1);

   const handlePageClick = (number) => {
    setActivePage(number)
    paginate(number)
   }
  return (
    <div>
       <nav className="pagination is-centered is-rounded text-color mt-3" role="navigation" aria-label="pagination" >
        <ul className="pagination-list ">
            {
                pageNumber.map((number)=>(
                    <li key={number}  >
                        <a href='#'
                        className={`pagination-link ${activePage === number ? "is-current" : ""} ` }
                        
                        onClick={()=> {
                        handlePageClick(number);
                        paginate(number);
                    }}
                        >{number}</a>
                    </li>
                ))
            }
        </ul>
       </nav>
    </div>
  )
}

export default AppPagination