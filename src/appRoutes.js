import React from 'react'
import {BrowserRouter,Routes,Route} from "react-router-dom";
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/home';
import HeaderAdmin from './admin/headerAdmin';
import LoginAdmin from './admin/loginAdmin';
import UsersAdminList from './admin/users/usersAdminList';
import CompaniesAdminList from './admin/companies/companiesAdminList';
import EditCompaniForm from './admin/companies/editCompaniesFrom';
import AddCompaniForm from './admin/companies/addCompaniesForm';
import DevicesAdminList from './admin/devices/devicesAdminList';
import AuthAdminComp from './admin/authAdminComp';
import AddDeviceForm from './admin/devices/addDeviceForm';
import EditDeviceForm from './admin/devices/editDeviceForm';
import SignUp from './pages/signup.component'
import LoginUesr from './pages/login.component';
import AppWorks from './pages/Works';
import PurchasePage from './pages/cardProduact';

import AppHeader from './pages/header_home';
import AppAbout from './pages/about';
import AppServices from './pages/sreves';
import AppPricing from './pages/pric';
import AppContact from './pages/contact';
import AppFooter from './pages/footer_home';




export default function AppRoutes() {
  return (
    <BrowserRouter>
      <header id='header' className="container-fluid" >
        <AppHeader />
      </header>
    <div className='mt-4'></div>
      <Routes>
        {/* Home and General Pages */}
        <Route path="/" element={<AppHeader />} />
        <Route index element={<Home />} />
        <Route path="/about" element={<AppAbout />} />
        <Route path="/services" element={<AppServices />} />
        <Route path="/works" element={<AppWorks />} />
        <Route path="/works/devices" element={<AppWorks />} />
        <Route path="/pricing" element={<AppPricing />} />
        <Route path="/contact" element={<AppContact />} />

        {/* User Authentication */}
        <Route path="/sign-in" element={< LoginUesr/>} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Shopping and Checkout */}
        <Route path="/PurchasePage/:id" element={<PurchasePage/>} />
        

        {/* Admin Routes */}
        npm run build
        
        
      
       
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/users" element={<UsersAdminList />} />
        <Route path="/admin/companies" element={<CompaniesAdminList />} />
        <Route path="/admin/companies/edit/:id" element={<EditCompaniForm />} />
        <Route path="/admin/companies/add" element={<AddCompaniForm />} />
        <Route path="/admin/devices" element={<DevicesAdminList />} />
        <Route path="/admin/devices/add" element={<AddDeviceForm />} />
        <Route path="/admin/devices/edit/:id" element={<EditDeviceForm />} />

        {/* Admin Header and Authentication */}
        <Route path="/admin/" element={<HeaderAdmin />} />
        <Route path="/admin/:dir/*" element={<AuthAdminComp />} />

        {/* Catch-All Route */}
        <Route path="/*" element={<h2>Page 404, not found</h2>} />
      </Routes>
    
      <ToastContainer />
      <footer className='mb-1' id="footer">
        <AppFooter />
      </footer>
    </BrowserRouter>
  );
}