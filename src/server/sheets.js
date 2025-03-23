import {
  createEvent,
  addReservationToSeance,
  addToSchoolReport
} from './helper';
import * as model from './model';
import { levelToClasses } from '../client/utils/helper';
import { School } from './model.ts';
// import { calendarName } from './helper.ts';


const ReportAssoSheetName = "Associations2024"
const ReportRecreationSheetName = "CentresDeLoisirs2024"
const ReportDayCareSheetName = "Creches2024"
const movieSheetName = "Movies"
const movieHourSheetName = "MovieHour"
const schoolSheetName = "Schools"
const recreationCenterSheetName = "RecreationCenter"
const dayCareSheetName = "DayCare"
const otherSheetName = "Other"
const reservationSheetName = "Reservations"
const enumSheetName = "Enum"
const ReportSchoolSheetName = "Ecoles2024"
const recreationCenterSheet = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(recreationCenterSheetName)
const ReportSchoolSheet = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(ReportSchoolSheetName)
const movieHourSheet = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(movieHourSheetName)

// Getters 
export const getLevels = () => getEnumList(model.SchoolLevel)

export const getOtherSubtypes = () => getEnumList(model.GeneralStructureType)

export const getSchools = () => {
  return SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(schoolSheetName)
  .getDataRange()
  .getDisplayValues()
  .map(row => new model.School(
    row[8],
    row[0],
    row[1],
    row[2],
    row[3],
    row[4],
    row[5],
    row[7],
    row[6],
  ))
}

export const getSchoolClassesAssociated = (schoolName) => {
  const levelString = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(schoolSheetName)
  .getDataRange()
  .getDisplayValues()
  .filter(row => row[0] == schoolName)
  .flat()
  .at(7)

  const level = parseInt(levelString)
  const column = offsetLetter('A', level);
  const columnCode = column + ":" + column;

  const ui = SpreadsheetApp.getUi();
  ui.alert('Value of level: ' + level + '\n ColumnCode : ' + columnCode );

  return levelToClasses(level);
}

export const getSeances = () => {
  return SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(movieHourSheetName)
  .getRange("A:B")
  .getValues()
  .filter((row) => row[0] !== '');
}

export const getSeancesOfMovie = (movieId) => {
  // var ui = SpreadsheetApp.getUi();
  // ui.alert('Id : ' + movieId);
  return SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(movieHourSheetName)
  .getDataRange()
  .getDisplayValues()
  .filter(row => row[0] == movieId)
  .map(row => new model.Seance(
    row[3],
    row[2],
    row[1],
    row[0],
  ))
}

export const getMovies = () => {
  return SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(movieSheetName)
  .getDataRange()
  .getDisplayValues()
  .map(row => new model.Movie(row[1], row[0]))
}

export const getAllGroupsButSchools = () => {
  const recreationCenterData = recreationCenterSheet
  .getDataRange()
  .getDisplayValues()
  // .slice(1)
  .map(row => new model.RecreationCenter(
    row[7],
    row[0],
    row[1],
    row[2],
    row[3],
    row[4],
    row[5],
    row[6],
  ))

  const ui = SpreadsheetApp.getUi();
  ui.alert('centre aéré : ' + recreationCenterData.length);

  const dayCareData = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(dayCareSheetName)
  .getDataRange()
  .getDisplayValues()
  // .slice(1)
  .map(row => new model.DayCare(
    row[6],
    row[0],
    row[1],
    row[2],
    row[3],
    row[4],
    row[5],
  ))
  ui.alert('day care : ' + dayCareData.length);

  const otherData = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(otherSheetName)
  .getDataRange()
  .getDisplayValues()
  // .slice(1)
  .map(row => new model.GeneralStucture(
    row[7],
    row[0],
    row[1],
    row[2],
    row[3],
    row[4],
    row[5],
    row[6],
  ))

  ui.alert('other data : ' + otherData.length);

  const temp = recreationCenterData.concat(dayCareData, otherData)
  ui.alert('complete : ')
  ui.alert(temp)
  return temp;
}

// Add
export const addSchool = (schoolName, level, adress, postalCode, city, contactName, contactNumber, isRep) => {
  const schoolSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(schoolSheetName);
  appendDataToColumn(schoolSheet, 
    schoolName, 
    contactName, 
    formatPhoneNumber(contactNumber), 
    adress, 
    postalCode, 
    city, 
    isRep, 
    level, 
    (new Date()).valueOf())
  return true;
}

export const addCenter = (centerName, level, adress, postalCode, city, contactName, contactNumber) => {
  const centerSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(recreationCenterSheetName);
  appendDataToColumn(centerSheet, 
    centerName, 
    contactName, 
    formatPhoneNumber(contactNumber), 
    adress, 
    postalCode, 
    city, 
    level, 
    (new Date()).valueOf())
  return true;
}

export const addDayCare = (name, adress, postalCode, city, contactName, contactNumber) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dayCareSheetName);
  appendDataToColumn(sheet, 
    name, 
    contactName, 
    formatPhoneNumber(contactNumber), 
    adress, 
    postalCode, 
    city, 
    (new Date()).valueOf())
  return true;
}

export const addOther = (category, name, adress, postalCode, city, contactName, contactNumber) => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(otherSheetName);
  appendDataToColumn(sheet, 
    name, 
    contactName, 
    formatPhoneNumber(contactNumber), 
    adress, 
    postalCode, 
    city, 
    category,
    (new Date()).valueOf())
  return true;
}

export const addMovie = (movieName) => {
  const movieSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(movieSheetName);

  appendDataToColumn(movieSheet, movieName, (new Date()).valueOf())
  return true;
}

export const addMovieHour = (movie, movieHour) => {
  // const ui = SpreadsheetApp.getUi();
  // ui.alert('ajout de seance : ' + movie + ' a l\'heure : '+ movieHour);
  const movieHourSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(movieHourSheetName);
  const calendarEvent = createEvent(movieHour, movie.title);

  appendDataToColumn(movieHourSheet, movie.title, movie.id, movieHour, calendarEvent.getId())
  return true;
}

export const addReservation = (movie, seance, structureType, structure, nbrParticipants, nbrExos, klass = []) => {
  // var calendar = CalendarApp.getCalendarsByName(calendarName).shift();
  const calendar = CalendarApp.getDefaultCalendar();
  // const ui = SpreadsheetApp.getUi();
  // ui.alert(calendar.getName());
  addReservationToSeance(calendar.getEventById(seance.id), structure, structure.contactName, structure.contactNumber, nbrParticipants, nbrExos, klass);

  //var seanceDate = Date.parse(seance.hour);
  ui.alert("Seance date : " + seance.hour);

  const reservationSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(reservationSheetName);
  appendDataToColumn(
    reservationSheet, 
    movie.title, 
    seance.hour, 
    structureType, 
    structure.name, 
    nbrParticipants, 
    nbrExos, 
    klass.toString(),
    (new Date()).valueOf()
  );
  
  addToSchoolReport(movie.title, 
    seance.hour, 
    structureType, 
    nbrParticipants, 
    nbrExos,
    structure
  );
  return true;
}

// Utilitaires
function getNextColumn(currentCell) {
  const currentColumnInInt = currentCell.charCodeAt(0);
  return String.fromCharCode(currentColumnInInt + 1) + currentCell[1]; 
}

function offsetLetter(letter, add) {
  const endCode = letter.charCodeAt(0) + add;
  return String.fromCharCode(endCode);
}

function getLastRowNext(sheet) {
  return sheet.getLastRow() + 1;
}

function appendToColumn(sheet, column, content) {
  const lastRow = getLastRowNext(sheet);
  const positionAppended = column + lastRow;
  sheet.getRange(positionAppended).setValue(content);
  return positionAppended;
}

function appendDataToColumn(sheet, ...data) {
  const lastRow = getLastRowNext(sheet);
  const startingColumn = "A";
  const endColumn = offsetLetter(startingColumn, data.length-1);

  const startingCell = startingColumn + lastRow;
  const endingCell = endColumn + lastRow;

  sheet.getRange(startingCell + ":" + endingCell).setValues([data])
}

function formatPhoneNumber(number) {
  if(number == null || number.trim() == "")
    return "No Number";

  // const ui = SpreadsheetApp.getUi();
  const phoneRegex = new RegExp(/^\d*$/)
  if(phoneRegex.test(number)) {
    if (number.length == 10) {
      const phonePart = [];
      for (let i = 0; i < number.length-1; i += 2) {
        // ui.alert("Number : " + number + " \n Length : " + number.length + " \n Index : " + i + " \n phonePart : " + phonePart)
        phonePart.push(number.substring(i, i + 2));
      }
      return phonePart.join(".");
    }
    else {
      return number = "\"" + number;
    }
  }

  return number;
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

function getEnumList(enumType) {
  return Object.keys(enumType)
  .filter((item) => { return isNaN(Number(item)) })
}

export function init() {
  const necessarySheetNames = [
    movieSheetName,
    movieHourSheetName,
    schoolSheetName,
    recreationCenterSheetName,
    dayCareSheetName,
    otherSheetName,
    reservationSheetName,
    enumSheetName,
    ReportRecreationSheetName,
    ReportDayCareSheetName,
    ReportAssoSheetName,
    ReportSchoolSheetName
  ];
  const activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  ui.alert('Création des sheets');
  ui.alert(necessarySheetNames.join(','));

  necessarySheetNames.forEach(name => {
    let newSheet = activeSpreadsheet.getSheetByName(name);
    if (newSheet == null) {
      newSheet = activeSpreadsheet.insertSheet();
      newSheet.setName(name);
    }
  })
}


// A garder ???
const getSheets = () => SpreadsheetApp.getActive().getSheets();

const getActiveSheetName = () => SpreadsheetApp.getActive().getSheetName();

export const getSheetsData = () => {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const name = sheet.getName();
    return {
      name,
      index,
      isActive: name === activeSheetName,
    };
  });
};

export const addSheet = (sheetTitle) => {
  SpreadsheetApp.getActive().insertSheet(sheetTitle);
  return getSheetsData();
};

export const deleteSheet = (sheetIndex) => {
  const sheets = getSheets();
  SpreadsheetApp.getActive().deleteSheet(sheets[sheetIndex]);
  return getSheetsData();
};

export const setActiveSheet = (sheetName) => {
  SpreadsheetApp.getActive().getSheetByName(sheetName).activate();
  return getSheetsData();
};

