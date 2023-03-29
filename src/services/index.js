import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://sopv1.domcloud.io/api', 
});


api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('@sp:token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  } catch (err) {
    alert(err);
  }
});

export default api;