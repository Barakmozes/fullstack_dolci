import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { useNavigate,useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { toast } from 'react-toastify';
import HeaderAdmin from '../headerAdmin';


export default function EditDeviceForm() {
  const nav = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [select_ar,setSelectAr] = useState([])
  const [formData,setFormData] = useState({});
  const params = useParams();

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    try {
      const url = API_URL + "/companies";
      const data = await doApiGet(url);
      // console.log(data);
      setSelectAr(data);
      const urlDevice = API_URL+"/devices/single/"+params["id"];
      const dataDevice = await doApiGet(urlDevice);
      console.log(dataDevice);
      setFormData(dataDevice);

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
      const url = API_URL + "/devices/"+params["id"];
      const data = await doApiMethod(url, "PUT", _bodyData);
      if(data.modifiedCount){
        handleAdd();
        nav(-1)
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
      <h1>שינוי מוצר</h1>
      { select_ar.length > 0 && formData.Name ? 
      <form onSubmit={handleSubmit(onSubForm)} className='col-md-6'>
        <div className="col-12 col-md-6">
            <label>שם המוצר</label>
            <input defaultValue={formData.Name}
              {...register("Name", { required: true, minLength: 2 })}
              className="form-control"
              type="text"
            />
            {errors.Name && (
              <div className="text-danger">
                * Enter valid name (min 2 chars)
              </div>
            )}
            <label>תיאור המוצר</label>
            <input defaultValue={formData.Description}
              {...register("Description", { required: true, minLength: 2 })}
              className="form-control"
              type="text"
            />
            {errors.Description && (
              <div className="text-danger">
                * Enter valid name (min 2 chars)
              </div>
            )}
            <label>קישור לתמונה</label>
            <input defaultValue={formData.ImageURL}
              {...register("ImageURL", { required: true, minLength: 2 })}
              className="form-control"
              type="text"
            />
            {errors.ImageURL && (
              <div className="text-danger">
                * Enter valid name (min 2 chars)
              </div>
            )}
            <label>קישור לחיצה על התמונה</label>
            <input defaultValue={formData.Link}
              {...register("Link", { required: true, minLength: 2 })}
              className="form-control"
              type="text"
            />
            {errors.Link && (
              <div className="text-danger">
                * Enter valid name (min 2 chars)
              </div>
            )}
            <label>מידות</label>
            <input defaultValue={formData.Size}
              {...register("Size", { required: true, minLength: 2 })}
              className="form-control"
              type="text"
            />
            {errors.Size && (
              <div className="text-danger">
                * Enter valid name (min 2 chars)
              </div>
            )}
            <label>מחלקת המוצר</label>
            <select defaultValue={formData.company_id}
              {...register("company_id", { required: true, minLength: 1 })}
              className="form-select"
              type="select"
            >
              {select_ar.map((item) => {
                return ( 
                  <option key={item._id} value={item.company_id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            <label>משקל</label>
            <input 
              defaultValue={formData.Weight}
              {...register("Weight", { required: true, min: 1, max: 100 })}
              className="form-control"
              type="text"
            />
            {errors.Weight && (
              <div className="text-danger">
                * Enter valid battery score (1 to 100)
              </div>
            )}
            <label>הנחה</label>
            <input
              defaultValue={formData.Discount}
              {...register("Discount", { required: true, min: 1, max: 100 })}
              className="form-control"
              type="number"
            />
            {errors.Discount && (
              <div className="text-danger">
                * Enter valid camera score (1 to 100)
              </div>
            )}
            <label>מחיר</label>
            <input
              defaultValue={formData.Price}
              {...register("Price", { required: true, min: 1, max: 9999 })}
              className="form-control"
              type="number"
            />
            {errors.Price && (
              <div className="text-danger">* Enter valid price (1 to 9999)</div>
            )}
            <label>זמינות המוצר</label>
            <input
              defaultValue={formData.AvailabilityStatus}
              {...register("AvailabilityStatus", {
                required: true,
                minLength: 2,
              })}
              className="form-control"
              type="text"
            />
            {errors.AvailabilityStatus && (
              <div className="text-danger">
                * Enter valid name (min 2 chars)
              </div>
            )}
            <button className="btn btn-success mt-3">תעדכן נתונים</button>
          </div>
      </form>
        : <h2>Loading...</h2>
        }
    </div>
  )
}
