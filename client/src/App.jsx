import React, {useState} from "react"
import { useLinkedIn } from "react-linkedin-login-oauth2";
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png"

function App () {
  const [isAuthenticated, setAuthentication] = useState(false);

  
 

  const linkedInlogin = () => {
    window.open("http://localhost:3001/auth/linkedin", "_self");
    console.log("api hit!");
  };

return (
    <div>

      <button onClick={linkedInlogin}>Login to Linkedin</button>

    </div>
  )
};

export default App;