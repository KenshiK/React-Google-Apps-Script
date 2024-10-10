
export const createEvent = (dateToParse : string, movie : string) => {
//   var ui = SpreadsheetApp.getUi();
//   ui.alert("On est dans event");

//   var calendar = CalendarApp.getDefaultCalendar();
  var calendar = CalendarApp.getCalendarsByName("Test").shift();
  var date = new Date(dateToParse);

//   ui.alert("Date en typescript " + date);

  return calendar.createEvent("Séance pour le film '" + movie + "'", 
  date,
  addHours(date, 2) );
}

const addHours = function(date, addition) {
  date.setTime(date.getTime() + (addition*60*60*1000));
  return date;
}

export const addReservationToSeance = (
     calendarEvent : GoogleAppsScript.Calendar.CalendarEvent,
     structureName : string,
     nbrParticipant : number,
     nbrExo : number ) => {
//   var calendar = CalendarApp.getDefaultCalendar();
  var calendar = CalendarApp.getCalendarsByName("Test").shift();
//   calendar.get
  calendarEvent.setDescription(calendarEvent.getDescription() + "\n Réservation de " + structureName + "(" + nbrParticipant + "\\" + nbrExo + ")");
}

