import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { toast } from "react-toastify";
import HeaderAdmin from "../headerAdmin";

export default function AddDeviceForm() {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [select_ar, setSelectAr] = useState([]);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    try {
      const url = API_URL + "/companies";
      const data = await doApiGet(url);
      // console.log(data);
      setSelectAr(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubForm = (_bodyData) => {
    console.log(_bodyData);
    doApiPost(_bodyData);
  };

  const doApiPost = async (_bodyData) => {
    try {
      const url = API_URL + "/devices";
      const data = await doApiMethod(url, "POST", _bodyData);
      if (data._id) {
        handleAdd();
        nav("/admin/devices");
      }
    } catch (err) {
      console.log(err);
    }
  };
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
    <div className="container">
       < HeaderAdmin/>
      <h1>Add new device</h1>
      {select_ar.length > 0 ? (
        <form onSubmit={handleSubmit(onSubForm)} className="row">
          <div className="col-12 col-md-6">
            <label>שם המוצר</label>
            <input
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
            <input
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
            <input
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
            <input
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
            <input
              {...register("Size", { required: true, minLength: 2 })}
              className="form-control"
              type="text"
            />
            {errors.Size && (
              <div className="text-danger">
                * Enter valid name (min 2 chars)
              </div>
            )}
            <label>מחלקת המוצר?</label>
            <select
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
              defaultValue={70}
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
              defaultValue={70}
              {...register("Discount", { required: true, min: 1, max: 100 })}
              className="form-control"
              type="number"
            />
            {errors.Discount && (
              <div className="text-danger">
                * Enter valid camera score (1 to 100)
              </div>
            )}
            <label>Price</label>
            <input
              defaultValue={900}
              {...register("Price", { required: true, min: 1, max: 9999 })}
              className="form-control"
              type="number"
            />
            {errors.Price && (
              <div className="text-danger">* Enter valid price (1 to 9999)</div>
            )}
            <label>זמינות המוצר</label>
            <input
              defaultValue={"זמין"}
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
            <button className="btn btn-success mt-3">Add device</button>
          </div>
        </form>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}
