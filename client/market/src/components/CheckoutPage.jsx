import React, { useEffect, useState } from "react";
// import { Minus, Plus, X } from "lucide-react";
import Cookies from "js-cookie"
import { Routes,useNavigate } from "react-router-dom";


const CheckoutPage = () => {
    const navigate = useNavigate();
    const userId = Cookies.get("userId")
    const [product, setProduct] = useState([]);
    const [totalPrice,setTotalPrice] = useState(0);

    useEffect(() => {
        try {
            fetch(`http://localhost:5000/getCartItems/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then((response) => {
                response.json().then(data => setProduct(data));
            })
        } catch (error) {
            console.log("error in client/component/CheckoutPage line 21 :: ", error)
        }

    }, [userId])

    useEffect(()=>{
        let sum  = 0;
        product.forEach((item)=>{
            sum += Number(item.product.price)*Number(item.quantity);
        })

        setTotalPrice(sum);
    },[product])

    const handleQuantityChange = async (productId, change) => {
        const route = change === 1 ? "/cart/increase" : "/cart/decrease";
        try {
            const response = await fetch(`http://localhost:5000${route}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, productId })
            });
            const data = await response.json();
            if (data.success) {
                setProduct(prev =>
                    prev.map(item =>
                        item.product._id === productId
                            ? { ...item, quantity: item.quantity + change }
                            : item
                    )
                );
            }
        } catch (error) {
            console.log("Error updating quantity:", error);
        }
    };

    const moveToCart = (e)=>{
        e.preventDefault()

        navigate("/cart")
    }
    return (
        <div className="min-h-screen bg-black flex justify-center items-center p-4">
            <div className="bg-black text-white rounded-2xl shadow-lg w-full max-w-md md:max-w-3xl p-6 relative">
                {/* Close Button */}
                <button onClick={moveToCart} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    X{/* <X size={24} /> */}
                </button>

                {/* Logo */}
                {/* <div className="text-3xl font-bold mb-6">
          <span className="text-orange-500">E</span>
          <span className="text-white">3</span>
        </div> */}

                {/* Checkout Title */}
                <h2 className="text-3xl font-bold mb-6">Checkout</h2>
                {product.map((item) => (
                    <div className=" flex justify-between items-center gap-x-8 mb-6 border-b border-gray-800 pb-4">
                        {/* Left Section - Product Image */}
                        <div className="flex justify-center items-center bg-gray-900 rounded-xl min-h-48 w-full md:w-1/2">
                            <img
                                src={`http://localhost:5000/${item.product.image_url.replace(/\\/g, "/")}`} // replace with actual image path
                                alt="Watch Image"
                                className="w-28  md:w-36"
                            />
                        </div>

                        {/* Right Section - Details */}
                        <div className="flex-1 flex flex-col justify-center items-center ">
                            {/* Product Info */}
                            <div>
                                <h3 className="text-xl font-bold">{item.product.name}</h3>
                                <p className="text-lg text-gray-300 mt-1">&#8377; {item.product.price}</p>

                                {/* Quantity Controls */}
                                <div className="flex items-center mt-3 bg-gray-900 rounded-xl w-fit px-2 py-1">
                                    <button
                                        onClick={() => handleQuantityChange(item.product._id, -1)}
                                        className="p-2 hover:bg-gray-800 rounded-lg"
                                        disabled={item.quantity <= 1}
                                    >
                                        - {/* <Minus size={16} /> */}
                                    </button>
                                    <span className="px-4">{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.product._id, 1)}
                                        className="p-2 hover:bg-gray-800 rounded-lg"
                                    >
                                        +{/* <Plus size={16} /> */}
                                    </button>
                                </div>
                            </div>

                            {/* Delivery Address */}
                            {/* <div className="mt-6">
                                <h4 className="font-semibold text-lg">Delivery Address</h4>
                                <p className="text-gray-400 text-sm mt-2">
                                    John Dec <br />
                                    18st 6-frn St <br />
                                    Springfield, IL. 82701
                                </p>
                            </div> */}
                        </div>
                    </div>
                ))}




                {/* Payment Options */}
                <div className="mt-6">
                    <h4 className="font-semibold text-lg mb-3">Payment Method</h4>
                    <div className="flex flex-col gap-2">
                        <label className="flex items-center gap-2">
                            <input type="radio" name="payment" defaultChecked />
                            Credit Card
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="payment" /> PhonePe
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="payment" /> Google Pay
                        </label>
                    </div>
                </div>

                {/* Donation Section */}
                <div className="mt-6">
                    <p className=" m-1">Donate to help the underprivileged</p>
                    <button className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-black font-bold py-3 rounded-xl mb-3">
                        {`DONATE \u20B911`}
                    </button>

                    <button className="w-full my-2 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-black font-bold py-3 rounded-xl">
                        {`PAY NOW \u20B9${totalPrice}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
