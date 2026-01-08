import React,{useState} from 'react';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import CompleteProfile from './components/CompleteProfile';


function App() {
const [page, setPage] = useState("signup"); // signup | login | welcome

  if (page === "welcome") {
    return <Welcome goToProfile={() => setPage("profile")} />;
  }

  if (page === "profile") {
    return <CompleteProfile goBack={() => setPage("welcome")} />;
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
