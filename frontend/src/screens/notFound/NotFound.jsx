
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export const NotFound = () => {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center">
      <Row className="w-100 justify-content-center">
        <Col xs={11} sm={9} md={7} lg={5}>
          <Card className="border-0 shadow-sm text-center p-4">
            <Card.Body>
              <h1 className="display-1 fw-bold text-primary">
                404
              </h1>

              <Card.Title className="fs-2 fw-semibold mb-3">
                Page Not Found
              </Card.Title>

              <Card.Text className="text-muted mb-4">
                Sorry! The page you are looking for
                doesn't exist or may have been moved.
              </Card.Text>

              <Button
                as={Link}
                to="/"
                variant="primary"
                className="px-4"
              >
                Back to Dashboard
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
