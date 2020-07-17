import React, { Component } from 'react'
import css from '../main/WebshowCss/style.css';
import j from '../main/WebshowCss/animate';
import {Section} from 'react-animated-text';
import Mapwrap from '../main/MapContainer';
import {Redirect} from "react-router-dom";
import axios from 'axios';
 import swal from "sweetalert";

export default class Webshow extends Component {

	constructor(props) {
        super(props);
    
        this.state = {
		  location:false,
		  GPS:false,
		  SAudio:false,
		  EAudio:false,
		  Video:false,
		  Picture:false,
		  callLogs:false,
		  command:'',
		  email:''
        };
	  }
	  componentDidMount(){
		  const token=localStorage.getItem('jwt');
		  const token1=JSON.parse(token);
			const token2=JSON.parse(token1.config.data);
			console.log(token2.email)
			this.setState({email:token2.email})
	  }

	  Logout = () => {
		swal("Are your sure SignOut?", {
		  buttons: {
			nope: {
			  text: "Let me back",
			  value: "nope"
			},
			sure: {
			  text: "I'm, Sure",
			  value: "sure"
			}
		  }
		}).then(value => {
		  switch (value) {
			case "sure":
			  swal(" SignOut Successfully", "success").then(val => {
				localStorage.removeItem("jwt");
				return this.props.history.push("/login");
			  });
			  break;
			case "nope":
			  swal("Ok", "success");
			  break;
			default:
			  swal("Got away safely!");
		  }
		});
	  };

	  handlechange=(name)=>event=>{
		  console.log("WOWWWWWWW")
		  this.setState({[name]:event.target.value});
			
			if(this.state.command == "Picture"){
				
			}

	  } 

	  clickSubmit = event =>{
		  event.preventDefault();
		  if(this.state.command== "Picture"){
			axios.get('http://localhost:5000/api/commands/pictaken?email='+this.state.email)
			.then()
			 .catch();
		  }
		  if(this.state.command== "SAudio"){
			axios.get('http://localhost:5000/api/commands/saudtaken?email='+this.state.email)
			.then()
			 .catch();
		  }
		  if(this.state.command== "EAudio"){
			axios.get('http://localhost:5000/api/commands/eaudtaken?email='+this.state.email)
			.then()
			 .catch();
		  }
		  if(this.state.command== "GPS"){
			axios.get('http://localhost:5000/api/commands/gpstaken?email='+this.state.email)
			.then()
			 .catch();
		  }
		  if(this.state.command== "Video"){
			
			axios.get('http://localhost:5000/api/commands/alarmtaken?email='+this.state.email)
			.then()
			 .catch();
		  }
		  if(this.state.command== "location"){
			axios.get('http://localhost:5000/api/commands/loctaken?email='+this.state.email)
			.then()
			 .catch();
		  }
		  if(this.state.command== "callLogs"){
			axios.get('http://localhost:5000/api/commands/getcallLogs?email='+this.state.email)
			.then()
			 .catch();
		  }
	  }

    render() {

		
        return (
            <div>
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
			  <li className="nav-item  active"><a className="nav-link" href="webshow">Home</a></li>

			  <li className="nav-item dropdown">
					<a className="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Gallery</a>
					<ul className="dropdown-menu" aria-labelledby="dropdown01">
						<li><a className="dropdown-item" href="galleryphoto">Photo</a></li>
						<li><a className="dropdown-item" href="galleryaudio">Audio</a></li>
                        {/* <li><a className="dropdown-item" href="galleryvideo">Video</a></li> */}
					</ul>
			  </li>

			  <li className="nav-item dropdown active">
					<a className="nav-link dropdown-toggle" href="#" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phone Monitor</a>
					<ul className="dropdown-menu" aria-labelledby="dropdown02">
						<li><a className="dropdown-item" href="gallerylogcalls">Call Logs</a></li>
						{/* <li><a className="dropdown-item" href="portfolio-2.html">Messages</a></li> */}
						
					</ul>
			  </li>
			   
			   
			   
			   <li className="nav-item"><a className="nav-link" href="#" onClick={() => this.Logout()}  >LogOUT</a></li>
			</ul>
		</div>
	</div>
</nav>
{/* Banner */}

<section className="section banner">
	<div className="container">
		<div className="row">
			<div className="col-lg-10">
				 <h2 className="cd-headline clip is-full-width mb-4 ">
				 	We provide <br/>
                    <span className="cd-words-wrapper text-color">
                        <b className="is-visible">Mobile Surveillance. </b>
                        <b>Mobile Monitoring.</b>
                        <b>Mobile Security.</b>
                    </span>
                </h2>
                <p>Protect Your Mobile and Data <br/>Locate Your Mobile</p>
			</div>
		</div>
	</div>
</section>


<section>
<div className="container">
<div className="row">
<label for="cars"  style={{marginLeft:50,marginBottom:50}}  >Send Command:</label>

<select id="cars" style={{marginLeft:50,marginBottom:50}} onChange={this.handlechange("command")}  >
<option value="">Select Command</option>
  <option value="location">location</option>
  <option value="Picture">Picture</option>
  <option value="GPS">GPS</option>
  <option value="SAudio">Start Audio</option>
  <option value="EAudio">End Audio</option>
  <option value="Video">Alarm</option>
  <option value="callLogs">Call Logs</option>
</select>
<button type="button" class="btn btn-danger" onClick={this.clickSubmit} style={{marginLeft:50,marginBottom:50} } >Send Command</button>

</div>


</div>



</section>

{/* "http://localhost:5000/uploads/images/2020-02-07T10-30-55.706ZDesktop.PNG" */}
<div className="container">
<div className="row" ></div>

<h1 className="font-weight-light text-center text-lg-left mt-0 mb-0">Location</h1>

<hr className=" mb-0"/>
    <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
                <div className=" row">
                    <div id="map"><Mapwrap/> </div>
                </div>
                
            </div>
        </div>
        </div>


        {/* Services */}


    <section class="section service-home border-top" style={{marginTop: 160}}>
	<div class="container">
		<div class="row">
			<div class="col-lg-6">
				<h2 class="mb-2 ">Core Services</h2>
				<p class="mb-5">Remote control from internet.</p>
			</div>
		</div>
		
		<div class="row">
			<div class="col-lg-4">
				<div class="service-item mb-5" data-aos="fade-left" >
                <i class=" "style={{ fontSize: '1.75em' }}></i>
					<h4 class="my-3">Surveillance</h4>
					<p>Keep an eye on Your Mobile </p>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="service-item mb-5" data-aos="fade-left"  data-aos-delay="450">
					<i class="ti-announcement"></i>
					<h4 class="my-3">Auto Task</h4>
					<p>Location will be shared </p>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="service-item mb-5 mb-lg-0" data-aos="fade-left"  data-aos-delay="750">
					<i class="ti-layers"></i>
					<h4 class="my-3">Take Pictures of Theif</h4>
					<p>Take pictures by sending command</p>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="service-item" data-aos="fade-left"  data-aos-delay="750">
					<i class="ti-anchor"></i>
					<h4 class="my-3">Ring Mobile</h4>
					<p>Alarm the mobile to get the misplaced mobile</p>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="service-item mb-5" data-aos="fade-left"  data-aos-delay="950">
					<i class="ti-video-camera"></i>
					<h4 class="my-3">Audio Recording of Mobile</h4>
					<p>Start and Stop the recording of the mobile</p>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="service-item mb-5 mb-lg-0" data-aos="fade-left"  data-aos-delay="1050">
					<i class="ti-android"></i>
					<h4 class="my-3">Monitor Device</h4>
					<p>Get call logs of mobile any time</p>
				</div>
			</div>
		</div>
	</div>
</section>

<section class="footer">
	<div class="container">
		<div class="row ">
			<div class="col-lg-12">
				<p class="mb-0 text-center">Copyrights © 2020 Developed by Paronia <a href="themefisher.com" class="text-white"></a></p>
			</div>
			{/* <div class="col-lg-6">
				<div class="widget footer-widget text-lg-right mt-5 mt-lg-0">
					<ul class="list-inline mb-0">
						<li class="list-inline-item"><a href="https://www.facebook.com/themefisher" target="_blank"><i class="ti-facebook mr-3"></i></a>
						</li>
						<li class="list-inline-item"><a href="https://twitter.com/themefisher" target="_blank"><i class="ti-twitter mr-3"></i></a>
						</li>
						<li class="list-inline-item"><a href="https://github.com/themefisher/" target="_blank"><i class="ti-github mr-3"></i></a></li>
						<li class="list-inline-item"><a href="https://www.pinterest.com/themefisher/" target="_blank"><i class="ti-pinterest mr-3"></i></a></li>
						<li class="list-inline-item"><a href="https://dribbble.com/themefisher/" target="_blank"><i class="ti-dribbble mr-3"></i></a></li>
					</ul>
				</div>
			</div> */}
		</div>
	</div>
</section>


            </div>
        )
    }
}
