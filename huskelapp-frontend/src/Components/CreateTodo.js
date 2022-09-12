import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import TodoComponent from "./Styled/TodoComponent";


const CreateTodo = () => {
    const [Title, setTitle] = useState("");
    const [CreatedDate, setCreatedDate] = useState();
    const [dueDate, setDueDate] = useState();
    const [category, setCategory] = useState("Arbeid");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            Title: Title,
            CreatedDate: new Date().toISOString().split("T")[0],
            DueDate: dueDate ,
            Category: category,
            IsDone: false
        }
        axios.post("https://localhost:7254/api/Todoes", data)                
            .catch(
                err => {
                    console.log(err)
                    
                }
            )
        console.log(CreatedDate);
        navigate('/browsetodos/');
    }
    return (
        <TodoComponent>
        <form onSubmit={handleSubmit}>
            <label>
                Tittel:<br />
                <textarea onChange={(e) => setTitle(e.target.value)} /><br />
                <br />
                Frist: <br />
                <input type="date" id="start" name="trip-start" value={dueDate} min={new Date()} onChange={(e) => setDueDate(e.target.value)} />
                <br /><br />
                <label>Kategori:</label><br/>
                <select name="category" onChange={(e) => setCategory(e.target.value)}>
                    <option value="Abeid">Arbeid</option>
                    <option value="Hobby">Hobby</option>
                    <option value="Trening">Trening</option>
                    <option value="Hage">Hage</option>
                </select>
            </label><br />
            <br />
            <button type="submit">Lagre</button>
        </form>
        </TodoComponent>
    )
}
export default CreateTodo;