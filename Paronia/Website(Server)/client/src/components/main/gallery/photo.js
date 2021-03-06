import React, { Component } from 'react'
import css from '../../main/WebshowCss/style.css';
const fetch = require('node-fetch');

export default class photo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        img: [],
        email:''
    };
}
arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = [].slice.call(new Uint8Array(buffer));
  bytes.forEach((b) => binary += String.fromCharCode(b));
  return window.btoa(binary);
};

componentDidMount() {

  const token=localStorage.getItem('jwt');
		  const token1=JSON.parse(token);
			const token2=JSON.parse(token1.config.data);
      console.log("Pic"+token2.email)
      this.setState({email:token2.email})
      console.log("Hello: "+this.state.email)
      

  fetch('http://localhost:5000/api/uploads/getphoto?email='+token2.email)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data[0].img.path);  
      
    this.setState({
      img: data
  })
    

    
      
      
  
// console.log("asd"+this.state.img[0]); 
    // var imageStr =this.arrayBufferToBase64(items.img.data.data);
         
    //   this.setState({
    //       img: base64Flag + imageStr
    //   })
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

			 
			</ul>
		</div>
	</div>
</nav>

{/* Gallery */}

<section className="portfolio ">

<div className="container">
<div className="row mt-5 " ></div>

<h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">Thumbnail Gallery</h1>

<hr className="mt-2 mb-5"/>

<div className="row text-center text-lg-left">

  {/* <div className="col-lg-3 col-md-4 col-6">
    <a href="http://localhost:5000/uploads/images/2020-02-07T10-30-55.706ZDesktop.PNG" className="d-block mb-4 h-100">
          <img className="img-fluid img-thumbnail" src="http://localhost:5000/uploads/images/2020-02-07T10-30-55.706ZDesktop.PNG" alt=""/>
        </a>
  </div>
  <div className="col-lg-3 col-md-4 col-6">
    <a href="http://localhost:5000/uploads/images/2020-02-07T10-30-55.706ZDesktop.PNG" className="d-block mb-4 h-100">
          <img className="img-fluid img-thumbnail" src="http://localhost:5000/uploads/images/2020-02-07T10-30-55.706ZDesktop.PNG" alt=""/>
        </a>
  </div>
  <div className="col-lg-3 col-md-4 col-6">
    <a href="http://localhost:5000/uploads/images/2020-02-07T10-30-55.706ZDesktop.PNG" className="d-block mb-4 h-100">
          <img className="img-fluid img-thumbnail" src="http://localhost:5000/uploads/images/2020-02-07T10-30-55.706ZDesktop.PNG" alt=""/>
        </a>
  </div>
  <div className="col-lg-3 col-md-4 col-6">
    <a href="http://localhost:5000/uploads/images/2020-02-07T10-30-55.706ZDesktop.PNG" className="d-block mb-4 h-100">
          <img className="img-fluid img-thumbnail" src="http://localhost:5000/uploads/images/2020-02-07T10-30-55.706ZDesktop.PNG" alt=""/>
        </a>
  </div> */}

  
     
   
  
   { this.state.img.map((item, key) =>(
          //  <li key={item.id}>{item.name}</li>
          <div className="col-lg-3 col-md-4 col-6">

          <a href="#" className="d-block mb-4 h-100">
              <img className="img-fluid img-thumbnail" src={'http://localhost:5000/'+ item.img.path } alt=""/>
    
      
              </a>
  </div>
      
          ))}
      

 
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
