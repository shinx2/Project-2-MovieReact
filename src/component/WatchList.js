import React, { useState, useEffect } from "react";
import Poster from "./Poster";
import "./WatchList.css";
import "bootstrap/dist/css/bootstrap.min.css";

const WatchList = (props) => {
  const [watchlistArray, setWatchlistArray] = useState(() => {
    const item = localStorage.getItem("watchList");
    return item ? JSON.parse(item) : [];
  });

  // To remove movie from watchlist
  const handleRemove = (event) => {
    let selectedMovie = event.target.value.toString();
    setWatchlistArray(
      watchlistArray.filter((item) => item.movieID.toString() !== selectedMovie)
    );
  };

  // Save remove updates to local storage
  useEffect(() => {
    console.log(watchlistArray);
    localStorage.setItem("watchList", JSON.stringify(watchlistArray));
  }, [watchlistArray]);

  return (
    <div>
      <br/>
      <h1>My Watchlist</h1>
      <div className="grid1">
        {watchlistArray.map((watch) => {
          return (
            <div>
<Poster
                height={"500px"}
                width={"18rem"}
                movieid={watch.movieID}
                rating={watch.ratings}
                srcvalue={`http://image.tmdb.org/t/p/original/${watch.movieURL}`}
                movietitle={watch.movieTitle}
                removeMovieMethod={handleRemove}
                showRemoveButton={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WatchList;
