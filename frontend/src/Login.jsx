import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (response.ok) {
                onLogin({ username }, data.token);
                localStorage.setItem('token', data.token);
                navigate('/');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Hiba a bejelentkezés során');
            console.error("Bejelentkezés error", err);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <h2 className="text-center mb-4">Bejelentkezés</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control 
                                type="text" 
                                placeholder="Felhasználónév" 
                                value={username} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control 
                                type="password" 
                                placeholder="Jelszó" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                            />
                        </Form.Group>

                        <Button variant="secondary" type="submit" className="w-100">
                            Bejelentkezés
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default Login;
