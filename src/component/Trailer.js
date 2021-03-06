import React, { useEffect, useState } from "react";
import axios from "axios";

const youtubeKey = `${process.env.REACT_APP_YOUTUBE_KEY}`;

const Trailer = (props) => {
  const [trailer, setTrailer] = useState("");

  useEffect(() => {
    let year = " ";

    // pass down movieobj from overview component
    if (Object.keys(props.movieobj).length !== 0) {
      // console.log(props.movieobj);
      // console.log(Object.keys(props.movieobj));
      year = props.movieobj.release_date.slice(0, 4);
      // console.log(year + "  " + props.movieobj.id)
      const trailerURL = `https://www.googleapis.com/youtube/v3/search?q=${props.movieobj.title},trailer,${year}&part=snippet&type=video&pageInfo.resultsPerPage=2&videoEmbeddable=true&key=${youtubeKey}`;
      console.log(trailerURL);
      axios.get(trailerURL).then((res) => {
        console.log(res.data.items[0].id.videoId);
        setTrailer(res.data.items[0].id.videoId);
      });
    }
  }, [props.movieobj]);

  return (
    <>
      <br />
      <iframe
        width="760"
        height="515"
        src={`https://www.youtube.com/embed/${trailer}?rel=0`}
        frameborder="0"
        allow="encrypted-media"
        allowfullscreen="allowfullscreen"
        mozallowfullscreen="mozallowfullscreen"
        msallowfullscreen="msallowfullscreen"
        oallowfullscreen="oallowfullscreen"
        webkitallowfullscreen="webkitallowfullscreen"
      ></iframe>
    </>
  );
};

export default Trailer;
