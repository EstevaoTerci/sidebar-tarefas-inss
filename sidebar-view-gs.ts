/**
 * @OnlyCurrentDoc  Limits the script to only accessing the current spreadsheet.
 */

 var SIDEBAR_TITLE = 'Record Viewer';

 /**
  * Adds a custom menu with items to show the sidebar and dialog.
  *
  * @param {Object} e The event parameter for a simple onOpen trigger.
  */
 function onOpen(e) {
   SpreadsheetApp.getUi()
       .createAddonMenu()
       .addItem('View records', 'showSidebar')
       .addToUi();
 }
 
 /**
  * Runs when the add-on is installed; calls onOpen() to ensure menu creation and
  * any other initializion work is done immediately.
  *
  * @param {Object} e The event parameter for a simple onInstall trigger.
  */
 function onInstall(e) {
   onOpen(e);
 }
 
 /**
  * Opens a sidebar. The sidebar structure is described in the Sidebar.html
  * project file.
  */
 function showSidebar() {
   var ui = HtmlService.createTemplateFromFile('Sidebar')
       .evaluate()
       .setSandboxMode(HtmlService.SandboxMode.IFRAME)
       .setTitle(SIDEBAR_TITLE);
   SpreadsheetApp.getUi().showSidebar(ui);
 }
 
 
 /**
  * Returns the active row.
  *
  * @return {Object[]} The headers & values of all cells in row.
  */
 function getRecord() {
   // Retrieve and return the information requested by the sidebar.
   var sheet = SpreadsheetApp.getActiveSheet();
   var data = sheet.getDataRange().getValues();
   var headers = data[0];
   var rowNum = sheet.getActiveCell().getRow();
   if (rowNum > data.length) return [];
   var record = [];
   for (var col=0;col<headers.length;col++) {
     var cellval = data[rowNum-1][col];
     // Dates must be passed as strings - use a fixed format for now
     if (typeof cellval == "object") {
       cellval = Utilities.formatDate(cellval, Session.getScriptTimeZone() , "M/d/yyyy");
     }
     // TODO: Format all cell values using SheetConverter library
     record.push({ heading: headers[col],cellval:cellval });
   }
   return record;
 }
