import { DayCare, DayCareIdentifier, GeneralStructureIdentifier, GeneralStucture, Movie, RecreationCenter, RecreationCenterIdentifier, School, SchoolIdentifier, Seance, Structure } from "./model";

export const calendarName = "Test"

export const movieSheetName = "Movies"
export const movieHourSheetName = "MovieHour"
export const schoolSheetName = "Schools"
export const recreationCenterSheetName = "RecreationCenter"

export const dayCareSheetName = "DayCare"
export const dayCareSheet = SpreadsheetApp
.getActiveSpreadsheet()
.getSheetByName(dayCareSheetName);

export const otherSheetName = "Other"
export const reservationSheetName = "Reservations"
export const enumSheetName = "Enum"
export const ReportSchoolSheetName = "Ecoles2024"
export const ReportSchoolSheet = 
SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(ReportSchoolSheetName)

export const ReportRecreationSheetName = "CentresDeLoisirs2024"
export const ReportRecreationSheet = 
SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(ReportRecreationSheetName)

export const ReportAssoSheetName = "Associations2024"
export const ReportAssoSheet = 
SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(ReportAssoSheetName)

export const ReportDayCareSheetName = "Creches2024"
export const ReportDayCareSheet = 
SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(ReportDayCareSheetName)

export const movieHourSheet = SpreadsheetApp
  .getActiveSpreadsheet()
  .getSheetByName(movieHourSheetName)

export const createEvent = (dateToParse : string, movie : string) => {
  // var ui = SpreadsheetApp.getUi();
//   //ui.alert("On est dans event");

  // ui.alert("Date a parse " + dateToParse);
  const calendar = CalendarApp.getDefaultCalendar();
  // var calendar = CalendarApp.getCalendarsByName(calendarName).shift();
  let date = new Date(dateToParse);
  date = addHours(date, -8) // quand la date est parsé elle est pas sur le bon fuseau horaire 
  // ui.alert("Date en typescript " + date + " ou " + date.toString());

  return calendar.createEvent("Séance pour le film '" + movie + "'", 
  date,
  addHours(date, 2) );
}

const addHours = function(date, addition: number) {
  date.setTime(date.getTime() + (addition*60*60*1000));
  return date;
}

export const addReservationToSeance = (
     calendarEvent : GoogleAppsScript.Calendar.CalendarEvent,
     structure : Structure,
     contactName : string,
     contactNumber : string,
     nbrParticipant : number,
     nbrExo : number,
     klass : Array<string> = [] ) => {
  let ComplementaryInfos : string = "";
  if(structure instanceof RecreationCenter) 
    ComplementaryInfos = "\n --- Niveau scolaire : " + (structure as RecreationCenter).level.toString();


  calendarEvent
    .setDescription(calendarEvent.getDescription() 
      + "\n Réservation de " + structure.name + " - " + structure.city + " :" 
      + "\n --- Nombre de participants : " + nbrParticipant + " + " + nbrExo + " exos"
      + ComplementaryInfos
      + (klass.length > 0 ? "\n --- Classes : " + klass.toString() : "" )
      + "\n --- Contact : " + contactName + "(" + contactNumber + ") \n"
    );
}

export const addToSchoolReport = (
  title:string, 
  seance:string,
  structureType:string,
  nbrParticipants:number,
  nbrExos:number,
  structure:DayCare | School | GeneralStucture | RecreationCenter
  )=> {

  var ui = SpreadsheetApp.getUi();
  //ui.alert("structure")
  //ui.alert(JSON.stringify(structure))
  var sheet:GoogleAppsScript.Spreadsheet.Sheet;
  var data: string[];
  switch(structure.identifier) {
    case SchoolIdentifier:
      //ui.alert("It is a School");
      sheet = ReportSchoolSheet;
      data = [
        title, 
        seance, 
        structureType, 
        structure.name, 
        structure.city, 
        (structure as School).level.toString(), 
        (structure as School).rep.toString(), 
        nbrParticipants.toString(), 
        nbrExos.toString()
      ]
      break;
    case RecreationCenterIdentifier:
      sheet = ReportRecreationSheet;
      data = [
        title, 
        seance, 
        structureType, 
        structure.name, 
        structure.city, 
        (structure as RecreationCenter).level.toString(), 
        nbrParticipants.toString(), 
        nbrExos.toString()
      ]
      break;
    case GeneralStructureIdentifier:
      //ui.alert("Asso");
      sheet = ReportAssoSheet;
      data = [
        title, 
        seance, 
        structureType, 
        structure.name, 
        structure.city, 
        nbrParticipants.toString(), 
        nbrExos.toString()
      ]
      break;
    case DayCareIdentifier:
      //ui.alert("Creche");
      sheet = ReportDayCareSheet;
      data = [
        title, 
        seance, 
        structureType, 
        structure.name, 
        structure.city, 
        nbrParticipants.toString(), 
        nbrExos.toString()
      ]
      break;
    default:
      //ui.alert("Not Implemented")
      return
  }

  appendDataToReport(sheet, title, data);
}

function appendDataToReport(sheet:GoogleAppsScript.Spreadsheet.Sheet, title:string, data:string[])
{
  var ui = SpreadsheetApp.getUi();

  //ui.alert("sheet " + sheet.getName());
  const titleRow = getTitleRow(title, sheet);
  const workingRow = titleRow + 1;
  //ui.alert("Title row for title " + title + " is " + titleRow);

  if (titleRow == 0) {
    //ui.alert("Add new");
    appendDataToColumn(sheet, ...data)
  }
  else {
    //ui.alert("Append to movie");
    data = data.slice(1)

    const startingColumn = "B";
    const endColumn = offsetLetter(startingColumn, data.length - 1);
    const startingCell = startingColumn + workingRow;
    const endingCell = endColumn + workingRow;

    sheet.insertRows(workingRow);
    sheet.getRange(startingCell + ":" + endingCell).setValues([data])
  }
}

function getTitleRow(title:string, sheet:GoogleAppsScript.Spreadsheet.Sheet) : number
{
  return sheet.getDataRange()
  .getValues()
  .map(row => row[0])
  .indexOf(title) + 1;
}

function appendDataToColumn(sheet:GoogleAppsScript.Spreadsheet.Sheet, 
  ...data: string[]) {
  const lastRow = getLastRowNext(sheet);
  const startingColumn = "A";
  const endColumn = offsetLetter(startingColumn, data.length-1);

  const startingCell = startingColumn + lastRow;
  const endingCell = endColumn + lastRow;

  sheet.getRange(startingCell + ":" + endingCell).setValues([data])
}

function offsetLetter(letter:string, add:number) {
  const endCode = letter.charCodeAt(0) + add;
  return String.fromCharCode(endCode);
}

function getLastRowNext(sheet:GoogleAppsScript.Spreadsheet.Sheet) {
  return sheet.getLastRow() + 1;
}


// export const addReservation = (movie: Movie,
//    seance: Seance, 
//    structureType: string,
//    structure: Structure, 
//    nbrParticipants: number, 
//    nbrExos: number, 
//    klass = []) => {
//   var calendar = CalendarApp.getCalendarsByName("Test").shift();
//   addReservationToSeance(calendar.getEventById(seance.id), 
//   structure.name, 
//   nbrParticipants, 
//   nbrExos);

//   var seanceDate = Date.parse(seance.hour);

//   var ui = SpreadsheetApp.getUi();
//
//   //ui.alert("Seance date après Parse  et append: " + seanceDate.toString());

//   var reservationSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(reservationSheetName);
//   appendDataToColumn(
//     reservationSheet,
//     movie,
//     seance,
//     structureType,
//     structure.name,
//     nbrParticipants,
//     nbrExos,
//     klass.toString(),
//     (new Date()).valueOf()
//   );

//   // calendar.createEvent("Séance pour le film '" + movie + "'", 
//   // Date.parse(seance),
//   // Date.prototype.addHours(Date.parse(seance), 2) )

// }
