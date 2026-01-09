import React, { useState, useEffect } from 'react';
import './Welcome.css';

const API_KEY = "AIzaSyB0e7Z_UOBldjUY0i1y3N4i8t_odTfBaog";

const Welcome = ({ goToProfile }) => {
    const [emailVerified, setEmailVerified] = useState(false);
    const token = localStorage.getItem("token");

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
            const user = data.users[0];

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


    return (
        <>
            <div className="welcome-header">
                <h2>Welcome to Expense Tracker!!!</h2>

                {!emailVerified && (
                    <button className="verify-btn" onClick={verifyEmailHandler}>
                        Verify Email
                    </button>
                )}


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
