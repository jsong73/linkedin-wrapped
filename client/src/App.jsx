import React from "react";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";


function App() {
  
  const linkedInlogin = () => {
    window.open("http://localhost:3001/auth/linkedin", "_self");
    console.log("api hit!");
  };

  return (
    <div>
      <img
        onClick={linkedInlogin}
        src={linkedin}
        alt="Log in with Linked In"
        style={{ maxWidth: "180px", cursor: "pointer" }}
      />
    </div>
  );
}

export default App;