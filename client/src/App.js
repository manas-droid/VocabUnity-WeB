import React from "react";
import Register from "./Register";
import 'semantic-ui-css/semantic.min.css'
import { AuthProvider } from "./context/AuthContext";
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRouter from "./components/PrivateRoute";
import UpdateProfile from "./UpdateProfile";
import AddVocab from "./AddVocab";

function App() {
  return (
  <Router>  
  <AuthProvider>  
    <Switch>
      <PrivateRouter exact path="/" component={Dashboard} />
      <Route path="/signup" component={Register}/>       
      <Route path="/login"  component = {Login} /> 
      <PrivateRouter path="/update-profile" component = {UpdateProfile} />
      <PrivateRouter  path="/add-vocab" component={AddVocab}/>
    </Switch>
  </AuthProvider>
  </Router>
  );

}

export default App;
