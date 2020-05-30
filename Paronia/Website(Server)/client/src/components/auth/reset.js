import React, { Component } from 'react'
import axios from 'axios';
import classnames from 'classnames';
import {resetpass} from "./apiUser"

 class reset extends Component {
    constructor(){
        super();
        this.state={
            email:'',
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
        const User={
            
            password: this.state.password,
            password2: this.state.password2,

        }
        resetpass ({Password: this.state.password, confirm: this.state.password2, token: this.props.match.params.resetToken})
        .then (data => {
          if(data.error){
            console.log(data.error);
          }
          else {
            console.log("Password changed");
          }
        })
        //axios.post('http://localhost:5000/api/users/reset/88dce975abebcf37daba64c4e4dff0a5fc683521',User)
        //.then(res=>console.log(res.data))
         //.catch(err=>this.setState({ errors:err.response.data }));
    }


    render() {

        const {errors}=this.state;
        // console.log(errors);
        return (
            <div className="register">
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Reset Password</h1>
          <p className="lead text-center">Reset your password</p>
          <form noValidate onSubmit={this.onSubmit}>
            
          <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password})}  placeholder="New Password" name="password"  value={this.state.password}   onChange={this.onChange}/>
            </div>
            {errors.password && (<div className="invalid-feedback">{errors.password}</div> )}
            <div className="form-group">
              <input type="password" className={classnames('form-control form-control-lg',{'is-invalid':errors.password2})}  placeholder="Confirm Password" name="password2" value={this.state.password2}   onChange={this.onChange} />
            </div>
            {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div> )}
            
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
        )
    }
}




export default reset;