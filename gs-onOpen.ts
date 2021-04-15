function onOpen(){
  SpreadsheetApp.getUi()
  .createMenu('INSS')
  .addItem('Assistente de visualização', 'showSidebar')
  .addToUi();
}