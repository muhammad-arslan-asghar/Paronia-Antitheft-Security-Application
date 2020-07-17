import React, { Component } from 'react'
const fetch = require('node-fetch');
export default class logcalls extends Component {



	constructor(props) {
		super(props);
		this.state = {
			call: []
		};
	}
	componentDidMount() {

		const token=localStorage.getItem('jwt');
		const token1=JSON.parse(token);
		  const token2=JSON.parse(token1.config.data);
	console.log("Pic"+token2.email)
	
	console.log("Hello: "+this.state.email)


		fetch('http://localhost:5000/api/commands/getcall?email='+token2.email)
		.then((res) => res.json())
		.then((data) => {
		//   console.log(data[0].productImage.data);  
			
		  this.setState({
			call: data
		})
		
		})
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
						<li><a className="dropdown-item" href="portfolio-1.html">Call Logs</a></li>
						{/* <li><a className="dropdown-item" href="portfolio-2.html">Messages</a></li> */}
						
					</ul>
			  </li>
			   
			   
			</ul>
		</div>
	</div>
</nav>
<h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">Call Logs</h1>
<hr className="mt-2 mb-5"/>
{ this.state.call.map((item, key) =>(
          //  <li key={item.id}>{item.name}</li>
		  				 
			  <div className="row mt-5">
				
{/* 		
				<source src={ item.productImage.data}  type="audio/mpeg" />
				<source src={'http://localhost:5000/'+ item.productImage.data } type="audio/wav" /> */}
				
				<ul>
 				 <li>Name: {item.name} </li>
 				 <li>Duration: {item.duration} sec </li>
 				 <li>Number: {item.number}</li>
				<li>Type: {item.type} </li>
				</ul>
                </div>
      
            

      
          ))}









        </div>





    )
}
}