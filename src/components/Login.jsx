import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import Button from './Button'
import Input from './Input'
import Logo from './Logo'
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth"
import { useForm } from 'react-hook-form'

function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {register, handleSubmit} = useForm() //register and handlesubmit are the parameters needded for the form hook and handle submbit is the evenlistner in whiv=ch we will pass our submit function
  const [error ,setError] = useState("")

  const login = async(data)=>{
    setError("")
    try {
      const session = await authService.logout(data)//the session variable will get the lofin status using authservive login feature 
      if(session){
        const userData = await authService.getCurrentUser()
        // Todo store data in database
        if(userData) dispatch(authLogin(userData))
        navigate("/")
      }
    
    } catch (error) {
      setError(error.message)
    }
  }

  return (
      
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
          <div className='space-y-5'>
            <Input // this is not the normal form input 
            type="email"
            label="Email"
            placeholder="Enter your email"
            {...register("email", {
              required: true,
              validate: {//this is used to validate the email using a regex regex can be find online or gpt 
                  matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                  "Email address must be a valid address",
              }
          })} 
          />
          <Input
                label="Password: "
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                <button
                type="submit"
                className="w-full"
                >Sign in</button>
          </div>
        </form>
        </div>

    </div>    

  )
}

export default Login