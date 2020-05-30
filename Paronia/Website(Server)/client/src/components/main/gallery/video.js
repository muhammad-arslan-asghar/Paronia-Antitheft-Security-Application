import React, { Component } from 'react'
import css from '../../main/WebshowCss/style.css';
import js from '../../main/WebshowCss/animatevideo';

export default class video extends Component {
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

{/* Videos */}

{/* <!-- Grid row --> */}
<div className="row mt-5 " ></div>

<h1 className="font-weight-light text-center text-lg-left mt-4 mb-0">Videos</h1>

<hr className="mt-2 mb-5"/>
<div className="row">

  {/* <!-- Grid column --> */}
  <div className="col-lg-4 col-md-12 mb-4">

    {/* <!--Modal: Name--> */}
    <div className="modal fade" id="modal1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">

        {/* <!--Content--> */}
        <div className="modal-content">

          {/* <!--Body--> */}
          <div className="modal-body mb-0 p-0">

            <div className="embed-responsive embed-responsive-16by9 z-depth-1-half">
              <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/A3PDXmYoF5U"
                allowfullscreen></iframe>
            </div>

          </div>

          {/* <!--Footer--> */}
          <div className="modal-footer justify-content-center">
            <span className="mr-4">Spread the word!</span>
            <a type="button" className="btn-floating btn-sm btn-fb"><i className="fab fa-facebook-f"></i></a>
            {/* <!--Twitter--> */}
            <a type="button" className="btn-floating btn-sm btn-tw"><i className="fab fa-twitter"></i></a>
            {/* <!--Google +--> */}
            <a type="button" className="btn-floating btn-sm btn-gplus"><i className="fab fa-google-plus-g"></i></a>
            {/* <!--Linkedin--> */}
            <a type="button" className="btn-floating btn-sm btn-ins"><i className="fab fa-linkedin-in"></i></a>

            <button type="button" className="btn btn-outline-primary btn-rounded btn-md ml-4" data-dismiss="modal">Close</button>

          </div>

        </div>
        {/* <!--/.Content--> */}

      </div>
    </div>
    {/* <!--Modal: Name--> */}

    <a><img className="img-fluid z-depth-1" src="https://mdbootstrap.com/img/screens/yt/screen-video-1.jpg" alt="video"
        data-toggle="modal" data-target="#modal1"/></a>

  </div>
  {/* <!-- Grid column --> */}

  {/* <!-- Grid column --> */}
  <div className="col-lg-4 col-md-6 mb-4">

    {/* <!--Modal: Name--> */}
    <div className="modal fade" id="modal6" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">

        {/* <!--Content--> */}
        <div className="modal-content">

          {/* <!--Body--> */}
          <div className="modal-body mb-0 p-0">

            <div className="embed-responsive embed-responsive-16by9 z-depth-1-half">
              <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/wTcNtgA6gHs"
                allowfullscreen></iframe>
            </div>

          </div>

          {/* <!--Footer--> */}
          <div className="modal-footer justify-content-center">
            <span className="mr-4">Spread the word!</span>
            <a type="button" className="btn-floating btn-sm btn-fb"><i className="fab fa-facebook-f"></i></a>
            {/* <!--Twitter--> */}
            <a type="button" className="btn-floating btn-sm btn-tw"><i className="fab fa-twitter"></i></a>
            {/* <!--Google +--> */}
            <a type="button" className="btn-floating btn-sm btn-gplus"><i className="fab fa-google-plus-g"></i></a>
            {/* <!--Linkedin--> */}
            <a type="button" className="btn-floating btn-sm btn-ins"><i className="fab fa-linkedin-in"></i></a>

            <button type="button" className="btn btn-outline-primary btn-rounded btn-md ml-4" data-dismiss="modal">Close</button>

          </div>

        </div>
        {/* <!--/.Content--> */}

      </div>
    </div>
    {/* <!--Modal: Name--> */}

    <a><img className="img-fluid z-depth-1" src="https://mdbootstrap.com/img/screens/yt/screen-video-2.jpg" alt="video"
        data-toggle="modal" data-target="#modal6"/></a>

  </div>
  {/* <!-- Grid column --> */}

  {/* <!-- Grid column --> */}
  <div className="col-lg-4 col-md-6 mb-4">

    {/* <!--Modal: Name--> */}
    <div className="modal fade" id="modal4" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-lg" role="document">

        {/* <!--Content--> */}
        <div className="modal-content">

          {/* <!--Body--> */}
          <div className="modal-body mb-0 p-0">

            <div className="embed-responsive embed-responsive-16by9 z-depth-1-half">
              <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/vlDzYIIOYmM"
                allowfullscreen></iframe>
            </div>

          </div>

          {/* <!--Footer--> */}
          <div className="modal-footer justify-content-center">
            <span className="mr-4">Spread the word!</span>
            <a type="button" className="btn-floating btn-sm btn-fb"><i className="fab fa-facebook-f"></i></a>
            {/* <!--Twitter--> */}
            <a type="button" className="btn-floating btn-sm btn-tw"><i className="fab fa-twitter"></i></a>
            {/* <!--Google +--> */}
            <a type="button" className="btn-floating btn-sm btn-gplus"><i className="fab fa-google-plus-g"></i></a>
            {/* <!--Linkedin--> */}
            <a type="button" className="btn-floating btn-sm btn-ins"><i className="fab fa-linkedin-in"></i></a>

            <button type="button" className="btn btn-outline-primary btn-rounded btn-md ml-4" data-dismiss="modal">Close</button>

          </div>

        </div>
        {/* <!--/.Content--> */}

      </div>
    </div>
    {/* <!--Modal: Name--> */}

    <a><img className="img-fluid z-depth-1" src="https://mdbootstrap.com/img/screens/yt/screen-video-3.jpg" alt="video"
        data-toggle="modal" data-target="#modal4"/></a>

  </div>
  {/* <!-- Grid column --> */}

</div>
{/* <!-- Grid row --> */}
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
