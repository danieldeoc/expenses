import React, { useEffect, useState } from "react";
import styles from './expList.modules.css';

function ExpList(){
    const [expList, setExpList] = useState([]);

    function updateList() {
        fetch('http://localhost:5000/expenses',{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then( (resp) => resp.json() )
        .then( (data) => {
            setExpList(data);
        })
        .catch( (err) => console.log(err) )
    };

    useEffect(() => {
        updateList();
    }, []);

    return(
        <>
            <ul className="listExpenses">
                {expList.map( (option) => (
                    <li key={option.id}>
                        <span className="dateValue">{option.data}</span>
                        <span className="nameValue">{option.name}</span>
                        <span className="catValue">{option.cat}</span>
                        <span className="priceValue">{option.cost} €</span>
                    </li>
                ))}
            </ul>
        </>
    );
}

export default ExpList;