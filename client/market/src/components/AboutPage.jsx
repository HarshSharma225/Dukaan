import React from "react";
const teamMembers = [
    {
        name: "Harmak Wiison",
        role: "Kapao / manager",
        img: "https://randomuser.me/api/portraits/women/44.jpg", // Replace with real image
        desc: "Hereare bugs the wealshp citu a tnod,ads mise eede Cr6 and protect reiouring conproducts and ivIGA."
    },
    {
        name: "Ryan Patel",
        role: "Head of operations",
        img: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with real image
        desc: "Pilato nenshies ind oos, e qudimot tle mneat age that itmaud alp as.. lesidence ant offec growin."
    },
    {
        name: "Olivia Martinez",
        role: "Kapau strategist",
        img: "https://randomuser.me/api/portraits/women/68.jpg", // Replace with real image
        desc: "Chilone ahmlune to proanding protece and service and acouting cuidecer burtie austem."
    }
];

const AboutPage = () => {
    return (
        <div className="bg-[#f5efe8] flex flex-col justify-center items-center min-h-screen text-gray-900 px-6 md:px-20 py-10">
            {/* Header Section */}
            

            {/* About Section */}
            <section className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16">
                {/* Image */}
                <div className="flex justify-center md:w-1/3">
                    <img
                        src="/fevicon.png"
                        alt="logo"
                        className="w-40 md:w-56"
                    />
                </div>
                {/* Text */}
                <div className="md:w-2/3">
                    <h2 className="text-5xl font-bold mb-6">About</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Welcome to Dukaan, a modern and user-friendly online shopping platform crafted with passion and precision by <span className="text-orange-500 font-bold">Harsh Sharma</span>.
                        This project is a full-stack web application designed to provide a seamless and enjoyable shopping experience for users.E-commerce allows you to browse a curated selection of products, add your favorite items to the cart, and check out securely all from the comfort of your device. Whether you’re a casual shopper or a tech enthusiast, this platform is built to make your shopping journey smooth, intuitive, and enjoyable.
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            {/* <section className="mb-16">
                <h3 className="text-2xl font-semibold mb-3">Mission & Vision</h3>
                <p className="text-gray-600 leading-relaxed max-w-2xl">
                    Our mcelee is to empower stisments with exceptional products and
                    services, ensuring that shopping is a present not a task.
                </p>
            </section>

            {/* Team Section */}
            {/* <section className="text-center">
                <h3 className="text-2xl font-semibold mb-8">Team</h3>
                <div className="flex flex-col items-center">
                    <div className="bg-white shadow-md rounded-xl p-6 max-w-sm w-full">
                        <img
                            src={teamMembers[0].img} // Show only the first member
                            alt={teamMembers[0].name}
                            className="w-28 h-28 mx-auto rounded-full object-cover mb-4"
                        />
                        <h4 className="font-semibold text-xl">{teamMembers[0].name}</h4>
                        <p className="text-gray-500 text-sm mb-3">{teamMembers[0].role}</p>
                        <p className="text-gray-600 text-sm">{teamMembers[0].desc}</p>
                    </div>
                </div>
            </section> */}
        </div>
    );
};

export default AboutPage;
