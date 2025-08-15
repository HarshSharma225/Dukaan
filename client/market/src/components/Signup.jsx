import React, { useState } from 'react'
import BASE_URL from '../const/baseurl.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        fetch(`${BASE_URL}/user/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        })
            .then(async(response) => {
                // JSON.stringify(response)
                const res = await response.json()

                console.log(res)
                if(response.message == `user already exist`) alert("Account already exists")
                
                else navigate('/')   
            })
            .catch((error) => console.log("error.......:", error))
    }

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <h1 className='text-3xl font-bold'>Sign In</h1>
            <div className='mt-0 mb-6'>
                <Link to="/user/login">
                    <span className='text-blue-700 font-bold hover:text-blue-800 active:font-extrabold'>Login</span>
                </Link>
            </div>

            <div className='h-fit w-1/4 flex'>

                <form className="mx-auto w-full h-full flex flex-col justify-center" onSubmit={handleSubmit}>
                    <div className="mb-5 w-full">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Name" required
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Email" required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Password" required
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register </button>
                </form>
            </div>


        </div>
    )
}

export default Signup