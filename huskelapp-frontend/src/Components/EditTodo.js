import axios from "axios";
import React, { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TodoComponent from "./Styled/TodoComponent";


const EditTodo = () => {
    const {state} = useLocation();
    const {TodoId} = state;
    const [Title, setTitle] = useState("");
    const [CreatedDate, setCreatedDate] = useState();
    const [DueDate, setDueDate] = useState();
    const [Category, setCategory] = useState("Arbeid");
    const [IsDone, setIsDone] = useState(Boolean);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://localhost:7254/api/Todoes/${TodoId}`)
            .then(
                res => {
                    setTitle(res.data.title);
                    setCreatedDate(res.data.createdDate)
                    setDueDate(res.data.dueDate);
                    setCategory(res.data.category);
                    setDueDate(res.data.dueDate);
                    setIsDone(res.data.isDone);
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault()
        const data = {
            id: TodoId,
            Title: Title,
            CreatedDate: CreatedDate,
            DueDate: DueDate,
            Category: Category,
            IsDone: IsDone
        }
        axios.put(`https://localhost:7254/api/Todoes/${TodoId}`, data)                
            .catch(
                err => {
                    console.log(err)
                    
                }
            )
        navigate(`/todo/`, {
			state:{
				todoId: TodoId,
			}
		});
    }

    const deleteTodo = () => {
        axios.delete(`https://localhost:7254/api/Todoes/${TodoId}`)
            .then(
                res => {
                    console.log(res)
                    navigate('/browsetodos');
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
    }


    return (
        <TodoComponent>
        <form onSubmit={handleSubmit}>
            <div>
                Tittel:<br />
                    <textarea  defaultValue={Title} onChange={(e) => setTitle(e.target.value)} /><br />
                    <br />
                Frist: {DueDate} <br/>
                <input type="date" id="start" name="trip-start"
                value={DueDate}
                min={new Date()} onChange={(e) => setDueDate(e.target.value)} />
                <br /><br/>
                Kategori: {Category}<br/>
                <select name="category" onChange={(e) => setCategory(e.target.value)}>
                    <option value="" selected disabled hidden>Ny kategori</option>
                    <option value="Abeid">Arbeid</option>
                    <option value="Hobby">Hobby</option>
                    <option value="Trening">Trening</option>
                    <option value="Hage">Hage</option>
                </select>
                <br/><br/>
                {(IsDone) ? (<p>Utført</p>) : (<p>Ikke utført</p>)} 
                <select name="isDone" onChange={(e) => setIsDone(Boolean(e.target.value))}>
                    <option value="" selected disabled hidden>Utført?</option>
                    <option value="true">Utført</option>
                    <option value="false">Ikke utført</option>
                </select>
            </div><br/>
            <br />
            <button type="submit">Lagre</button>
        </form>
        <button onClick ={() => deleteTodo()}>Slett</button>
        </TodoComponent>
    )
}
export default EditTodo;