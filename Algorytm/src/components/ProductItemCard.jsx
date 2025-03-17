import React from "react";
import { Card, Form } from "react-bootstrap";

const ProductItemCard = ({ nazwa, czasRealizacji, wielkoscPartii, poziom, liczbaNaStanie, ilosc, onChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  return (
    <Card className="p-3">
      <Form>
        <Card.Body>
          <Form.Group>
            {ilosc !== 1 && <h2 className="mt-2">{nazwa} ({ilosc})</h2>}
            {ilosc == 1 && <h2 className="mt-2">{nazwa} </h2>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Czas realizacji</Form.Label>
            <Form.Control type="number" name="czasRealizacji" value={czasRealizacji} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Wielkość partii</Form.Label>
            <Form.Control type="number" name="wielkoscPartii" value={wielkoscPartii} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Poziom</Form.Label>
            <Form.Control type="number" name="poziom" value={poziom} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Liczba na stanie</Form.Label>
            <Form.Control type="number" name="liczbaNaStanie" value={liczbaNaStanie} onChange={handleInputChange} />
          </Form.Group>
        </Card.Body>
      </Form>
    </Card>
  );
};

export default ProductItemCard;
