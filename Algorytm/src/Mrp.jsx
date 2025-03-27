import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Mrp = () => {
    const [ghpData, setGhpData] = useState();
    const [products, setProducts] = useState();
    const location = useLocation();

    useEffect(() => {
        if (location.state) {
            setGhpData(location.state[0]);
            setProducts(location.state[1]);
        }
    }, [location.state]);

    return (
        <Container>
            <h1>Dane</h1>
            <pre>
                {JSON.stringify({products})}
            </pre>
            <pre>
                {JSON.stringify({ghpData})}
            </pre>
        </Container>

    );
};

export default Mrp;
