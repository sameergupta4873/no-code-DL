import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const login = () => {
    const router = useRouter()
    const [user,setUser] = useState(null);
    const data = {
        email: 'sameergup@gmail.com',
        password: '12345678'
    }
    let axiosConfig = {
        withCredentials: true,
    }
    const loginHandler = async() => {
        try {
            const res = await axios.post(
              'http://localhost:4000/api/v1/users/login',
              data,
              axiosConfig
            )
            setUser(res.data);
            
            return res
          } catch (error) {
            console.log(error)
        }
    }   
    useEffect(()=>{
        if(user){
           localStorage.setItem('user', JSON.stringify(user));
            router.push('/dashboard')
        }
    },[user])
   return (
    <div onClick={loginHandler} className="absolute top-20 right-[50%]">login</div>
  )
}

export default login