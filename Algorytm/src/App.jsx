import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProductItemCard from "./components/ProductItemCard";

export default function Home() {
  const [products, setProducts] = useState({
    "Krzesło": { nazwa: "Krzesło", czasRealizacji: 1, wielkoscPartii: 20, poziom: 0, liczbaNaStanie: 20, ilosc:1},
    "Noga": { nazwa: "Noga", czasRealizacji: 1, wielkoscPartii: 60, poziom: 2, liczbaNaStanie: 40, ilosc:4 },
    "Oparcie": { nazwa: "Oparcie", czasRealizacji: 3, wielkoscPartii: 20, poziom: 1, liczbaNaStanie: 20, ilosc:1 },
    "Siedzisko": { nazwa: "Siedzisko", czasRealizacji: 2, wielkoscPartii: 30, poziom: 1, liczbaNaStanie: 10, ilosc:1 }
  });

  const handleProductChange = (name, key, value) => {
    setProducts((prevProducts) => ({
      ...prevProducts,
      [name]: {
        ...prevProducts[name],
        [key]: value
      }
    }));
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={6}>
          <ProductItemCard
            {...products["Krzesło"]}
            onChange={(name, value) => handleProductChange("Krzesło", name, value)}
          />
        </Col>
      </Row>
      <Row>
      <Col md={6}>
          <ProductItemCard
            {...products["Oparcie"]}
            onChange={(name, value) => handleProductChange("Oparcie", name, value)}
          />
        </Col>
        <Col md={6}>
          <ProductItemCard
            {...products["Siedzisko"]}
            onChange={(name, value) => handleProductChange("Siedzisko", name, value)}
          />
        </Col>
      </Row>
      <Row className="justify-content-start">
      <Col md={6}>
          <ProductItemCard
            {...products["Noga"]}
            onChange={(name, value) => handleProductChange("Noga", name, value)}
          />
        </Col>
      </Row>
      <Row>
        <Button onClick={() => {console.log(products)}}>Zapisz Dane</Button>
      </Row>
    </Container>
  );
}
