function onOpen(){
  SpreadsheetApp.getUi()
  .createMenu('INSS')
  .addItem('Abrir Assistente', 'showSidebar')
  .addToUi();
}