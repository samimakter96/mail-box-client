import SignupLoginScreen from "./components/SignupLoginScreen";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./components/Welcome";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to='/login'/>}/>
          <Route path="/welcome" element={<Welcome />}/>
          <Route path="/login" element={<SignupLoginScreen />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
