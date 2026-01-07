import React, { useState } from "react";
import './Signup.css';


const API_KEY = "AIzaSyB0e7Z_UOBldjUY0i1y3N4i8t_odTfBaog";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const isFormValid =
        email.trim() &&
        password.trim() &&
        confirmPassword.trim();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error?.message);   
            }

            console.log("User has successfully signed up.");

            setEmail("");
            setPassword("");
            setConfirmPassword("");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-card" onSubmit={submitHandler}>
                <h2>SignUp</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                {error && <p className="error-text">{error}</p>}

                <button type="submit" disabled={!isFormValid || loading}>
                    {loading ? "Signing up..." : "Sign up"}
                </button>
            </form>
        </div>
    );
};

export default Signup;
