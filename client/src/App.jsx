import React, {useState} from "react"

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