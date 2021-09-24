import React,{useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {initializeApp} from 'firebase/app';
import 'firebase/auth';
import {UserContext} from './context/UserContext';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import firebaseConfig from './config/FirebaseConfig';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

// initializing firebase
initializeApp(firebaseConfig);

function App() {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <ToastContainer/>
      <UserContext.Provider value={{user,setUser}}>
      <Header />
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path="*" component={NotFound}/>
      </Switch>
      <Footer/>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
