import React, {useEffect, useState} from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([])

  useEffect(()=> {
     api.get('/repositories').then(({ data }) => setProjects(data));
    }
  ,[])

  async function handleAddRepository() {
    const {data: project} = await api.post('/repositories', {
      url: "https://github.com/desafioReactJS",
      title: "ReactJS",
      techs: ["React", "Node.js"],
    });
    setProjects([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    const newProjectList = projects.filter(project => project.id !== id);
    setProjects(newProjectList);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => 
        <li key={project.id}>
          {project.title}
          <button onClick={() => handleRemoveRepository(project.id)}>
            Remover
          </button>
        </li>)
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
