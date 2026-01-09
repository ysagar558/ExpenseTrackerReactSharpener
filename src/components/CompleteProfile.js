import { useState, useEffect } from "react";
import githubIcon from "../assets/icons/github.png";
import webIcon from "../assets/icons/web.png";
import './CompleteProfile.css';

const API_KEY = "AIzaSyB0e7Z_UOBldjUY0i1y3N4i8t_odTfBaog";

const CompleteProfile = ({ goBack }) => {
    const [fullName, setFullName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await fetch(
                    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            idToken: token,
                        }),
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error("Failed to fetch profile data");
                }

                const user = data.users[0];

                setFullName(user.displayName || "");
                setPhotoUrl(user.photoUrl || "");
            } catch (err) {
                console.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [token]);

    const updateProfileHandler = async () => {
        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        idToken: token,
                        displayName: fullName,
                        photoUrl: photoUrl,
                        returnSecureToken: true,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error("Profile update failed");
            }

            alert("Profile updated successfully!");
            goBack();
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) {
        return <p>Loading profile...</p>;
    }

    return (
        <>

            <div className="quote">
                <i>Winners never quit, Quitters never win.</i>
            </div>

            <div className="profile-warning-right">
                Your Profile is <b>64%</b> completed. A complete Profile has higher chances
                of landing a job.
                <span>Complete now</span>
            </div>
            <hr />

            <div className="profile-container">
                <h2>Contact Details</h2>

                <div className="form-row">
                    <label className="icon-label">
                        <img src={githubIcon} alt="GitHub" className="label-icon" />
                        Full Name:
                    </label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />


                    <label className="icon-labelp">
                        <img src={webIcon} alt="Web" className="label-icon" />
                        Profile Photo URL:
                    </label>
                    <input
                        type="text"
                        value={photoUrl}
                        onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                </div>

                <button className="update-btn" onClick={updateProfileHandler}>
                    Update
                </button>

                <button className="cancel-btn" onClick={goBack}>
                    Cancel
                </button>
            </div>
        </>
    );
};

export default CompleteProfile;