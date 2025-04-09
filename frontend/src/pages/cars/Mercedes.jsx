import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Button} from "react-bootstrap";
import Masonry from 'react-masonry-css';
import "../../styles/SeperatedCars.css";

function Mercedes() {
    const [mercedes, setMercedes] = useState([]);
    const [error, setError] = useState("");
    const [favorites, setFavorites] = useState({});
    const navigate = useNavigate();

    const fetchMercedes = async () => {
        try {
            const response = await fetch("http://localhost:3000/Mercedes");
            const data = await response.json();
            if (response.ok) {
                setMercedes(data);
            } else {
                setError("Hiba az adatok lekérésénél");
            }
        } catch (err) {
            setError("Hiba a Mercedes-ek lekérésénél.");
        }
    };

    const handleFavoriteClick = (carId) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [carId]: !prevFavorites[carId],
        }));
    };
    
    const handleRentClick = (car) => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate('/rent', { state: { car } });
        } else {
            alert("Kölcsönzéshez be kell jelentkezned!");
            navigate('/login');
        }
    };

    useEffect(() => {
        fetchMercedes();
    }, []);

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1
    };

    return (
        <div className="mt-5">
            <h2 className="text-center mb-5">Mercedes-Benz</h2>
            {error && <p className="text-danger text-center">{error}</p>}

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
            >
                {mercedes.length > 0 ? (
                    mercedes.map((car) => (
                        <div key={car.id}>
                            <Card className="shadow mb-3 cards">
                                <Card.Body>
                                    {car.image_url && (
                                        <Card.Img variant="top" src={require(`../../img/cars/${car.image_url}`)} alt={car.name} />
                                    )}
                                    <Card.Title className='mt-2'>{car.brand}</Card.Title>
                                    <Card.Text className='mt-3'>
                                        {car.name}<br />
                                        {car.year}<br />
                                        {car.engine}<br />
                                        {car.price}
                                        <div className='d-flex justify-content-end'>
                                            <Button variant='none' style={{ border: 'none' }}>
                                                <i style={{ cursor: 'pointer' }}
                                                    className={`material-icons ${favorites[car.id] ? 'text-dark' : ''}`}
                                                    onClick={() => handleFavoriteClick(car.id)}
                                                >
                                                    {favorites[car.id] ? 'favorite' : 'favorite_border'}
                                                </i>
                                            </Button>
                                            <Button variant='outline-dark' onClick={() => handleRentClick(car)}>
                                                Kölcsönzés
                                            </Button>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : !error ? (
                    <p className="text-center">A pillanatban nincsenek Mercedes autóink.</p>
                ) : null}
            </Masonry>
        </div>
    );
}

export default Mercedes;