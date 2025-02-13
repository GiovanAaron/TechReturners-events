import { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

const BASE_API_URL = "https://techreturners-events.onrender.com/api";

export const useApiReq = (
  endpoint?: string, // Make endpoint optional
  token?: string | null, // Make token optional
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE' = 'GET', // Default to GET
  data: any = null, // Default to null
  headers: any = {}, // Default to empty object
  autoReq: boolean = false // Add a new parameter to control automatic fetching
) => {
  const [responseData, setResponseData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const makeRequest = async (
    customEndpoint?: string,
    customMethod?: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    customData?: any,
    customToken?: string | null,
    customHeaders?: any
  ) => {
    setLoading(true);
    setError(null);

    const url = `${BASE_API_URL}${customEndpoint || endpoint}`;
    // console.log("Making request to:", url); // Log the URL being requested
    // console.log("making request with method", customMethod , "to url", url ,"and data", customData);
    const config = {
      headers: {
        ...(customHeaders || headers),
        ...(customToken || token
          ? { Authorization: `Bearer ${customToken || token}` }
          : {}),
      },
    };

    // console.log("config", config);  

    try {
      let res;

      switch (customMethod || method) {
        case 'GET':
          res = await axios.get(url, config);
          break;
        case 'POST':
          res = await axios.post(url, customData || data, config);
          break;
        case 'PATCH':
          res = await axios.patch(url, customData || data, config);
          break;
        case 'DELETE':
          res = await axios.delete(url, config);
          break;
        default:
          throw new Error('Unsupported HTTP method');
      }

      // console.log("API response:", res.data); // Log the API response
      setResponseData(res.data);
      return res.data;
    } catch (err: unknown) {
      if ((err as AxiosError)?.response) {
        console.error("API error:", err, (err as AxiosError)?.response?.data); // Log any errors
      } else {
        console.error("API error:", err); // Log any errors
      }
      
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Automatically fetch data when the component mounts if autoReq is true
  useEffect(() => {
    if (autoReq && endpoint) {
      // console.log("useApiReq useEffect triggered"); // Log when useEffect runs
      makeRequest();
    }
  }, [endpoint, token, method, data, headers, autoReq]);

  return { responseData, loading, error, makeRequest };
};

export default useApiReq;