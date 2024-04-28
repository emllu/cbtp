import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav, NavDropdown, Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Glightbox from 'glightbox'; // Import Glightbox if needed 
import {useNavigate} from 'react-router-dom'
import './lands.css'
const Lands = () => {
  const [navbarActive, setNavbarActive] = useState(false);

  const toggleNavbar = () => {
    setNavbarActive(!navbarActive);
  };
const navigate=useNavigate();
  return (
    <>
      {/* Navbar Section */}
      <section className="navbar-area navbar-four navigate">
        <Container>
          <Row>
            <Col lg={12}>
              <Navbar expand="lg">
                <Navbar.Brand href="index.html">
                  <img src="assets/images/white-logo.svg" alt="Logo" />
                </Navbar.Brand>
                <Navbar.Toggle onClick={toggleNavbar} />
                <Navbar.Collapse className={`sub-menu-bar ${navbarActive ? 'active' : ''}`} id="navbarNine">
                  <Nav className="me-auto">
                    <Nav.Item>
                      <Nav.Link className="page-scroll active" href="#hero-area">Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className="page-scroll" href="#services">Services</Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Hero Area */}
      <section id="hero-area" className="header-area header-eight sec-1" >
        <Container>
          <Row className="align-items-center">
            <Col lg={6} md={12} col={12}>
              <div className="header-content">
                <h1>Corporate & Business Site Template by Ayro UI.</h1>
                <p>
                  We are a digital agency that helps brands achieve their business outcomes.
                  We see technology as a tool to create amazing things.
                </p>
                <Button className="primary-btn"  onClick={() => navigate('/login')}>
                  Get Started
                </Button>
              </div>
            </Col>
            <Col lg={6} md={12} col={12}>
              <div className="header-image">
                <img src="assets/images/header/hero-image.jpg" alt="Hero Image" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section id="services" className="services-area services-eight sec-1">
        <Container>
        
          <Row>
            {[
              {
                icon: 'lni lni-capsule',
                title: 'Refreshing Design',
                description: 'Lorem ipsum dolor sit amet, adipscing elitr, sed diam nonumy eirmod tempor.',
              },
              {
                icon: 'lni lni-bootstrap',
                title: 'Solid Bootstrap 5',
                description: 'Lorem ipsum dolor sit amet, adipscing elitr, sed diam nonumy eirmod tempor.',
              },
              {
                icon: 'lni lni-shortcode',
                title: '100+ Components',
                description: 'Lorem ipsum dolor sit amet, adipscing elitr, sed diam nonumy eirmod tempor.',
              },
              // {
              //   icon: 'lni lni-dashboard',
              //   title: 'Speed Optimized',
              //   description: 'Lorem ipsum dolor sit amet, adipscing elitr, sed diam nonumy eirmod tempor.',
              // },
              // {
              //   icon: 'lni lni-layers',
              //   title: 'Fully Customizable',
              //   description: 'Lorem ipsum dolor sit amet, adipscing elitr, sed diam nonumy eirmod tempor.',
              // },
              // {
              //   icon: 'lni lni-reload',
              //   title: 'Regular Updates',
              //   description: 'Lorem ipsum dolor sit amet, adipscing elitr, sed diam nonumy eirmod tempor.',
              // },
            ].map((service, idx) => (
              <Col lg={4} md={6} key={idx}>
                <Card className="single-services">
                  <Card.Body>
                    <div className="service-icon">
                      <i className={service.icon}></i>
                    </div>
                    <div className="service-content">
                      <h4>{service.title}</h4>
                      <p>{service.description}</p>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      {/* <section  className="call-action " id="sec2">
        <Container>
          <Row className="justify-content-center ">
            <Col xl={7} lg={8} md={9}>
              <div className="inner-content">
                <h2>
                  We love to make perfect <br />
                  solutions for your business
                </h2>
                <p>
                  Why I say old chap that is, spiffing off his nut cor blimey guvnords geeza bloke knees up bobby.
                </p>
                <div className="light-rounded-buttons">
                  <Button className="primary-btn-outline"  onClick={() => navigate('/login')}>Get Started</Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section> */}

      {/* Footer Section */}
      <footer className="footer-area footer-eleven" id="sec2">
        <div className="footer-top">
          <Container>
            <Row>
              <Col lg={4} md={6} col={12}>
                <div className="footer-widget f-about">
                  <div className="logo">
                    <a href="index.html">
                      <img  id="las"src="assets/images/logo.svg" alt="Logo" />
                    </a>
                  </div>
                  <p>Making the world a better place through constructing elegant hierarchies.</p>
                  <p className="copyright-text">
                    <span>© 2024 Ayro UI.</span> Designed and Developed by
                    <a href="javascript:void(0)">Ayro UI</a>
                  </p>
                </div>
              </Col>
              <Col lg={2} md={6} col={12}>
                <div className="footer-widget f-link">
                  <h5>Solutions</h5>
                  <ul>
                    <li><a href="javascript:void(0)">Marketing</a></li>
                    <li><a href="javascript:void(0)">Analytics</a></li>
                    <li><a href="javascript:void(0)">Commerce</a></li>
                    <li><a href="javascript:void(0)">Insights</a></li>
                  </ul>
                </div>
              </Col>
              <Col lg={2} md={6} col={12}>
                <div className="footer-widget f-link">
                  <h5>Support</h5>
                  <ul>
                    <li><a href="javascript:void(0)">Pricing</a></li>
                    <li><a href="javascript:void(0)">Documentation</a></li>
                    <li><a href="javascript:void(0)">Guides</a></li>
                    <li><a href="javascript:void(0)">API Status</a></li>
                  </ul>
                </div>
              </Col>
              <Col lg={4} md={6} col={12}>
                {/* Other footer content */}
              </Col>
            </Row>
          </Container>
        </div>
      </footer>

      <a href="#" className="scroll-top btn-hover">
        <i className="lni lni-chevron-up"></i>
      </a>

      {/* JS scripts */}
      <script src="assets/js/bootstrap.bundle.min.js"></script>
      <script src="assets/js/glightbox.min.js"></script>
      <script src="assets/js/main.js"></script>
      <script src="assets/js/tiny-slider.js"></script>
    </>
  );
};

export default Lands;
