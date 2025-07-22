import React from 'react'
import logo from '../assets/logo.png'
function Header() {
  return (
    <div>
        <header className="h-16 flex justify-between items-center px-8 py-6 bg-black">
        {/* <h1 className="text-orange-600 font-bold text-lg">Dukaan</h1> */}
        <img src={logo} className='w-40'/>
        <nav className="flex gap-6 text-orange-500 text-lg">
          <a href="/" className="hover:text-orange-400">Home</a>
          <a href="/item-list" className="hover:text-orange-400">Shop</a>
          <a href="#" className="hover:text-orange-400">About</a>
          <a href="#" className="hover:text-orange-400">Contact</a>
        </nav>
      </header>
    </div>
  )
}

export default Header