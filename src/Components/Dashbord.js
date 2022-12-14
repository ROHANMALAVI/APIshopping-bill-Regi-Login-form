import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Dashbord() {
    let navigate = useNavigate();
    let [name, setName] = useState("");

    useEffect(() => {
        if (localStorage.getItem("name") === null)
            navigate("/");

        setName(localStorage.getItem("name"));
    }, []);

    function logout(e) {
        e.preventDefault();
        localStorage.removeItem("name");
        navigate("/");
    }

    return (
        <div>
            <h1>welcome {name}</h1>
            <button onClick={(e) => { logout(e); }}>Logout</button>
        </div>
    )
}
