import React from 'react'
import axios from "axios";
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { API_URL, TOKEN_KEY } from '../services/apiService';
import { toast } from 'react-toastify';
import AppFooter from './footer_home';

export default function LoginUesr() {
  const{register , handleSubmit ,  formState: { errors } } = useForm();
  const nav = useNavigate();

  const onSub = (bodyData) => {
    console.log(bodyData)
    doApiPost(bodyData);
  }

  const doApiPost = async(bodyData) => {
    try {
      const url = API_URL+"/users/login";
      const resp = await axios({
        method:"POST",
        url:url,
        data:bodyData
      })
      
      // Store the token regardless of the role
      localStorage.setItem(TOKEN_KEY, resp.data.token)
  // console.log(localStorage())
      if(resp.data.role === "admin"){
        // If user is an admin, navigate to admin page
        nav("/admin/login")
      } else {
        // If user is not an admin, navigate to home page
        handleAdd()
        nav("/")
      }
      console.log(resp.data);
    } catch (error) {
      toast.error(`Error: ${error.response.data.msg}`, {
        // Toast configuration
      });
    }
  }
  const handleAdd = () => {
    // Perform your add operation here

    toast.success("ברוך הבא ל DOLCI", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
};

  return (
    <div 
    className='p-4 mx-auto' 
    style={{ 
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'start',
      alignItems: 'center',
      backgroundImage: 'url("/img/any/img6.jpg")', // Update this path
      backgroundSize: 'cover', // Cover the entire space
      backgroundPosition: 'center', // Center the image
    }}
  >
      <h2 >כניסה...</h2>
     
      <button onClick={()=>nav("/")}  className='btn btn-primary col-lg-3 col-md-6 shadow mb-3 border border-primary-subtle'>חזרה הביתה</button>
      <div></div>
      <form onSubmit={handleSubmit(onSub)} className='col-lg-4 col-md-8   ms-3 p-3 btn btn-primary border border-primary-subtle shadow'>
        <label className='m-2 '>אימייל:</label>
        <input {...register("email",{required:true,pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})} type="text" className='form-control border border-primary-subtle'/>
        {errors.email && <div className='text-danger '>* Enter valid email</div>}
        <label className='m-2'>סיסמה:</label>
        <input {...register("password",{required:true,minLength:3})} type="text" className='form-control border border-primary-subtle'/>
        {errors.password && <div className='text-danger'>* Enter valid password (min 3 chars)</div>}
        <div className='mt-4 text-center'>
          <button className=' btn btn-info col-md-6 shadow mb-3 '>כניסה</button>
        </div>
      </form>
      <footer className='mb-1' id="footer">
        <AppFooter />
      </footer>
    </div>
  )
}
