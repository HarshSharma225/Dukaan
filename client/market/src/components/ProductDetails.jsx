import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

function ProductDetails() {
    const navigate = useNavigate();
    const userId = Cookies.get("userId")
    const { id } = useParams();
    // const location = useLocation();
    // const { imageUrl } = location.state;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        // console.log("pid: ",id)

        const getProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/product/${id}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };


        getProductDetails()
    }, [id])

    const addToCart = async (e) => {
        e.preventDefault();

        try {
            fetch(`http://localhost:5000/user/${userId}/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: id,
                    // image_url: imageUrl,
                    quantity: 1,
                })
            })
            // console.log(userId,{
            //         product_id: id,
            //         image_url: imageUrl,
            //         quantity: 1,
            //     })
        } catch (error) {
            console.log("Error in ProductDetail.jsx line 52:: ", error)
        }

        navigate("/cart", { state: { productId: id} });
    }

    const buynow=(e)=>{
        e.preventDefault();

        navigate(`/checkout`)
    }
    return (
        <>
            {/* {console.log(`http://localhost:5000/${data.image_url.replace(/\\/g, "/")}`)} */}
            {loading && <h1 className='font-bold text-2xl flex justify-center items-center h-screen'>Loading...</h1>}

            {!loading &&
                <div className=" min-h-screen bg-black text-white flex justify-center items-center px-6">
                    <div className=" h-screen w-screen grid md:grid-cols-2 gap-8 items-center">
                        {/* C:\Users\harsh\Desktop\Codes\Practice Projects\E-commerce\client\market\src\assets\productImages\bruno-van-der-kraan-VRERJ5Mjp4c-unsplash.jpg */}
                        <div className="w-2xl h-screen  flex justify-center mx-4">
                            <div className=" h-2/3 bg-black border border-gray-800 rounded-xl m-auto p-4">
                                <img
                                    src={
                                        data.image_url
                                            ? `http://localhost:5000/${data.image_url.replace(/\\/g, "/")}`
                                            : "https://via.placeholder.com/300x300?text=No+Image"
                                    }
                                    alt="watch image"
                                    className="h-full rounded-lg object-contain"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 mx-4" >

                            <h1 className="text-4xl font-bold">{data.name}</h1>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                A sleek, premium leather handbag perfect for your elegant style.
                                Crafted with attention to detail for durability and fashion.
                            </p>

                            <div className="text-3xl font-semibold mt-4">&#8377; {data.price}</div>

                            <div className="flex gap-4 mt-6">
                                <button className="bg-orange-500 text-black font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition"
                                    onClick={buynow}>
                                    BUY NOW
                                </button>
                                <button className="border border-gray-400 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 transition"
                                    onClick={addToCart}>
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>

    )
}

export default ProductDetails