import React from 'react'
import { useForm } from "react-hook-form"
import { useNavigate } from 'react-router-dom';
import { API_URL,  doApiMethod } from '../../services/apiService';
import { toast } from 'react-toastify';
import HeaderAdmin from '../headerAdmin';


export default function AddCompaniForm() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();


  


  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPost(_bodyData)
    
  }

  const doApiPost = async(_bodyData) => {
    try{
      const url = API_URL + "/companies";
      const data = await doApiMethod(url, "POST", _bodyData);
      if(data._id){
        handleAdd();
        nav("/admin/companies")
      }
    }
    catch(error){
      toast.error(`Error: ${error.response.data.msg}`, {
        // Toast configuration
      });
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
    <div className='container'>
      < HeaderAdmin/>
      <h1>תוסיף מחלקה חדשה</h1>
      
      <form onSubmit={handleSubmit(onSubForm)} className='row'>
         <div className="col-12 col-md-6">
        <label>שם</label>
        <input {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.name && <div className="text-danger">* Enter valid name (min 2 chars)</div>}
        <label>Company id</label>
        <input {...register("company_id", { required: true, minLength: 1 })} className="form-control" type="number" />
        {errors.name && <div className="text-danger">* Enter valid name (min 2 chars)</div>}
        <label>תיאור</label>
        <input {...register("CategoryDescription", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.name && <div className="text-danger">* Enter valid name (min 2 chars)</div>}
        <button className='btn btn-success mt-3'>לחץ כדי להוסיף</button>
        </div>
      </form>
       
    </div>
    
  )
}
