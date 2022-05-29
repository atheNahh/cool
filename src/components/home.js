import React from 'react';
import "./main.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";


function Home(){
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/categories/`, {
            method: "GET",
            credentials: 'same-origin', // It can be include, same-origin, omit
            headers: {
                'Content-Type': 'application/json', // Your headers
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                    `This is an HTTP error: The status is ${response.status}`
                    );
                }
                return response.json();
            })
            .then((actualData) => {
            setData(actualData);
            setError(null);
            })
            .catch((err) => {
            setError(err.message);
            setData(null);
            })
            .finally(() => {
            setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Categories</h1>
                {loading && <div>A moment please...</div>}
                {error && (
                    <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
                <ul style={{ listStyleType: "none" }}>
                    {data &&
                    data.map(({ id, category }) => (
                        <li key={id}>
                         <Link to="play/" state={{ catId: id, catName: category}} >
                            { category }
                        </Link>
                        </li>
                    ))}
                </ul>
        </div>
    );
}

export default Home;