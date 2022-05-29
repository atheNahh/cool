import React from 'react';
import { useState, useEffect } from "react";
import "./main.css";
import { Link, useLocation } from "react-router-dom";
import Game from "./game"


function Getword() {
    const location = useLocation();
    const data = location.state;
    const [rwordObj, setrwordObj] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/words/?category=${data.catId}`, {
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
                console.log(actualData);
                setrwordObj(randomword(actualData));
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                setrwordObj(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const randomword = (words) => {
        var length = words.length;
        var randind = Math.floor(Math.random()*length);
        console.log(randind);
        var rword = words[randind];
        return rword;
    };

    return (
        <div>
            <div>
                {loading && <div>A moment please...</div>}
                {error && (
                    <div>{`There is a problem fetching the post data - ${error}`}</div>
                )}
            </div>
            <div>
                { (rwordObj != null) ? <Game randword={rwordObj} cat={data.catName}/> : <div>No word generated</div>}
            </div>
        </div>
    );
}

export default Getword;