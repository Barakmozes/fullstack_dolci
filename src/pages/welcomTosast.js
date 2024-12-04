import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const WelcomeToast = ({ closeToast }) => {
    const nav = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if the current path is '/sign-up' and close the toast if it is
        if (location.pathname === '/sign-up' || location.pathname ==="/sign-in") {
            closeToast();
        }
    }, [location, closeToast]); // Dependency array includes location and closeToast

    return (
        <div className="text-center p-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', color: 'black', borderRadius: '10px' }}>
        <button className="btn-close float-end" onClick={closeToast}></button>
        <h4 className="mb-2">ברוכים הבאים  - DOLCI</h4>
        <p className="mb-3">חוו את החוויה הטובה ביותר של קינוחים. הצטרפו עכשיו למועדון הבלעדי שלנו ותהנו מהנחה מיוחדת בהזמנתכם הראשונה.</p>
        <button 
            className="btn btn-warning btn-lg"
            onClick={() => {nav("/sign-up")}}
        >
            הצטרפו עכשיו
        </button>
    </div>
    
    );
};

export default WelcomeToast;
