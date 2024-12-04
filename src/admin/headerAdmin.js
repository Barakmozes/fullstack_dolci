import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TOKEN_KEY } from '../services/apiService'

export default function HeaderAdmin() {
  const nav = useNavigate();
  return (
    
    <header  id='header_a' className="container-fluid bg-light p-2 shadow mt-5">
      <div className="container">
        <div className="row align-items-center">
          <div className='logo col-auto'>
            <h2>בעל הבית</h2>
          </div>
          <div className='row col d-flex justify-content-between align-items-center'>
            <div className='col-auto'>
              {localStorage[TOKEN_KEY] ?
                <ul>
                  <li><Link to="/admin/users">משתמשים</Link></li>
                  <li><Link to="/admin/companies">קטגוריות</Link></li>
                  <li><Link to="/admin/devices">מוצרים</Link></li>
                </ul> :
                <ul>
                  <li><Link to="/">Home page</Link></li>
                  
                </ul>
              }
            </div>
            <div className='col-auto'>
              {!localStorage[TOKEN_KEY] ?
                <ul>
                  <li><Link to="/admin/Login">Login</Link></li>
                </ul> :
                <ul>
                  <li><button onClick={() => {
                    localStorage.removeItem(TOKEN_KEY);
                    nav("/admin")
                  }} className='btn btn-danger'>Log out</button></li>
                </ul>
              }
            </div>
          </div>
        </div>
      </div>
    </header>
    
  )
  
}
