import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  createQuestion,
  getProductDetails,
} from "../../redux/action/productAction";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import ReviewCard from "./ReviewCard";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { MdDelete } from "react-icons/md";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import {
  CLEAR_ERRORS,
  CREATE_PRODUCT_REVIEW_RESET,
  CREATE_QUESTION_RESET,
  DELETE_ANSWER_RESET,
} from "../../redux/constants/productConstants";
import { useAlert } from "react-alert";
import { addToCart } from "../../redux/action/cartAction";
import { Link } from "react-router-dom";
import QuestionAnswerCard from "./QuestionAnswerCard";

function ProductDetails() {
  const { product, loading } = useSelector((state) => state.productDetails);
  const {
    isCreated,
    error,
    loading: loading3,
  } = useSelector((state) => state.product);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const {isCreated : qaCreated, error :qaError, loading : qaLoading , isDeleted} = useSelector((state)=>state.questionA)

  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [imageUrl, setImageUrl] = useState();

  const [rating, setRating] = useState();
  const [quantity, setQuantity] = useState(1);
  const [openReview, setOpenReview] = useState(false);
  const [comment, setComment] = useState();
  const [reviewImage, setReviewImage] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [size, setSize] = useState();
  const [question, setQuestion]= useState('')

  // Set the imageUrl when the product details are available
  useEffect(() => {
    if (!loading && product && product.images && product.images?.length > 0) {
      setImageUrl(product.images[0].url);
    }
  }, [loading, product]);

  const handleImage = (url) => {
    setImageUrl(url);
  };

  const options = {
    value: product.ratings,
    precision: 0.5,
    readOnly: true,
  };

  const handleIncrement = (quantity) => {
  
    setQuantity(quantity + 1);
  };

  const handleDecrement = (quantity) => {
    setQuantity(quantity - 1);
  };

  const handleSubmitToggle = () => {
    setOpenReview(!openReview);
  };

  const handleReviewImage = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);

    setReviewImage([]);
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setReviewImage((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    dispatch(createProductReview(rating, comment, id, reviewImage));
  };

  const handleDeleteImage = (indexToDelete) => {
    const updatedImages = reviewImage.filter(
      (_, index) => index !== indexToDelete
    );
    setReviewImage(updatedImages);
  };

  const addToCartHandler = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      return alert.error(`Please login to add to cart.`);
    }

    dispatch(addToCart(id, quantity, size));
    setShowCart(true);
    alert.success(`Item added to cart.`);
  };


  const handleQuestionSumbit = (e)=>{
    e.preventDefault()

    dispatch(createQuestion(id, question))
  }



  useEffect(() => {
    // Fetch product details when the component mounts
    dispatch(getProductDetails(id));

    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ERRORS });
    }
    if(qaError){
      alert.error(qaError);
      dispatch({ type: CLEAR_ERRORS });
    }
    
    if(qaCreated){
      alert.success(`Submitted.`)
      dispatch({
        type :CREATE_QUESTION_RESET
      })
    }
if(isDeleted){
  alert.success(`Deleted.`)
  dispatch({type : DELETE_ANSWER_RESET})
}
    if (isCreated) {
      alert.success(`Thank You For Your Review 🙏`);
      dispatch({ type: CREATE_PRODUCT_REVIEW_RESET });
      setOpenReview(false);
    }
  }, [id, alert, error, isCreated, qaCreated , qaError, isDeleted]);

  return (
    <>
      {loading ? (
        <>Loading</>
      ) : (
        <div className="p-4 flex flex-col gap-5 ">
          <h3 className="text-center text-xl w-fit mx-auto border-b border-gray-500 font-semibold tracking-wider">
            Product Details
          </h3>
          <div className="flex md:flex-row flex-col justify-center p-4 border-b">
            <section className="md:w-[50%] flex justify-center">
              <div>
                <img src={imageUrl || ""} alt="" className="w-80 h-80" />
                <div className="flex gap-1 mt-3 w-fit border-2 border-green-600 p-2 cursor-pointer overflow-x-auto">
                  {product &&
                    product.images &&
                    product.images.map((item, key) => (
                      <img
                        src={item.url}
                        key={key}
                        onClick={() => handleImage(item.url)}
                        alt=""
                        className="h-14 "
                      />
                    ))}
                </div>
              </div>
            </section>
            <section className="md:w-[50%] flex md:justify-start  md:mt-0 mt-10">
              <div className=" flex flex-col gap-5">
                {product && (
                  <>
                    <h3 className="font-semibold text-xl">{product?.name}</h3>
                    <div className="flex items-center">
                      <Rating {...options} />{" "}
                      <span className="text-sm text-gray-500">
                        ({product?.numOfReviews} reviews)
                      </span>
                    </div>

                    <hr />

                    <span className="text-xl font-bold text-blue-950 tracking-widest">
                      Rs. {product?.price}
                    </span>

                    <div>
                      <div className="flex gap-2 ">
                        <button
                          disabled={quantity <= 1 ? true : false}
                          onClick={() => handleDecrement(quantity)}
                          className={`bg-green-400 text-white rounded py-1 px-2 hover:bg-green-600 transition-all duration-300`}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={quantity}
                          className="w-8 text-center"
                        />
                        <button
                        disabled={quantity >= product.stock ? true : false}
                          onClick={() => handleIncrement(quantity)}
                          className="bg-green-400 text-white py-1 px-2 rounded hover:bg-green-600 transition-all duration-300"
                        >
                          +
                        </button>
                        <button
                          disabled={product.stock < 1 ? true : false}
                          onClick={addToCartHandler}
                          className="bg-orange-500 hover:bg-orange-600 rounded ml-2 px-2 text-white "
                        >
                          Add To Cart
                        </button>

                        <Link
                          to={`/cart`}
                          className={`bg-orange-500 hover:bg-orange-600 rounded ml-2 p-2 text-white self-center ${
                            showCart ? "" : "hidden"
                          }`}
                        >
                          Go to Cart
                        </Link>
                      </div>
                      {/* <div className="flex gap-4 mt-3">
                  <select name="" id="" className="border-2 font-semibold " onChange={(e)=>setSize(e.target.value)}>
                    <option value="">Choose Size</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="Xl">Extra large</option>
                  </select>
                      </div> */}
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold underline">Status:</p>{" "}
                      <span
                        className={`${
                          product?.stock > 1
                            ? "text-green-700"
                            : "text-gray-500"
                        } font-semibold`}
                      >
                        {product?.stock > 1 ? "InStock" : "OutOfStock"}
                      </span>
                    </div>
                    <div>
                      <h5 className="font-semibold underline ">Description:</h5>
                      <p className="ml-3 text-gray-700 h-20">
                        {product?.description}
                      </p>
                    </div>
                  </>
                )}

                <div>
                  <button
                    className="bg-orange-500 hover:bg-orange-600 rounded ml-2 px-2 text-white"
                    onClick={handleSubmitToggle}
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            </section>
          </div>

          <div className="reviewSection">
            <div>
              <Dialog open={openReview} onClose={handleSubmitToggle}>
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent>
                  <Rating
                    onChange={(e) => setRating(e.target.value)}
                    value={rating}
                    aria-required
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="comment"
                    label="Comment"
                    type="text"
                    fullWidth
                    variant="standard"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    required
                  ></TextField>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    multiple
                    onChange={handleReviewImage}
                  />
                  <div className="flex flex-row gap-3 overflow-x-auto">
                    {reviewImage &&
                      reviewImage.map((image, index) => (
                        <div className="relative" key={index}>
                          <img src={image} alt="image" className="h-20 mt-5" />
                          <button
                            className="absolute bottom-0 right-0 text-white bg-red-500 hover:bg-red-600 p-1 rounded-full cursor-pointer"
                            onClick={() => handleDeleteImage(index)}
                          >
                            <MdDelete />
                          </button>
                        </div>
                      ))}
                  </div>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleSubmitToggle}>Cancle</Button>
                  <Button
                    disabled={loading3 ? true : false}
                    onClick={reviewSubmitHandler}
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="md:grid grid-cols-2  ">

              <div className="col-span-1 flex flex-col gap-4">
                <h3 className="md:text-center text-xl w-fit mx-auto border-b border-gray-500 font-semibold tracking-wider">
                  Reviews
                </h3>
                <div className=" md:mx-auto w-full h-96 overflow-auto">
                  {product?.reviews?.length >= 1 ? (
                    product.reviews.map((rev, i) => (
                      <ReviewCard key={i} review={rev} />
                    ))
                  ) : (
                    <h4>No Reviews Yet</h4>
                  )}
                </div>
              </div>

              <div className="col-span-1 flex flex-col gap-4 px-2 ">
                <h3 className="md:text-center text-xl w-fit mx-auto border-b border-gray-500 font-semibold tracking-wider">
                  Q/A
                </h3>
                <div className="w-[90%] mx-auto ">
                  <form action="" className="border-2 py-1" onSubmit={handleQuestionSumbit}>
                    <div className="flex gap-4 items-center">
                      <QuestionAnswerIcon className="absolute ml-2 text-orange-600" />
                      <input required type="text" placeholder="Place your questions here." className="outline-none w-full px-10" onChange={(e)=>{setQuestion(e.target.value)}}/>
                      <Button type="submit" disabled={qaLoading ? true : false}>Send</Button>
                    </div>
                  </form>
                </div>
                <div className=" md:mx-auto w-full h-96 overflow-auto">
                  {product?.questionAnswer?.length >= 1 ? (
                    product.questionAnswer.map((qa, i) => (
                      <QuestionAnswerCard key={i} questionAnswer={qa}/>
                    ))
                  ) : (
                    <h4 className="text-center">No Q/A Yet. Be the first.</h4>
                  )}
                </div>
              </div>
            </div>

            <div></div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetails;
