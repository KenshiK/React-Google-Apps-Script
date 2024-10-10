import { HelpOutlineRounded, School } from '@mui/icons-material';
import {
  createEvent,
  addReservationToSeance
} from './helper';
import * as model from './model';
import { levelToClasses } from '../client/utils/helper';

const movieSheetName = "Movies"
const movieHourSheetName = "MovieHour"
const groupSheetName = "Groups"
const schoolSheetName = "Schools"
const recreationCenterSheetName = "RecreationCenter"
const dayCareSheetName = "DayCare"
const otherSheetName = "Other"
const reservationSheetName = "Reservations"
const enumSheetName = "Enum"

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
  var levelString = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(schoolSheetName)
  .getDataRange()
  .getDisplayValues()
  .filter(row => row[0] == schoolName)
  .flat()
  .at(7)

  var level = parseInt(levelString)
  var column = getNextLetter('A', level);
  var columnCode = column + ":" + column;

  var ui = SpreadsheetApp.getUi();
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
  .map(row => row[1])
}

export const getMovies = () => {
  return SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(movieSheetName)
  .getRange("A:A")
  .getValues()
  .map((row) => row[0])
  .filter((value) => value !== '');
}

export const getAllGroupsButSchools = () => {
  var recreationCenterData = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(recreationCenterSheetName)
  .getDataRange()
  .getDisplayValues()
  .slice(1)
  .map(row => [row[0], row[7]])

  var dayCareData = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(dayCareSheetName)
  .getDataRange()
  .getDisplayValues()
  .slice(1)
  .map(row => [row[0], row[6]])

  var otherData = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(otherSheetName)
  .getDataRange()
  .getDisplayValues()
  .slice(1)
  .map(row => [row[0], row[7]])

  return recreationCenterData.concat(dayCareData, otherData).map(row => row[0])
}

// Add
export const addSchool = (schoolName, level, adress, postalCode, city, contactName, contactNumber, isRep) => {
  var schoolSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(schoolSheetName);
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
}

export const addCenter = (centerName, level, adress, postalCode, city, contactName, contactNumber) => {
  var centerSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(recreationCenterSheetName);
  appendDataToColumn(centerSheet, 
    centerName, 
    contactName, 
    formatPhoneNumber(contactNumber), 
    adress, 
    postalCode, 
    city, 
    level, 
    (new Date()).valueOf())
}

export const addDayCare = (name, adress, postalCode, city, contactName, contactNumber) => {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(dayCareSheetName);
  appendDataToColumn(sheet, 
    name, 
    contactName, 
    formatPhoneNumber(contactNumber), 
    adress, 
    postalCode, 
    city, 
    (new Date()).valueOf())
}

export const addOther = (category, name, adress, postalCode, city, contactName, contactNumber) => {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(otherSheetName);
  appendDataToColumn(sheet, 
    name, 
    contactName, 
    formatPhoneNumber(contactNumber), 
    adress, 
    postalCode, 
    city, 
    category,
    (new Date()).valueOf())
}

export const addMovie = (movieName) => {
  var movieSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(movieSheetName);

  appendDataToColumn(movieSheet, movieName, (new Date()).valueOf())
}

export const addMovieHour = (movieName, movieHour) => {
  var movieHourSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(movieHourSheetName);
  var calendarEvent = createEvent(movieHour, movieName);
  // var ui = SpreadsheetApp.getUi();
  // ui.alert('Hello world');

  appendDataToColumn(movieHourSheet, movieName, movieHour, calendarEvent.getId())
}

export const addReservation = (movie, seance, structureType, structureName, nbrParticipants, nbrExos, klass = []) => {
  // var calendar = CalendarApp.getDefaultCalendar();
  var calendar = CalendarApp.getCalendarsByName("Test").shift();
  addReservationToSeance();
  var seanceDate = Date.parse(seance);
  var reservationSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(reservationSheetName);
  appendDataToColumn(reservationSheet, movie, seance, structureType, structureName, nbrParticipants, nbrExos, klass.toString());

  var ui = SpreadsheetApp.getUi();
  ui.alert("Seance date après Parse  et append: " + seanceDate.toString());
  // calendar.createEvent("Séance pour le film '" + movie + "'", 
  // Date.parse(seance),
  // Date.prototype.addHours(Date.parse(seance), 2) )

}

// Utilitaires
function getNextColumn(currentCell) {
  var currentColumnInInt = currentCell.charCodeAt(0);
  return String.fromCharCode(currentColumnInInt + 1) + currentCell[1]; 
}

function getNextLetter(letter, add) {
  const endCode = letter.charCodeAt(0) + add;
  return String.fromCharCode(endCode);
}

function getLastRowNext(sheet) {
  return sheet.getLastRow() + 1;
}

function appendToColumn(sheet, column, content) {
  var lastRow = getLastRowNext(sheet);
  var positionAppended = column + lastRow;
  sheet.getRange(positionAppended).setValue(content);
  return positionAppended;
}

function appendDataToColumn(sheet, ...data) {
  const lastRow = getLastRowNext(sheet);
  const startingColumn = "A";
  const endColumn = getNextLetter(startingColumn, data.length-1);

  const startingCell = startingColumn + lastRow;
  const endingCell = endColumn + lastRow;


  sheet.getRange(startingCell + ":" + endingCell).setValues([data])
}

function formatPhoneNumber(number) {
  if(number == null || number.trim() == "")
    return "No Number";

  var ui = SpreadsheetApp.getUi();
  const phoneRegex = new RegExp(/^\d*$/)
  if(phoneRegex.test(number)) {
    if (number.length == 10) {
      var phonePart = [];
      for (var i = 0; i < number.length-1; i += 2) {
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

