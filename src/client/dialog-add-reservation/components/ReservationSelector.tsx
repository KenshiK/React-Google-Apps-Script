import React, { FormEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import ElementSelector from './ElementSelector';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';


export default function ReservationSelector() {

  const [movie, setMovie] = React.useState<number>();
  var [movieList, setMovieList] = React.useState<Array<String>>([]);
  const [seance, setSeance] = React.useState<String>('');
  const [seanceList, setSeanceList] = React.useState<Array<String>>([]);
  const [dateTime, setDateTime] = React.useState<String>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dateTime == '') return;
    if (movie == null) return;
    if (seance == '') return;
    // var movieName = movieList[+movie];
    // console.log("submitNewMovieHour movie :" + movieName + " hour : " + dateTime);
    // submitNewMovieHour(movieName, dateTime);
  };

  useEffect(() => {
    var temp = getElementList(Element.Movie, null).then((arr) => setMovieList(arr))
    console.log("movie list promise : ")
    console.log(temp)
  }, [])

  // useEffect(() => {
  //   var tempSeance = getElementList(Element.Seance).then((arr) => setSeanceList(arr))
  //   console.log("seance list promise : ")
  //   console.log(tempSeance)
  // }, [])

  async function setMovieAndUpdateData(movie: number) {
    setMovie(movie);
  }

  return (
    <form
      onSubmit={handleSubmit}
    >
      <ElementSelector title="Movie" elementList={movieList} updateVariable={setMovieAndUpdateData} />
      {ElementSelectorDependent(movieList[movie])}
      {ElementSelectorDependent(movieList[movie])}

      <div>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}

enum Element {
  Movie,
  School,
  Center,
  Seance,
}

function ElementSelectorDependent (selectedValue : String) {
  var [seanceList, setSeanceList] = React.useState<Array<String>>([]);
  var [seance, setSeance] = React.useState<number>();

  useEffect(() => {
    var tempSeance = getElementList(Element.Seance, selectedValue).then((arr) => setSeanceList(arr));
  }, [selectedValue, setSeanceList])

  return (
    <ElementSelector title="Seance" elementList={seanceList} updateVariable={setSeance} />
  )
}

async function getElementList(elem: Element, dependency: String, setFunction : Function = null) {
    try {
      var response = [];
      switch (elem) {
        case Element.Movie:
          {
            response = (await serverFunctions.getMovies());
            console.log("MovieList");
            console.log(response);
            break;
          }
        case Element.School:
        case Element.Center:
        case Element.Seance:
          {
            if(dependency == null || dependency == "") break;
            response = (await serverFunctions.getSeancesOfMovie(dependency));
            console.log("SeanceList");
            console.log(response);
            break;
          }
      }
      return response;
    } catch (error) {
      alert(error);
    }
    return [];
  };