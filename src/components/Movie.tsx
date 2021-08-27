import { Box, Button, Chip, TextField } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useState, ChangeEvent, useContext } from "react";
import { ThemeContext } from "./../contexts/ThemeContext";
import { MovieContext } from "./../contexts/MovieContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    movieInput: {
      marginRight: "5px",
    },
    movieChip: {
      fontSize: "2rem",
      padding: "30px 10px",
      margin: "5px",
    },
  })
);

const Movie = () => {
  // Style
  const classes = useStyles();

  // Context
  const { theme } = useContext(ThemeContext);
  const { movie, addMovie, deleteMovie } = useContext(MovieContext);

  // State
  const [title, setTitle] = useState("");

  const onMovieInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);

  return (
    <>
      <Box display="flex" justifyContent="center" my={5}>
        <TextField
          label="Your favorite movie ..."
          variant="outlined"
          color={theme === "primary" ? "primary" : "secondary"}
          className={classes.movieInput}
          onChange={onMovieInputChange}
          value={title}
        />
        <Button
          variant="contained"
          color={theme}
          onClick={() => {
            addMovie(title);
            setTitle("");
          }}
        >
          Add
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" flexWrap="wrap" mx={5}>
        {movie.map((movie) => (
          <Chip
            key={movie.id}
            label={movie.title}
            clickable
            color={theme === "primary" ? "primary" : "secondary"}
            className={classes.movieChip}
            onDelete={deleteMovie.bind(this, movie.id)}
          />
        ))}
      </Box>
    </>
  );
};

export default Movie;
