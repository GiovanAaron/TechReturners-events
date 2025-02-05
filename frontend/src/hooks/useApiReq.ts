import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_API_URL = "https://techreturners-events.onrender.com/api";

export const useApiReq = (
  endpoint: string,
  token: string | null,
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET',
  data: any = null,
  headers: any = {},
  useToken: boolean = true
) => {
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // console.log("useApiReq useEffect triggered"); // Log when useEffect runs

    const makeRequest = async () => {
      const url = `${BASE_API_URL}${endpoint}`;
      console.log("Making request to:", url); // Log the URL being requested

      const config = {
        headers: {
          ...headers,
          ...(useToken && token ? { Authorization: `Bearer ${token}` } : {}),
        },
      };

      try {
        let result;
        
        switch (method) {
          case 'GET':
            result = await axios.get(url, config);
            break;
          case 'POST':
            result = await axios.post(url, data, config);
            break;
          case 'PATCH':
            result = await axios.patch(url, data, config);
            break;
          case 'DELETE':
            result = await axios.delete(url, config);
            break;
          default:
            throw new Error('Unsupported HTTP method');
        }

        // console.log("API response:", result.data); // Log the API response
        setResponseData(result.data);
      } catch (err) {
        console.error("API error:", err); // Log any errors
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    makeRequest();
  }, []);

  return { responseData, loading, error };
};

export default useApiReq;