import React, { useState } from "react";
import ExportExcel from "./ExportExcel";
import PopupComponent from "./PopupComponent";
// import BillComponent from "./BillComponent";
// import BillComponent from "./BillComponent";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Invoice from "./order/invoice.jsx";

const TableSalesDetail = ({ dataCartItems}) => {
const [showPopup, setShowPopup] = useState(false);
const [selectedId, setSelectedId] = useState(null);
// const [selectedProduct, setSelectedProduct] = useState(null)
const handleOpenPopup = (saleId) => {
  setSelectedId(saleId);
  setShowPopup(true);
};


const handleClosePopup = () => {
  setSelectedId(null);
  setShowPopup(false);
}
  const formatData = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    };
    const thaiDate = new Intl.DateTimeFormat("th-TH", options).format(
      new Date(dateString)
    );
    return thaiDate;
  };

  const groupedProduct = dataCartItems.reduce((acc, product) => {
    const salesNo = product.sale.salesNo;
    if(!acc[salesNo]){
      acc[salesNo] = [];
    }
    acc[salesNo].push(product);
    return acc;
  },{})

const filteredProducts = Object.values(groupedProduct)
.filter(dataCartItems => dataCartItems.length >= 1) 




  return (
    <div className="cart-container">
      {dataCartItems.length === 0 ? (
        <div className="has-text-centered is-size-4 mt-3 text-color">
          <p>ไม่มีรายการขายสินค้า</p>
        </div>
      ) : (
        <div className="container">
          <ExportExcel items={filteredProducts}/>
          <table className="table-style tableUser breaktable">
            <thead className="has-text-centered">
              <tr>
              <th className="hide-on-small">ลำดับ</th>
            <th>เลขที่การขาย</th>
            <th>วันที่</th>
            <th>รายการสินค้า</th>
            {/* <th className="listProduct">รายการสินค้า</th> */}
            <th>ราคารวมสินค้า</th>
            <th>ราคารวมสุทธิ</th>
            <th>ผู้บันทึกการขาย</th>
            <th></th>
              </tr>
           
          </thead>
             <tbody className="has-text-centered">
        {filteredProducts.map((item,index) => (
          <tr  className="tr">
            <td className="td">{index+1}</td>
          <td className="td">{item[0].sale.salesNo}</td>
          <td className="td tbDate">{formatData(item[0].createdAt)} น.</td>
          <td className="td ">{item.length} รายการ
           </td> 
        
          {/* {item
          .map((p)=>(
          <td className="paddingTB showProduct">- {p.product.ProName} 
          </td>

         ))} */}
        
        <td className="td">{(item[0].sale.TotalSalesPrice).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}</td>
          <td className="td ">{(item[0].sale.TotalSalesPrice).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}</td>
          <td className="td">{item[0].user.userEmail}</td>

          <td className="td">
           <button onClick={() => handleOpenPopup(item[0].saleId)} className="view">ดูรายละเอียด</button>

           {showPopup && (
            
  <PopupComponent 
  id={selectedId} 
  // selectedProduct={selectedProduct}
  filteredProducts={filteredProducts}
  onClose={handleClosePopup} 
   />

           )} 
           </td>
          </tr>
        ))}
      </tbody>
          </table>
          
          {/* <div className="paddingTB">{TotalPrice}</div> */}
        </div>
      )}
    </div>
  );
};

export default TableSalesDetail;
