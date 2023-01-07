import { useState } from "react";
import Link from 'next/link'

export default function login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    console.log(email)

    const signIN = () => {

        const data = {
            email: email,
            password: password
        }
        // console.log(data,'this is the value of the data')
        fetch("http://localhost:4000/user/login", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(data)


        }).then((result) => {
            console.log(result, "this is the value of the result")
            result.json().then((data) => {
                console.log(data, 'this is the data')
                console.log(data.msg)
                console.log(data.data);
                console.log(data.code)
                if(data.code==200){
                     localStorage.setItem("token",data.data);
                     alert("user successfully login")
                }else{
                    alert(data.msg)
                    localStorage.setItem('token',data.data)
                }

                
            })
        }).catch((error) => {

            console.log(error)
        })
        // window.location.href = 'http://localhost:3000/userLogin'
        setEmail("")
        setPassword("")
    }



    return (
        <><section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">

                    login your Account Here
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" value={email} onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={
                                    (e) => {
                                        setPassword(e.target.value)
                                    }
                                } />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={signIN}>
                                Sign here
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <Link href="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-color:black">Sign up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section></>
    )
}