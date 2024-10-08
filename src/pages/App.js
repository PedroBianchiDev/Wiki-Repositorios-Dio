import { useState } from 'react';
import gitlogo from '../assets/git-logo.png'
import Input from '../components/Input';
import Button from '../components/Button';
import ItemRepo from '../components/ItemRepo';
import { Container } from './styles';
import { api } from '../services/api';

function App() {

  const [currentRepo, setCurrentRepo] = useState('');
  const [repos, setRepos] = useState([]);

  const hadleSearchRepo = async () => {

    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id)
    {
      const isExist = repos.find(repo => repo.id === data.id);

      if(!isExist){
        setRepos(prev => [...prev, data]);
        setCurrentRepo('')
        return
      }
    }
    alert('Repositório não encontrado')
  }

  const handleRemoveRepo = (id) => {
    const updatedRepos = repos.filter(repo => repo.id !== id);
    
    setRepos(updatedRepos);
  };


  return ( 
    <Container className="App">
      <img src={gitlogo} width={72} height={72} alt="githublogo"/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepo(e.target.value)}/>
      <Button onClick={hadleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/>)}
    </Container>
  );
}

export default App;
