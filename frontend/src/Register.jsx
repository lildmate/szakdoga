import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('');
    const [lastname, setLastName] = useState('');
    const [firstname, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, lastname, firstname, email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Sikeresen regisztráltál');
                navigate("/login");
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Hiba a regisztrációnál');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <h2 className="text-center mb-4">Regisztráció</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Felhasználónév" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Vezetéknév" 
                            value={firstname} 
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="Keresztnév" 
                            value={lastname} 
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="text" 
                            placeholder="E-Mail" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control 
                            type="password" 
                            placeholder="Jelszó" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="secondary"  type="submit" className="w-100">
                        Regisztráció
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    </div>
    );
}

export default Register;
