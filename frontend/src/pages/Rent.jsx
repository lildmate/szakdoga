import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Button, Container, Row, Col, Form, Alert } from 'react-bootstrap';

export default function Rent() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhonenumber] = useState('');
    const [address, setAddress] = useState('');
    const [comment, setComment] = useState('');
    const [carId, setCarId] = useState('');
    const [error, setError] = useState('');
    const [userData, setUserData] = useState(null);

    const navigate = useNavigate();

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Nincs bejelentkezve felhasználó.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserData(data);
                setFullname(`${data.firstname} ${data.lastname}`);
                setEmail(data.email || '');
            } else {
                setError('Hiba a felhasználói adatok lekérésénél.');
            }
        } catch (err) {
            setError('Hiba a felhasználói adatok lekérésénél.');
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullname || !email || !phonenumber || !address) {
            setError("A megjegyzésen kívül minden mezőt ki kell tölteni!");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/placeOrder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullname,
                    email,
                    phonenumber,
                    address,
                    comment,
                    carId
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setFullname('');
                setEmail('');
                setPhonenumber('');
                setAddress('');
                setComment('');
                setCarId('');
                navigate('/PostRent');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Hiba a rendelés leadásakor.');
        }
    };

    const location = useLocation();
    const { car } = location.state || {};

    useEffect(() => {
        if (car) {
            setCarId(car.id);
        }
    }, [car]);

    if (!car) {
        return <p>Autó adat nem található.</p>;
    }

    return (
        <div className="container-fluid mt-5">
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <h2 className="text-center mb-4">Autó Részletei</h2>
                        <Card className="shadowt" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <Card.Body>
                                {car.image_url && (
                                    <Card.Img variant="top" src={car.image_url} alt={car.name} />
                                )}
                                <Card.Title className='mt-2'>{car.brand} {car.name}</Card.Title>
                                <Card.Text>
                                    Évjárat: {car.year}<br />
                                    Motor: {car.engine}<br />
                                    Ár: {car.price}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} md={6}>
                        <h2 className='text-center mb-4'>Szállítási adatok</h2>
                        <Card className='' style={{maxWidth: '500px', margin: '0 auto'}}>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="text-start" style={{ width: '100%' }}>Vezetéknév és keresztnév</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={fullname} 
                                            onChange={(e) => setFullname(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="text-start" style={{ width: '100%' }}>E-mail cím</Form.Label>
                                        <Form.Control 
                                            type="email" 
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="text-start" style={{ width: '100%' }}>Telefonszám</Form.Label>
                                        <Form.Control 
                                            type="number" 
                                            value={phonenumber} 
                                            onChange={(e) => setPhonenumber(e.target.value)} 
                                        />
                                    </Form.Group>
                                    
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label className="text-start" style={{ width: '100%' }}>Szállítási cím</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            value={address} 
                                            onChange={(e) => setAddress(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label className="text-start" style={{ width: '100%' }}>Megjegyzés</Form.Label>
                                        <Form.Control 
                                            as="textarea" 
                                            rows={3} 
                                            value={comment} 
                                            onChange={(e) => setComment(e.target.value)} 
                                        />
                                    </Form.Group>

                                    <Button variant="outline-dark" className="d-flex mx-auto mb-4" type="submit">Küldés</Button>
                                </Form>
                                {error && <Alert variant='danger' className="text-center fw-bold">{error}</Alert>}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
