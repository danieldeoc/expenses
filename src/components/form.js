import React, { useEffect, useState } from "react";
import ExpList from "./expList";
import ReactDOM from 'react-dom/client';
import styles from "./form.modules.css";


function AddForm(expData){
    const [categories, setCategories] = useState([]);

    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}-${month}-${year}`;

    const [expenseDate, setExpenseDate] = useState(currentDate);
    const [expenseName, setExpenseName] = useState('');
    const [expenseValue, setExpenseValue] = useState('0.00');
    const [catSel, setCatSel] = useState('1');

    function handleSubmit(event) {        
        event.preventDefault();     
        
        const probRoot = ReactDOM.createRoot(document.getElementById('tab1'));
        
        const expSubmit = {
            data: expenseDate,
            name: expenseName,
            cat: catSel,
            cost: expenseValue
        }

        fetch('http://localhost:5000/expenses',{
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(expSubmit),
        }).then( (resp) => resp.json() )
        .then( () => {
            
            probRoot.innerHTML='';
            
            probRoot.render(<ExpList />)

            document.querySelector("#tabH1").click();
        } )
        .catch( (err) => console.log(err) )
    }
    
    useEffect(() => {
        fetch('http://localhost:5000/categories',{
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        })
        .then( (resp) => resp.json() )
        .then( (data) => {
            setCategories(data)
        })
        .catch( (err) => console.log(err) )
    }, []);
    

    return(
        <form method="post" onSubmit={ handleSubmit }>
            <label>Data
                <input 
                    type="date" 
                    name="data" 
                    placeholder='Data' 
                    value={expenseDate} 
                    id="dataInput" 
                    onChange={ e => setExpenseDate(e.target.value) } />
            </label>

            <label>Nome
            <input 
                type="text" 
                name="expenseName" 
                placeholder='Nombre' 
                value={expenseName} 
                onChange={ e => setExpenseName(e.target.value) } />
            </label>

            <label>Categorias
                <select 
                    name="category" 
                    onChange={e => setCatSel(e.target.value)}>
                    {categories.map( (option) => (
                        <option value={option.id} key={option.id}>{option.name}</option>
                    ) ) }
                </select>
            </label>

            <label>Valor
                <input 
                    type="number"
                    name="value" 
                    inputMode="decimal" 
                    min="0" 
                    step=".01"
                    max="10000.00"
                    value={expenseValue}
                    onChange={ e => setExpenseValue(e.target.value) } />
            </label>
            <button type="submit" value="salvar" >Salvar</button>
          </form>
    )
}

export default AddForm;