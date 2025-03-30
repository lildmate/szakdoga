import { Col, Row, Container, Button, Form, Card } from "react-bootstrap";
import { useState } from "react";

export default function Contact(){
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:3000/sendMail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            alert(result.message);
        }
        catch(error){
            console.error("Hiba az e-mail küldésekor ", err);
            alert("Az e-mail küldése sikertelen")
        }
}

    return(
        
        <div className="text-center">
            <h1>Kapcsolat</h1><hr />
            <h3>Vedd fel velünk a kapcsolatot!</h3>
            <p className="mb-5">Ha bármilyen kérdése van, vagy segítségre lenne szüksége, ügyfélszolgálatunk a nap 24 órájában a elérhető.</p>
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="text-start" style={{ width: '100%' }}>Felhasználónév</Form.Label>
                            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label className="text-start" style={{ width: '100%' }}>E-Mail cím</Form.Label>
                            <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} placeholder="nev@pelda.com" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="text-start" style={{ width: '100%' }}>Üzenet</Form.Label>
                            <Form.Control as="textarea" name="message" rows={3} value={formData.message} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="outline-dark" type="submit">Küldés</Button>
                        </Form>
                    </Col>
                    <Col xs={12} md={6}>
                    <div className="d-flex align-items-center mt-3 mb-3">
                        <i className="material-icons">email</i>
                        <p className="mb-0 ms-2">race001kolcsonzo@gmail.com</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <i className="material-icons">&#xe0c8;</i>
                        <p className="mb-0 ms-2">Székesfehérvár Gáz utca 1/D</p>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                        <i className="material-icons">&#xe0b0;</i>
                        <p className="mb-0 ms-2">+36702305803</p>
                    </div>
                    <hr />
                    {/* <LoadScript googleMapsApiKey="AIzaSyCwixAPeMA8yUyrnF2OjjyOEwYkFGTEzCI">
                    <GoogleMap
                        mapContainerStyle={mapContainerStyle}
                        center={center}
                        zoom={12}
                    >
                        <Marker position={center} />
                    </GoogleMap>
                    </LoadScript> */}
                    </Col>  
                </Row>
            </Container>
        </div>
    );
}