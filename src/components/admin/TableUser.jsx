import React from 'react'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const TableUser = ({selectData,deleteUser}) => {

  return (
    <div>
        <div className="container">
          {selectData.length === 0 ? (
            <div className="has-text-centered is-size-4 mt-3 text-color">
            <p>ไม่พบรายชื่อที่ค้นหา</p>
          </div>
          ): (

          
        <table className="table-style tableUser">
        
        <thead className="has-text-centered">
          <tr>
            {/* <th className=' text-color'>ลำดับ</th> */}
            <th className=' text-color'>ชื่อ - สกุล</th>
            <th className=' text-color'>ชื่อผู้ใช้</th>
            <th className=' text-color'>ที่อยู่</th>
            <th className=' text-color'>เบอร์โทร</th>
            <th className=' text-color'>ตำแหน่ง</th>
            <th className=' text-color'>จัดการ</th>
          </tr>
        </thead>


        <tbody className="has-text-centered">
          {selectData 
          .map((user, index) => (
            <tr key={index} className="tr td text-color">
              {/* <td className="paddingTB">{index+1}</td> */}
              <td className="paddingTB ">
                {user.userFname} {user.userLname}
              </td>
              <td className="paddingTB">{user.userEmail}</td>
              <td className="paddingTB">
                บ้านเลขที่ {user.userHouseNo} หมู่ {user.userMoo} ตำบล
                {user.userPlace} อำเภอ{user.userDistrict} <br /> จังหวัด
                {user.userProvince} {user.userZipcode}
              </td>
              <td className="paddingTB">{user.userTel}</td>
              <td className="paddingTB">{user.userRole}</td>
              <td className="paddingTB">
                <div className="flex-btn">
                  <Link to={`/users/edit/${user.id}`}>
                        <AiFillEdit  className="edit" />
                  </Link>
                  <Link onClick={() => deleteUser(user.id)} >
                    <AiFillDelete className="btndelete"  />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        )}

        </div>
    </div>
  )
}

export default TableUser