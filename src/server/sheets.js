const movieSheetName = "Movies"
const movieHourSheetName = "MovieHour"
const groupSheetName = "Groups"
const schoolSheetName = "Schools"
const recreationCenterSheetName = "RecreationCenter"
const reservationSheetName = "Reservations"
const enumSheetName = "Enum"

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

// Get All Levels
export const getLevels = () => {
  var enumSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(enumSheetName);
  return enumSheet
    .getRange("1:1")
    .getValues()
    .flat()
    .filter((value) => value !== '');
}

// Add School 
export const addSchool = (schoolName, level, contactName, contactNumber, isRep) => {
  var schoolSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(schoolSheetName);
  appendDataToColumn(schoolSheet, schoolName, contactName, formatPhoneNumber(contactNumber), isRep, level, (new Date()).valueOf())
}

// Add Center 
export const addCenter = (centerName, level, contactName, contactNumber) => {
  var centerSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(centerSheetName);
  appendDataToColumn(centerSheet, centerName, contactName, formatPhoneNumber(contactNumber), level, (new Date()).valueOf())
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

export const getSchools = () => {
  return SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(schoolSheetName)
  .getDataRange()
  .getDisplayValues()
  .map(row => [row[0], row[8]])
}

// Get All Seances
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

// Get All Movies
export const getMovies = () => {
  return SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(movieSheetName)
  .getRange("A:A")
  .getValues()
  .map((row) => row[0])
  .filter((value) => value !== '');
}

// Add Movie 
export const addMovie = (movieName) => {
  var movieSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(movieSheetName);
  appendToColumn(movieSheet, "A", movieName);
}


// Add Movie Hour
export const addMovieHour = (movieName, movieHour) => {
  var movieHourSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(movieHourSheetName);
  var position = appendToColumn(movieHourSheet, "A", movieName);
  movieHourSheet.getRange(getNextColumn(position)).setValue(movieHour);

  // var ui = SpreadsheetApp.getUi();
  // ui.alert('Hello world');
}

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