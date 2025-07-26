import { useState } from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Signup from './components/signup'
import Login from './components/Login'
import Home from './components/Home'
import Header from "./components/header"
import Footer from './components/Footer'
import ProductList from './components/ProductList'
import ProductDetails from './components/ProductDetails'
import Cart from './components/Cart'
import CheckoutPage from './components/CheckoutPage'
import AboutPage from './components/AboutPage'
import ContactPage from './components/Contact'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/user/signup",
    element: <Signup/>
  },
  {
    path: "/user/login",
    element: <Login/>
  },
  {
    path: "/item-list",
    element: <ProductList/>
  },
  {
    path: "/item-detail/:id",
    element: <ProductDetails/>
  },
  {
    path: "/cart",
    element: <Cart/>
  },
  {
    path: "/checkout",
    element: <CheckoutPage/>
  },
  {
    path: "/about",
    element: <AboutPage/>
  },
  {
    path: "/contact",
    element: <ContactPage/>
  }
])
function App() {

  return (
    <div >
      <div className='fixed shadow-md top-0 left-0 z-50 w-full'>
      <Header/>
      </div>
      <div className='pt-16'>
        <RouterProvider router={router}/>
      </div>
      
      <Footer/>
    </div>
    
  )
}

export default App
