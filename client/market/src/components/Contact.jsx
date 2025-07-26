import React from "react";
import { FaLinkedin,FaInstagram,FaTwitter, FaEnvelope } from "react-icons/fa";

const ContactPage = () => {
  return (
    <div className="bg-[#faf6f0] min-h-screen flex flex-col lg:flex-row items-center  px-4 sm:px-8 md:px-16 lg:px-24 py-8 lg:py-16 text-gray-900">
 
      <div className="lg:w-1/2 mb-10 lg:mb-0">
        <h2 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6 sm:mb-10">
          Contact
        </h2>

        <div className="flex gap-4 sm:gap-6 text-2xl sm:text-3xl">
          <FaInstagram className="cursor-pointer hover:text-gray-700" />
          <FaTwitter className="cursor-pointer hover:text-gray-700" />
          <FaLinkedin className="cursor-pointer hover:text-gray-700" />
          <FaEnvelope className="cursor-pointer hover:text-gray-700" />
        </div>
      </div>

      <div className="lg:w-1/2 w-full max-w-lg">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6">
          Contact Us
        </h3>
        <form className="flex flex-col gap-4 sm:gap-5">
          <div>
            <label className="block mb-1 text-sm sm:text-base font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-black rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm sm:text-base font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-black rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm sm:text-base font-medium">
              Message
            </label>
            <textarea
              placeholder="Write your message"
              className="w-full border border-black rounded-md px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base h-24 sm:h-28 resize-none focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full border border-black text-black font-semibold py-2 sm:py-3 rounded-md hover:bg-black hover:text-white transition text-sm sm:text-base"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
