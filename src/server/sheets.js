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
export const getLevels = () => {
  var enumSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(enumSheetName);
  return enumSheet
    .getRange("1:1")
    .getValues()
    .flat()
    .filter((value) => value !== '');
}

export const getOtherSubtypes = () => {
  var enumSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(enumSheetName);
  return enumSheet
    .getRange("F:F")
    .getValues()
    .flat()
    .filter((value) => value !== '');
}

export const getSchools = () => {
  return SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(schoolSheetName)
  .getDataRange()
  .getDisplayValues()
  .map(row => [row[0], row[8]])
  .map(row => row[0])
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

  var classList = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(enumSheetName)
  .getRange(columnCode)
  .getDisplayValues()
  .filter(row => row[0] != '')
  .slice(1)
  .flat()

  return classList;

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
  var position = appendToColumn(movieHourSheet, "A", movieName);
  movieHourSheet.getRange(getNextColumn(position)).setValue(movieHour);
  // appendDataToColumn(movieHourSheet, movieName, movieHour)

  // var ui = SpreadsheetApp.getUi();
  // ui.alert('Hello world');
}

export const addReservation = (movie, seance, structureType, structureName, nbrParticipants, nbrExos, klass = "") => {
  var reservationSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(movieSheetName);
  appendDataToColumn(reservationSheet, movie, seance, structureType, structureName, nbrParticipants, nbrExos, klass);
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

  // var ui = SpreadsheetApp.getUi();
  // ui.alert(startingCell + ":" + endingCell + " \n data length : " + data.length + " \n data content : " + data);

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

