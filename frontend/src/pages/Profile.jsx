import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, Row, Col, Card } from 'react-bootstrap';
import ProfilePic from '../img/other/profile.png';
import '..//styles/Profile.css';

const Profile = () => {
    const [user, setUser] = useState({ id: "", username: "" });
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Nincs token. Jelentkezz be újra.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data);
                setUsername("");
                setEmail("");
                setError("");
            } else {
                setError("Nem sikerült lekérni az adatokat.");
            }
        } catch (error) {
            setError("Hiba történt az adatok lekérésekor.");
        }
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");  
        if (!token) {
            setError("Nincs token. Jelentkezz be újra.");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ username, newPassword, email }),
            });

            if (response.ok) {
                setSuccess("Profil sikeresen frissítve!");
                setError("");
                setNewPassword("");
                fetchUserData();
            } else {
                const result = await response.json();
                setError(result.message || "Nem sikerült frissíteni a profilt.");
                setSuccess("");
            }
        } catch (error) {
            setError("Hiba történt a frissítés során.");
            setSuccess("");
        }
    };

    return (
      <div>
        <Container className="mt-5">
          <Row>
            <Col xs={12} md={6}>
              <h2 className="text-center mb-4">Profil szerkesztése</h2>

              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <Form onSubmit={updateProfile}>
                  <Form.Group className="mb-3" controlId="username">
                      <Form.Label>Felhasználónév</Form.Label>
                      <Form.Control
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Új felhasználónév"
                          required
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="newPassword">
                      <Form.Label>E-Mail cím</Form.Label>
                      <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Új E-Mail"
                          required
                      />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="newPassword">
                      <Form.Label>Jelszó</Form.Label>
                      <Form.Control
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Új jelszó"
                          required
                      />
                  </Form.Group>

                  <Button variant="outline-dark" type="submit">Mentés</Button>
              </Form>
            </Col>

            <Col xs={12} md={6} className="text-center">
            <h2 className="mb-5">Profil adatai:</h2>
              <Card>
                <Card.Body>
                <img src={ProfilePic} alt="profilepic" className="profpic"></img>
                  <p>
                      <strong>ID:</strong> {user.id}
                  </p>
                  <p>
                      <strong>Felhasználónév:</strong> {user.username}
                  </p>
                  <p>
                      <strong>Teljes név:</strong> {user.firstname + " " + user.lastname}
                  </p>
                  <p>
                      <strong>E-mail cím:</strong> {user.email}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
};

export default Profile;
