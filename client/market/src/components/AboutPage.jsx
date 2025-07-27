import React from "react";

const AboutPage = () => {
    return (
        <div className="bg-[#f5efe8] flex flex-col justify-center items-center min-h-screen text-gray-900 px-6 md:px-20 py-10">
           
            <section className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16">

                <div className="flex justify-center md:w-1/3">
                    <img
                        src="/fevicon.png"
                        alt="logo"
                        className="w-40 md:w-56"
                    />
                </div>
                <div className="md:w-2/3">
                    <h2 className="text-5xl font-bold mb-6">About</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Welcome to Dukaan, a modern and user-friendly online shopping platform crafted with passion and precision by <span className="text-orange-500 font-bold">Harsh Sharma</span>.
                        This project is a full-stack web application designed to provide a seamless and enjoyable shopping experience for users.E-commerce allows you to browse a curated selection of products, add your favorite items to the cart, and check out securely all from the comfort of your device. Whether you’re a casual shopper or a tech enthusiast, this platform is built to make your shopping journey smooth, intuitive, and enjoyable.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;
