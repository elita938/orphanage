import { useState } from "react";
import Signup from "./signup/Signup";
import Login from "./Login/Login";
import "./App.css";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      {page === "login" ? (
        <Login goSignup={() => setPage("signup")} />
      ) : (
        <Signup goLogin={() => setPage("login")} />
      )}
    </div>
  );
}

export default App;