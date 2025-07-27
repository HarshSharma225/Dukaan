import React from 'react'
import { FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
function Footer() {
  return (
    <footer className="bg-black text-gray-300 py-8">
      <div className="max-w-6xl mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex space-x-6 text-sm font-medium">
            <a href="" className="hover:text-white">PRIVACY POLICY</a>
            <a href="" className="hover:text-white">TERMS OF SERVICE</a>
            <a href="" className="hover:text-white">CONTACT US</a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a target='_blank' href="#" className="text-white text-lg hover:text-blue-400"><FaTwitter /></a>
            <a target='_blank' href="#" className="text-white text-lg hover:text-blue-600"><FaFacebookF /></a>
            <a target='_blank' href="https://www.linkedin.com/in/harsh-sharma-685391295/" className="text-white text-lg hover:text-blue-500"><FaLinkedinIn /></a>
          </div>
        </div>

      
        <div className="text-center mb-6">
          <p className="text-gray-400 text-sm uppercase tracking-wide">NEWSLETTER SIGN UP</p>
        </div>

     
        <div className="text-center text-gray-400 text-sm mb-4">
          <p>Dukaan by Harsh Sharma</p>
          <p>work.harshsharma.07@gmail.com</p>
        </div>

      
        <div className="border-t border-orange-500 mt-4"></div>
      </div>
    </footer>
  );
}

export default Footer