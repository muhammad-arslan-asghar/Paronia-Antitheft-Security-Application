import React, { Component } from 'react'
import axios from 'axios';
import css from '../main/WebshowCss/style.css';
import classnames from 'classnames';
import {Redirect} from 'react-router-dom';

class Login extends Component {

    constructor(){
        super();
        this.state={
           email:'',
            password:'',
             errors:{},
             redirectTorefer:false
        }


        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    onChange(e){
          
        this.setState({[e.target.name]: e.target.value})
    }
    autenticate(jwt,next){

      if(typeof window !== undefined){
        localStorage.setItem("jwt" , JSON.stringify(jwt))
      }
      next();
    }
    onSubmit(e){
        e.preventDefault();
        const User={
            
            email: this.state.email,
            
            password: this.state.password,
            

        }
         axios.post('/api/users/login',User)
        .then(res=>{
          console.log(res.data.password);
          if(res.data.password || res.data.email){
          this.setState({errors:res.data})}
          else{
            this.autenticate(res,()=>{

                this.setState({redirectTorefer:true})

            })
          }
      
    
      
      })
         .catch();
    }
    render() {

        const {errors,redirectTorefer}=this.state;

        if(redirectTorefer){

           return <Redirect to="/webshow"></Redirect>
        }
        return (
          

  <div className="login" >
 <nav className="navbar navbar-expand-lg  main-nav " id="navbar">
	<div className="container">
	  <a className="navbar-brand" href="index.html">
	  	{/* <img src="images/logo.png" alt="" className="img-fluid"> */}
      <h4 style={{color:'#f44336'}}>Paronia</h4>
	  </a>

	  <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
		<span className="ti-align-justify"></span>
	  </button>
  
		  <div className="collapse navbar-collapse" id="navbarsExample09">
			<ul className="navbar-nav ml-auto">
			  <li className="nav-item  active"><a className="nav-link" href="login">Home</a></li>

			  <li className="nav-item dropdown">
					<a className="nav-link " href="register" id="dropdown01"  >Sign up</a>
					
			  </li>
        <li className="nav-item dropdown">
					<a className="nav-link " href="forgot" id="dropdown01"  >Forgot Password</a>
					
			  </li>

			  
			  
			</ul>
		</div>
	</div>
</nav>




    <div className="container">
      <div className="row" style={{marginTop:80}}>
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Log In</h1>
          <p className="lead text-center">Sign in to your Paronia account</p>
          <form onSubmit={this.onSubmit} action="Dashboard.js">
            <div className="form-group">
              <input type="email" className={classnames('form-control form-control-lg',{'is-invalid':errors.email})} placeholder="Email Address" name="email" value={this.state.email}  onChange={this.onChange} />
              {errors.email && (<div className="invalid-feedback">{errors.email}</div> )}
            </div>
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password})} placeholder="Password" name="password" value={this.state.password}   onChange={this.onChange} />
              {errors.password && (<div className="invalid-feedback">{errors.password}</div> )}
            </div>
            
            <input  type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>



    
  </div>
        )
    }
}

export default Login;