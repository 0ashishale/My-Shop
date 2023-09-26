import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import { Box, Button, Typography } from "@mui/material";
import { BsSpellcheck } from "react-icons/bs";
import {
  MdAccountTree,
  MdDelete,
  MdDescription,
  MdStorage,
} from "react-icons/md";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteImage,
  getProductDetails,
} from "../../redux/action/productAction";
import {
  CLEAR_ERRORS,
  DELETE_IMAGE_RESET,
  UPDATE_PRODUCT_RESET,
} from "../../redux/constants/productConstants";
import { updateProduct } from "../../redux/action/adminAction";

const categories = ["T-shirt", "Jersey", "Certificate", "Gift", "Decoration"];
const UpdateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error, isUpdated, loading, isDeleted } = useSelector(
    (state) => state.product
  );

  const { error: detailsError, product } = useSelector(
    (state) => state.productDetails
  );
  const [hovered, setHovered] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(1);
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [featured, setFeatured] = useState();
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const UpdateProductImagesChange = (e) => {
    e.preventDefault();

    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  const handleRadioChange = (e) => {
    setFeatured(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = new FormData();

    productData.set("name", name);
    productData.set("price", price);
    productData.set("stock", stock);
    productData.set("category", category);
    productData.set("featured", featured);
    productData.set("description", description);

    images.forEach((image) => {
      productData.append("images", image);
    });

    dispatch(updateProduct(id, productData));
  };

  const deleteImageHandler = (imageId, publicId) => {
    const shouldDelete = window.confirm(`Are you sure to delete?`);
    if (shouldDelete) {
      dispatch(deleteImage(id, imageId, publicId));
      // console.log(id, imageId,publicId);
    }
  };

  useEffect(() => {
    if (id != product?._id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setStock(product.stock);
      setCategory(product.category);
      setDescription(product.description);
      setOldImages(product.images);
      setFeatured(product.featured);
    }

    if (isUpdated) {
      alert.success("Product Updated.");
      dispatch({type : UPDATE_PRODUCT_RESET})
      navigate("/admin/products");
    }
    if (isDeleted) {
      alert.success(`Image deleted successfully.`);
      dispatch(getProductDetails(id));
      dispatch({ type: DELETE_IMAGE_RESET });
    }

    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }

    if (detailsError) {
      alert.error(detailsError);
      dispatch({ type: CLEAR_ERRORS });
    }
  }, [dispatch, product, alert, error, isUpdated, isDeleted, detailsError]);
  return (
    <DashboardLayout>
      <Box sx={{ textAlign: "center" }}>
        <Typography varient="h4" component={"h4"} className="p-3">
          Update Product
        </Typography>

        <form
          action=""
          onSubmit={handleSubmit}
          className="mt-6 flex flex-col gap-3"
        >
          <div className="flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2">
            <BsSpellcheck size={30} className="" />
            <input
              required
              className="w-full px-1 py-2 border-none outline-none font-bold rounded"
              type="text"
              placeholder="Enter your product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2">
            <MdDescription size={30} className="" />
            <textarea
              required
              className="w-full px-1 py-2 border-none outline-none  rounded"
              type="text"
              placeholder="Enter your product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2">
            <AttachMoneyIcon size={30} className="" />
            <input
              required
              className="w-full px-1 py-2 border-none outline-none font-bold rounded"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2">
            <MdStorage size={30} className="" />
            <input
              required
              className="w-full px-1 py-2 border-none outline-none font-bold rounded"
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </div>
          <div className="flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2">
            <MdAccountTree size={30} className="" />
            <select
              name="category"
              id=""
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Choose a category</option>

              {categories.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
            <span>Categories</span>
            {/* <input className='w-full px-1 py-2 border-none outline-none font-bold rounded' type="text" placeholder='Enter your product name'  value={description}  onChange={(e)=>setDescription(e.target.value)}/> */}
          </div>
          <div className="flex items-center  focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2">
            <FeaturedPlayListIcon size={30} className="" />
            <div className="flex flex-row gap-3 px-1 py-2 ">
              <h3>Feature this product? </h3>
              <label className="text-xl cursor-pointer">
                <input
                  type="radio"
                  value="true"
                  checked={featured === true}
                  onChange={handleRadioChange}
                />
                Yes
              </label>
              <label className="text-xl cursor-pointer">
                <input
                  type="radio"
                  value="false"
                  checked={featured === false}
                  onChange={handleRadioChange}
                />
                No
              </label>
            </div>
          </div>
          <div className="flex items-center focus:border-4 border-2 md:w-[50%] mx-auto border-green-400 rounded px-3 py-2 gap-2">
            <AddAPhotoIcon size={30} className="" />
            <input
             
              className="w-full px-1 py-2 rounded"
              type="file"
              multiple
              accept="image/*"
              name="image"
              onChange={UpdateProductImagesChange}
            />
          </div>

          <button
            disabled={loading ? true : false}
            className="bg-green-500 disabled:opacity-30 hover:bg-green-600 transition-all duration-300 mt-4 w-[50%] text-gray-200 rounded p-2 mx-auto"
          >
            Update Product
          </button>

          <div className="flex flex-row overflow-x-auto">
            {imagesPreview &&
              imagesPreview.map((image, index) => (
                <img
                  src={image}
                  key={index}
                  alt="Update Product Preview"
                  className="w-28 h-24"
                />
              ))}
          </div>
          <div
            className="relative inline-block overflow-x-auto"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {oldImages &&
              oldImages.map((image, index) => (
                <>
                  {hovered && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                      <button className="text-white hover:text-red-700 transition">
                        <MdDelete
                          size={30}
                          onClick={() =>
                            deleteImageHandler(image._id, image.public_id)
                          }
                        />
                      </button>
                    </div>
                  )}
                </>
              ))}
          </div>
        </form>
      </Box>

      <div className="relative flex gap-3 overflow-x-auto">
        {oldImages &&
          oldImages.map((image, index) => (
            <>
              <Imagecard key={index} image={image} />
              {/* <img
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                src={image.url}
                key={index}
                alt="New Product Preview"
                className=" w-28 h-24"
              />

              {hovered && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  <button className="text-white hover:text-red-700 transition">
                    <MdDelete
                      size={30}
                      onClick={() =>
                        deleteImageHandler(image._id, image.public_id)
                      }
                    />
                  </button>
                </div>
              )} */}
            </>
          ))}
      </div>
    </DashboardLayout>
  );
};

const Imagecard = ({ image }) => {
  const [hovered, setHovered] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const deleteImageHandler = (imageId, publicId) => {
    const shouldDelete = window.confirm(`Are you sure to delete?`);
    if (shouldDelete) {
      dispatch(deleteImage(id, imageId, publicId));
      // console.log(id, imageId,publicId);
    }
  };
  return (
    <>
      {/* <img
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        src={image.url}
        alt="New Product Preview"
        className=" w-28 h-24"
      ></img>
        {hovered && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  <button className="text-white hover:text-red-700 transition">
                    <MdDelete
                      size={30}
                      onClick={() =>
                        deleteImageHandler(image._id, image.public_id)
                      }
                    />
                  </button>
                </div>
              )} */}
        
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative" 
      >
        <img src={image.url} alt="Product Preview" className="w-28 h-24"></img>
        {hovered && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <button className="text-white hover:text-red-700 transition">
              <MdDelete
                size={30}
                onClick={() => deleteImageHandler(image._id, image.public_id)}
              />
            </button>
          </div>
        )}
      </div>

    </>
  );
};

export default UpdateProduct;
