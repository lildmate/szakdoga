import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

export default function PostRent(){
    const navigate = useNavigate();

    return(
        <Alert className="container mt-5 text-center" variant="success">
            Rendelése feldolgozás alatt áll.<br />
            <Alert.Link onClick={() => navigate('/')}>Vissza a főoldalra.</Alert.Link>
        </Alert>
    );
}