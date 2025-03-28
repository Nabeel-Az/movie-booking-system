import axios from "axios";
import { MovieDetails } from "../models/form-model";
import { mockMovieList } from "../mocks/mocks";
import { useEffect,useState } from "react";

const isMock = "true";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

let movieDetailsList: MovieDetails[] = isMock
  ? [...mockMovieList.payload.movieDetails]
  : [];

export const useFetchApi = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (isMock) {
          setTimeout(() => {
            setData(movieDetailsList);
            setLoading(false);
          }, 500);
        } else {
          // API call
          const response = await axios.get(`${API_BASE_URL}/${url}`);
          setData(response.data.payload);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };
    fetchData();
  }, [url]); // Re-run the effect when `url` changes
  return { data, loading, error };
};