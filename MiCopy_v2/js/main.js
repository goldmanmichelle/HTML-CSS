//Michelle Goldman
//MIU 1302
//Project 4
//Gold App

//Module Tabs


var parseaddNewCopierForm = function() {
    //use form data here:
    console.log(data);
}
		

		
$('#addCopier').on('pageinit', function(){

		var acForm = $('#addNewCopierForm'),
                    acerrorslink = $('#acerrorslink')
                    
                ;
                    
                    
		    acForm.validate({
			invalidHandler: function(form, validator) {
                            acerrorslink.click();
                            
                        },   
                    
			submitHandler: function() {
                            var data = acForm.serializeArray();
                        storeData(data);
                        console.log(data);
		}
	});
    
	
	//any other code needed for addItem page goes here
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.


var autofillData = function (){
	 
};

var getData = function(){

};


var storeData = function(data,key){
    if(!key) {
            var id             = Math.floor(Math.random() * 1001001);
    }else{
             id = key;
    }
        
    var bit             = {};
        bit.site        = ["Site:", $('#copierLocation').val()]; 
        bit.model       = ["Model:", $('#model').val()];
        bit.qty         = ["Quantity:", $('quantity').val()];
        bit.ag          = ["Asset ID#:", $('#asset').val()];
        bit.own         = ["Ownership:", $('#ownership').val()];
        bit.led         = ["Lease End Date:", $('#led').val()];
        bit.status      = ["Copier Status:", $('#copierStatus').val()];
        bit.notes       = ["Notes:", $('notes').val()];

        localStorage.setItem(id, JSON.stringify(bit)); //JSON.stringify is used to convert info to string values since localStorage can only store strings
        alert("Copier Added!");                   
          
    
};
      

var  deleteItem = function (){
			
};
					
var clearLocal = function(){
 
};


