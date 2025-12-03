import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.1.5:8080', 
  timeout: 5000, 
});

api.post('/usuarios', { nome: 'Carol' })
  .then(res => console.log(res.data))
  .catch(err => {
    if (err.response) {
      console.log('Erro do servidor:', err.response.data);
    } else if (err.request) {
      console.log('Sem resposta do servidor:', err.request);
    } else {
      console.log('Erro Axios:', err.message);
    }
  });