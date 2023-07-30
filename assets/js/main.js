//Global Variable
//Input data
var siteName         = document.getElementById('siteName');
var siteURL          = document.getElementById('siteURL');
var result           = document.getElementById('result');
var getElementResult = document.getElementById('getElementResult');

//Buttons
var submit = document.getElementById('submit');
var indexArray = 0;

//Validate inpute text
var existInputName = false;
var existInputURL = false;

//Regex
var regexSiteName = /^[a-zA-Z]{3,}/;
var regexSiteURL = /^www\.?[a-zA-Z]{3,}\.[a-zA-Z]{3,}$/;

//Error Massage
var errorSiteName = document.getElementById('errorSiteName');
var errorSiteURL  = document.getElementById('errorSiteURL');




//Set Array list
var bmArray ;
if (localStorage.getItem('bmLS') != null) {
    bmArray = JSON.parse(localStorage.getItem('bmLS'));
    console.log(bmArray);
    displayItems();   
}
else{
    bmArray = [];
}


//The following is CRUDS
submit.onclick = function(){
        //Create:
        if(submit.innerHTML == 'Add'){
            if(existInputName || existInputURL){
                if(existInputName)
                    errorSiteName.innerHTML = `<p class="alert-danger rounded-3">This value was recorded before ... </p>`;
                if(existInputURL)
                    errorSiteURL.innerHTML = `<p class="alert-danger rounded-3">This value was recorded before ... </p>`;
            }else{
                if(regexSiteName.test(siteName.value) && regexSiteURL.test(siteURL.value)){
                    var createBM = {
                        siteName: siteName.value,
                        siteURL: siteURL.value,
                    }
                    console.log(createBM);
                    bmArray.push(createBM);
                    console.log(bmArray);
                    //Save in Local Storage
                    localStorage.setItem('bmLS', JSON.stringify(bmArray));
                    resetFields();
                    displayItems();
                }else{
                    if(!regexSiteName.test(siteName.value)){
                        errorSiteName.innerHTML = `<p class="alert-danger rounded-3">Please Correct Site Name characters</p>`;
                    }    
                    if(!regexSiteURL.test(siteURL.value)){
                        errorSiteURL.innerHTML = `<p class="alert-danger rounded-3">Please Correct Site URL pattern</p>`;
                    }
                        
                }
            }
        }else{
            if(regexSiteName.test(siteName.value) && regexSiteURL.test(siteURL.value)){
                //Update:
                var updateBM = {
                    siteName: siteName.value,
                    siteURL: siteURL.value,
                }
                bmArray.splice(indexArray,1,updateBM);
                console.log(bmArray);
                //Save in Local Storage
                localStorage.setItem('bmLS', JSON.stringify(bmArray));
                resetFields();
                document.getElementById('submit').innerHTML = "Add";
                displayItems();

            }else{
                if(!regexSiteName.test(siteName.value)){
                    errorSiteName.innerHTML = `<p class="alert-danger rounded-3">Please Correct Site Name characters</p>`;
                }    
                if(!regexSiteURL.test(siteURL.value)){
                    errorSiteURL.innerHTML = `<p class="alert-danger rounded-3">Please Correct Site URL pattern</p>`;
                }       
            }
        }
}
//Read (display):
function displayItems(){
    var passingTags='';
    for(var i=0; i < bmArray.length; i++){
        passingTags += `
                        <div class="result row justify-content-around" onClick="setSelectorItem(${i})">
                            <h2 class="w-50">${bmArray[i].siteName}</h2>
                            <a class="btn btn-success text-capitalize" href="https://${bmArray[i].siteURL}" target="_blank"> Visit</a>
                            <button class="btn btn-danger text-capitalize" onclick="deleteItem(${i})">Delete</button>
                        </div>
                        `
    }
    result.innerHTML = passingTags;
}
//Reset values:
function resetFields(){
    siteName.value = '';
    siteURL.value = '';
}
//Convert function when delete values at submit button:
function listenDataUpdate(){
    if(siteName.value == '' && siteURL.value == ''){
        // console.log("ready ...");
        submit.innerHTML = 'Add';
    }
    // else
    //     console.log("Not Ready ...")
    errorSiteName.innerHTML ='';
    existInputName = false;
    errorSiteURL.innerHTML = '';
    existInputURL = false;
    //Validate input Data
    duplicateInput();
    

}
//Validate inpute text
function duplicateInput(){
    for(var i=0; i < bmArray.length; i++){

        if(bmArray[i].siteName.toLowerCase() == siteName.value.toLowerCase()){
            existInputName = true;
            console.log(existInputName);
        }
        if(bmArray[i].siteURL.toLowerCase() == siteURL.value.toLowerCase()){
            existInputURL = true;
            console.log(existInputURL);
        }

            
    }
}

//Read set selector:
function setSelectorItem(index){
    siteName.value = bmArray[index].siteName;
    siteURL.value = bmArray[index].siteURL;
    indexArray = index;
    // console.log(indexArray);
    document.getElementById('submit').innerHTML = "Update";
}
//Delete
function deleteItem(index){
    bmArray.splice(index,1);
    //Save in local Storage
    localStorage.setItem('bmLS', JSON.stringify(bmArray));
    displayItems();
}
