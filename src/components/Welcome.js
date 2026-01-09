import React, { useState, useEffect } from 'react';
import './Welcome.css';
import Login from './Login';

const API_KEY = "AIzaSyB0e7Z_UOBldjUY0i1y3N4i8t_odTfBaog";

const Welcome = ({ goToProfile,onLogout }) => {
    const [emailVerified, setEmailVerified] = useState(false);
    const token = localStorage.getItem("token");
    const [logout,setLogout]=useState(false);

    useEffect(() => {
        const checkVerificationStatus = async () => {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ idToken: token }),
                }
            );

            const data = await response.json();
            const user = data;

            setEmailVerified(user.emailVerified);
        };

        checkVerificationStatus();
    }, [token]);

    const verifyEmailHandler = async () => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        requestType: "VERIFY_EMAIL",
                        idToken: token,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to send verification email");
            }

            alert("Verification email sent! Please check your inbox.");
        } catch (err) {
            alert(err.message);
        }
    };

    const logoutHandler=()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        // setLogout(true);
        onLogout();
    }

    
// if(logout){
//     return (<Login/>)
// }
    


    return (
        <>
            <div className="welcome-header">
                <h2>Welcome to Expense Tracker!!!</h2>

                {!emailVerified && (
                    <button className="verify-btn" onClick={verifyEmailHandler}>
                        Verify Email
                    </button>
                )}

                <button className="logout-btn" onClick={logoutHandler}>
                    Logout
                </button>


                <div className="profile-warning">
                    Your profile is incomplete.
                    <span onClick={goToProfile}>Complete now</span>
                </div>
            </div>

            <hr />

        </>
    );
};

export default Welcome;
