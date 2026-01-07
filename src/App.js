import React,{useState} from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
const [page, setPage] = useState("signup"); // signup | login | welcome

  if (page === "welcome") {
    return <h1 style={{ textAlign: "center" }}>Welcome to Expense Tracker</h1>;
  }


  return (
   <>
   {page === "signup" && <Signup goToLogin={() => setPage("login")} />}
      {page === "login" && (
        <Login
          goToSignup={() => setPage("signup")}
          onLoginSuccess={() => setPage("welcome")}
        />
      )}
   </>
  );
}

export default App;
