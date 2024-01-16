import './App.css';
;

function App() {


  const linkedInlogin = async () => {
    window.open("http://localhost:3001/auth/linkedin", "_self");
    console.log("api hit!");
   };


  return (
    <div>
      <button onClick={linkedInlogin}>LinkedIn Login</button>
    
    </div>
  );
}

export default App;