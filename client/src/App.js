import React from "react";
import Register from "./pages/Register";
import 'semantic-ui-css/semantic.min.css'
import { AuthProvider } from "./context/AuthContext";
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRouter from "./components/PrivateRoute";
import UpdateProfile from "./pages/UpdateProfile";
import AddVocab from "./pages/AddVocab";
import Navigation from "./components/Navigation";
import DifferentExamples from "./pages/DifferentExamples";
import YourProfile from "./pages/YourProfile";

function App() {
  return (
  <Router>  
  <AuthProvider>  
    <Navigation />
    <Switch>
      <PrivateRouter exact path="/" component={Dashboard} />
      <Route path="/signup" component={Register}/>       
      <Route path="/login"  component = {Login} /> 
      <PrivateRouter path="/update-profile" component = {UpdateProfile} />
      <PrivateRouter  path="/add-vocab" component={AddVocab}/>
      <PrivateRouter path="/search-examples" component={DifferentExamples}/>
      <PrivateRouter path='/your-profile' component={YourProfile}/>
    </Switch>
  </AuthProvider>
  </Router>
  );

}

export default App;
