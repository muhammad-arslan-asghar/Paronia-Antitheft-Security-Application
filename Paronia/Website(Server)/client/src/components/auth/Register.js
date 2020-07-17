import React, { Component } from 'react'
import axios from 'axios';
import swal from "sweetalert";
import classnames from 'classnames';
import css from '../main/WebshowCss/style.css';

 class Register extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            phonenumber:'',
            password:'',
            password2:'',
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
        const newUser={
            name: this.state.name,
            email: this.state.email,
            phonenumber: this.state.phonenumber,
            password: this.state.password,
            password2: this.state.password2,

        }
        
        axios.post('/api/users/register',newUser)
        .then(res=> { if(res.data.isVerified==false){
          swal("Sign up Successfully", "success");

        }   this.setState({errors: res.data})})
         .catch(err=>console.log(""));
    }


    render() {

        const errors=this.state.errors;
        // console.log(errors)
        
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
					<a className="nav-link " href="login" id="dropdown01"  >Login</a>
					
			  </li>
        <li className="nav-item dropdown">
					<a className="nav-link " href="forgot" id="dropdown01"  >Forgot Password</a>
					
			  </li>

			  
			</ul>
		</div>
	</div>
</nav>

    <div className="container">
      <div className="row"style={{marginTop:30}}>
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your Paronia account</p>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="text" className={classnames('form-control form-control-lg',{'is-invalid':errors.name})} placeholder="Name" name="name"  value={this.state.name}
                onChange={this.onChange}
              
              />
              {errors.name && (<div className="invalid-feedback">{errors.name}</div> )}
            </div>
            <div className="form-group">
              <input type="email"  className={classnames('form-control form-control-lg',{'is-invalid':errors.email})}  placeholder="Email Address" name="email" value={this.state.email}   onChange={this.onChange} />
              <small className="form-text text-muted"></small>
              {errors.email && (<div className="invalid-feedback">{errors.email}</div> )}
            </div>
            
            <div className="form-group">
              <input type="tel" className={classnames('form-control form-control-lg',{'is-invalid':errors.phonenumber})}  placeholder="Phone Number" name="phonenumber" value={this.state.phonenumber}   onChange={this.onChange} />
              <small className="form-text text-muted"></small>
              {errors.phonenumber && (<div className="invalid-feedback">{errors.phonenumber}</div> )}
            </div>
            
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password})}  placeholder="Password" name="password"  value={this.state.password}   onChange={this.onChange}/>
              {errors.password && (<div className="invalid-feedback">{errors.password}</div> )}
            </div>
            
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password2})}  placeholder="Confirm Password" name="password2" value={this.state.password2}   onChange={this.onChange} />
              {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div> )}
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
export default Register; 