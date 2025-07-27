import React from 'react'
import { useNavigate } from 'react-router-dom'
import image8 from "../assets/image8.jpg"
// import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
import image5 from "../assets/image5.png"
import image6 from "../assets/image6.png"
import redbg from "../assets/redbg Image.jpeg"
import whiteImage from "../assets/whitebgImage.jpeg"
import blackImage from "../assets/blackbgImage.jpeg"

function Home() {
  const navigate = useNavigate();
  const handleClick= (e)=>{
    e.preventDefault()
    navigate("/item-list")
  }

  return (
    <div className="bg-black min-h-screen text-white font-sans">
      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-6 px-8 py-12">
        <div className="px-10 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-orange-600  mb-6 leading-tight">
            DISCOVER <br /> OUR NEW <br /> COLLECTION
          </h2>
          <button onClick={handleClick} className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-md text-lg w-fit">
            Shop Now
          </button>
        </div>
        <div className="px-10 flex justify-center">
          <img
            src={image8}
            alt="watch"
            className="rounded-xl"
          />
        </div>
      </section>

      {/* Product Showcases */}
      <section className="bg-[#f3e0d3] text-black px-8 py-12">
        <h3 className="text-2xl font-bold text-center mb-8">PRODUCT SHOWCASES</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onClick={handleClick} className="bg-black rounded-xl flex justify-center items-center p-6">
            <img
              src={whiteImage}
              alt="Product 1"
              className="rounded-md size-fit"
            />
          </div>
          <div onClick={handleClick} className="bg-red-700 rounded-xl flex justify-center items-center p-6">
            <img
              src={redbg}
              alt="Product 2"
              className="rounded-md size-full"
            />
          </div>
          <div onClick={handleClick} className="bg-black rounded-xl flex justify-center items-center p-6">
            <img
              src={blackImage}
              alt="Product 3"
              className="rounded-md size-fit"
            />
          </div>
        </div>
      </section>

      {/* Featured Deals */}
      <section className="bg-[#f3e0d3] px-8 py-10 text-center">
        <h3 className="text-2xl font-bold mb-4">FEATURED DEALS</h3>
        <p className="text-gray-700 max-w-xl mx-auto">
          <span className='font-bold'>Big surprises are on the way! </span>
           Get ready for our upcoming sales and exclusive offers. Stay tuned and don’t miss your chance to grab your favorite items at unbeatable prices.
        </p>
      </section>

      {/* Footer */}
      
    </div>
  );
}

export default Home