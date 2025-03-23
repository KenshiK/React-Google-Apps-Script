import React, { FormEvent, useEffect } from 'react';
import Button from '@mui/material/Button';
import ElementSelector from './ElementSelector';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';
import ClassChip from './ClassChip';
import { selectClasses, TextField } from '@mui/material';
import {submitReservationEx} from './AddReservationDialog'
import * as model from '../../utils/model'
import { levelToClasses } from '../../utils/helper';


export default function ReservationSelector() {
  var [movieId, setMovie] = React.useState<number>();
  var [movieList, setMovieList] = React.useState<model.Movie[]>([]);
  var [seanceId, setSeanceId] = React.useState<number>();
  var [seanceList, setSeanceList] = React.useState<model.Seance[]>([]);
  var [group, setGroup] = React.useState<number>();
  var [groupList, setGroupList] = React.useState<model.Structure[]>([]);
  var [schoolClassAnswer, setSchoolClassAnswer] = React.useState<string[]>([]);
  var [schoolClassList, setSchoolClassList] = React.useState<string[]>([]);
  var [structureId, setStructureId] = React.useState<number>(null);
  var [nbrParticipants, setParticipants] = React.useState<number>(0);
  var [nbrExos, setExos] = React.useState<number>(0);


  function setGroupAndUpdateClassList(groupId: number) {
    setGroup(groupId);
    var selectedGroup = groupList[groupId]
    if (selectedGroup.hasOwnProperty('level')) {
      // console.log("change classList")
      var classList = levelToClasses(Number((selectedGroup as model.RecreationCenter).level))
      setSchoolClassList(classList)
    }
    else {
      setSchoolClassList([]);
      setSchoolClassAnswer([]);
    }
  }

  const scolaire: string = "Scolaires";
  const nonScolaire: string = "Non-Scolaires";
  const structureTypes = [scolaire, nonScolaire]

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /* console.log("Submit")
    console.log({
      movie: movieList[movieId],
      seance: seanceList[seanceId],
      strucType: structureTypes[structureId],
      strucName: groupList[group],
      participants: nbrParticipants,
      exos: nbrExos,
      klass: schoolClassAnswer
    }) */

    submitReservationEx(movieList[movieId], 
      seanceList[seanceId], 
      structureTypes[structureId], 
      groupList[group], 
      nbrParticipants, 
      nbrExos, 
      schoolClassAnswer)
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

  var isSchool: boolean = structureId != null && schoolClassList != null && schoolClassList.length > 0;

  return (
    <form
      onSubmit={handleSubmit}
    >
      <ElementSelector title="Movie" elementList={movieList.map(movie => movie.title)} updateVariable={setMovieAndUpdateData} />
      {ElementSelectorDependent(movieList[movieId] ? movieList[movieId].title : null, "Seance", Element.Seance, setSeanceId, seanceList.map(s => s.hour), setSeanceList)}
      <ElementSelector title="Type de structure" elementList={structureTypes} updateVariable={setStructureTypeAndUpdateData} />
      {structureId != null && structureTypes[structureId] == scolaire ?
        ElementSelectorDependent(structureTypes[structureId], "Scolaire", Element.School, /*setGroup*/setGroupAndUpdateClassList, groupList.map(g => g.name), setGroupList)
        :
        ElementSelectorDependent(structureTypes[structureId], "Group", Element.Group, /*setGroup*/setGroupAndUpdateClassList, groupList.map(g => g.name), setGroupList)
      }
      {/* {
      ClassChipElement(
      groupList[group], 
      setSchoolClassAnswer,
      schoolClassList, 
      setSchoolClassList, 
      isSchool)} */}
      <ClassChip classList={schoolClassList} 
      updateClassListAnswer={setSchoolClassAnswer} 
      display={isSchool} />
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

function ElementSelectorDependent (selectedValue : string, 
  title: string, 
  type: Element,
  elementUpdate: Function, 
  elementList: string[],
  elementListUpdate: Function
  ) {

  useEffect(() => {
    getElementList(type, selectedValue).then((arr) => elementListUpdate(arr));
  }, [selectedValue, elementListUpdate])

  return (
    <ElementSelector title={title} elementList={elementList} updateVariable={elementUpdate} />
  )
}

function ClassChipElement (selectedValue : model.Structure,
  elementUpdate: Function, 
  elementList: string[],
  elementListUpdate: Function,
  display: boolean = false) {

    console.log('Display : ' + display)
    console.log(selectedValue)
    console.log('C\'est une school ? ' + (selectedValue instanceof model.School))

  // if (display == true && selectedValue instanceof model.School)
  // {
  //   console.log("dans le if");
  //   elementListUpdate(
  //     levelToClasses(
  //       (selectedValue as model.RecreationCenter).level
  //     ))
  // }

  useEffect(() => {
    if (display == true) {
      console.log("dans le if");
      elementListUpdate(
        levelToClasses(
          (selectedValue as model.RecreationCenter).level
        ))
    }
    // if(display == true)
    // getClasses(selectedValue).then((arr) => elementListUpdate(arr));
  }, [selectedValue, elementListUpdate])

  console.log("Display school ? " + display)
  console.log("elementList")
  console.log(elementList)
  return (
    <ClassChip classList={elementList} updateClassListAnswer={elementUpdate} display={display} />
  )
}

async function getClasses(structure: model.RecreationCenter | model.School) {
  structure.level
  try {
    var response = (await serverFunctions.getSchoolClassesAssociated(structure.name));
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
    console.log("getElementList " + elem);
    switch (elem) {
      case Element.Movie:
        {
          console.log("MovieList");
          response = (await serverFunctions.getMovies());
          console.log(response);
          break;
        }
      case Element.School:
        {
          console.log("Schools");
          response = (await serverFunctions.getSchools());
          console.log(response);
          break;
        }
      case Element.Group:
        {
          console.log("Group");
          response = (await serverFunctions.getAllGroupsButSchools());
          console.log(response);
          break;
        }
      case Element.Seance:
        {
          console.log("SeanceList");
          if (dependency == null || dependency == "") break;
          response = (await serverFunctions.getSeancesOfMovie(dependency));
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
