import { SkeletonTheme } from "react-loading-skeleton";
import routes from "./routes/routes";
import { MovieProvider, useMovies } from "./context/MovieContext";
import { RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import "./App.css"

function App() {

  const { allMovies, setAllMovies } = useMovies();

  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const res = await fetch('/data.json');
        const data = await res.json();
        setAllMovies(data);
        console.log(allMovies);
      } catch (err) {
        console.log("Error fetching all movies: ", err);
      }
    };
    fetchAllMovies();
  }, [setAllMovies]);

  useEffect(() => {
    console.log("All movies:", allMovies);
  }, [allMovies]);

  return (
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <RouterProvider router={routes} />
    </SkeletonTheme>
  );
}

export default function AppWithProvider() {
  return (
    <MovieProvider>
      <App />
    </MovieProvider>
  );
}
