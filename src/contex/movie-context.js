import axios from "axios";
import { createContext, useEffect, useState } from "react";

const initState = {
  movies: [],
  isFetching: false,
  isError: false,
};

export const MovieContext = createContext(initState);

export const MovieContextProvider = ({ children }) => {
  const [state, setState] = useState(initState);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const result = await axios.get("movies");

        success(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchMovies();
  }, []);

  const start = () =>
    setState({ movies: null, isFetching: true, isError: false });
  const success = (movies) =>
    setState({
      movies,
      isFetching: false,
      isError: false,
    });
  const failure = () =>
    setState({ movies: null, isFetching: false, isError: true });

  return (
    <MovieContext.Provider value={{ state, func: { start, success, failure } }}>
      {children}
    </MovieContext.Provider>
  );
};
