import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { setproducts, setloading, seterror } from '../redux/productSlice'
function ProductList() {
    const images = import.meta.glob("/src/assets/productImages/*.{jpg,jpeg,png}", { eager: true });
    const imageList = Object.values(images).map(img => img.default);

    const dispatch = useDispatch();
    const { products, loading } = useSelector((state) => state.product)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/products", {
                    method: "GET",
                });
                const data = await response.json();
                dispatch(setproducts(data));
                dispatch(setloading(false))
            } catch (error) {
                dispatch(seterror(error))
                console.log(`error in server/index.js:line:13 :: ${error}`)
            }
        };

        fetchProducts();


    }, [])

    const randomImage = () => {
        if (imageList.length === 0) return null;
        const idx = Math.floor(Math.random() * imageList.length);
        return imageList[idx];
    };


    return (
        <div>
            {loading && <h1 className='font-bold text-2xl flex justify-center items-center h-screen'>Loading...</h1>}

            {!loading &&
                <div className="bg-black w-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-2">
                    {products.map((item) => {
                        const image = randomImage();

                        return (
                            <Link key={item._id} to={`/item-detail/${item._id}`} state={{ imageUrl: image }}>
                                <div className="bg-white rounded-lg inset-shadow-orange-600 inset-shadow-sm p-4 flex flex-col items-center">

                                    <img
                                        className="w-1/2 h-32 object-cover mb-4 rounded border-1"
                                        src={image}
                                        alt={item.name}
                                    />
                                    <div className="font-semibold text-lg mb-2">{item.name}</div>
                                    <div className="font-semibold text-lg mb-2">&#8377; {item.price}</div>
                                </div>
                            </Link>
                        )



                    })}
                </div>
            }



        </div>

    )
}

export default ProductList