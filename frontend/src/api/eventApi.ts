import axios from 'axios';

const API_URL = "https://techreturners-events.onrender.com/api";

export const getEvents = async () => {
    try {
      const response = await axios.get(`${API_URL}/events/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  };


