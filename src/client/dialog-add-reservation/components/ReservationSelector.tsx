import React, { FormEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import ElementSelector from './ElementSelector';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';
import ClassChip from './ClassChip';


export default function ReservationSelector() {
  var [movie, setMovie] = React.useState<number>();
  var [movieList, setMovieList] = React.useState<string[]>([]);
  var [seance, setSeance] = React.useState<number>();
  var [seanceList, setSeanceList] = React.useState<string[]>([]);
  var [group, setGroup] = React.useState<number>();
  var [groupList, setGroupList] = React.useState<string[]>([]);
  var [schoolClass, setSchoolClass] = React.useState<number>(null);
  var [schoolClassList, setSchoolClassList] = React.useState<string[]>([]);
  var [structureId, setStructureId] = React.useState<number>(null);
  var [dateTime, setDateTime] = React.useState<String>('');

  const scolaire : string = "Scolaires";
  const nonScolaire : string = "Non-Scolaires";
  const structureTypes = [scolaire, nonScolaire]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (dateTime == '') return;
    if (movie == null) return;
    if (seance == null) return;
    if (group == null) return;
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

  return (
    <form
      onSubmit={handleSubmit}
    >
      <ElementSelector title="Movie" elementList={movieList} updateVariable={setMovieAndUpdateData} />
      {ElementSelectorDependent(movieList[movie], "Seance", Element.Seance, setSeance, seanceList, setSeanceList)}
      <ElementSelector title="Type de structure" elementList={structureTypes} updateVariable={setStructureTypeAndUpdateData} />
      { structureId != null && structureTypes[structureId] == scolaire ?
      ElementSelectorDependent(structureTypes[structureId], "Scolaire", Element.School, setGroup, groupList, setGroupList)
      :
      ElementSelectorDependent(structureTypes[structureId], "Group", Element.Group, setGroup, groupList, setGroupList)
      }
      <ClassChip classList={schoolClassList} updateClassListAnswer={setSchoolClass} display={structureId != null && structureTypes[structureId] == scolaire} />
      {/* { //structureId != null && structureTypes[structureId] == scolaire ?
      ElementSelectorDependent(groupList[group], "Classe", Element.SchoolClass, setSchoolClass, schoolClassList, setSchoolClassList)
      } */}
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

function ElementSelectorDependent (selectedValue : string, 
  title: string, 
  type: Element,
  elementUpdate: Function, 
  elementList: string[],
  elementListUpdate: Function) {
  // var [seanceList, setSeanceList] = React.useState<Array<String>>([]);
  // var [seance, setSeance] = React.useState<number>();


  // useEffect(() => {
  //   var tempSeance = getElementList(Element.Seance, selectedValue).then((arr) => setSeanceList(arr));
  // }, [selectedValue, setSeanceList])

  useEffect(() => {
    getElementList(type, selectedValue).then((arr) => elementListUpdate(arr));
  }, [selectedValue, elementListUpdate])

  return (
    //type != Element.SchoolClass ?
    <ElementSelector title={title} elementList={elementList} updateVariable={elementUpdate} isChip={type == Element.SchoolClass}/>
    //:
    //<ClassChip classList={elementList} updateClassListAnswer={elementUpdate}/>
  )
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
      case Element.SchoolClass:
        {
          response = (await serverFunctions.getSchoolClassesAssociated(dependency));
          console.log("Schools");
          console.log(response);
          break;
        }
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