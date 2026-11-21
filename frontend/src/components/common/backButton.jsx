import { Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
    const navigate = useNavigate();

    return (
        <Button
            variant="light"
            onClick={() => navigate(-1)}
            className="mb-3 d-flex align-items-center justify-content-center"
            style={{
                width: "40px",
                height: "40px",
                padding: 0,
                borderRadius: "8px",
                border: "1px solid #dee2e6",
            }}
            aria-label="Go back"
        >
            <FaArrowLeft size={16} />
        </Button>
    );
};