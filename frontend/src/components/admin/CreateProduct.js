import React, {useState, useEffect} from 'react'
import DashboardLayout from './DashboardLayout'
import { Box, Button, Typography } from '@mui/material'
import { BsSpellcheck } from 'react-icons/bs'
import { MdAccountTree, MdDescription,  MdStorage } from 'react-icons/md'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../../redux/action/productAction'
import { CLEAR_ERRORS, CREATE_PRODUCT_RESET } from '../../redux/constants/productConstants'
const categories = [
  'T-shirt',
  'Jersey',
  'Certificate',
  'Gift',
  'Decoration'
]

const CreateProduct = () => {

  const dispatch = useDispatch()
  const alert = useAlert();
  const navigate = useNavigate()
const {error, isCreated, loading} = useSelector((state)=>state.product)

const [name, setName] = useState('')
const [price, setPrice] = useState('')
const [stock, setStock] = useState()
const [description, setDescription] = useState('')
const [size, setSize] = useState('')
const [category, setCategory] = useState('')
const [images,setImages] = useState([])
const [featured, setFeatured] = useState(false)
const [imagesPreview, setImagesPreview] = useState()
  
  const handleSubmit = (e) =>{

    e.preventDefault();

    const myForm = new FormData()

    myForm.set('name', name)
    myForm.set('price', price)
    myForm.set('stock', stock)
    myForm.set('description', description)
    myForm.set('category', category)
    myForm.set('featured', featured)

    images.forEach((image)=>{
        myForm.append("images", image)
    });

    dispatch(createProduct(myForm))


  }
 const  CreateProductImagesChange = (e)=>{
  e.preventDefault();
  const files = Array.from(e.target.files);

  setImages([])
  setImagesPreview([])
 

  files.forEach((file)=>{
      const reader = new FileReader();

      reader.onload = () =>{
          if(reader.readyState === 2){
              setImagesPreview((old)=>[...old, reader.result])
              setImages((old)=>[...old, reader.result])
              
          }
      }
      reader.readAsDataURL(file)
  })
 }

const handleRadioChange = (e)=>{
  setFeatured(e.target.value)
}


useEffect(()=>{
if(error){
  alert.error(error);
  dispatch({type : CLEAR_ERRORS})
}
if(isCreated){
  alert.success(`Product created.`)
  dispatch({type : CREATE_PRODUCT_RESET})
  setName('')
  setDescription('')
  setPrice('')
  setStock(1)
  setImages([])
  setImagesPreview([])
}

},[dispatch, error, isCreated, alert])
  return (
    <DashboardLayout>
      <Box sx={{textAlign : 'center'}}>
        <Typography varient='h4' component={'h4'} className='p-3'>Create Product</Typography>

        <form action="" onSubmit={handleSubmit} className='mt-6 flex flex-col gap-3'>
          <div className='flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2'>
            <BsSpellcheck size={30} className=''/>
            <input required className='w-full px-1 py-2 border-none outline-none font-bold rounded' type="text" placeholder='Enter your product name' value={name}  onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className='flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2'>
            <MdDescription size={30} className=''/>
            <textarea required className='w-full px-1 py-2 border-none outline-none  rounded' type="text" placeholder='Enter your product Description'   value={description}  onChange={(e)=>setDescription(e.target.value)}/>
          </div>
          <div className='flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2'>
            <AttachMoneyIcon size={30} className=''/>
            <input required className='w-full px-1 py-2 border-none outline-none font-bold rounded' type="number" placeholder='Price' value={price}  onChange={(e)=>setPrice(e.target.value)}/>
          
          </div>
          <div className='flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2'>
            <MdStorage size={30} className=''/>
            <input required className='w-full px-1 py-2 border-none outline-none font-bold rounded' type="number" placeholder='Stock'   value={stock}  onChange={(e)=>setStock(e.target.value)}/>
          </div>
          <div className='flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2'>
            <MdAccountTree size={30} className=''/>
            <select name="category" id="" required  value={category}
                    onChange={(e)=>setCategory(e.target.value)} >
                   <option value="">Choose a category</option>

              { categories.map((item)=>(
                <option value={item} key={item}>{item}</option>
              ))}
            </select>
            <span>Categories</span>
            {/* <input className='w-full px-1 py-2 border-none outline-none font-bold rounded' type="text" placeholder='Enter your product name'  value={description}  onChange={(e)=>setDescription(e.target.value)}/> */}
          </div>
          <div className='flex items-center  focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2'>
            <FeaturedPlayListIcon size={30} className=''/>
            <div className='flex flex-row gap-3 px-1 py-2 '>
            <h3>Feature this product? </h3>
      <label className='text-xl cursor-pointer'>
      
        <input
          type="radio"
          value="true"
          checked={featured === "true"}
          onChange={handleRadioChange}
       
        />
        Yes
      </label>
      <label className='text-xl cursor-pointer'>
        <input
          type="radio"
          value="false"
          checked={featured === "false"}
          onChange={handleRadioChange}
          
        />
        No
      </label>
      
    </div>
          </div>
          <div className='flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2'>
            <AddAPhotoIcon size={30} className=''/>
            <input required className='w-full px-1 py-2 rounded' type="file" multiple accept='image/*' name='image'   onChange={CreateProductImagesChange}/>
          </div>

        <button disabled={loading ? true : false} className='bg-green-500 hover:bg-green-600 transition-all duration-300 mt-4 w-[50%] text-gray-200 rounded p-2 mx-auto' >
          Create Product
        </button>
        
        <div className='flex flex-row overflow-x-auto'> 
                        {imagesPreview && 
                        imagesPreview.map((image,index)=>(
                            <img src={image} key={index} alt="New Product Preview"  className='w-28 h-24'/>
                        ))}
                </div>

        </form>
      </Box>
    </DashboardLayout>
  )
}

export default CreateProduct