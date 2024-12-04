import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate,useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import HeaderAdmin from '../headerAdmin';


export default function EditCompaniForm() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [formData,setFormData] = useState({});
  const [select_ar,setSelectAr] = useState([])
  const params = useParams();

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    try {
      const url = API_URL + "/companies";
      const data = await doApiGet(url);
      console.log(data);
      setSelectAr(data);
      const urlCompani = API_URL+"/companies/single/"+params["id"];
      const dataCompani = await doApiGet(urlCompani);
      console.log(dataCompani);
      setFormData(dataCompani);

    } catch (error) {
      console.log(error);
    }
  }

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiEdit(_bodyData)
  }

  const doApiEdit = async(_bodyData) => {
    try{
      const url = API_URL + "/companies/"+params["id"];
      const data = await doApiMethod(url, "PUT", _bodyData);
     console.log(data);
      if(data.modifiedCount>0){
        alert("Compani updated")
        nav(-1)
      }
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <div className='container'>
      < HeaderAdmin/>
      <h1>ערוך</h1>
      { formData.name ? 
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-6'>
        <label>Name</label>
        <input defaultValue={formData.name} {...register("name", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.name && <div className="text-danger">* Enter valid name (min 2 chars)</div>}

        <label>Company id</label>
        <select defaultValue={formData.company_id} {...register("company_id", { required: true, minLength: 1 })} className="form-select" type="select" >
          {select_ar.map((item,i) => {
            return (
              <option key={item._id} value={i+1}>{i+1}</option>
            )
          })}
        </select>
        <label>תיאור</label>
        <input {...register("CategoryDescription", { required: true, minLength: 2 })} className="form-control" type="text" />
        {errors.name && <div className="text-danger">* Enter valid name (min 2 chars)</div>}
        <button className='btn btn-warning mt-3'>Update Compani</button>
      </form>
        : <h2>Loading...</h2>
        }
    </div>
  )
}
