import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-d227e/us-central1/api' // cloud api url
});

export default instance;