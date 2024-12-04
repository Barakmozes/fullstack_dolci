import React, { useEffect, useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService';
import PagesBtns from '../../components/general/pagesBtns';
import { toast } from 'react-toastify';
import HeaderAdmin from '../headerAdmin';
import AuthAdminComp from '../authAdminComp';

export default function DevicesAdminList() {
  const [ar, setAr] = useState([]);
  const [query] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    doApi();
  }, [query])

  const doApi = async () => {
    const page = query.get("page") || 1;
    const url = API_URL + "/devices?page=" + page;

    try {
      const data = await doApiGet(url)
      console.log(data);
      setAr(data)
    }
    catch (error) {
      console.log(error);
    }
  }

  const onDelClick = async (_delId) => {
    if (window.confirm("Delete device?")) {

      try {
        const url = API_URL + "/devices/" + _delId;
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
      <h2>List of devices in the system</h2>
      <Link className='btn btn-dark my-3' to="/admin/devices/add">Add new device</Link>
      <div>
        <PagesBtns linkTo={"/admin/devices?page="} cssClass="btn btn-dark ms-2" apiUrl={API_URL + "/devices/count"} />
      </div>

      <div className="table-responsive col-sm-4 col-md-8 col-lg-12">
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>#</th>
            <th>שם</th>
            <th>מחלקת</th>
            <th>תיאור</th>
            <th>מחיר</th>
            <th>תאריך</th>
            <th>Del/Edit</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            const page = query.get("page") || 1;
            return (
              <tr key={item._id}>
                <td>{((page - 1) * 10) + i + 1}</td>
                <td>{item.Name}</td>
                <td>{item.company_id}</td>
                <td>{item.Description}</td>
                <td>{item.Price}</td>
                <td>{item.date_created.substring(0, 10)}</td>
                <td>
                  <button onClick={() => { onDelClick(item._id) }} className='bg-danger'>X</button>
                  <button onClick={() => {
                    nav("/admin/devices/edit/" + item._id)
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
