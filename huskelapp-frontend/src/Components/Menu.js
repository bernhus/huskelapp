import BrowseTodoes from "./BrowseTodos";
import CreateTodo from "./CreateTodo";
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Todo from "./Todo";
import EditTodo from "./EditTodo";

export default function Menu() {
  const Button = styled.button`
	font-size: 20px;
	margin: 1em;
	padding: 0.25em 1em;
	border-radius: 3px;
  width: 200px;
  height: 60px;
  background-color: yellow;
  cursor: pointer
  `;
  
    const Title = styled.h1`
        color: black;
        text-align: center;
      `;

    return (
    <Router>
      <div>
        <nav style={{marginLeft: "30%", marginRight: "30%"}}>
                    <Link to="/browsetodos"><Button>Se huskelapper</Button></Link>
               
                    <Link to="/createtodo"><Button>Lag huskelapp</Button></Link> 
        </nav>
        <Title>huske(L)app</Title>
        <Routes>
          <Route path="/browsetodos" element={<BrowseTodoes />} />
          <Route path="/createtodo" element={<CreateTodo />} />
          <Route path="/todo/" element={<Todo />} />
          <Route path="/edittodo/" element={<EditTodo />} />
          
        </Routes>
        </div>
    </Router>
    )
  
  }