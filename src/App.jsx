import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import  authService  from './appwrite/auth'
import './App.css'
import { login,logout } from './store/authSlice'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import Header from './components/header'

const App = () => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))

      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  },[])

  return ! loading ? (
    <div className='w-full min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
     <Header />
      <main>
       TODO:  <Outlet/>
      </main>
      <Footer/>

        </div>
     </div>
  ) : null

 
}

export default App