const movieSheetName = "Movies"
const movieHourSheetName = "MovieHour"

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

// Get All Movies
export const getMovies = () => {
  var movieSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(movieSheetName);
  return movieSheet.getRange("A:A").getValues().map((row) => row[0]).filter((value) => value !== '');
}

// Add Movie 
export const addMovie = (movieName) => {
  var movieSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(movieSheetName);
  appendToColumn(movieSheet, "A", movieName);
}

function appendToColumn(sheet, column, content) {
  var lastRow = sheet.getLastRow() + 1;
  var positionAppended = column + lastRow 
  sheet.getRange(positionAppended).setValue(content);
  return positionAppended;
}

// Add Movie Hour
export const addMovieHour = (movieName, movieHour) => {
  var movieHourSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(movieHourSheetName);
  var position = appendToColumn(movieHourSheet, "A", movieName);
  movieHourSheet.getRange(getNextColumn(position)).setValue(movieHour);

  var ui = SpreadsheetApp.getUi();
  ui.alert('Hello world');
}

function getNextColumn(currentCell) {
  var currentColumnInInt = currentCell.charCodeAt(0);
  return String.fromCharCode(currentColumnInInt + 1) + currentCell[1]; 
}
