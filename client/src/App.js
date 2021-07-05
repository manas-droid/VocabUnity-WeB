import React from "react";
import Register from "./pages/Register";
import 'semantic-ui-css/semantic.min.css'
import { AuthProvider } from "./context/AuthContext";
import {BrowserRouter as Router , Switch , Route} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRouter from "./components/PrivateRoute";
import AddVocab from "./pages/AddVocab";
import Navigation from "./components/Navigation";
import DifferentExamples from "./pages/DifferentExamples";
import YourProfile from "./pages/YourProfile";
import AddPost from "./pages/AddPost";

function App() {
  return (
  <Router>  
  <AuthProvider>  
    <Navigation />
    <Switch>
      <PrivateRouter exact path="/" component={Dashboard} />
      <Route path="/signup" component={Register}/>       
      <Route path="/login"  component = {Login} /> 
      <PrivateRouter  path="/add-vocab" component={AddVocab}/>
      <PrivateRouter path="/search-examples/:postid" component={DifferentExamples}/>
      <PrivateRouter path='/your-profile' component={YourProfile}/>
      <PrivateRouter path='/add-post' component={AddPost}/>

    </Switch>
  </AuthProvider>
  </Router>
  );

}

export default App;
