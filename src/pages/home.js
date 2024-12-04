import React, { useEffect,useRef  } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppHero from './main_home';
import AppAbout from './about';
import AppServices from './sreves';
import AppWorks from './Works';
import AppTestimonials from './mosaon';
import AppPricing from './pric';
import AppContact from './contact';
import WelcomeToast from './welcomTosast';
import { TOKEN_KEY } from '../services/apiService';

export default function Home() {
  const toastId = useRef(null); // Using useRef to persist toastId

  useEffect(() => {
    if (!localStorage.getItem(TOKEN_KEY) && !toastId.current) {
      toastId.current = toast(<WelcomeToast closeToast={() => toast.dismiss(toastId.current)} />, {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      });
    }
  }, []);


  return ( 
    <div  className="App">

    <main className='home' >
        <AppHero  />
        <AppAbout />
        <article>
        <AppServices />
        <AppWorks />
        </article>
        <AppTestimonials />
        <AppPricing />
      <AppContact />
      </main>
     
    </div>
  )
}
