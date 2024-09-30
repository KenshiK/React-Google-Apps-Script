export const onOpen = () => {
  const menu = SpreadsheetApp.getUi()
    .createMenu('CineCalendar') // edit me!
    .addItem('Ajouter un film', 'openDialogMovie')
    .addItem('Ajouter une séance', 'openDialogSeance')
    .addItem('Ajouter une nouvelle structure', 'openDialogGroup')
    .addItem('Ajouter une réservation', 'openDialogReservation')
    .addItem('About me', 'openAboutSidebar');

  menu.addToUi();
};

export const openDialog = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor');
};


export const openDialogMUI = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-demo-mui')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Sheet Editor (MUI)');
};

export const openAboutSidebar = () => {
  const html = HtmlService.createHtmlOutputFromFile('sidebar-about-page');
  SpreadsheetApp.getUi().showSidebar(html);
};

export const openDialogMovie = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-add-movie')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Ajouter un nouveau film');
};

export const openDialogSeance = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-add-seance')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Ajouter une nouvelle seance');
}

export const openDialogReservation = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-add-reservation')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Ajouter une nouvelle réservation');
};

export const openDialogGroup = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-add-group')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'Ajouter une nouvelle structure');
};

export const openDialogSave = () => {
  const html = HtmlService.createHtmlOutputFromFile('dialog-save')
    .setWidth(600)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(html, 'SaveFile');
};
