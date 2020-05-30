import React from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import Landing from './components/layouts/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Forgot from './components/auth/Forgot';
import Reset from './components/auth/reset';
import Dashboard from './components/main/Dashboard';
import Surveillance from './components/main/Surveillance';
import CallLogs from './components/main/CallLogs';
import Webshow from './components/main/Webshow';
import galleryphotos from './components/main/gallery/photo'
import galleryvideos from './components/main/gallery/video'
import galleryaudios from './components/main/gallery/audio'
import store from './store';

import './App.css';


function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      {/* <Navbar/> */}
      <Route exact path="/" component={Landing}/>
      <div className="container"> 
      <Route exact path="/register" component={Register}  />
      <Route exact path="/forgot" component={Forgot}  />
      <Route exact path="/reset/:resetToken" component={Reset}  />
      <Route exact path="/login" component={Login}  />
      <Route path="/surveillance" component={Surveillance} />
      <Route path="/call" component={props => <CallLogs />} />
      <Route path="/webshow" component={Webshow} />
      <Route path="/galleryphoto" component={galleryphotos} />
      <Route path="/galleryvideo" component={galleryvideos} />
      <Route path="/galleryaudio" component={galleryaudios} />
      

      </div>
      
      <Route exact path="/dashboard" component={Dashboard} />
      {/* <Footer/> */}

    
    </div>







    
    </Router>
    </Provider>
  );
}

export default App;
