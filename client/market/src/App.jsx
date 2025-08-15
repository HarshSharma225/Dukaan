import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Home from './components/Home.jsx'
import Header from "./components/Header.jsx"
import Footer from './components/Footer.jsx'
import ProductList from './components/ProductList.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import Cart from './components/Cart.jsx'
import CheckoutPage from './components/CheckoutPage.jsx'
import AboutPage from './components/AboutPage.jsx'
import ContactPage from './components/Contact.jsx'
import Payment from './components/Payment.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

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
    element: (<ProtectedRoute>
                <Cart/>
              </ProtectedRoute>
              )
  },
  {
    path: "/checkout",
    element: (<ProtectedRoute>
                <CheckoutPage/>
              </ProtectedRoute>)
  },
  {
    path: "/about",
    element: <AboutPage/>
  },
  {
    path: "/contact",
    element: <ContactPage/>
  },
  {
    path: "/payment",
    element: (
      <ProtectedRoute>
        <Payment/>
      </ProtectedRoute>
    )
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
