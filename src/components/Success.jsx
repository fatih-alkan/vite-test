import React from 'react';
import { Container, Row, Col, Alert, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';

export default function Success() {
  const history = useHistory();

  const handleBack = () => {
    history.push('/');
  };

  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <Row className="mb-4">
        <Col>
          <Alert color="success" data-testid="success-message" className="text-center" style={{ fontSize: '1.5rem' }}>
            Login Successful
          </Alert>
        </Col>
      </Row>

      <Row>
        <Col className="text-center">
          <Button color="dark" onClick={handleBack}>
            Geri Dön
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
