import React from 'react';
import './Welcome.css';

const Welcome = ({ goToProfile }) => {
    return (
        <>
            <div className="welcome-header">
                <h2>Welcome to Expense Tracker!!!</h2>
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
