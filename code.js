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
    var dateString = getDateString(dateSettings);
    var dateHeading = getDateHeading(dateSettings);
    var new_pos = insertDate(dateString, dateHeading);
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
    var dateHeading = 'HEADING1';
    userProperties.setProperty('DATE_HEADING', dateHeading);
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
    userProperties.setProperty('DATE_HEADING',options.dateHeading);
  }
  function getDateSettings(){
    var userProperties = PropertiesService.getUserProperties();
    var dateFormatString = userProperties.getProperty("DATE_FORMAT");
    var dateTimeZone = userProperties.getProperty("DATE_TIMEZONE");
    var dateHeading = userProperties.getProperty("DATE_HEADING"); 
    dateSettings = {timeZone:dateTimeZone,formatString:dateFormatString,dateHeading:dateHeading};
    return(dateSettings);
  }
  function getDateString(dateSettings){
    var today  = new Date(); 
    var formattedDate = Utilities.formatDate(new Date(),dateSettings["timeZone"] , dateSettings["formatString"]);
    return(formattedDate)
  }
  function getDateHeading(dateSettings){
    return(dateSettings["dateHeading"])
  }
  function insertDate(dateString, dateHeading) {
    var body = DocumentApp.getActiveDocument().getBody();
    
    // Append a paragraph, with heading from saved format.
    var par1 = body.appendParagraph(dateString);
    switch(dateHeading) {
    case "HEADING1":
      par1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
      break;
    case "HEADING2":
      par1.setHeading(DocumentApp.ParagraphHeading.HEADING2);
      break;
    case "HEADING3":
      par1.setHeading(DocumentApp.ParagraphHeading.HEADING3);
      break;
    case "HEADING4":
      par1.setHeading(DocumentApp.ParagraphHeading.HEADING4);
      break;
    case "HEADING5":
      par1.setHeading(DocumentApp.ParagraphHeading.HEADING5);
      break;
    case "HEADING6":
      par1.setHeading(DocumentApp.ParagraphHeading.HEADING6);
      break;
    case "NORMAL":
      par1.setHeading(DocumentApp.ParagraphHeading.NORMAL);
      break;
    default:
      par1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
      break;
    }
    
    var par2 = body.appendParagraph("\n");
    par2.setHeading(DocumentApp.ParagraphHeading.NORMAL);
    return_position =  DocumentApp.getActiveDocument().newPosition(par2, 0);
    return(return_position);
  
  }
  
  
  
  
  