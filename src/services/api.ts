import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.1.7:8080', // ajuste para seu backend
  timeout: 5000, // 5 segundos
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