import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Alert, Table, Button, Modal, Form } from 'react-bootstrap';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [users, setUsers] = useState([]);
    const [cars, setCars] = useState([]);
    const [orders, setOrders] = useState([]);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [showDeleteCarModal, setShowDeleteCarModal] = useState(false);
    const [showDeleteOrderModal, setShowDeleteOrderModal] = useState(false);
    const [showEditCarModal, setShowEditCarModal] = useState(false);
    const [showAddCarModal, setShowAddCarModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentCar, setCurrentCar] = useState({
        id: '',
        brand: '',
        name: '',
        year: '',
        engine: '',
        price: '',
        image_url: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        fetch("http://localhost:3000/user", {
            headers: { 
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.username) {
                    if (!data.isAdmin) {
                        navigate('/');
                    }
                    setUser(data);
                    fetchUsers();
                    fetchCars();
                    fetchOrders();
                } else {
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.error("Sikertelen hitelesítés:", error);
                navigate('/login');
            });
    }, [navigate]);

    const fetchUsers = () => {
        fetch("http://localhost:3000/admin/allUsers", {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    setUsers([]);
                }
            })
            .catch(error => {
                console.error("Hiba a felhasználók lekérésekor:", error);
                setUsers([]);
            });
    };

    const fetchCars = () => {
        fetch("http://localhost:3000/getAllCars", {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setCars(data);
                } else {
                    setCars([]);
                }
            })
            .catch(error => {
                console.error("Hiba az autók lekérésekor:", error);
                setCars([]);
            });
    };

    const fetchOrders = () => {
        fetch("http://localhost:3000/admin/allOrders", {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setOrders(data);
                } else {
                    setOrders([]);
                }
            })
            .catch(error => {
                console.error("Hiba a rendelések lekérésekor:", error);
                setOrders([]);
            });
    };

    const handleDeleteUser = (userId) => {
        setSelectedItem(userId);
        setShowDeleteUserModal(true);
    };

    const handleDeleteCar = (carId) => {
        setSelectedItem(carId);
        setShowDeleteCarModal(true);
    };

    const handleDeleteOrder = (orderId) => {
        setSelectedItem(orderId);
        setShowDeleteOrderModal(true);
    };

    const handleEditCar = (car) => {
        setCurrentCar(car);
        setShowEditCarModal(true);
    };

    const handleAddCar = () => {
        setCurrentCar({
            id: '',
            brand: '',
            name: '',
            year: '',
            engine: '',
            price: '',
            image_url: ''
        });
        setShowAddCarModal(true);
    };

    const handleToggleAdmin = async (userId, currentAdminStatus) => {
        try {
            const response = await fetch(`http://localhost:3000/admin/updateAdminStatus/${userId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ isAdmin: !currentAdminStatus })
            });

            if (response.ok) {
                fetchUsers();
                if (user.id === userId) {
                    const data = await response.json();
                    if (data.token) {
                        localStorage.setItem('token', data.token);
                        const userResponse = await fetch("http://localhost:3000/user", {
                            headers: { Authorization: `Bearer ${data.token}` },
                        });
                        const userData = await userResponse.json();
                        setUser(userData);
                    }
                }
            } else {
                throw new Error('Sikertelen frissítés');
            }
        } catch (error) {
            console.error("Hiba az admin státusz módosításakor:", error);
            setError("Hiba történt az admin státusz módosítása közben");
        }
    };

    const confirmDeleteUser = () => {
        fetch(`http://localhost:3000/admin/deleteUser/${selectedItem}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    fetchUsers();
                    setShowDeleteUserModal(false);
                } else {
                    throw new Error('Sikertelen törlés');
                }
            })
            .catch(error => {
                console.error("Hiba a felhasználó törlésekor:", error);
                setError("Hiba történt a felhasználó törlése közben");
            });
    };

    const confirmDeleteCar = () => {
        fetch(`http://localhost:3000/admin/deleteCar/${selectedItem}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    fetchCars();
                    setShowDeleteCarModal(false);
                } else {
                    throw new Error('Sikertelen törlés');
                }
            })
            .catch(error => {
                console.error("Hiba az autó törlésekor:", error);
                setError("Hiba történt az autó törlése közben");
            });
    };

    const confirmDeleteOrder = () => {
        fetch(`http://localhost:3000/admin/deleteOrder/${selectedItem}`, {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    fetchOrders();
                    setShowDeleteOrderModal(false);
                } else {
                    throw new Error('Sikertelen törlés');
                }
            })
            .catch(error => {
                console.error("Hiba a rendelés törlésekor:", error);
                setError("Hiba történt a rendelés törlése közben");
            });
    };

    const confirmEditCar = () => {
        fetch(`http://localhost:3000/admin/updateCar/${currentCar.id}`, {
            method: 'PUT',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentCar)
        })
            .then(response => {
                if (response.ok) {
                    fetchCars();
                    setShowEditCarModal(false);
                } else {
                    throw new Error('Sikertelen frissítés');
                }
            })
            .catch(error => {
                console.error("Hiba az autó frissítésekor:", error);
                setError("Hiba történt az autó frissítése közben");
            });
    };

    const confirmAddCar = () => {
        fetch(`http://localhost:3000/admin/addCar`, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(currentCar)
        })
            .then(response => {
                if (response.ok) {
                    fetchCars();
                    setShowAddCarModal(false);
                } else {
                    throw new Error('Sikertelen hozzáadás');
                }
            })
            .catch(error => {
                console.error("Hiba az autó hozzáadásakor:", error);
                setError("Hiba történt az autó hozzáadása közben");
            });
    };

    if (!user) {
        return <Container className="mt-3"><Alert variant="info">Betöltés...</Alert></Container>;
    }

    return (
        <Container className="mt-3">
            <h1 className="text-center">Admin Felület</h1>
            
            {error && <Alert variant="danger">{error}</Alert>}

            <div className='row'><div className='col p-4'>
            <h2 className="mt-4">Felhasználók</h2>
            <Table striped bordered hover rounded>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Felhasználónév</th>
                        <th>Név</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.firstname} {user.lastname}</td>
                            <td>{user.email}</td>
                            <td>
                                <Form.Check 
                                    type="switch"
                                    id={`admin-switch-${user.id}`}
                                    checked={user.isAdmin || false}
                                    onChange={() => handleToggleAdmin(user.id, user.isAdmin)}
                                />
                            </td>
                            <td>
                                <Button variant="dark" size="sm" onClick={() => handleDeleteUser(user.id)}>
                                    Törlés
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            <div className='col p-4'>
            <h2 className="mt-4">Rendelések</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Név</th>
                        <th>Email</th>
                        <th>Autó ID</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.fullname}</td>
                            <td>{order.email}</td>
                            <td>{order.carId}</td>
                            <td>
                                <Button variant="dark" size="sm" onClick={() => handleDeleteOrder(order.id)}>
                                    Törlés
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div></div>

            <h2 className="mt-4">Autók</h2>
            <div className='d-flex justify-content-center'><Button variant="outline-dark" className="mb-3" onClick={handleAddCar}>
                Új autó hozzáadása
            </Button></div>
            <Table id='adminCarsTable' striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Márka</th>
                        <th>Modell</th>
                        <th>Évjárat</th>
                        <th>Motor</th>
                        <th>Ár</th>
                        <th>Műveletek</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map(car => (
                        <tr key={car.id}>
                            <td>{car.id}</td>
                            <td>{car.brand}</td>
                            <td>{car.name}</td>
                            <td>{car.year}</td>
                            <td>{car.engine}</td>
                            <td>{car.price}</td>
                            <td>
                                <Button variant="outline-dark" size="sm" className="me-2" onClick={() => handleEditCar(car)}>
                                    Szerkesztés
                                </Button>
                                <Button variant="dark" size="sm" onClick={() => handleDeleteCar(car.id)}>
                                    Törlés
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            

            {/* Felhasználó törlés megerősítő modal */}
            <Modal show={showDeleteUserModal} onHide={() => setShowDeleteUserModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Felhasználó törlése</Modal.Title>
                </Modal.Header>
                <Modal.Body>Biztosan törölni szeretnéd ezt a felhasználót?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={() => setShowDeleteUserModal(false)}>
                        Mégse
                    </Button>
                    <Button variant="dark" onClick={confirmDeleteUser}>
                        Törlés
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Autó törlés megerősítő modal */}
            <Modal show={showDeleteCarModal} onHide={() => setShowDeleteCarModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Autó törlése</Modal.Title>
                </Modal.Header>
                <Modal.Body>Biztosan törölni szeretnéd ezt az autót?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={() => setShowDeleteCarModal(false)}>
                        Mégse
                    </Button>
                    <Button variant="dark" onClick={confirmDeleteCar}>
                        Törlés
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Rendelés törlés megerősítő modal */}
            <Modal show={showDeleteOrderModal} onHide={() => setShowDeleteOrderModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Rendelés törlése</Modal.Title>
                </Modal.Header>
                <Modal.Body>Biztosan törölni szeretnéd ezt a rendelést?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={() => setShowDeleteOrderModal(false)}>
                        Mégse
                    </Button>
                    <Button variant="dark" onClick={confirmDeleteOrder}>
                        Törlés
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Autó szerkesztése modal */}
            <Modal show={showEditCarModal} onHide={() => setShowEditCarModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Autó szerkesztése</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Márka</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="brand"
                                value={currentCar.brand}
                                onChange={(e) => setCurrentCar({ ...currentCar, brand: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Modell</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name"
                                value={currentCar.name}
                                onChange={(e) => setCurrentCar({ ...currentCar, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Évjárat</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="year"
                                value={currentCar.year}
                                onChange={(e) => setCurrentCar({ ...currentCar, year: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Motor</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="engine"
                                value={currentCar.engine}
                                onChange={(e) => setCurrentCar({ ...currentCar, engine: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ár</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="price"
                                value={currentCar.price}
                                onChange={(e) => setCurrentCar({ ...currentCar, price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kép URL</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="image_url"
                                value={currentCar.image_url}
                                onChange={(e) => setCurrentCar({ ...currentCar, image_url: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={() => setShowEditCarModal(false)}>
                        Mégse
                    </Button>
                    <Button variant="dark" onClick={confirmEditCar}>
                        Mentés
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Új autó hozzáadása modal */}
            <Modal show={showAddCarModal} onHide={() => setShowAddCarModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Új autó hozzáadása</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Márka</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="brand"
                                value={currentCar.brand}
                                onChange={(e) => setCurrentCar({ ...currentCar, brand: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Modell</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="name"
                                value={currentCar.name}
                                onChange={(e) => setCurrentCar({ ...currentCar, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Évjárat</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="year"
                                value={currentCar.year}
                                onChange={(e) => setCurrentCar({ ...currentCar, year: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Motor</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="engine"
                                value={currentCar.engine}
                                onChange={(e) => setCurrentCar({ ...currentCar, engine: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Ár</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="price"
                                value={currentCar.price}
                                onChange={(e) => setCurrentCar({ ...currentCar, price: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Kép URL</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="image_url"
                                value={currentCar.image_url}
                                onChange={(e) => setCurrentCar({ ...currentCar, image_url: e.target.value })}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={() => setShowAddCarModal(false)}>
                        Mégse
                    </Button>
                    <Button variant="dark" onClick={confirmAddCar}>
                        Hozzáadás
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminPanel;