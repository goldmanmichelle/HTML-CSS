//Michelle Goldman
//MIU 1302
//Project 1


//Wait until the DOM is ready...Makes sure all API & Elements of the DOM have loaded first. 
window.addEventListener("DOMContentLoaded", function(){    


    //getElementById Function 
    
    function ac(x){
        var addNewCopier = document.getElementById(x); 
        return addNewCopier;
    }

    //Create select field element. Populate with options.
    function createGroup(){
        var formTag = document.getElementsByTagName("form"); 
            selectLi = ac('sites');
            makeSelect = document.createElement('select');
            makeSelect.setAttribute("id", "siteLocations");
        for(var i=0, j=siteLocations.length; i<j; i++) {
            var makeOption = document.createElement('option');
            var optText = siteLocations[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }

    //Find value of selected radio buttons.
    function getRadioValue(){
        var button = document.forms[0].model;
        for(var i=0; i<button.length; i++){
            if(button[i].checked){
                modelValue = button[i].value;
            }
        }
    }

    
        
    //Toggle Controls
    function toggleSwitch(x){
        switch(x){
            case "on":
                ac('copierForm').style.display = "none";
                ac('removeData').style.display = "inline";
                ac('showData').style.display = "none";
                ac('homePage').style.display = "inline";
                ac('addCopier').style.display = "inline";
                break;
            case "off":
                ac('copierForm').style.display = "inline";
                ac('removeData').style.display = "inline";
                ac('showData').style.display = "inline";
                ac('homePage').style.display = "none";
                ac('addCopier').style.display = "none";
                ac('bits').style.display  = "none";
                break;
            default:
                return false;
        }
    }

    //Store data function
    function bankData(key){
        //If there is no key, this means this is a brand new item and we need a new key.
        if(!key) {
            var mId             = Math.floor(Math.random() * 1001001);
        }else{
            //Set the id to the existing key we're editing so that it will save over the data.
            //The key is the same key that;s been passed along from the modifySubmit even handler
            //to the validate function and then passed here into the bankData function.
            mId = key;
        }
        getRadioValue();
        var bit             = {};
            bit.site        = ["Site:", ac('siteLocations').value]; //Do I need to create a location value, like email and sex?
            bit.model       = ["Model:", modelValue];
            bit.qty         = ["Quantity:", ac('quantity').value];
            bit.ag          = ["Asset ID#:", ac('assetID').value];
            bit.led         = ["Lease End Date:", ac('leaseEndDate').value];
            bit.notes       = ["Notes:", ac('notes').value];

        localStorage.setItem(mId, JSON.stringify(bit)); //JSON.stringify is used to convert info to string values since localStorage can only store strings
        alert("Copier Added!");                   
    }
 
    //Display Data function
    function revealData(){
        toggleSwitch("on");
        if(localStorage.length === 0){
            alert("There are no copiers in Local Storage so default data will be loaded.")
        autoPopData();
        }
        
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "bits");
        var makeList = document.createElement('ol');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        ac('addItemFooter').style.display = "none";
        ac('bits').style.display  = "display";
        for(var i=0, len=localStorage.length; i<len; i++){ //This is to pull the info out of local storage.
            var makeli = document.createElement('li');
            var linksLi = document.createElement('ul');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var breakTag = document.createElement('br');
            linksLi.appendChild(breakTag);
            //Convert string from local storage value back to an object by using JSON.parse.
            var obj = JSON.parse(value);
            var makeSublist = document.createElement('ul');
            makeli.appendChild(makeSublist);
            pullImage(obj.site[1], makeSublist);
            for(var n in obj){
                var makeSublistLi = document.createElement('ol');
                makeSublist.appendChild(makeSublistLi);
                var optSubText = obj[n][0] + " " + obj[n][1];
                makeSublistLi.innerHTML = optSubText;
                makeSublist.appendChild(linksLi);
            }
            makeButtonLinks(localStorage.key(i), linksLi); //Create edit/delete buttons/links for each item in local storage.       
        }
    }
    
     //Get the image for the right category.
    function pullImage(siteName, makeSublist){
        var miImagesLi = document.createElement('ul');
        makeSublist.appendChild(miImagesLi);
        var addImage = document.createElement('img');
        var imgSource = addImage.setAttribute("src", "img/"+ siteName + ".png");
        miImagesLi.appendChild(addImage);
    }
    
    function autoPopData(){
        //The actual JSON object data required for this to work is coming from our json.js file which is loading from our additem.html page.
        //Store the Json object into local storage by creating a loop.
        for(var n in json){
            var mId             = Math.floor(Math.random() * 1001001);
            localStorage.setItem(mId, JSON.stringify(json[n]));
        }
    }
    
    //Make edit/delete links for each stored item when displayed.
    function makeButtonLinks(key, linksLi){
        //add edit single item link
        var editButton = document.createElement('a');
        editButton.href = "#";
        editButton.key = key;
        var changeInput = "Edit Data";
        editButton.addEventListener("click", editData);
        editButton.innerHTML = changeInput;
        linksLi.appendChild(editButton);
 
        //add line break
        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);
        
        //add delete single item link
        var deleteButton = document.createElement('a');
        deleteButton.href = "#";
        deleteButton.key = key;
        var deleteInput = "Delete Data";
        deleteButton.addEventListener("click", deleteData);
        deleteButton.innerHTML = deleteInput;
        linksLi.appendChild(deleteButton);       
    }
    //Edit Data Function
    function editData(){
        //Grab the data from our item from local storage
        var value = localStorage.getItem(this.key); //this.key is the same as the line above editButton.key
        var bit = JSON.parse(value); //This is the reverse of JSON.stringify used in the bankData function to store data in localStorage
        //shows our form again
        toggleSwitch("off");
        
        //populate form fields with localStorage values
        ac('siteLocations').value = bit.site[1];
        var button = document.forms[0].model;
        for(var i=0; i<button.length; i++){
            if(button[i].value == bit.model[1] ){
                button[i].setAttribute("checked", "checked");
            }
        }
        ac('quantity').value        = bit.qty[1];
        ac('assetID').value         = bit.ag[1];
        ac('leaseEndDate').value    = bit.led[1];
        ac('notes').value           = bit.notes[1];

        //Remove the initial listener from the last input 'save copier' button
        saveData.removeEventListener("click", bankData);
        //Change Submit button value to say Edit Button
        ac('submit').value = "Edit Copier Data";
        var modifySubmit = ac('submit');
        //Save the key value established in this function as a property of the modifySubmit event.
        //This is so we can use that value when we save the data we edited.
        modifySubmit.addEventListener("click", validateCopierForm);
        modifySubmit.key = this.key;
    }
    
    //Delete individual items from local storage.
    function deleteData() {
        var inquire = confirm("Deleting a copier is permanent. Are you sure you want to continue?");
        if(inquire) {
            localStorage.removeItem(this.key);
            window.location.reload();
        }else{
            alert("The copier was NOT deleted.") ;   
        }
    }
    //Clear local storage
    function wipeData (){
        if(localStorage.length === 0){
            alert("There are no copiers to remove."); 
        } else{
            localStorage.clear();
            alert("All copiers have been removed!");
            window.location.reload();
            return false; 
            
        }
        
    }
   //Validate form
    function validateCopierForm(ed){
        //Define the elements we want to check
        var getAssetID  = ac('assetID');
   
        //Reset Error Messages
        alertMsg.innerHTML = "";
        getAssetID.style.background = "white";
        
        //Get error messages
        var errorMsgArray = [ ];       
        //AssetID# Validation
        if(getAssetID.value === "" ){ 
            var assetIDError = "Please type in the copier's Asset ID#!";
            getAssetID.style.background = "#FF3333";
            errorMsgArray.push(assetIDError);
        }
        //If there were error, display them on the screen.
        if(errorMsgArray.length >= 1){
            for(var i=0, j=errorMsgArray.length; i < j; i++){
               var input = document.createElement('ul');
                input.innerHTML = errorMsgArray[i];
                alertMsg.appendChild(input);
            }
            ed.preventDefault();
            return false;
        }else{
            //If all is ok, save our data. Send key value (which came from the editData function.
            //Remember this key value was passed through the modifySubmit event listener as a property.)
            bankData(this.key);
        }
    }
    

    //Variable Defaults. 
    var siteLocations= ["--Choose A Location--", "--Satellite Office--" , "Main Office", "Miami Office", "Orlando Office", "South Carolina", "--Jobsite--" , "Circle Bayshore", "FIU", "Flagler Village", "Harbourside", "NSU", "Orion Jet Center", "PBC Jails", "Port Everglades", "Sunpower ASU", "Sunpower Dolphin"],
        modelValue,
        alertMsg = ac('errors');
    ;
    createGroup();
    
    //Set Link & Submit Click Events
    var showData = ac('showData');
    showData.addEventListener("click", revealData);
    var removeData = ac('removeData');
    removeData.addEventListener("click", wipeData);
    var saveData = ac('submit');
    saveData.addEventListener("click", validateCopierForm); //remove bankData
    
});