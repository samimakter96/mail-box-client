import SignupLoginScreen from "./components/SignupLoginScreen";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Welcome from "./components/Welcome";
import ComposeMail from "./components/ComposeMail";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to='/login'/>}/>
          <Route path="/welcome" element={<Welcome />}/>
          <Route path="/login" element={<SignupLoginScreen />}/>
          <Route path="/compose" element={<ComposeMail />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
