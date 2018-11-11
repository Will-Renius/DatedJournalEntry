/* What should the add-on do after it is installed */
function onInstall() {
  onOpen();
  setDateDefaults();
  }
  
  function onOpen() {
    var ui = DocumentApp.getUi();
    // Or FormApp or SpreadsheetApp.
    ui.createMenu('Dated Journal Entry')
        .addItem('New Entry', 'newEntry')
        .addItem('Change Date Format', 'showSidebar')
        .addToUi();
  
  }
  
  //appends new journal template above end position
  function newEntry() {
    var doc = DocumentApp.getActiveDocument();
    var dateSettings = getDateSettings();
    var dateString = getDateString(dateSettings)
    var new_pos = insertDate(dateString);
    doc.setCursor(new_pos);
    
  }
  
  function showSidebar() {
    var ui = HtmlService.createHtmlOutputFromFile('sidebar')
        .setTitle('Date Format');
    DocumentApp.getUi().showSidebar(ui);
  }
  
  function setDateDefaults(){
    var userProperties = PropertiesService.getUserProperties();
    var dateFormat = "MMM dd, yyyy hh:mm a";
    userProperties.setProperty('DATE_FORMAT', dateFormat);
    var timezone = Session.getScriptTimeZone();
    userProperties.setProperty('DATE_TIMEZONE', timezone);
    var formattedDate = Utilities.formatDate(new Date(), timezone, dateFormat);
  }
  
  function quickTest(){
    setDateDefaults();
    var dateSettings = getDateSettings();
    getDateString(dateSettings);
  
    }
    
  function updateDateSettings(options){
    var userProperties = PropertiesService.getUserProperties();
    userProperties.setProperty('DATE_TIMEZONE', options.timeZone);
    userProperties.setProperty('DATE_FORMAT',options.formatString);
  }
  function getDateSettings(){
    var userProperties = PropertiesService.getUserProperties();
    var dateFormatString = userProperties.getProperty("DATE_FORMAT");
    var dateTimeZone = userProperties.getProperty("DATE_TIMEZONE");  
    dateSettings = {timeZone:dateTimeZone,formatString:dateFormatString};
    return(dateSettings);
  }
  function getDateString(dateSettings){
    var today  = new Date(); 
    var formattedDate = Utilities.formatDate(new Date(),dateSettings["timeZone"] , dateSettings["formatString"]);
    return(formattedDate)
  }
  
  function insertDate(dateString) {
    var body = DocumentApp.getActiveDocument().getBody();
    
    // Append a paragraph, with heading 1.
    var par1 = body.appendParagraph(dateString);
    par1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
    
    var par2 = body.appendParagraph("\n");
    par2.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    return_position =  DocumentApp.getActiveDocument().newPosition(par2, 0);
    return(return_position);
  
  }
  
  
  
  
  