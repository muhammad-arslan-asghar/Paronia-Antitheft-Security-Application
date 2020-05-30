import React, { Component } from 'react'
import css from '../main/WebshowCss/style.css';
import j from '../main/WebshowCss/animate';
import {Section} from 'react-animated-text';
import Mapwrap from '../main/MapContainer';
import {Redirect} from "react-router-dom";
import axios from 'axios';

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
		  command:''
        };
      }

	  handlechange=(name)=>event=>{
		  console.log("WOWWWWWWW")
		  this.setState({[name]:event.target.value});
			
			if(this.state.command == "Picture"){
				
			}

	  } 

	  clickSubmit = event =>{
		  event.preventDefault();
		  if(this.state.command== "Picture"){
			axios.get('http://localhost:5000/api/commands/pictaken')
			.then()
			 .catch();
		  }
		  if(this.state.command== "SAudio"){
			axios.get('http://localhost:5000/api/commands/saudtaken')
			.then()
			 .catch();
		  }
		  if(this.state.command== "EAudio"){
			axios.get('http://localhost:5000/api/commands/eaudtaken')
			.then()
			 .catch();
		  }
		  if(this.state.command== "GPS"){
			axios.get('http://localhost:5000/api/commands/gpstaken')
			.then()
			 .catch();
		  }
		  if(this.state.command== "Video"){
			axios.get('http://localhost:5000/api/commands/alarmtaken')
			.then()
			 .catch();
		  }
		  if(this.state.command== "location"){
			axios.get('http://localhost:5000/api/commands/loctaken')
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
                        <li><a className="dropdown-item" href="galleryvideo">Video</a></li>
					</ul>
			  </li>

			  <li className="nav-item dropdown active">
					<a className="nav-link dropdown-toggle" href="#" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Phone Monitor</a>
					<ul className="dropdown-menu" aria-labelledby="dropdown02">
						<li><a className="dropdown-item" href="portfolio-1.html">Call Logs</a></li>
						<li><a className="dropdown-item" href="portfolio-2.html">Messages</a></li>
						
					</ul>
			  </li>
			   
			   <li className="nav-item dropdown">
         <a className="nav-link " href="#" id="dropdown01"  >About Us</a>
			  </li>
			  
			   <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li>
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
                <p>I must explain to you how all this mistaken idea of denouncing pleasure and praising pain <br/>was born and I will give you a complete account of the system</p>
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
				<h2 class="mb-2 ">Core Services.</h2>
				<p class="mb-5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus, totam ipsa quia hic odit a sit laboriosam voluptatem in, blanditiis.</p>
			</div>
		</div>
		
		<div class="row">
			<div class="col-lg-4">
				<div class="service-item mb-5" data-aos="fade-left" >
                <i class="fas fa-mobile-alt "style={{ fontSize: '1.75em' }}></i>
					<h4 class="my-3">Surveillance</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, earum.</p>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="service-item mb-5" data-aos="fade-left"  data-aos-delay="450">
					<i class="ti-announcement"></i>
					<h4 class="my-3">Data Backup</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, earum.</p>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="service-item mb-5 mb-lg-0" data-aos="fade-left"  data-aos-delay="750">
					<i class="ti-layers"></i>
					<h4 class="my-3">Mobile Security</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, earum.</p>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="service-item" data-aos="fade-left"  data-aos-delay="750">
					<i class="ti-anchor"></i>
					<h4 class="my-3">Ring Mobile</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, earum.</p>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="service-item mb-5" data-aos="fade-left"  data-aos-delay="950">
					<i class="ti-video-camera"></i>
					<h4 class="my-3">Messaging Service</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, earum.</p>
				</div>
			</div>
			<div class="col-lg-4">
				<div class="service-item mb-5 mb-lg-0" data-aos="fade-left"  data-aos-delay="1050">
					<i class="ti-android"></i>
					<h4 class="my-3">Wipe Data</h4>
					<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto, earum.</p>
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
