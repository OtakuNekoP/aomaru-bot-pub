function logToSheet(update) {
  var d = new Date();
  var SpreadSheet = SpreadsheetApp.openById(logSheetId);
  var Sheet = SpreadSheet.getSheetByName(logSheetName);
  var LastRow = Sheet.getLastRow();
  Sheet.getRange(LastRow+1, 1).setValue(d);  
  Sheet.getRange(LastRow+1, 2).setValue(update);
}
