import { useState } from "react";
import Link from 'next/link';
import { toast } from "react-toastify";
import React from 'react'

export default function Home() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cpassword, setCpassword] = useState("")
    const[phone,setPhone]= useState("")
    const submitForm= ()=>{
        // console.log(heading,description);
        let  data = {
                username: name,
                email: email,
                 password: password,
                 cpassword: cpassword,
                 phone:phone}
        
        fetch( "http://localhost:4000/user/signup",{
          method:"POST",
          headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
          },body:JSON.stringify(data)
            
        }).then((result)=>{
          result.json().then((data)=>{
          console.log(data.message)
          toast.success('Toast is good',{ hideProgressBar: true, autoClose: 2000, type: 'success' })
          alert(data.message)
          })
        }).catch((error)=>{
            toast.warning("error occurs")
          console.log(error)
        })

        setName("")
        setCpassword("")
        setEmail("")
        setPassword("")
        setPhone("")
        window.location.href = 'http://localhost:3000/userLogin'
      
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" /> */}
                    Register Here
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                     
                                <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                <input type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter your Email</label>
                                <input type="email" id="email" placeholder="enter your email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your contact details</label>
                                <input type="phone" id="phone" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your contact details" value={phone} onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                                <input type="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focussubmitForm:outline-none focus:ring-primary-300 font-large rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={submitForm}>Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have an account? <Link href="/userLogin" className="font-medium text-primary-600 hover:underline dark:text-primary-500" placeholder="Login Here">login Here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
