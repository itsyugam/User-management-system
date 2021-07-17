var role;
var superadminData;
var adminData;
var roledisplay = document.querySelector(".role");

var usertable = document.querySelector(".usertable");
var useradd = document.getElementById("useradd");
var useraddbtn = document.querySelector(".useraddbtn");
var userpopup = document.querySelector(".userpopup");
var userpopupclose = document.querySelector(".userclose");
var userpopupaddbtn = document.getElementById("userpopupaddbtn");

var admintable = document.querySelector(".admintable");
var adminadd = document.getElementById("adminadd");
var adminaddbtn = document.querySelector(".adminaddbtn");
var adminpopup = document.querySelector(".adminpopup");
var adminpopupclose = document.querySelector(".adminclose");
var adminpopupaddbtn = document.getElementById("adminpopupaddbtn");

// ________________________________________________________________________CHANGED THINGS______________________________
var superadmintable = document.querySelector(".superadmintable");
var superadminadd = document.getElementById("superadminadd");
var superadminaddbtn = document.querySelector(".superadminaddbtn");
var superadminpopupadd = document.querySelector(".superadminpopupadd");
var superadminaddpopupclose = document.querySelector(".superadminaddpopupclose");
var superadminpopupaddbtn = document.getElementById("superadminpopupaddbtn");


//________ common to both admin and superadmin role change click
var changerolename;
function editrole(e,name) {
  if (e.classList[0] === "fromsuperadmin") {
    changerolename = name;
    superadminpopup.classList.add("superadmin-bg-active");
    document.querySelector(".roleerror").innerText = "";
  } else if (e.classList[0] === "fromadmin") {
    changerolename = name;
    adminrolepopup.classList.add("adminrole-bg-active");
    document.querySelector(".adminroleerror").innerText = "";
  }
}

var superadminpopup = document.querySelector(".superadminpopup");
var superadminpopupclose = document.querySelector(".superadminclose");
var superadminpopupeditbtn = document.querySelector(".superadminpopupeditbtn");

superadminpopupeditbtn.addEventListener("click", function (e) {
  var data = document.querySelector(".superadminroleselect");
  if (data.value === "") {
    document.querySelector(".roleerror").innerText = "Please select role!";
    data.value = "";
  } else {
    var all_data={'user':changerolename,'role':data.value};
    fetch('/update',{
    method:'POST',
    headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify(all_data)
    }).then(response=>{
        return response.json()
    }).then(data=> {
      if(data.error!=undefined){
        data.value = "";
        superadminpopup.classList.remove("superadmin-bg-active");
        swal("Server issue", "try again...",'error')
      }
      else{
      data=data.result;
      var s_count=parseInt(document.getElementById('sno').innerText)-1;
      document.getElementById('sno').innerHTML=s_count;
      var a_count=parseInt(document.getElementById('ano').innerText)+1;
      document.getElementById('ano').innerHTML=a_count;
      document.getElementById(`row-${data[0]}`).style.display='none';
      admintable.innerHTML+=`<tr id='row-${data[0]}'><td>${a_count}</td>
              <td>${data[0]}</td>
              <td>${data[1]}</td>
              <td>${data[2]}</td>
              <td>
                <button class="editbtn"><i name='${data[0]}' class="fromadmin fas fa-user-tie" onclick="editrole(this,'${data[0]}')"></i></button>
                <button class="deletebtn" id='del-${data[0]}'><i class="fas fa-trash-alt" onclick="del('${data[0]}','admin')"></i></button>
              </td>
              </tr>`;
              data.value = "";
              superadminpopup.classList.remove("superadmin-bg-active");
              swal("updated Successfuly", "","success")
      }
    });
  }
});

superadminpopupclose.addEventListener("click", function (e) {
  superadminpopup.classList.remove("superadmin-bg-active");
});

//________________ for admin role change

var adminrolepopup = document.querySelector(".adminrolepopup");
var adminroleclose = document.querySelector(".adminroleclose");
var adminpopuprolebtn = document.querySelector(".adminpopuprolebtn");

adminpopuprolebtn.addEventListener("click", function (e) {
  var data = document.querySelector(".adminroleselect");
  if (data.value === "") {
    document.querySelector(".adminroleerror").innerText = "Please select role!";
    data.value = "";
  } else {
    var all_data={'user':changerolename,'role':data.value};
    fetch('/update',{
    method:'POST',
    headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify(all_data)
    }).then(response=>{
        return response.json()
    }).then(data=> {
      if(data.error!=undefined){
        data.value = "";
        adminpopup.classList.remove("admin-bg-active");
        swal("Server issue", "try again...",'error')
      }
      else{
      data=data.result;
      var s_count=parseInt(document.getElementById('sno').innerText)+1;
      document.getElementById('sno').innerHTML=s_count;
      var a_count=parseInt(document.getElementById('ano').innerText)-1;
      document.getElementById('ano').innerHTML=a_count;
      document.getElementById(`row-${data[0]}`).style.display='none';
      superadmintable.innerHTML+=`<tr id='row-${data[0]}'><td>${s_count}</td>
              <td>${data[0]}</td>
              <td>${data[1]}</td>
              <td>${data[2]}</td>
              <td>
                <button class="editbtn"><i name='${data[0]}' class="fromsuperadmin fas fa-user-tie" onclick="editrole(this,'${data[0]}')"></i></button>
              </td>
              </tr>`;
              data.value = "";
              adminrolepopup.classList.remove("adminrole-bg-active");
              swal("updated Successfuly", "","success")
            }
    });
  }
});

adminroleclose.addEventListener("click", function (e) {
  adminrolepopup.classList.remove("adminrole-bg-active");
});

// ____________________________________________________________________________________________________________

// add superadmin
superadminpopupaddbtn.addEventListener("click", function () {
  var superadmin_name = document.getElementById("superadmin_name");
  var superadmin_emailid = document.getElementById("superadmin_email");
  var superadmin_ans = document.querySelector(".superadmin_ans");
  var superadmin_ques = document.querySelector(".superadmin_ques");

  if (
    superadmin_name.value !== "" &&
    superadmin_emailid.value !== "" &&
    superadmin_ans.value !== "" // change
  ) {
    var mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (superadmin_emailid.value.match(mailformat)) {
    fetch('/create',{
    method:'POST',
    headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify({'role':'superadmin','name':superadmin_name.value,'email':superadmin_emailid.value,'ques':superadmin_ques.value,'ans':superadmin_ans.value})
    }).then(response=>{
        return response.json()
    }).then(data=> {
    if(data.nameerror != undefined){
      document.querySelector(".superadminadderror").innerText=data.nameerror;
    }
    else if(data.error != undefined){
      document.querySelector(".superadminadderror").innerText=''
      superadmin_name.value = "";
      superadmin_emailid.value = "";
      superadmin_ans.value = "";
      superadminpopupadd.classList.remove("superadminadd-bg-active");
      swal("Server issue", "try again...",'error')
    }
    else{
      document.querySelector(".superadminadderror").innerText=''
      var s_count=parseInt(document.getElementById('sno').innerText)+1;
      document.getElementById('sno').innerHTML=s_count;
      superadmintable.innerHTML+=`<tr id='row-${superadmin_name.value}'><td>${s_count}</td>
              <td>${superadmin_name.value}</td>
              <td>${superadmin_emailid.value}</td>
              <td>superadmin</td>
              <td><button class="editbtn" id='edit-${superadmin_name.value}'><i class="fromsuperadmin fas fa-user-tie" onclick="editrole(this)"></i></button></td>
              </tr>`;
      superadmin_name.value = "";
      superadmin_emailid.value = "";
      superadmin_ans.value = "";
      superadminpopupadd.classList.remove("superadminadd-bg-active");
      swal("Created Successfuly", "","success")
      
    }
  });
    } else {
      document.querySelector(".superadminadderror").innerText =
        "Invalid mail id";
    }
  } else {
    document.querySelector(".superadminadderror").innerText =
      "Fields are empty";
  }
});

superadminaddbtn.addEventListener("click", function () {
  superadminpopupadd.classList.add("superadminadd-bg-active");
  document.querySelector(".superadminadderror").innerText = "";
});

superadminaddpopupclose.addEventListener("click", function () {
  superadminpopupadd.classList.remove("superadminadd-bg-active");
});


// add user 
userpopupaddbtn.addEventListener("click", function () {
  var user_name = document.getElementById("user_name");
  var user_emailid = document.getElementById("user_email");
  var user_ans = document.querySelector(".user_ans"); // change
  var user_ques = document.querySelector(".user_ques"); // change
  if (
    user_name.value !== "" &&
    user_emailid.value !== "" &&
    user_ans.value !== "" // change
  ) {
    var mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (user_emailid.value.match(mailformat)) {
      fetch('/create',{
    method:'POST',
    headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify({'role':'user','name':user_name.value,'email':user_emailid.value,'ques':user_ques.value,'ans':user_ans.value})
    }).then(response=>{
        return response.json()
    }).then(data=> {
      console.log(data)
      if(data.nameerror != undefined){
      document.querySelector(".usererror").innerText=data.nameerror;
    }
    else if(data.error != undefined){
      document.querySelector(".usererror").innerText=''
      user_name.value = "";
      user_emailid.value = "";
      user_ans.value = "";
      userpopupadd.classList.remove("user-bg-active");
      swal("Server issue", "try again...",'error')
    }
    else{
      document.querySelector(".usererror").innerText=''
      var u_count=parseInt(document.getElementById('uno').innerText)+1;
      document.getElementById('uno').innerText=u_count;
      usertable.innerHTML+=`<tr id='row-${user_name.value}'><td>${u_count}</td>
              <td>${user_name.value}</td>
              <td>${user_emailid.value}</td>
              <td>user</td>
              <td><button class="deletebtn" id='del-${user_name.value}' onclick="del('${user_name.value,'user'}')"><i class="fas fa-trash-alt"></i></button></td>
              </tr>`;
      user_name.value = "";
      user_emailid.value = "";
      user_ans.value = "";
      userpopup.classList.remove("user-bg-active");
      swal("Created Successfuly", "","success")
    }
  });
    } else {
      document.querySelector(".usererror").innerText = "Invalid mail id";
    }
  } else {
    document.querySelector(".usererror").innerText = "Fields are empty";
  }
});

useraddbtn.addEventListener("click", function () {
  userpopup.classList.add("user-bg-active");
  document.querySelector(".usererror").innerText = "";
});

userpopupclose.addEventListener("click", function () {
  userpopup.classList.remove("user-bg-active");
});


// Add admin
adminpopupaddbtn.addEventListener("click", function () {
  var admin_name = document.getElementById("admin_name");
  var admin_emailid = document.getElementById("admin_email");
  var admin_ans = document.querySelector(".admin_ans"); // change
  var admin_ques = document.querySelector(".admin_ques"); // change

  if (
    admin_name.value !== "" &&
    admin_emailid.value !== "" &&
    admin_ans.value !== "" // change
  ) {
    var mailformat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (admin_emailid.value.match(mailformat)) {
      fetch('/create',{
    method:'POST',
    headers:{
    'Content-Type':'application/json'
    },
    body:JSON.stringify({'role':'admin','name':admin_name.value,'email':admin_emailid.value,'ques':admin_ques.value,'ans':admin_ans.value})
    }).then(response=>{
        return response.json()
    }).then(data=> {
      if(data.nameerror != undefined){
      document.querySelector(".adminerror").innerText=data.nameerror;
    }
    else if(data.error != undefined){
      document.querySelector(".adminerror").innerText=''
      admin_name.value = "";
      admin_emailid.value = "";
      admin_ans.value = "";
      adminpopupadd.classList.remove("admin-bg-active");
      swal("Server issue", "try again...",'error')
    }
    else{
      document.querySelector(".adminerror").innerText=''
      var a_count=parseInt(document.getElementById('ano').innerText)+1;
      document.getElementById('ano').innerText=a_count;
      admintable.innerHTML+=`<tr id='row-${admin_name.value}'><td>${a_count}</td>
              <td>${admin_name.value}</td>
              <td>${admin_emailid.value}</td>
              <td>admin</td>
              <td>
                <button class="editbtn" id='edit-${admin_name.value}'><i class="fromadmin fas fa-user-tie" onclick="editrole(this)"></i></button>
                <button class="deletebtn" id='del-${admin_name.value}' onclick="del('${admin_name.value}','admin')"><i class="fas fa-trash-alt"></i></button>
              </td>
              </tr>`;
      admin_name.value = "";
      admin_emailid.value = "";
      admin_ans.value = "";
      adminpopup.classList.remove("admin-bg-active");
      swal("Created Successfuly", "","success")
    }
  });
    } else {
      document.querySelector(".adminerror").innerText = "Invalid mail id";
    }
  } else {
    document.querySelector(".adminerror").innerText = "Fields are empty";
  }
});

adminaddbtn.addEventListener("click", function () {
  adminpopup.classList.add("admin-bg-active");
  document.querySelector(".adminerror").innerText = "";
});

adminpopupclose.addEventListener("click", function () {
  adminpopup.classList.remove("admin-bg-active");
});
// ---------------------------------------------------------------------------------------

var name=''
function del(name,role){
  name=name;
  role=role;
  console.log(name,role)
  fetch(`/delete?name=${name}`)
  .then(function(data){
    data=data.json();
    return data
  })
  .then(function (result) {
           if(result.error != undefined){
            swal("Server issue", "try again...",'error')
           }
           else{
             document.getElementById(`row-${name}`).style='display:none';
             if(role=='user'){
                var u_count=parseInt(document.getElementById('uno').innerText)-1;
                document.getElementById('uno').innerText=u_count;
             }
             if(role=='admin'){
              var a_count=parseInt(document.getElementById('uno').innerText)-1;
                document.getElementById('ano').innerText=a_count;
             }
             swal(result.message, "","success")
           }
      });
    }

var logout=document.getElementById("logout");
logout.addEventListener("click", function () {
  document.location.href='/logout';
});
