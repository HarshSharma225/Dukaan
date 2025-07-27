import React from 'react'
import logo from '../assets/logo.png'
import { useSelector, useDispatch } from 'react-redux'
import {logout} from "../redux/authSlice"
function Header() {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()

  const handleLogout =(e)=>{
    e.preventDefault();

    dispatch(logout());
  }
  return (
    <div>
        <header className="h-16 flex justify-between items-center px-8 py-6 bg-black">
        {/* <h1 className="text-orange-600 font-bold text-lg">Dukaan</h1> */}
        <img src={logo} className='w-40'/>
        <nav className="flex gap-6 text-orange-500 text-lg">
          <a href="/" className="hover:text-orange-400">Home</a>
          <a href="/item-list" className="hover:text-orange-400">Shop</a>
          <a href="/about" className="hover:text-orange-400">About</a>
          <a href="/contact" className="hover:text-orange-400">Contact</a>
          {!user && <a href="/user/login" className="hover:text-orange-400">Login</a>}
          {user && <a onClick={handleLogout} className="hover:text-orange-400">Logout</a>}
          
        </nav>
      </header>
    </div>
  )
}

export default Header