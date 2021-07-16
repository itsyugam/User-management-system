var forgotcard = document.querySelector(".forgotcard");

// ________________________________________________________________________forgot card functionality
var  conti = document.querySelector(".contbtn");
var  sub = document.querySelector(".subbtn");
var  changebtn = document.querySelector(".changebtn");
var  cancel = document.querySelector(".cancelbtn");
var ferror = document.querySelector(".ferror");
var fuserques = document.querySelector(".fuserques");
var fuserans = document.querySelector(".fuserans");
var newpass = document.querySelector(".newpass");
var cnewpass = document.querySelector(".cnewpass");
var hr = document.querySelector(".hr");

var fuser; 
var checkuserans;
var lowerCaseLetters = /[a-z]/g;
var upperCaseLetters = /[A-Z]/g;
var numbers = /[0-9]/g;
// var  = document.querySelector(".verifybtn");
// var  = document.querySelector(".mycard");
// var  = document.querySelector(".forgotbtn");
// var  = document.querySelector(".forgotpanel");
// var  = document.querySelector(".rightside");

conti.addEventListener("click",function(){
    
    var checkusername = "rathi"; 

    fuser = document.querySelector(".fusername");
    if(fuser.value === ""){
        ferror.style.display="block";
        ferror.innerText = "Empty!";
    }
    else if(fuser.value !== checkusername){
        ferror.style.display="block";
        ferror.innerText = "Invalid username";
    }
    else{
        ferror.style.display="none";
        fuser.style.display = "none";
        conti.style.display = "none";
        fuserques.style.display = "block";
        fuserans.style.display = "block";
        sub.style.display = "block";
    }

});

cancel.addEventListener("click",function(){
    window.location.href='/'; 
});


sub.addEventListener("click",function(){
    checkuserans = "cats"; 
    if(fuserans.value === ""){
        ferror.style.display="block";
        ferror.innerText = "Empty!";
    }
    else if(fuserans.value === checkuserans){
        ferror.style.display="none";
        fuserques.style.display = "none";
        fuserans.style.display = "none";
        sub.style.display = "none";
        changebtn.style.display = "block";
        newpass.style.display ="block";
        cnewpass.style.display ="block";
    }
    else{
        ferror.style.display="block";
        ferror.innerText = "Wrong answer";
    }
});

changebtn.addEventListener("click",function(){
    if(newpass.value === "" || cnewpass.value === ""){
        ferror.style.display="block";
        ferror.innerText = "Empty!";
    }
    else if(!newpass.value.match(lowerCaseLetters)){
        ferror.style.display="block";
        ferror.innerText = "at least 1 lower case ";
    }
    else if(!newpass.value.match(upperCaseLetters)){
        ferror.style.display="block";
        ferror.innerText = "at least 1 upper case ";
    }
    else if(!newpass.value.match(numbers)){
        ferror.style.display="block";
        ferror.innerText = "at least 1 number ";
    }
    else if(newpass.value.length < 8){
        ferror.style.display="block";
        ferror.innerText = "length > 8";
    }
    else if(newpass.value !== cnewpass.value){
        ferror.style.display="block";
        ferror.innerText = "password does not match";
    }
    else{
        forgotcard.style.display = "none";
        ferror.style.display = "none";
        logincard.style.display = "inline-flex";
        swal("Password Changed","Successfully","success").then(()=>{
            window.location.reload();
        });
        
    }
});







