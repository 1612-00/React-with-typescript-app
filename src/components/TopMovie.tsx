import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useContext, useEffect } from "react";
import { TopMovieContext } from "./../contexts/TopMovieContext";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    topMovieHeader: {
      paddingBottom: 0,
    },
    topMovieList: {
      paddingTop: 0,
    },
    topMovieItem: {
      paddingTop: "2px",
      paddingBottom: "2px",
    },
  })
);

const TopMovie = () => {
  const classes = useStyles();

  // context
  const { topMovies, getTopMovies, toggleWatched } =
    useContext(TopMovieContext);

  useEffect(() => {
    getTopMovies();
  }, []);

  return (
    <Box mt={1} ml={1}>
      <Card raised>
        <CardHeader
          title="Top 10 movie of all time"
          className={classes.topMovieHeader}
          titleTypographyProps={{
            variant: "h4",
            align: "center",
            color: "primary",
          }}
        />
        <CardContent className={classes.topMovieList}>
          <List>
            {topMovies.map((movie) => (
              <ListItem
                button
                className={classes.topMovieItem}
                key={movie.imdbID}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={movie.Watched}
                    onClick={toggleWatched.bind(this, movie.imdbID)}
                  />
                </ListItemIcon>
                <ListItemText primary={movie.Title} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default TopMovie;
