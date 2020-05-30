import React, { Component } from 'react'
import css from '../../main/WebshowCss/style.css';
const fetch = require('node-fetch');

export default class audio extends Component {
	constructor(props) {
		super(props);
		this.state = {
			aud: []
		};
	}
	componentDidMount() {
		fetch('http://localhost:5000/api/commands/getaud')
		.then((res) => res.json())
		.then((data) => {
		  console.log(data[0].productImage.data);  
			
		  this.setState({
			aud: data
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
                        <li><a className="dropdown-item" href="galleryvideo">Video</a></li>
					</ul>
			  </li>

			  <li className="nav-item dropdown active">
					<a className="nav-link dropdown-toggle" href="#" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Portfolio</a>
					<ul className="dropdown-menu" aria-labelledby="dropdown02">
						<li><a className="dropdown-item" href="portfolio-1.html">Portfolio Masonary</a></li>
						<li><a className="dropdown-item" href="portfolio-2.html">Portfolio lightbox</a></li>
						<li><a className="dropdown-item" href="portfolio-3.html">Portfolio 2 column</a></li>
						<li><a className="dropdown-item" href="portfolio-single.html">Portfolio Details</a></li>
					</ul>
			  </li>
			   <li className="nav-item dropdown">
					<a className="nav-link dropdown-toggle" href="#" id="dropdown05" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Blog</a>
					<ul className="dropdown-menu" aria-labelledby="dropdown05">
						<li><a className="dropdown-item" href="blog-grid.html">Blog Grid</a></li>
						<li><a className="dropdown-item" href="blog-sidebar.html">Blog with Sidebar</a></li>

						<li><a className="dropdown-item" href="blog-single.html">Blog Single</a></li>
					</ul>
			  </li>
			   <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li>
			</ul>
		</div>
	</div>
</nav>
            <div className="container">
            
            <div className="row mt-5 " ></div>

<h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">Audios</h1>

<hr className="mt-2 mb-5"/>
                <div className="row mt-5">
							<audio controls>
				{/* <source src="http://www.w3schools.com/html/horse.ogg" type="audio/ogg" /> */}
				<source src="http://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
				{/* <a href="http://www.w3schools.com/html/horse.mp3">horse</a> */}
			</audio>
                </div>
				{ this.state.aud.map((item, key) =>(
          //  <li key={item.id}>{item.name}</li>
		  				 
			  <div className="row mt-5">
				<audio controls>
					
				{/* <source src="http://www.w3schools.com/html/horse.ogg" type="audio/ogg" /> */}
				<source src={ item.productImage.data}  type="audio/mpeg" />
				<source src={'http://localhost:5000/'+ item.productImage.data } type="audio/wav" />
				{/* <a href="http://www.w3schools.com/html/horse.mp3">horse</a> */}
			</audio>
                </div>
      
            

      
          ))}


				
                

</div>
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
