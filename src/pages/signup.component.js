import React from 'react'
import {useForm} from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiMethod } from '../services/apiService';
import { toast } from 'react-toastify';
import AppFooter from './footer_home';

export default function SignUp() {
  const nav = useNavigate();
  const { register, handleSubmit, getValues,formState: { errors } } = useForm();


 

  const onSubForm = (_bodyData) => {
    
    delete _bodyData.email2;
    delete _bodyData.password2;
    console.log(_bodyData);
    doApiPost(_bodyData)
  }

  const doApiPost = async(_bodyData) => {
    try{
      const url = API_URL + "/users";
      const data = await doApiMethod(url, "POST", _bodyData);
      if(data._id){
        handleAdd();
        nav("/sign-in")
      }
    }
    catch(error){
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        toast.error(`Error: ${error.response.data.msg}`, {
          // Toast configuration
        });
      // } else if (error.request) {
      //   // The request was made but no response was received
      //   console.log(error.request);
      //   toast.error("No response from server", {
      //     // Toast configuration
      //   });
      // } else {
      //   // Something happened in setting up the request that triggered an Error
      //   console.log('Error', error.message);
      //   toast.error("Error: " + error.message, {
      //     // Toast configuration
      //   });
      }
    }
  }
  const handleAdd = () => {
    // Perform your add operation here

    toast.success("Item Added Successfully", {
        position: "top-right",
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
      height: '120vh',
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
      
    <h2 >הרשמה:</h2>
  
    <button onClick={()=>nav("/")}  className='btn btn-primary  col-lg-3 col-md-6  mb-3 shadow border border-primary-subtle'>חזרה הביתה</button>
    <div></div>
    
    <form onSubmit={handleSubmit(onSubForm)} className='col-lg-4 col-md-6 shadow p-2 btn btn-primary border  border-primary-subtle'>
      <label className='m-2'>שם:</label>
      <input {...register("name", {required:true, minLength:2})} type="text" className='form-control border border-primary-subtle'/>
      {errors.name && <div className='text-danger d-block'>Enter valid name (min 2 chars)</div> }
      <label className='m-2'>טלפון:</label>
      <input {...register("phone", {required:true, minLength:6})} type="tel" className='form-control border border-primary-subtle'/>
      {errors.phone && <div className='text-danger d-block'>Enter valid phone (min 6 numbers)</div> }
      <label className='m-2'>אימייל:</label>
      <input {...register("email", {required:true, pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i})}  type="text" className='form-control border border-primary-subtle'/>
      {errors.email && <div className='text-danger d-block'>Enter valid Email</div> }
      <label className='m-2'>אמת אימייל</label>
      <input {...register("email2", {required:true,validate:(value) => 
        value === getValues("email")
       })}  type="text" className='form-control border border-primary-subtle'/>
      {errors.email2 && <div className='text-danger d-block'>Email not equal</div> }
      
      <label className='m-2'>בחר סיסמה:</label>
        <input {...register("password", { required: true, minLength: 6 })} type="password" className='form-control border border-primary-subtle' />
        {errors.password && <div className='text-danger d-block'>Enter valid password (min 6 characters)</div>}

        <label className='m-2'>אמת סיסמה:</label>
        <input {...register("password2", { 
          required: true, 
          validate: (value) => value === getValues("password") 
        })} type="password" className='form-control border border-primary-subtle' />
        {errors.password2 && <div className='text-danger d-block'>Passwords do not match</div>}

      <button className='btn btn-info mt-3'>הרשם</button>
    </form>
    <footer className='mb-1'  id="footer">
        <AppFooter />
      </footer>
  </div>
  )
}
