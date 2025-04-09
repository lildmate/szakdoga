import { Link, useNavigate } from 'react-router-dom';
import { Dropdown, Button, Nav, Navbar, Container } from 'react-bootstrap';
import { useState, useEffect } from "react";
import "../../styles/Navbar.css"

function NavbarComp({ user, onLogout, favoritesUpdated }) {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchOrders();
      loadFavorites();
    }
  }, [user, favoritesUpdated]);

  const loadFavorites = () => {
    const savedFavorites = JSON.parse(localStorage.getItem('carFavorites')) || {};
    const favoritesArray = Object.keys(savedFavorites)
      .filter(carId => savedFavorites[carId]?.value)
      .map(carId => ({
        id: carId,
        brand: savedFavorites[carId].brand,
        name: savedFavorites[carId].name,
        image_url: savedFavorites[carId].image_url
      }));
    setFavorites(favoritesArray);
  };

  const fetchOrders = async () => {
    const token = localStorage.getItem('token');
    if (!token){
      setError("Kölcsönzéshez be kell jelentkezz!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/getOrder", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        throw new Error("Nem sikerült lekérni a rendeléseket.");
      }

      
      setOrders(data);
    } catch (error) {
      console.error("Hiba a rendelés lekérésekor:", error);
    }
  };

  const deleteOrder = async (orderId) => {
    if (!orderId) return;
    
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            setError("Bejelentkezés szükséges");
            return;
        }

        const response = await fetch(`http://localhost:3000/admin/deleteOrder/${orderId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();
        
        if (response.ok) {
            alert(data.message);
            fetchOrders();
        } else {
            setError(data.error || "Hiba a törlés során");
        }
    } catch (err) {
        setError("Hiba a szerverrel való kommunikáció során");
        console.error("Hiba:", err);
    }
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate("/");
  };

  return (
    <Navbar expand="lg" className="navbar-custom" style={{ backgroundColor: "white" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">Race-001 Kölcsönző</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Főoldal</Nav.Link>
            <Nav.Link as={Link} to="/Cars">Autóink</Nav.Link>
            <Nav.Link as={Link} to="/Contact">Kapcsolat</Nav.Link>
            <Nav.Link as={Link} to="/About">Rólunk</Nav.Link>
            {user?.isAdmin && (
              <Nav.Link as={Link} to="/admin">Admin Felület</Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto">
            <div className="ms-auto">
              <Dropdown>
                <Dropdown.Toggle bsPrefix="none" variant="none">
                  <i className="material-icons">favorite</i>
                  {favorites.length > 0 && (
                    <span className="badge bg-danger" style={{ fontSize: '0.6rem', position: 'absolute', top: '5px', right: '5px' }}>
                      {favorites.length}
                    </span>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {favorites.length > 0 ? (
                    favorites.map((fav, index) => (
                      <Dropdown.Item key={index} className="d-flex align-items-center">
                        <div className='order-item'>
                          <img src={fav.image_url} alt={fav.name} className="order-image" />
                          <div className='car-details'>{fav.brand} {fav.name}</div>
                          </div>
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item>Nincsenek kedvenceid</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {user ? (
              <>
               <Dropdown>
                  <Dropdown.Toggle bsPrefix="none" variant="none">
                    <i className="material-icons">inventory</i>
                    {orders.length > 0 && (
                      <span className="badge bg-danger" style={{ fontSize: '0.6rem', position: 'absolute', top: '5px', right: '5px' }}>
                        {orders.length}
                      </span>
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {orders.length > 0 ? (
                      orders.map((order, index) => (
                        <Dropdown.Item key={index} className="d-flex align-items-center cart">
                          <div className='order-item'>
                            <img src={order.image_url} alt={order.name} className="order-image" />
                              <div className='car-details'>{order.brand} {order.name} </div>
                              <div className="order-buttons">
                                <Button variant="outline-danger" size='sm' className='item-buttons' onClick={() => deleteOrder(order.id)}>Törlés</Button>
                                <Button variant="outline-success" size='sm' className='item-buttons'>Meghosszabítás</Button>
                              </div>
                          </div>
                        </Dropdown.Item>
                      ))
                    ) : (
                      <Dropdown.Item>Nincsenek rendeléseid</Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
                <Nav.Link as={Link} to="/Profile">
                  <i className="material-icons">account_circle</i>
                </Nav.Link>
                <Button variant="outline-dark" size="sm" onClick={handleLogoutClick}>
                  Kijelentkezés
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/Login">Bejelentkezés</Nav.Link>
                <Nav.Link as={Link} to="/Register">Regisztráció</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComp;