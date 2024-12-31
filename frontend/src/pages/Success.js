import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const sessionId = queryParams.get('session_id');

        if (!sessionId) {
            // Redirect to a different page if session_id is not present
            // navigate('/404');  // Or any other route
            navigate('/');  // Or any other route
        }
    }, [location, navigate]);
    return (
        <div style={{ background: "white", width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column" }}>
            <h2>Payment Successful!</h2>
            <p>Thank you for your purchase!</p>
        </div>
    );
};
export default Success;
