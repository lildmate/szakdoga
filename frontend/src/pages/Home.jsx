import { React, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button, Carousel, Image, Card } from 'react-bootstrap';
import Slide1 from '../img/carousel-images/FlyingSpur.jpg';
import Slide2 from '../img/carousel-images/continentalgtspeed.png';
import Slide3 from '../img/carousel-images/maybachs680.jpg';
import Slide4 from '../img/carousel-images/Jesko.jpg';
import Slide5 from '../img/carousel-images/porschecarrera.jpg';
import '../styles/Home.css';

const Home = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() =>{
    fetch("http://localhost:3000/reviews")
    .then((response) => response.json())
    .then((data) => {
      setReviews(data);
    })
    .catch((error) => {
      console.error('Hiba a vélemények lekérésekor:', error);
    });
  }, []);

  return (
    <div className="background">
      <style>{'body { background-color: #212121; }'}</style>
      <div className="row">
        <div className="col-12 col-md-6 mx-auto mt-5 text-center" style={{ color: "white" }}>
          <h1 className="mb-3">LUXUS | ELEGANCIA | ÉLETÉRZÉS</h1>
          <p className="mb-5">4 kerék szerelmeseitől, 4 kerék szerelmeseinek</p>
        </div>
      </div>

      <div className="mt-5">
        <Container className='text-center carButtons'>
          <Row>
            <Col xs={4} sm={3} md={2}>
              <Button variant="link" className="car-brands" onClick={() => navigate('/mercedes')}>
                <Image src={require('../img/brandlogos/mercedes.png')} fluid />
              </Button>
            </Col>
            <Col xs={4} sm={3} md={2}>
              <Button variant="link" className="car-brands" onClick={() => navigate('/porsche')}>
                <Image src={require('../img/brandlogos/porsche.png')} fluid />
              </Button>
            </Col>
            <Col xs={4} sm={3} md={2}>
              <Button variant="link" className="car-brands" onClick={() => navigate('/koenigsegg')}>
                <Image src={require('../img/brandlogos/koenigsegg.png')} fluid />
              </Button>
            </Col>
            <Col xs={4} sm={3} md={2}>
              <Button variant="link" className="car-brands" onClick={() => navigate('/bentley')}>
                <Image src={require('../img/brandlogos/bentley.png')} fluid />
              </Button>
            </Col>
            <Col xs={4} sm={3} md={2}>
              <Button variant="link" className="car-brands" onClick={() => navigate('/lamborghini')}>
                <Image src={require('../img/brandlogos/lamborghini.png')} fluid />
              </Button>
            </Col>
            <Col xs={4} sm={3} md={2}>
              <Button variant="link" className="car-brands" onClick={() => navigate('/bmw')}>
                <Image src={require('../img/brandlogos/bmw.png')} fluid />
              </Button>
            </Col>
            <Col xs={4} sm={3} md={2}>
              <Button variant="link" className="car-brands" onClick={() => navigate('/pagani')}>
                <Image src={require('../img/brandlogos/pagani.png')} fluid />
              </Button>
            </Col>
            <Col xs={4} sm={3} md={2}>
              <Button variant="link" className="car-brands" onClick={() => navigate('/rollsroyce')}>
                <Image src={require('../img/brandlogos/rollsroyce.png')} fluid />
              </Button>
            </Col>
            <Col xs={4} sm={3} md={2}>
              <Button variant="link" className="car-brands" onClick={() => navigate('/ferrari')}>
                <Image src={require('../img/brandlogos/ferrari.png')} fluid />
              </Button>
            </Col>
            <Col xs={4} sm={3} md={2}>
              <Button variant="link" className="car-brands" onClick={() => navigate('/astonmartin')}>
                <Image src={require('../img/brandlogos/astonmartin.png')} fluid />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <div className="lowerSection">
        <div className='carousel-container mt-5'>
          <Carousel fade>
            <Carousel.Item>
              <img className="carousel-image d-block w-100" src={Slide1} alt="Bentley Flying Spur Mulliner" />
              <Carousel.Caption>
                <h3>Bentley Flying Spur Mulliner</h3>
                <p>Az elegancia csúcsa.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image d-block w-100" src={Slide2} alt="Bentley Continental GT Speed" />
              <Carousel.Caption>
                <h3>Bentley Continental GT Speed</h3>
                <p>A teljesítmény mesterműve.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image d-block w-100" src={Slide3} alt="Mercedes Maybach S680" />
              <Carousel.Caption>
                <h3>Mercedes Maybach S680</h3>
                <p>Exkluzív design, luxus és kényelem egy autóban.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image d-block w-100" src={Slide4} alt="Koenigsegg Jesko Absolut" />
              <Carousel.Caption>
                <h3>Koenigsegg Jesko Absolut</h3>
                <p>A sebesség új szintre emelve.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img className="carousel-image d-block w-100" src={Slide5} alt="Porsche Carrera S " />
              <Carousel.Caption>
                <h3>Porsche Carrera S</h3>
                <p>Gyorsaság, amely minden kanyarban lenyűgöz</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>

        <Container className="reviews">
            <h2 className="text-center mb-4">Felhasználói Vélemények</h2>
              <Row className="justify-content-center">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <Col xs={12} sm={6} md={4} lg={3} key={review.id} className="mb-5">
                      <Card className="h-100">
                        <Card.Body>
                          <Card.Title>{review.userName}</Card.Title>
                          <Card.Subtitle className="mb-2 rating">
                            Értékelés: {review.rating} / 5
                          </Card.Subtitle>
                          <Card.Text>{review.comment}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col xs={12} className="text-center">
                    <p className="text-white">Nincsenek elérhető vélemények.</p>
                  </Col>
                )}
              </Row>
          </Container>
      </div>
    </div>
  );
};

export default Home;
