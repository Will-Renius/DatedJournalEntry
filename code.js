/* What should the add-on do after it is installed */
function onInstall() {
    onOpen();
    }
    
    function onOpen() {
      var ui = DocumentApp.getUi();
      // Or FormApp or SpreadsheetApp.
      ui.createMenu('Simple Journal Entry')
          .addItem('New Entry', 'newEntry')
          .addItem('Show Sidebar', 'showSidebar')
          .addToUi();
    
    }
    
    //appends new journal template above end position
    function newEntry() {
      Logger.log("newEntry()");
    
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
      Logger.log("setDateDefaults()");
    
      var userProperties = PropertiesService.getUserProperties();
      var dateFormat = "yyyy-MM-dd'T'HH:mm:ss'Z'";
      userProperties.setProperty('DATE_FORMAT', dateFormat);
      var timezone = Session.getScriptTimeZone();
      userProperties.setProperty('DATE_TIMEZONE', timezone);
      var formattedDate = Utilities.formatDate(new Date(), timezone, dateFormat);
      Logger.log(formattedDate);
    }
    
    function quickTest(){
      setDateDefaults();
      var dateSettings = getDateSettings();
      getDateString(dateSettings);
      }
      
    function updateDateSettings(options){
      Logger.log("updateDateSettings()");
    
      Logger.log(options);
      var dateOptions =  JSON.stringify(options["dateOptions"]);
      Logger.log(dateOptions);
      var userProperties = PropertiesService.getUserProperties();
      userProperties.setProperty('DATE_LANGUAGE', options["language"]);
      userProperties.setProperty('DATE_OPTIONS',dateOptions);
    }
    function getDateSettings(){
      Logger.log("getDateSettings()");
      var userProperties = PropertiesService.getUserProperties();
      var dateFormatString = userProperties.getProperty("DATE_FORMAT");
      Logger.log(dateFormatString);
    
      var dateTimeZone = userProperties.getProperty("DATE_TIMEZONE");
      Logger.log(dateTimeZone);
      
      dateSettings = {timeZone:dateTimeZone,formatString:dateFormatString};
      return(dateSettings);
    }
    function getDateString(dateSettings){
      Logger.log("getDateString()");
    
      var today  = new Date(); 
      Logger.log("Getting Date String");
      Logger.log(dateSettings["timeZone"]);
      Logger.log(dateSettings["formatString"]);
    
      var formattedDate = Utilities.formatDate(new Date(),dateSettings["timeZone"] , dateSettings["formatString"]);
      Logger.log(formattedDate);
      return(formattedDate)
    }
    
    function insertDate(dateString) {
      Logger.log("insertDate()");
    
      var body = DocumentApp.getActiveDocument().getBody();
      
      // Append a paragraph, with heading 1.
      var par1 = body.appendParagraph(dateString);
      par1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
      
      var par2 = body.appendParagraph("\n");
      par2.setHeading(DocumentApp.ParagraphHeading.NORMAL);
      return_position =  DocumentApp.getActiveDocument().newPosition(par2, 0);
    
      return(return_position);
    
    }
    
    
    
    
    