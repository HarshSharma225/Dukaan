import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit =async (e)=>{
        e.preventDefault();

        fetch("https://dukaan-4.onrender.com/user/login",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then((response)=>{
            response.json().then((data)=>{
                console.log(data)
                if(data.message === "user found"){
                    // console.log("redirecting user...........")    //////////// redirect
                    Cookies.set("userId",data.user._id,{path: "/"});
                    dispatch(setUser({id: data.user._id, name: data.user.name, email: data.user.email}));
                    navigate("/");
                } 
            })
        })
        .catch ((error) => console.log("error.......:",error))
    }

    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <h1 className='text-2xl font-bold mb-8'>Login</h1>
            <div className='h-fit w-1/4 flex'>
                <form className="mx-auto w-full h-full flex flex-col justify-center" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Email" required 
                        onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" id="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Password" required 
                        onChange={(e)=>setPassword(e.target.value)}/>
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                </form>
            </div>


        </div>
    )
}

export default Login