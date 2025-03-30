import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Masonry from 'react-masonry-css';
import "../styles/Cars.css";

function Cars({ onFavoriteChange }) {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState("");
    const [favorites, setFavorites] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch("http://localhost:3000/getAllCars");
            const data = await response.json();
            if (response.ok) {
                setCars(data);
                setError("");

                const savedFavorites = JSON.parse(localStorage.getItem('carFavorites') || "{}");
                
                const initialFavorites = data.reduce((acc, car) => {
                    acc[car.id] = savedFavorites[car.id] || false;
                    return acc;
                }, {});
                
                setFavorites(initialFavorites);
            } else {
                setError("Hiba az autók adatai lekérése közben.");
            }
        } catch (err) {
            setError("Hiba az autók adatai lekérése közben.");
        }
    };

    const handleFavoriteClick = (carId) => {
        const clickedCar = cars.find(car => car.id === carId);
        const isCurrentlyFavorite = favorites[carId]?.value;
        
        const newFavorites = {
          ...favorites,
          [carId]: {
            value: !isCurrentlyFavorite,
            brand: clickedCar.brand,
            name: clickedCar.name,
            image_url: clickedCar.image_url,
          }
        };
        
        setFavorites(newFavorites);
        localStorage.setItem('carFavorites', JSON.stringify(newFavorites));
        
        if (onFavoriteChange) {
          onFavoriteChange();
        }
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

    const breakpointColumnsObj = {
        default: 3,
        1100: 2,
        700: 1
    };

    return (
        <div>
            {error && <p className="text-danger text-center">{error}</p>}
            <h2 style={{ textAlign: 'center' }} className='mb-5 mt-2'>Fedezd fel a legújabb luxus modelleket!</h2>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="masonry-grid"
                columnClassName="masonry-grid_column"
            >
                {cars.length > 0 ? (
                    cars.map((car) => (
                        <div key={car.id}>
                            <Card className="shadow">
                                <Card.Body style={{ backgroundColor: '#EDEDED' }}>
                                    {car.image_url && (
                                        <Card.Img variant="top" src={car.image_url} alt={car.name} />
                                    )}
                                    <Card.Title className='mt-2'>{car.brand}</Card.Title><hr />
                                    <div className='mt-3 card-text'>
                                        {car.name}<br />
                                        {car.year}<br />
                                        {car.engine}<br />
                                        {car.price}
                                        <div className='d-flex justify-content-end'>
                                        <Button variant='none' style={{ border: 'none' }}>
                                            <i 
                                                style={{ cursor: 'pointer' }}
                                                className={`material-icons ${favorites[car.id]?.value ? 'text-dark' : ''}`}
                                                onClick={() => handleFavoriteClick(car.id)}
                                            >
                                                {favorites[car.id]?.value ? 'favorite' : 'favorite_border'}
                                            </i>
                                        </Button>
                                            <Button variant='outline-dark' onClick={() => handleRentClick(car)}>
                                                Kölcsönzés
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </div>
                    ))
                ) : !error ? (
                    <p className="text-center">A pillanatban nincsenek autóink.</p>
                ) : null}
            </Masonry>
        </div>
    );
}

export default Cars;
