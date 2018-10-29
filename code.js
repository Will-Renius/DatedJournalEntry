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
      var doc = DocumentApp.getActiveDocument();
      var new_pos = insertDate();
      doc.setCursor(new_pos);
      
    }
    
    function showSidebar() {
      var ui = HtmlService.createHtmlOutputFromFile('sidebar')
          .setTitle('Date Format');
      DocumentApp.getUi().showSidebar(ui);
    }
    
    function setDateDefaults(){
      var userProperties = PropertiesService.getUserProperties();
      var options = { weekday: "long", year: 'numeric', month: 'numeric', day: 'numeric', hour:"2-digit", minute:"numeric", second:"numeric" };
      Logger.log(options);
      var stringOptions = JSON.stringify(options);
      Logger.log(stringOptions);
      userProperties.setProperty('DATE_OPTIONS', stringOptions);
      var language = (Session.getActiveUserLocale()) ? Session.getActiveUserLocale() : "en"; 
      userProperties.setProperty('DATE_LANGUAGE', language);
      var today  = new Date(); 
      
      Logger.log(today.toLocaleDateString(language, options));
      Logger.log(today.toLocaleString("de", options));
      Logger.log(today.toLocaleString("en-US", { weekday: "long", year: 'numeric', month: 'numeric', day: 'numeric', hour:"2-digit", minute:"numeric", second:"numeric" }));
    
    //  userProperties.setProperties(options);
    }
    
    function quickTest(){
      setDateDefaults();
      getDateString();
      }
      
    function updateDateSettings(options){
      Logger.log(options);
      var dateOptions =  JSON.stringify(options["dateOptions"]);
      Logger.log(dateOptions);
      var userProperties = PropertiesService.getUserProperties();
      userProperties.setProperty('DATE_LANGUAGE', options["language"]);
      userProperties.setProperty('DATE_OPTIONS',dateOptions);
    }
    
    function getDateString(){
      var userProperties = PropertiesService.getUserProperties();
      Logger.log(userProperties);
      var rawDateOptions = userProperties.getProperty("DATE_OPTIONS");
      Logger.log(rawDateOptions);
      var dateOptions = JSON.parse(rawDateOptions);
      Logger.log(dateOptions);
    
      var language = userProperties.getProperty("DATE_LANGUAGE");
      Logger.log(language);
      var today  = new Date(); 
      Logger.log(language);
      Logger.log(today.toLocaleString(language, dateOptions));
      return(today.toLocaleString(language, dateOptions));
    }
    
    function insertDate() {
       
      var body = DocumentApp.getActiveDocument().getBody();
      var date = getDateString();
      // Append a paragraph, with heading 1.
      var par1 = body.appendParagraph(date);
      par1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
      
      var par2 = body.appendParagraph("\n");
      par2.setHeading(DocumentApp.ParagraphHeading.NORMAL);
      return_position =  DocumentApp.getActiveDocument().newPosition(par2, 0);
    
      return(return_position);
    
    }
    
    
    
    
    