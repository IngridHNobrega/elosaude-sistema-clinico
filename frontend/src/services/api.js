import axios from "axios";

const api = axios.create({
  // Coloque o IP da sua máquina local ou localhost, MAS SEMPRE COM A PORTA :3000
  baseURL: "http://localhost:3000" 
});

export default api;