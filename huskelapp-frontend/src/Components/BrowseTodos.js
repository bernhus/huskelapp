import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoComponent from './Styled/TodoComponent';

const BrowseTodoes = () => {
	const [responseData, setResponseData] = useState([]);
    const navigate = useNavigate();
	var color = "yellow";

	useEffect(() => {
		axios
			.get('https://localhost:7254/api/Todoes')
			.then((res) => {
				for (let index = 0; index < res.data.length; index++) {
					setResponseData((prevArray) => [
						...prevArray,
						[res.data[index].id, res.data[index].title, res.data[index].updatedDate, res.data[index].category, res.data[index].isDone]
					]);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

    function handleClick(id) {
		navigate(`/todo/`, {
			state:{
				todoId: id,
			}
		});
	}


    function isInThePast(date) {
        let today =new Date().toISOString().split("T")[0]
        return date < today;
	}
	function deleteTodo(id) {
        axios.delete(`https://localhost:7254/api/Todoes/${id}`)
            .then(
                res => {
                    window.location.reload();
                }
            )
            .catch(
                err => {
                    console.log(err)
                }
            )
    }
	// utførte todoer er market grå i oversikten her. 
	return (
		<div>
            {responseData.map(function (d, idx) {
				if(d[4]) {color = "lightgrey"} else {color = "yellow"}
				return(
				<TodoComponent style={{backgroundColor : color}}>
					<b>{d[1]}</b>
					<pre>{d[2]}</pre>
					<p>Kategori: {d[3]}</p>
                    <p></p>
					<button onClick={() => handleClick(d[0])}>Vis</button>
                    <button onClick={() => deleteTodo(d[0])}>Slett</button>
					</TodoComponent>
				);
			})}
		</div>
	);
};
export default BrowseTodoes;