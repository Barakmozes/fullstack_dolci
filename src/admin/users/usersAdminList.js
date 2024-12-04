import React, { useEffect, useState } from 'react'
// import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { API_URL, TOKEN_KEY, doApiGet,doApiMethod } from '../../services/apiService';
import { toast } from 'react-toastify';
import HeaderAdmin from '../headerAdmin';
import AuthAdminComp from '../authAdminComp';

export default function UsersAdminList() {
  const [ar, setAr] = useState([]);
  // const [query] = useSearchParams();
  useEffect(() => {
    doApi();
  }, [])

  const doApi = async () => {
    const url = API_URL + "/users/usersList";
   
    try {
      const data = await doApiGet(url)
  
      setAr(data)
    } 
    catch (error) {
      console.log(error);
    }
  }

  const onDelClick_user = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const url = API_URL + "/users/" + userId;
        const data = await doApiMethod(url, "DELETE");
  
        if (data.deletedCount > 0) {
          doApi(); // Refresh the list of users
          handleDelete();
       
        } else {
          alert("NOT SCSES")
          // Handle case where no user was deleted (e.g., user not found)
        }
      } catch (error) {
        console.log("Error deleting user:", error);
        // Optionally handle the error, e.g., show a notification
      }
    }
  };

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
    <div className='container App'>
      <AuthAdminComp />
      < HeaderAdmin/>
      <h2>List of users in the system</h2>
      <div className="table-responsive col-md-8 col-lg-12">
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>שם</th>
            <th>email</th>
            <th>טלפון</th>
            <th>role</th>
            <th>del</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.role}</td>
                <td><button onClick={() => { onDelClick_user(item._id) }} className='bg-danger'>Del</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
    </div>
  )
}
