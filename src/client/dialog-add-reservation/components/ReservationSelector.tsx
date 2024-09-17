import React, { FormEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import ElementSelector from './ElementSelector';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';
import ClassChip from './ClassChip';
import { TextField } from '@mui/material';
import {submitReservationEx} from './AddReservationDialog'


export default function ReservationSelector( submitReservation : Function) {
  var [movie, setMovie] = React.useState<number>();
  var [movieList, setMovieList] = React.useState<string[]>([]);
  var [seance, setSeance] = React.useState<number>();
  var [seanceList, setSeanceList] = React.useState<string[]>([]);
  var [group, setGroup] = React.useState<number>();
  var [groupList, setGroupList] = React.useState<string[]>([]);
  var [schoolClassAnswer, setSchoolClassAnswer] = React.useState<number>(null);
  var [schoolClassList, setSchoolClassList] = React.useState<string[]>([]);
  var [structureId, setStructureId] = React.useState<number>(null);
  var [nbrParticipants, setParticipants] = React.useState<number>(0);
  var [nbrExos, setExos] = React.useState<number>(0);

  const scolaire: string = "Scolaires";
  const nonScolaire: string = "Non-Scolaires";
  const structureTypes = [scolaire, nonScolaire]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submit")
    console.log({
      movie: movieList[movie],
      seance: seanceList[seance],
      strucType: structureTypes[structureId],
      strucName: groupList[group],
      participants: nbrParticipants,
      exos: nbrExos,
      klass: schoolClassAnswer
    })
    console.log(submitReservation)

    // if (
    //   movie == null ||
    //   seance == null ||
    //   group == null) return;

    submitReservationEx(movieList[movie], 
      seanceList[seance], 
      structureTypes[structureId], 
      groupList[group], 
      nbrParticipants, 
      nbrExos, 
      schoolClassAnswer)
    // var movieName = movieList[+movie];
    // console.log("submitNewMovieHour movie :" + movieName + " hour : " + dateTime);
    // submitNewMovieHour(movieName, dateTime);
  };

  useEffect(() => {
    var temp = getElementList(Element.Movie, null).then((arr) => setMovieList(arr))
    console.log("movie list promise : ")
    console.log(temp)
  }, [])

  async function setMovieAndUpdateData(movie: number) {
    setMovie(movie);
  }

  async function setStructureTypeAndUpdateData(structureId: number) {
    setStructureId(structureId);
  }

  var isSchool: boolean = structureId != null && structureTypes[structureId] == scolaire;

  return (
    <form
      onSubmit={handleSubmit}
    >
      <ElementSelector title="Movie" elementList={movieList} updateVariable={setMovieAndUpdateData} />
      {ElementSelectorDependent(movieList[movie], "Seance", Element.Seance, setSeance, seanceList, setSeanceList)}
      <ElementSelector title="Type de structure" elementList={structureTypes} updateVariable={setStructureTypeAndUpdateData} />
      {structureId != null && structureTypes[structureId] == scolaire ?
        ElementSelectorDependent(structureTypes[structureId], "Scolaire", Element.School, setGroup, groupList, setGroupList)
        :
        ElementSelectorDependent(structureTypes[structureId], "Group", Element.Group, setGroup, groupList, setGroupList)
      }
      {ClassChipElement(groupList[group], setSchoolClassAnswer, schoolClassList, setSchoolClassList, isSchool)}
      <TextField
        id="Participants-input"
        label="Participants"
        variant="outlined"
        placeholder="Type a number…"
        value={nbrParticipants}
        onChange={(event) => {
          var value = parseInt(event.target.value)
          value = isNaN(value) ? 0 : value;
          return setParticipants(value);
        }}
        name="Participants number"
        fullWidth
        size="small"
      />

      <TextField
        id="Exos-input"
        label="Exos"
        variant="outlined"
        placeholder="Type a number…"
        value={nbrExos}
        onChange={(event) => {
          var value = parseInt(event.target.value)
          value = isNaN(value) ? 0 : value;
          return setExos(value);
        }}
        name="Exos number"
        fullWidth
        size="small"
      />
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
  Seance,
  School,
  Group,
  SchoolClass
}

function ElementSelectorDependent (selectedValue : String, 
  title: string, 
  type: Element,
  elementUpdate: Function, 
  elementList: string[],
  elementListUpdate: Function
  ) {
  // var [seanceList, setSeanceList] = React.useState<Array<String>>([]);
  // var [seance, setSeance] = React.useState<number>();


  // useEffect(() => {
  //   var tempSeance = getElementList(Element.Seance, selectedValue).then((arr) => setSeanceList(arr));
  // }, [selectedValue, setSeanceList])

  useEffect(() => {
    getElementList(type, selectedValue).then((arr) => elementListUpdate(arr));
  }, [selectedValue, elementListUpdate])

  return (
    <ElementSelector title={title} elementList={elementList} updateVariable={elementUpdate} />
  )
}

function ClassChipElement (selectedValue : String, 
  elementUpdate: Function, 
  elementList: string[],
  elementListUpdate: Function,
  display: boolean = false) {

  useEffect(() => {
    if(display == true)
      getClasses(selectedValue).then((arr) => elementListUpdate(arr));
  }, [selectedValue, elementListUpdate])

  console.log("Display school ? " + display)
  return (
    <ClassChip classList={elementList} updateClassListAnswer={elementUpdate} display={display} />
  )
}

async function getClasses(dependency: String) {
  try {
    var response = (await serverFunctions.getSchoolClassesAssociated(dependency));
    console.log("Schools");
    console.log(response);
    return response;
  } catch (error) {
    alert(error);
  }
}

async function getElementList(elem: Element, dependency: String) {
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
        {
          response = (await serverFunctions.getSchools());
          console.log("Schools");
          console.log(response);
          break;
        }
      // case Element.SchoolClass:
      //   {
      //     response = (await serverFunctions.getSchoolClassesAssociated(dependency));
      //     console.log("Schools");
      //     console.log(response);
      //     break;
      //   }
      case Element.Group:
        {
          response = (await serverFunctions.getAllGroupsButSchools());
          console.log("Group");
          console.log(response);
          break;
        }
      case Element.Seance:
        {
          if (dependency == null || dependency == "") break;
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