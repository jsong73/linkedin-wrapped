import './App.css'

function App() {

  const linkedInLogin = async () => {
    window.open("https://localhost:3001/auth/linkedin", "_self") 
    console.log("api hit!")
  }

  return (
    <div>
        <button onClick={linkedInLogin}>LinkedIn Login</button>
    </div>


  )
}

export default App
