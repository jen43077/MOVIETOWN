import "jquery";
import "bootstrap-loader"
import "./style.scss";

$(document).ready(function () {
  console.log("I am working with jQuery. Sweet!!!!");
  let moviesList = [];


  //Get Movies HTTP request!
  const getMovies = () => {
    const movieURL =
      "https://api.themoviedb.org/3/search/movie?api_key=2434d246ec60c162a86db597467ef4ed&language=en-US&query=Romance&include_adult=false&sort_by=created_at&page=2";

    fetch(movieURL)
      .then(res => res.json())
      .then(payload => {
        //now we have our kissy movies!!!!
        moviesList = payload.results;
        createMoviePosters();
      })
      .catch(err => console.log(err));
  };
  const getMoviesDetails = movieId => {
    const movieDetailsURL =
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=2434d246ec60c162a86db597467ef4ed`;

    fetch(movieDetailsURL)
      .then(res => res.json())
      .then(payload => {
        console.log(payload);
        presentMovieDetailsModal(payload);
      })
      .catch(err => console.log(err));
  };



  const presentMovieDetailsModal = movie => {
    $(".modal-title:first").text(movie.title);
    $(".movieDetails-overview:first").text(movie.overview);
    $(".movieDetails-img:first").attr(
      "src",
      "https://image.tmdb.org/t/p/w500/" + movie.poster_path
    );
    $(".movieDetails-tagline:first").text(movie.tagline);
    $("#movieDetails-modal").modal();

  };



  const createMoviePosters = () => {
    //get access to a DOM element to append all this movies to
    // iderate in some fashion on the the array of movies and create an img element, with the movie poster url as the src
    //each img element is gonna need to be it's own col "set"
    //bonus don't forget your clear fixes!!!!!!
    moviesList
      .filter(function (movie) {
        return moviesList.poster_path !== null && movie.poster_path;
      })
      .map(function (movie) {
        let divColumn = $("<div>").attr("class", "col-sm-6 col-md-4 col-lg-4");
        let divThumbnail = $("<div>")
          .attr("class", "thumbnail")
          .append(
            $("<img>").attr(
              "src",
              "https://image.tmdb.org/t/p/w500/" + movie.poster_path
            )
          )
          .append(
            $("<div>")
              .attr("class", "caption")
              .append($("<h4>").text(movie.title))
              .append($("<p>").text(movie.overview))
              .append(
                $("<button>")
                  .text("Details")
                  .attr("class", "btn btn-info btn-md")
                  .click(function () {
                    console.log(movie.title);
                    getMoviesDetails(movie.id);
                  })
              )
          );

        return divColumn.append(divThumbnail);
      })
      .map(appendElementWithVisibleSpacing);
  };

  const appendElementWithVisibleSpacing = (movieElement, index) => {
    const divVisibleSpaceSM = $("<div>").attr(
      "class",
      "clearfix visible-sm-block"
    );
    const divVisibleSpaceMDLG = $("<div>").attr(
      "class",
      "clearfix visible-md-block visible-lg-block"
    );
    //PUT IT ON THE PAGE ALREADY!!!
    $("#movies-list").append(movieElement);
    //every 3rd element add a MD clearfix
    if (index && (index + 1) % 3 === 0) {
      $("#movies-list").append(divVisibleSpaceMDLG);
    }
    if (index && (index + 1) % 2 === 0) {
      $("#movies-list").append(divVisibleSpaceSM);
    }
  };

  getMovies();
});
