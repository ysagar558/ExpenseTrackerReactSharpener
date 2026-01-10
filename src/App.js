import React, { useState } from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import CompleteProfile from './components/CompleteProfile';
import ForgotPassword from './components/ForgotPassword';
import ExpenseTracker from './components/ExpenseTracker';


function App() {
  const [page, setPage] = useState("signup"); // signup | login | welcome

  // if (page === "welcome") {
  //   return <Welcome goToProfile={() => setPage("profile")} 
  //   onLogout={()=>setPage("login")}
  //   />;
  // }

  if (page === "profile") {
    return <CompleteProfile goBack={() => setPage("welcome")} />;
  }


  return (
    <>
      {page === "signup" && <Signup goToLogin={() => setPage("login")} />}
      {page === "login" && (
        <Login
          goToSignup={() => setPage("signup")}
          goToForgotPassword={() => setPage("forgot")}
          onLoginSuccess={() => {
            setPage("welcome");
          }}
        />
      )}

      

      {page === "welcome" && (<>
        <Welcome goToProfile={() => setPage("profile")}
          onLogout={() => setPage("login")}
        />
        <ExpenseTracker /></>)}
      {page === "forgot" && (<ForgotPassword goToLogin={() => setPage("login")} />)}
    </>
  );
}

export default App;
