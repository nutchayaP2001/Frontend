import React,{useState,useEffect} from 'react'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'
import { toast } from 'react-toastify'

const FormAddCategory = () => {
  const navigate = useNavigate();
    const [values, setValues] = useState({
        CatName: ""
    });
    const [category, setCategory] = useState([])

    const createCategory = async (value) => {
        await axios.post("https://dark-erin-gharial-ring.cyclic.app/api/category", value)
    }

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        await axios.get("https://dark-erin-gharial-ring.cyclic.app/api/category")
        .then(res => {
            setCategory(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleRemove = async (id) => {
        try {
            if(window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) {
        await axios.delete(`https://dark-erin-gharial-ring.cyclic.app/api/category/${id}`)
          .then((res) => {
            loadData()
            console.log(res)
        toast.success("การลบรายการสำเร็จ")
        
//  window.location.reload('/category/add');
        // navigate('/category/add')

    }).catch((err) => {
        console.log(err)
        toast.success("การลบรายการมีปัญหา")

    })
        
    }
        } catch (error) {
      console.log(error);
            
        }}
      
    // console.log("data", category)

    const handleChangeCategory = (e) => {
        // console.log(values.CatName)
        // console.log(e.target.value)
        setValues({...values,[e.target.name]:e.target.value})

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        createCategory(values)
        .then((res) => {
        window.location.reload();
        toast.success("บันทึกสำเร็จ");
        console.log(res)
        
        // navigate("/category")

        // toast.success(res.data.CatName + "success")
        })
        .catch((err) => {
            console.log(err)
        toast.error("การบันทึกมีปัญหา")

        });
    }

  return (
    <div>
   

      {/* <div className="flex"> */}
       
         <form  onSubmit={handleSubmit} className='form-container'>
            <div className="flex">
                <div className="inp">
                <input type="text"
                 className='inp-style' 
                 required
                onChange={(e) => handleChangeCategory(e)} 
                name='CatName'
                value={values.CatName}/>

                <label className='label-inp'>เพิ่มหมวดหมู่สินค้า</label>

            </div>
            
                </div> 
                      <button  type='submit' className='buttons' 
                 
                >บันทึก</button>   
        
           
        </form>
      
        
      {/* </div> */}


        </div>


       
        // </div>
  )
}

export default FormAddCategory;
