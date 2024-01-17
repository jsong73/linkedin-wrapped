import React, {useState} from "react"

const App = () => {
  const [isAuthenticated, setAuthentication] = useState(false);
 

  const linkedInlogin = () => {
    window.open("http://localhost:3001/auth/linkedin", "_self");
    console.log("api hit!");
  };


    <div>

<button onClick={linkedInlogin}>Login to Linkedin</button>

    </div>
  
};

export default App;