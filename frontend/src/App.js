import React, { useEffect } from 'react'
import { BrowserRouter , Routes, Route } from 'react-router-dom'

import Navbar from './components/Home/Navbar.js'

import Footer from './components/layout/Footer.js'
import Card from './components/Product/Card.js'
import Home from './components/Home/Home.js'
import Hero from './components/layout/Hero.js'
import About from './components/layout/About.js'
import Contactus from './components/layout/Contactus.js'
import Blog from './components/layout/Blog.js'
import Services from './components/layout/Services.js'
import ProductDetails from './components/Product/ProductDetails.js'
import AddProperties from './components/backend/AddProperty.js'
import Login from './components/User/Login.js'
import SignUp from './components/User/SignUp.js'
import LoginSuccess from './components/User/LoginSuccess.js'
import axios from 'axios'
import UserOptions from './components/Home/UserOptions.js'
import Dashboard from './components/admin/Dashboard.js'
import { useDispatch, useSelector } from 'react-redux'
import {  getLikedProducts, loadUser } from './redux/action/userAction.js'
import AllProducts from './components/admin/AllProducts.js'
import Users from './components/admin/Users.js'
import UpdateRole from './components/admin/UpdateRole.js'
import CreateProduct from './components/admin/CreateProduct.js'
import UpdateProduct from './components/admin/UpdateProduct.js'
import ProtectedRoute from './components/Route/ProtectedRoute.js'
import Profile from './components/User/Profile.js'
import UpdatePassword from './components/User/UpdatePassword.js'
import Cart from './components/Cart/Cart.js'
import Shipping from './components/Cart/Shipping.js'
import ConfirmOrder from './components/Cart/ConfirmOrder.js'
import OrderSuccess from './components/Cart/OrderSuccess.js'
import MyOrder from './components/Order/MyOrder.js'
import PageNotFound from './components/NotFound/PageNotFound.js'
import Payment from './components/Cart/Payment.js'
import OrderDetails from './components/Order/OrderDetails.js'
import Orders from './components/admin/Orders.js'
import AdminOrderDetails from './components/admin/AdminOrderDetails.js'
import VerifyOtp from './components/User/VerifyOtp.js'
import ResetPassword from './components/User/ResetPassword.js'






function App() {
 
  const {user, isAuthenticated, loading} = useSelector((state)=>state.user)
const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(loadUser());
    window.scrollTo(0,0)
  }, [])
  return (
    <div >

    
      <BrowserRouter>
      
      {isAuthenticated &&  <UserOptions user={user}/>}
      
      
        <Routes>
          <Route path='/' element={<> <Navbar user={user}/> <Hero/>  <Home/> <Footer/> </>}></Route>
          <Route exact path='/auth/login' element={<Login />}></Route>
          <Route  path='/login/fail' >Error While login</Route>
          <Route path='/login/success' element={<LoginSuccess />}></Route>
          <Route path='/auth/signup' element={<SignUp />}></Route>
          <Route path='/auth/verify' element={<VerifyOtp />}></Route>
          <Route path='/auth/reset-password' element={<ResetPassword />}></Route>


          
          <Route path='/About' element={<><Navbar user={user}/> <About/> <Footer/></>}></Route>
          <Route path='/Contactus' element={<><Navbar user={user}/> <Contactus/> <Footer/></>}></Route>
          <Route path='/Services' element={<><Navbar user={user}/> <Services/> <Footer/></>}></Route>
          <Route path='/Blog' element={<><Navbar user={user}/> <Blog/> <Footer/></>}></Route>
          <Route path='/product/:id' element={<> <Navbar user={user}/> <ProductDetails/>  </>}></Route>
          <Route path='/addproperty' element={<>  <AddProperties/>  </>}></Route>

          <Route path='/admin/dashboard' element={<>  <Dashboard/>  </>}></Route>
          <Route path='/admin/products' element={<>  <AllProducts/>  </>}></Route>
          <Route path='/admin/users' element={<>  <Users/>  </>}></Route>
          <Route path='/admin/user/:id' element={<>  <UpdateRole/>  </>}></Route>
          
          <Route path='/admin/create-product' element={<>  <CreateProduct/>  </>}></Route>
          {/* <Route path='/admin/product/:id' element={<>  <UpdateProduct/>  </>}></Route> */}
          <Route path='/admin/product/:id' element={<> <ProtectedRoute isAdmin={true} component={<UpdateProduct/> }/>  </>}></Route>
          <Route path='/admin/orders' element={<> <ProtectedRoute isAdmin={true} component={<Orders/> }/>  </>}></Route>
          <Route path='/admin/order/:id' element={<> <ProtectedRoute isAdmin={true} component={<AdminOrderDetails/> }/>  </>}></Route>
          <Route path='/account' element={<><Navbar/> <ProtectedRoute  component={ <Profile/> }/>  </>}></Route>
          <Route path='/update-password' element={<> <ProtectedRoute  component={<UpdatePassword/> }/>  </>}></Route>
          <Route path='/cart' element={<><Navbar/> <ProtectedRoute  component={<>  <Cart/></> }/>  </>}></Route>
          <Route path='/shipping' element={<><Navbar/> <ProtectedRoute  component={<>  <Shipping/></> }/>  </>}></Route>
          <Route path='/confirm/order' element={<><Navbar/> <ProtectedRoute  component={<>  <ConfirmOrder/></> }/>  </>}></Route>
          <Route path='/order/success' element={<><Navbar/> <ProtectedRoute  component={<>  <OrderSuccess/></> }/>  </>}></Route>
          <Route path='/orders' element={<><Navbar/> <ProtectedRoute  component={<>  <MyOrder/></> }/>  </>}></Route>
          <Route path='/order/payment' element={<><Navbar/> <ProtectedRoute  component={<>  <Payment/></> }/>  </>}></Route>
          <Route path='/order/:id' element={<><Navbar/> <ProtectedRoute  component={<>  <OrderDetails/></> }/>  </>}></Route>
          

          <Route path='*' element={<><Navbar/><PageNotFound/></>}></Route>
        </Routes>
        <Footer/> 
      </BrowserRouter>

   

    </div>
  )
}

export default App
