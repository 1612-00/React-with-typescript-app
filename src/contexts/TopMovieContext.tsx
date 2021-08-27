import { createContext, ReactNode, useReducer } from "react";
import { topMovieReducer, TopMovieState } from "./../reducers/TopMovieReducer";
import { TopMovieActionType } from "../reducers/types";
import topMoviesInfo from "./../api/getTopMovies";

const { GET_TOP_MOVIES, TOGGLE_TOP_MOVIE_WATCHED } = TopMovieActionType;

interface TopMovieContextProviderProps {
  children: ReactNode;
}

interface TopMovieContextDefault {
  topMovies: TopMovieState;
  getTopMovies: () => Promise<void>;
  toggleWatched: (imdbID: string) => void
}

const TopMovieDefault: TopMovieState = [];

const TopMovieDefaultData = {
  topMovies: TopMovieDefault,
  getTopMovies: () => Promise.resolve(void 0),
  toggleWatched: (imdbID: string) => {}
};

// Context
export const TopMovieContext =
  createContext<TopMovieContextDefault>(TopMovieDefaultData);

// Context Provider
const TopMovieContextProvider = ({
  children,
}: TopMovieContextProviderProps) => {
  const [topMovies, dispatch] = useReducer(
    topMovieReducer,
    TopMovieDefaultData.topMovies
  );

  // get top movie form api
  const getTopMovies = async () => {
    const topMovies = await Promise.all(topMoviesInfo);
    dispatch({
      type: GET_TOP_MOVIES,
      payload: topMovies.map((movie) => ({ ...movie.data, Watch: false })),
    });
  };

  const toggleWatched = (imdbID: string) =>
    dispatch({ type: TOGGLE_TOP_MOVIE_WATCHED, payload: imdbID });

  const topMovieContextData = {
    topMovies,
    getTopMovies,
    toggleWatched
  };

  return (
    <TopMovieContext.Provider value={topMovieContextData}>
      {children}
    </TopMovieContext.Provider>
  );
};

export default TopMovieContextProvider;
