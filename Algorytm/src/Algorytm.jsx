import React, { useState, useEffect } from "react";
import { Table, Form, Container, Alert,Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";


const initialDataGhp = [
    { label: "Przewidywany Popyt", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { label: "Produkcja", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { label: "Dostępne", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
];
const initialDataMrp = [
    { label: "Całkowite Zapotrzebowanie", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { label: "Planowane Przyjęcia", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { label: "Przewidywane na stanie", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { label: "Zapotrzebowanie netto", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { label: "Planowane zamówienia", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { label: "Planowane przyjęcie zamówień", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
];

const Algorytm = () => {
    const [ghpData, setGhpData] = useState(initialDataGhp);
    const [mrpData, setMrpData] = useState(initialDataMrp);
    const [products, setProducts] = useState({});

    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.products) {
            setProducts({ ...location.state.products });


            const updatedData = [...ghpData];
            const liczbaNaStanie = location.state.products["Krzesło"].liczbaNaStanie;
            updatedData[2].values = updatedData[2].values.map(() => liczbaNaStanie);
            setGhpData(updatedData);
        }
    }, [location.state]);


    const handleGhpChange = (rowIndex, colIndex, value) => {

        const oldData = JSON.parse(JSON.stringify(ghpData));
        const updatedData = JSON.parse(JSON.stringify(ghpData));
        updatedData[rowIndex].values[colIndex] = Number(value);
        recalculateRows(oldData, updatedData, colIndex, value)
    };

    const recalculateRows = (oldData, updatedData, colIndex, value) => {

        const wielkoscPartii = location.state.products["Krzesło"].liczbaNaStanie;
        const popytChange = oldData[0].values[colIndex] - value

        for (let i = colIndex; i < updatedData[2].values.length; i++) {
            updatedData[2].values[i] += popytChange;
        }

        for (let i = 0; i < updatedData[2].values.length; i++) {
            while (updatedData[2].values[i] < 0) {
		if (updatedData[1].values[i] == 0){
	                updatedData[1].values[i] += wielkoscPartii;

                	for (let j = i; j < updatedData[2].values.length; j++) {
                    	updatedData[2].values[j] += wielkoscPartii;
                	}
		}
		else {break}
            }
            while (updatedData[2].values[i] >= wielkoscPartii && updatedData[1].values[i] !== 0) {
                updatedData[1].values[i] -= wielkoscPartii;
                for (let j = i; j < updatedData[2].values.length; j++) {
                    updatedData[2].values[j] -= wielkoscPartii;
                }
            }
        }

        setGhpData(updatedData);
    }

    const handleMrpChange = (rowIndex, colIndex, value) => {

    }


    return (
        <Container>
            <Alert variant="primary" className="text-center mt-5">
                <h1>ALGORYTMY</h1>
            </Alert>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tydzień:</th>
                        {Array.from({ length: 10 }, (_, i) => (
                            <th key={i}>{i + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {ghpData.map((row, rowIndex) => (
                        <tr key={row.label}>
                            <td>{row.label}</td>
                            {row.values.map((value, colIndex) => (
                                <td key={colIndex}>
                                    {rowIndex === 0 ? (
                                        <Form.Control
                                            type="number"
                                            value={value}
                                            onChange={(e) =>
                                                handleGhpChange(rowIndex, colIndex, e.target.value)
                                            }
                                        />
                                    ) : (
                                        value
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h2>Czas Realizacji = {products["Krzesło"]?.czasRealizacji} </h2>
            <h2>Na Stanie = {products["Krzesło"]?.liczbaNaStanie} </h2>

            
            <h1 className="pt-5">Krzesło</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Tydzień:</th>
                        {Array.from({ length: 10 }, (_, i) => (
                            <th key={i}>{i + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {mrpData.map((row, rowIndex) => (
                        <tr key={row.label}>
                            <td>{row.label}</td>
                            {row.values.map((value, colIndex) => (
                                <td key={colIndex}>
                                    {rowIndex === 1 ? (
                                        <Form.Control
                                            type="number"
                                            value={value}
                                            onChange={(e) =>
                                                handleMrpChange(rowIndex, colIndex, e.target.value)
                                            }
                                        />
                                    ) : (
                                        value
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
            
        </Container>
    );
};

export default Algorytm;
