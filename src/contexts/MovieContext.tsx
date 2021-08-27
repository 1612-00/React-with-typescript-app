import { createContext, ReactNode, useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface MovieContextProviderProps {
  children: ReactNode;
}

interface Movie {
  id: string;
  title: string;
}

interface MovieContextDefault {
  movie: Movie[];
  addMovie: (title: string) => void;
  deleteMovie: (id: string) => void;
}

const MovieContextDefaultData = {
  movie: [],
  addMovie: () => {},
  deleteMovie: () => {},
};

export const MovieContext = createContext<MovieContextDefault>(
  MovieContextDefaultData
);

const MovieContextProvider = ({ children }: MovieContextProviderProps) => {
  const [movie, setMovie] = useState<Movie[]>(MovieContextDefaultData.movie);

  const addMovie = (title: string) =>
    setMovie([...movie, { id: uuidv4(), title }]);

  const deleteMovie = (id: string) =>
    setMovie(movie.filter((movie) => movie.id !== id));

  const MovieContextData = { movie, addMovie, deleteMovie };

  return (
    <MovieContext.Provider value={MovieContextData}>
      {children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
