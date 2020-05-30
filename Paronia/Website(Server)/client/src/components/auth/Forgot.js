import React, { Component } from 'react'
import axios from 'axios';
import css from '../main/WebshowCss/style.css';
import classnames from 'classnames';

 class Forgot extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            errors:{},
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    onChange(e){
          
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault();
        const User={
            
            email: this.state.email,

        }
        
        
        axios.post('http://localhost:5000/api/users/forgot',User)
        .then(res=>this.setState({errors:res.data}))
         .catch();
    }


    render() {

        const {errors}=this.state;
        // console.log(errors);
        return (
            <div className="register">
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
					<a className="nav-link " href="login" id="dropdown01"  >Login</a>
					
			  </li>

			  
			   <li className="nav-item dropdown">
         <a className="nav-link " href="forgot" id="dropdown01"  >About Us</a>
			  </li>
			   <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li>
			</ul>
		</div>
	</div>
</nav>



    <div className="container">
      <div className="row" style={{marginTop:100}}>
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Forgot Password</h1>
          <p className="lead text-center">Reset your password</p>
          <form noValidate onSubmit={this.onSubmit}>
            
            <div className="form-group">
              <input type="email"  className={classnames('form-control form-control-lg',{'is-invalid':errors.error})}  placeholder="Email Address" name="email" value={this.state.email}   onChange={this.onChange} />
              <small className="form-text text-muted"></small>
              {errors.error && (<div className="invalid-feedback">{errors.error}</div> )}
            </div>
            
            
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
        )
    }
}




export default Forgot;