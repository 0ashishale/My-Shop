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
import { loadUser } from './redux/action/userAction.js'
import AllProducts from './components/admin/AllProducts.js'
import Users from './components/admin/Users.js'
import UpdateRole from './components/admin/UpdateRole.js'
import CreateProduct from './components/admin/CreateProduct.js'
import UpdateProduct from './components/admin/UpdateProduct.js'
import ProtectedRoute from './components/Route/ProtectedRoute.js'
import Profile from './components/User/Profile.js'
import UpdatePassword from './components/User/UpdatePassword.js'






function App() {
  const dispatch = useDispatch()
  const {user, isAuthenticated} = useSelector((state)=>state.user)
useEffect(()=>{
  dispatch(loadUser())
}, [])

  return (
    <div >
    
      <BrowserRouter>
      {isAuthenticated &&  <UserOptions  user={user}/>}
      
      
        <Routes>
          <Route path='/' element={<> <Navbar/> <Hero/>  <Home/> <Footer/> </>}></Route>
          <Route exact path='/auth/login' element={<Login />}></Route>
          <Route  path='/login/fail' >Error While login</Route>
          <Route path='/login/success' element={<LoginSuccess />}></Route>
          <Route path='/auth/signup' element={<SignUp />}></Route>
          
          <Route path='/About' element={<><Navbar/> <About/> <Footer/></>}></Route>
          <Route path='/Contactus' element={<><Navbar/> <Contactus/> <Footer/></>}></Route>
          <Route path='/Services' element={<><Navbar/> <Services/> <Footer/></>}></Route>
          <Route path='/Blog' element={<><Navbar/> <Blog/> <Footer/></>}></Route>
          <Route path='/product/:id' element={<> <Navbar/> <Hero/>  <ProductDetails/>  </>}></Route>
          <Route path='/addproperty' element={<>  <AddProperties/>  </>}></Route>

          <Route path='/admin/dashboard' element={<>  <Dashboard/>  </>}></Route>
          <Route path='/admin/products' element={<>  <AllProducts/>  </>}></Route>
          <Route path='/admin/users' element={<>  <Users/>  </>}></Route>
          <Route path='/admin/user/:id' element={<>  <UpdateRole/>  </>}></Route>
          
          <Route path='/admin/create-product' element={<>  <CreateProduct/>  </>}></Route>
          {/* <Route path='/admin/product/:id' element={<>  <UpdateProduct/>  </>}></Route> */}
          <Route path='/admin/product/:id' element={<> <ProtectedRoute isAdmin={true} component={<UpdateProduct/> }/>  </>}></Route>
          <Route path='/account' element={<> <ProtectedRoute  component={<Profile/> }/>  </>}></Route>
          <Route path='/update-password' element={<> <ProtectedRoute  component={<UpdatePassword/> }/>  </>}></Route>
          

          <Route></Route>
        </Routes>
      
      </BrowserRouter>

   

    </div>
  )
}

export default App
