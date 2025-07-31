import React, { useCallback, useEffect, useState } from "react";
// import minilogo from "../assets/mini-logo.png"
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  // const [productName, setProductName] = useState();
  // const [productPrice, setProductPrice] = useState();
  const [totalCost,setTotalCost] = useState(0);
  const location = useLocation()
  const productId = location.state || null;
  const userId = Cookies.get("userId")
  
  // console.log(productId)
  // const getProductDetail = useCallback(async () => {
  //   try {
  //     fetch(`/product/${id}`, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       }
  //     }).then((response) => {
  //       response.json().then((data) => {
  //         // console.log(data)
  //         setProductName(data.name);
  //         setProductPrice(data.price);
  //       })
  //     })
  //   } catch (error) {
  //     console.log("error in client/component/cart line 22:: ", error)
  //   }
  // }, [id])

  const getUserCartDetails = useCallback(async () => {
    // console.log(userId)
    fetch(`https://dukaan-5.onrender.com/getCartItems/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((response) => {
      response.json().then((data) => {
        // console.log("line 46",data)
        setProducts(data);
      })
    }).catch((err)=> {
      console.log("error in client/component/cart line 45:: ", err)
    })
  }, [userId])

  useEffect(() => {
    let sum = 0;
    products.forEach(item => {
      sum += item.product.price;
    });
    setTotalCost(sum);
  }, [products]);
  useEffect(() => {
    // getProductDetail();
    getUserCartDetails();   

  }, [getUserCartDetails]);

  const handleCancle = (e)=>{
    e.preventDefault();

    if(productId) navigate(`/item-detail/${productId}`)
    else navigate("/item-list")
  }

   const buynow=(e)=>{
        e.preventDefault();

        navigate(`/checkout`)
    }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
   
      <div className="bg-black text-white rounded-lg w-full sm:w-[90%] md:w-[500px] lg:w-[500px] max-h-screen overflow-y-auto p-6 relative transition-transform transform">
     
        <button
          onClick={handleCancle}
          className="absolute top-4 right-4 text-2xl hover:text-gray-400"
        >
       
          X
        </button>

        <h1 className="text-3xl font-bold mb-6">Cart</h1>

        {products.map((item) => (
          <div key={item.product.name} className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
        
            <div className="flex items-center gap-4">
              <img
                src={`https://dukaan-5.onrender.com/${item.product.image_url.replace(/\\/g, "/")}`}
                alt="Product"
                className="w-16 h-16 rounded bg-gray-900 object-cover"
              />
              
            </div>
            <div className="w-fit  flex items-center gap-4">
              <p className="text-lg text-white font-medium leading-tight">
                {item.product.name}
              </p>
            </div>

        
            <div className="text-lg font-bold">&#8377; {item.product.price}</div>
          </div>
        ))}
        <div className="flex justify-between items-center bg-gray-900 rounded-lg p-3 mb-6">
          <input
            type="text"
            placeholder="Promo Code"
            className="bg-transparent outline-none text-gray-300 placeholder-gray-500 w-full"
          />
          <button className="ml-3 bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm font-semibold">
            APPLY
          </button>
        </div>

        <div className="flex justify-between items-center text-lg font-semibold mb-6">
          <span>Total</span>
          <span>&#8377; {totalCost}</span>
        </div>

        <button className="w-full bg-orange-500 text-black text-lg font-bold py-3 rounded-lg hover:bg-orange-600 transition" 
          onClick={buynow}>
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default Cart;
