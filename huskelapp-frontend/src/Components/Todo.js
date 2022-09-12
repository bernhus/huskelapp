import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TodoComponent from "./Styled/TodoComponent";

const Todo = () =>  {
    const {state} = useLocation();
    const {todoId} = state;
    const [responseData, setResponseData] = useState([]);
    const navigate = useNavigate();
    var color = "yellow";
    useEffect(() => {
        axios.get(`https://localhost:7254/api/Todoes/${todoId}`)
            .then(
                res => {
                    setResponseData([res.data.title, res.data.createdDate, res.data.dueDate, res.data.category, res.data.isDone]);
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
        
    },[]);
    const editTodo = () => {
        navigate(`/edittodo/`, {
            state: {
                TodoId: todoId,
            }
        });
    }

    const deleteTodo = () => {
        axios.delete(`https://localhost:7254/api/Todoes/${todoId}`)
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
    function isInThePast(date) {
        let today =new Date().toISOString().split("T")[0]
        return date < today;
      }

        return (
            <div>
				<TodoComponent style={{backgroundColor : color}}>
                {isInThePast(responseData[2]) ? (
                    <h3>Frist utløpt</h3>
                ) : (<p></p>)           
                } 
                <b>{responseData[0]}</b>
                <pre>Opprettet: {responseData[1]}</pre>
                <pre>Frist: {responseData[2]}</pre>
                <pre>Kategori: {responseData[3]}</pre>
                {(responseData[4]) ? (<p>Utført</p>) : (<p>Ikke utført</p>)} 
                <button onClick ={() => editTodo()}>Rediger</button>
                <button onClick ={() => deleteTodo()}>Slett</button>

                </TodoComponent>
            </div>
        )
 }
export default Todo;