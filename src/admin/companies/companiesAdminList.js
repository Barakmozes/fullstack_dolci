import React, { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import { toast } from 'react-toastify';
import HeaderAdmin from '../headerAdmin';
import AuthAdminComp from '../authAdminComp';

export default function CompaniesAdminList() {
  const [ar, setAr] = useState([]);
  const nav = useNavigate();
  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    const url = API_URL + "/companies";

    try {
      const data = await doApiGet(url)
      console.log(data);
      // const resp = await axios({
      //   method: "GET",
      //   url: url,
      //   headers:{
      //     "x-api-key":localStorage[TOKEN_KEY]
      //   }
      // })
      // console.log(resp.data);
      setAr(data)
    }
    catch (error) {
      console.log(error);
      
    }
  }

  const onDelClick_comp = async (_delId) => {
    if (window.confirm("delete comp?")) {
     
      try {
        const url = API_URL + "/companies/" + _delId;
        const data = await doApiMethod(url, "DELETE");
        if (data.deletedCount) {
          doApi();
          handleDelete();
        }
      }
      catch (error) {
        console.log(error);
      }
    }
  }
  const handleDelete = () => {
    // Perform your delete operation here
    toast.error("Item Deleted Successfully", {
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
       <AuthAdminComp />
      < HeaderAdmin/>
      <h2>List of companies in the system</h2>
      <Link className='btn btn-dark my-3' to="/admin/companies/add">Add new Compani</Link>
      <div className="table-responsive col-md-8 col-lg-12">
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>שם</th>
            <th>Company ID</th>
            <th>תיאור מחלקה</th>
            <th>Del/Edit</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.company_id}</td>
                <td>{item.CategoryDescription}</td>
                <td>
                  <button onClick={() => { onDelClick_comp(item._id) }} className='bg-danger'>X</button>
                  <button onClick={() => {
                    nav("/admin/companies/edit/" + item._id)
                  }} className='bg-dark ms-2 text-light'>Edit</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}
