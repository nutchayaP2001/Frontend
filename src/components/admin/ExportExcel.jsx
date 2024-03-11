import React from 'react'
import axios from 'axios'
import * as XLSX from 'xlsx'

const ExportExcel = ({items}) => {
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

    const handleExport =  () => {
        
        try {
            const data = items.map((item,index)=> ({
                ลำดับ : index + 1,
                เลขที่การขาย : item[0].sale.salesNo,
                วันที่: formatData(item[0].createdAt),
                รายการสินค้า : item.map(p => p.product.ProName).join(', '),
                ราคารวมสินค้า : (item[0].sale.TotalSalesPrice).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  ),
                  ราคารวมสิทธิ : (item[0].sale.TotalSalesPrice).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  ),
                  ผู้บัญทึกการขาย : item[0].user.userEmail

            }));
            const ws = XLSX.utils.json_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "รายการขายสินค้า");

            XLSX.writeFile(wb, 'exported_data.xlsx');
            
        } catch (error) {
            console.log('Error exporting data:', error)
        }
    }
  return (
    <div>
        <button className='btn-right btn-ExportExcel' onClick={handleExport}>
            นำออกไฟล์ excel
        </button>
    </div>
  )
}

export default ExportExcel