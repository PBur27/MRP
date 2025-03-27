import React, { useState, useEffect } from "react";
import { Table, Form, Container, Alert,Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";


const initialData = [
    { label: "Przewidywany Popyt", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { label: "Produkcja", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { label: "Dostępne", values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
];

const Ghp = () => {
    const [data, setData] = useState(initialData);
    const [products, setProducts] = useState({});

    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.products) {
            setProducts({ ...location.state.products });


            const updatedData = [...data];
            const liczbaNaStanie = location.state.products["Krzesło"].liczbaNaStanie;
            updatedData[2].values = updatedData[2].values.map(() => liczbaNaStanie);
            setData(updatedData);
        }
    }, [location.state]);


    const handleInputChange = (rowIndex, colIndex, value) => {

        const oldData = JSON.parse(JSON.stringify(data));
        const updatedData = JSON.parse(JSON.stringify(data));
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
                updatedData[1].values[i] += wielkoscPartii;
                for (let j = i; j < updatedData[2].values.length; j++) {
                    updatedData[2].values[j] += wielkoscPartii;
                }
            }
            while (updatedData[2].values[i] >= wielkoscPartii && updatedData[1].values[i] !== 0) {
                updatedData[1].values[i] -= wielkoscPartii;
                for (let j = i; j < updatedData[2].values.length; j++) {
                    updatedData[2].values[j] -= wielkoscPartii;
                }
            }
        }

        setData(updatedData);
    }


    return (
        <Container>
            <Alert variant="primary" className="text-center mt-5">
                <h1>ALGORYTM GHP</h1>
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
                    {data.map((row, rowIndex) => (
                        <tr key={row.label}>
                            <td>{row.label}</td>
                            {row.values.map((value, colIndex) => (
                                <td key={colIndex}>
                                    {rowIndex === 0 ? (
                                        <Form.Control
                                            type="number"
                                            value={value}
                                            onChange={(e) =>
                                                handleInputChange(rowIndex, colIndex, e.target.value)
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

            <Link to="/mrp" state={[data,products]}>
                <Button>Przejdź do MRP</Button>
            </Link>
            
        </Container>
    );
};

export default Ghp;
