//Currently selected user
var selected = 0;

//curent sorting method
var sortedBy = "";

//view active member only
var memberOnly = false;

var currentProfile;

const INTEREST = ["Tech|tech", "F&B|fnb", "Fashion|fashion", "Arts & Design|artsndesign", "Books & Magz|booksnmagz", "Financial|financial", "Travel|travel", "Hospitality|hospitality", "Entertainment|entertainment"];
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const HP_REGEX = /^[0-9]{10,12}$/;
const NIM_REGEX = /^[0-9]{8}$/;
const LINE_REGEX = /^@?([A-Za-z0-9\.\-_]+)$/;
const NAME_REGEX = /[a-zA-Z]+/;
const INSTA_REGEX = /^@?(.+)$/; //TODO replace placeholder
const FILLED_REGEX = /[a-zA-Z]+/;

//save edit
function saveProfile(){
  // Validasi
  var tervalidasi = true;

  // Validasi email
  if(EMAIL_REGEX.test($("#updateEmail").val().toLowerCase())){
    $("#email-feedback").html("Email tidak valid");
    $("#updateEmail").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#updateEmail").addClass("is-invalid");
  }

  //Validasi no hp
  if(HP_REGEX.test($("#updateMobile").val())){
    $("#regisHP").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#regisHP").addClass("is-invalid");
  }

  if(LINE_REGEX.test($("#updateLINE").val())){
    $("#updateLINE").removeClass("is-invalid");
    var hasil = $("#updateLINE").val().match(LINE_REGEX);
    $("#updateLINE").val(hasil[1]);
  }else {
    tervalidasi = false;
    $("#updateLINE").addClass("is-invalid");
  }

  //validasi nama minimal 1 huruf
  if(NAME_REGEX.test($("#updateNama").val())){
    $("#updateNama").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#updateNama").addClass("is-invalid");
  }

  //Validasi nick name minimal 1 huruf
  if(NAME_REGEX.test($("#updateNick").val())){
    $("#updateNick").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#updateNick").addClass("is-invalid");
  }

  //Validasi insta
  if(INSTA_REGEX.test($("#updateInsta").val())){
    $("#updateInsta").removeClass("is-invalid");
    var hasil = $("#updateInsta").val().match(INSTA_REGEX);
    $("#updateInsta").val(hasil[1]);
  }else {
    tervalidasi = false;
    $("#updateInsta").addClass("is-invalid");
  }

    // Validasi interests
  if($("[name=interest]:checked").length >= 2){
    $("#update").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#updateInter").addClass("is-invalid");
  }

    //Validasi lainnya
  if(FILLED_REGEX.test($("#updateAbout").val())){
    $("#updateAbout").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#updateAbout").addClass("is-invalid");
  }

  if(FILLED_REGEX.test($("#updateAlamat").val())){
    $("#updateAlamat").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#updateAlamat").addClass("is-invalid");
  }

  // Submit
  if(tervalidasi){
    $("#updateButton").hide();
    $("#updateButtonLoc").append(`<div id="updateLoader" class="loader loader-small"></div>`);

    $.ajax({
      method: "PUT",
      url: SERVER_URL+"/api/user/"+currentProfile.id,
      data: { name: $("#updateNama").val(),
              email: $("#updateEmail").val(),
              interests: $('[name=interest]:checked').map(function() {return this.value;}).get().join(','), //$("#updateInter").val(),
              nickname: $("#updateNick").val(),
              about_me: $("#updateAbout").val(),
              line_id: $("#updateLINE").val(),
              instagram: $("#updateInsta").val(),
              mobile: $("#updateMobile").val(),
              address: $("#updateAlamat").val()}
    })
    .done(function( msg ) {
      $("#updateButton").show();
      $("#updateLoader").remove();
      console.log("sukses kirim");
      console.log(msg);
      if(typeof msg.error != "undefined"){
        if(msg.error.text == "Error, nothing updated."){
          alert("Sukses");
          location.reload();
        }else{
          alert("Error : "+msg.error.text);
        }
      }else {
        alert("Sukses");
        location.reload();
      }



    }).fail(function( jqXHR, textStatus ) {
      $("#updateButton").show();
      $("#updateLoader").remove();
      alert( "Connection or server error: " + textStatus +"/" +jqXHR.statusText );
    });
  }
}

//edit profil
function editProfile(){


  //make form
  dataHTML = `

              <table class="table table-borderless">
                <tbody>
                  <tr class="d-flex">
                    <td class="col-3">Nama</td>
                    <td class="col-9">
                      <div class="input-group">
                        <input type="text" class="form-control" id="updateNama" value="`+currentProfile.name+`"/>
                        <div class="invalid-feedback">
                          Nama tidak valid
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="pb-3 d-flex">
                    <td class="col-3">Panggilan</td>
                    <td class="col-9">
                      <div class="input-group">
                        <input type="text" class="form-control" id="updateNick" value="`+currentProfile.nickname+`"/>
                        <div class="invalid-feedback">
                          Nama tidak valid
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr class="table-separator d-flex">
                    <td class="col-3">Email</td>
                    <td class="col-9">
                      <div class="input-group">
                        <input type="email" class="form-control" id="updateEmail" value="`+currentProfile.email+`"/>
                        <div class="invalid-feedback">
                          Email tidak valid
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">No. Telp</td>
                    <td class="col-9">
                      <div class="input-group">
                        <input type="text" class="form-control" id="updateMobile" value="`+currentProfile.mobile+`"/>
                        <div class="invalid-feedback">
                          Nomor tidak valid
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">ID LINE</td>
                    <td class="col-9">
                      <div class="input-group">
                        <input type="text" class="form-control" id="updateLINE" value="`+currentProfile.line_id+`"/>
                        <div class="invalid-feedback">
                          ID LINE tidak valid
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">ID Instagram</td>
                    <td class="col-9">
                      <div class="input-group">
                        <input type="text" class="form-control" id="updateInsta" value="`+currentProfile.instagram+`"/>
                        <div class="invalid-feedback">
                          ID Instagram tidak valid
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="pb-3 d-flex">
                    <td class="col-3">Alamat</td>
                    <td class="col-9">
                      <div class="input-group">
                        <input type="text" class="form-control" id="updateAlamat" value="`+currentProfile.address+`"/>
                        <div class="invalid-feedback">
                          Harus terisi
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr class="table-separator d-flex">
                    <td class="col-3">Tentang</td>
                    <td class="col-9">
                      <div class="input-group">
                        <textarea class="form-control" maxlength="150" id="updateAbout" >`+currentProfile.about_me+`</textarea>
                        <div class="invalid-feedback">
                          Harus terisi
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="d-flex">
                    <td class="col-3">Interest</td>
                    <td class="col-9">
                      <div class="input-group">
                        <input type="hidden" class="form-control" id="updateInter"/>
                        <div class="searchable-container">`;

  //interests
  for(var i = 0; i<INTEREST.length;i++){
    var dataInterest = INTEREST[i].split('|',2);

    dataHTML +=   `   <div class="info-block block-info clearfix">
            <div class="square-box pull-left">
                <span class="glyphicon glyphicon-tags glyphicon-lg"></span>
            </div>
            <div data-toggle="buttons" class="btn-group bizmoduleselect">
              <label class="btn btn-default`;
    if(currentProfile.interests.split(",").includes(dataInterest[1])){
      dataHTML += ` active">
                  <div class="bizcontent">
                    <input type="checkbox" name="interest" autocomplete="off" value="`+dataInterest[1]+`" checked>
                    <span class="glyphicon glyphicon-ok glyphicon-lg"></span>
                    <span>`+dataInterest[0]+`</span>
                  </div>
                </label>
              </div>
            </div>`;

    }else{
      dataHTML+=`">
                  <div class="bizcontent">
                    <input type="checkbox" name="interest" autocomplete="off" value="`+dataInterest[1]+`">
                    <span class="glyphicon glyphicon-ok glyphicon-lg"></span>
                    <span>`+dataInterest[0]+`</span>
                  </div>
                </label>
              </div>
            </div>`;
    }



  }


  dataHTML += `

                          </div>

                          <div class="invalid-feedback">
                              Minimal memilih dua item
                          </div>
                      </div>
                    </td>
                  </tr>
                </tbody>

              </table>
              <div id="updateButtonLoc">
              <span id="updateButton" class="btn btn-primary" onclick="saveProfile()">Simpan</span>
              </div>`;



  $("#userDataLoc").empty();
  $("#userDataLoc").append(dataHTML);

  $('#search').on('keyup', function() {
      var pattern = $(this).val();
      $('.searchable-container .items').hide();
      $('.searchable-container .items').filter(function() {
          return $(this).text().match(new RegExp(pattern, 'i'));
      }).show();
  });
}


//Set sorting method
function sortUser(type){
  $("#userList").empty();
  $("#userList").append(`
    <li class="list-group-item"><div class="loader loader-small"></div></li>
    <span href="#" class="list-group-item list-group-item-action text-center">Loading</span>
    `);
  if(sortedBy != type){
    sortedBy = type;
    getAllUsers();
  }
}

// Get url
function getUserURL(){
  if(memberOnly){
    return "/api/members";
  }else {
    return "/api/users";
  }
}

// Get all user data and display them in list
function getAllUsers(){

  //Request all user
  $.ajax({
    method: "GET",
    url: SERVER_URL+getUserURL(),
    data:{"sort":sortedBy},
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {
    //Check if not error
    if(typeof msg.error != "undefined"){
      //Error
      alert("Gagal : " + msg.error.text);
    }else {
      //Berhasil

      //Empty the list
      $("#userList").empty();
      var isiList = "";
      $.each(msg,function(index, value){
        isiList += `<span onclick="getUserData('`+ value.id +`');" id="user-`+value.id+`"
                    class="list-group-item list-group-item-action">` + value.name + `</span>`;
      });

      //Append to location
      $("#userList").append(isiList);

      //check apakah ada yang sudah diselect
      if(argsId!=""){
        if(!isNaN(argsId)){
          getUserData(argsId);
        }
      }
    }

  }).fail(function( jqXHR, textStatus ) {
    //Error dalam pengiriman
    alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
  });
}

//coret
function coretUser(){
  $.ajax({
    method: "DELETE",
    url: SERVER_URL+"/api/user/"+currentProfile.id,
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {
    //Check if not error
    if(typeof msg.error != "undefined"){
      //Error
      alert("Gagal : " + msg.error.text);
    }else {
      //Berhasil
      alert("Berhasil");

      $("#userDataLoc").empty();
      $("#userDataLoc").append(`<h2 class="align-middle text-center">Silahkan pilih user</h2>`);
      selected = 0;
      currentProfile = {};

      getAllUsers();

    }

  }).fail(function( jqXHR, textStatus ) {
    //Error dalam pengiriman
    alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
  });
}

//uncoret
function uncoretUser(){
  $.ajax({
    method: "POST",
    url: SERVER_URL+"/api/user/restore",
    data:{uid:currentProfile.id},
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {
    //Check if not error
    if(typeof msg.error != "undefined"){
      //Error
      alert("Gagal : " + msg.error.text);
    }else {
      //Berhasil
      alert("Berhasil");

      $("#userDataLoc").empty();
      $("#userDataLoc").append(`<h2 class="align-middle text-center">Silahkan pilih user</h2>`);
      selected = 0;
      currentProfile = {};

      getAllUsers();

    }

  }).fail(function( jqXHR, textStatus ) {
    //Error dalam pengiriman
    alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
  });
}

//show coret modal box
function coretModal(){
  $("#deleteModal .modal-body").html("Yakin coret "+currentProfile.tec_regno+" ("+currentProfile.name+") ?")
  $('#deleteModal').modal('show');
}

//show coret modal box
function uncoretModal(){
  $("#uncoretModal .modal-body").html("Yakin kembalikan "+currentProfile.tec_regno+" ("+currentProfile.name+") ?")
  $('#uncoretModal').modal('show');
}

// Get single user data and display them
function getUserData(userId){

  //Add loader
  $("#userDataLoc").empty();
  $("#userDataLoc").append(`<div class="loader loader-big"></div>`);

  //Cek apakah ada user yang dipilih sebelumya
  if(selected!=0){
    //Deselect last selected user
    $("#user-"+selected).removeClass("active");
  }

  //Efek aktif pada tombol
  $("#user-"+userId).addClass("active");
  selected = userId;

  //Load profile

  $.when( getProfileData(userId) ).then(function( profileData, textStatus, jqXHR ) {

    currentProfile = profileData;

    //Fill data
    dataHTML = `<div class="row">
                  <h3 class="col-sm-8">`+ profileData.name +`</h3>
                  <div class="col-sm-4">
                    <div class="row">
                      <span onclick="editProfile();" class="mt-2 mt-sm-0 col-sm-5 btn btn-primary">Edit</span>`
    if(profileData.is_active==1){
      dataHTML += `<span onclick="coretModal();" class="mt-2 mt-sm-0 col-sm-5 offset-sm-2 btn btn-danger">Coret</span>`
    }else {
      dataHTML += `<span onclick="uncoretModal();" class="mt-2 mt-sm-0 col-sm-5 offset-sm-2 btn btn-success">Uncoret</span>`
    }
    dataHTML += `</div>
                  </div>
                </div>
                <hr/>
                <table class="table table-borderless">
                  <tbody>
                    <tr class="d-flex">
                      <td class="col-3">No TEC</td>
                      <td class="col-9">: `+ profileData.tec_regno +`</td>
                    </tr>
                    <tr class="d-flex">
                      <td class="col-3">NIM</td>
                      <td class="col-9">: `+ profileData.NIM +`</td>
                    </tr>
                    <tr class="d-flex">
                      <td class="col-3">Nama</td>
                      <td class="col-9">: `+ profileData.name +`</td>
                    </tr>
                    <tr class="d-flex">
                      <td class="col-3">Panggilan</td>
                      <td class="col-9">: `+ profileData.nick +`</td>
                    </tr>
                    <tr class="d-flex">
                      <td class="col-3">Aktif</td>
                      <td class="col-9">: `+ getCheckCross(profileData.is_active) +`</td>
                    </tr>
                    <tr class="d-flex">
                      <td class="col-3">Lunas</td>
                      <td class="col-9">: `+ getCheckCross(profileData.lunas) +`</td>
                    </tr>
                    <tr class="pb-3 d-flex">
                      <td class="col-3">Admin</td>
                      <td class="col-9">: `+ getCheckCross(profileData.isAdmin) +`</td>
                    </tr>

                    <tr class="table-separator d-flex">
                      <td class="col-3">Email</td>
                      <td class="col-9">: `+ profileData.email +`</td>
                    </tr>
                    <tr class="d-flex">
                      <td class="col-3">No. Telp</td>
                      <td class="col-9">: `+ profileData.mobile +`</td>
                    </tr>
                    <tr class="d-flex">
                      <td class="col-3">ID LINE</td>
                      <td class="col-9">: `+ profileData.line_id +`</td>
                    </tr>
                    <tr class="d-flex">
                      <td class="col-3">ID Instagram</td>
                      <td class="col-9">: `+ profileData.instagram +`</td>
                    </tr>
                    <tr class="pb-3 d-flex">
                      <td class="col-3">Alamat</td>
                      <td class="col-9">: `+ profileData.address +`</td>
                    </tr>

                    <tr class="table-separator d-flex">
                      <td class="col-3">Tentang</td>
                      <td class="col-9">: `+ profileData.about_me +`</td>
                    </tr>
                    <tr class="d-flex">
                      <td class="col-3">Interest</td>
                      <td class="col-9">: `+ getInterestString(profileData.interests) +`</td>
                    </tr>
                  </tbody>

                </table>
                <div class="row">
                  <span id="quizButton" onclick="getQuizScore('`+ userId+`');" class="col-sm-4 btn btn-primary">Get Quiz Score</span>
                  <span id="assignmentButton" onclick="getAssignment('`+ userId+`');" class="col-sm-4 offset-sm-1 mt-2 mt-sm-0 btn btn-primary">Get Assignment</span>
                  <span class="col-sm-3"></span>
                </div>
                <div id="quizScoreLoc" class="mt-3">

                </div>
                `;

      //Tampilkan isi data
      $("#userDataLoc").empty();
      $("#userDataLoc").append(dataHTML);

  },function( jqXHR, textStatus, errorThrown){
    alert("Failed to get profile : "+textStatus+"/"+jqXHR.statusText);
  });


}

// Get interest data
function getInterestString(interestString){
  var interestArray = interestString.split(",");
  var interestReturn = "";

  for(var i = 0; i<INTEREST.length;i++){
    var dataInterest = INTEREST[i].split('|',2);

    if(interestArray.includes(dataInterest[1])){
      if(interestReturn==""){
        interestReturn += dataInterest[0];
      }else {
        interestReturn += ", " + dataInterest[0];
      }

    }
  }

  return interestReturn;

}

// Get cross or check depending on result
function getCheckCross(data){
  if(data==0){
    return `<span class="fas fa-times-circle"></span>`;
  }else if(data==1){
    return `<span class="fas fa-check"></span>`;
  }
}

//get assignment
function getAssignment(uid){
  $("#quizButton").html("Get Quiz Score");

  //Remove existing table
  $("#quizScoreLoc table").remove();

  //Hide button and add loader
  $("#assignmentButton").hide();
  $("#quizScoreLoc").append(`<div class="loader loader-small" id="loaderQuiz"></div>`);

  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/user/"+uid+"/assignment",
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  }).done(function(msg){
    //Set empty html
    var quizHTML=`
    <table class="table">
      <thead>
        <th>No.</th>
        <th>Judul Assignment</th>
        <th>Waktu upload</th>
        <th class="text-center">Download</th>
      </thead>
      <tbody>
    `;

    $.each(msg,function(index,value){
      var nomor = index+1;
      quizHTML+=`
      <tr>
        <th>`+nomor+`</th>
        <td>`+value.assignment_title+`</td>
        <td>`+value.uploaded_at+`</td>
        <td class="text-center"><a href="`+value.file_url+`"><i class="fas fa-download "></i></a></td>
      </tr>
      `;
    });

    //Close table
    quizHTML+=`
    </tbody>
    </table>
    `;

    //remove loader
    $("#loaderQuiz").remove();

    //show button
    $("#assignmentButton").html("Refresh");
    $("#assignmentButton").show();

    //show table
    $("#quizScoreLoc").append(quizHTML);

  }).fail(function(jqXHR,textStatus){
    alert( "Request failed: " + textStatus+"/"+ jqXHR.statusText );
  });

}

//Get user scor when requested
function getQuizScore(uid){
  $("#assignmentButton").html("Get Assignment");

  //Remove existing table
  $("#quizScoreLoc table").remove();

  //Hide button and add loader
  $("#quizButton").hide();
  $("#quizScoreLoc").append(`<div class="loader loader-small" id="loaderQuiz"></div>`)



  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/user/"+uid+"/score",
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  }).done(function(msg){
    //Set empty html
    var quizHTML=`
    <table class="table">
      <thead>
        <th>No.</th>
        <th>Quiz ID</th>
        <th>Judul Quiz</th>
        <th>Nilai</th>
      </thead>
      <tbody>
    `;

    $.each(msg,function(index,value){
      var nomor = index+1;
      quizHTML+=`
      <tr>
        <th>`+nomor+`</th>
        <td>`+value.quiz_id+`</td>
        <td>`+value.title+`</td>
        <td>`+value.score+`</td>
      </tr>
      `;
    });

    //Close table
    quizHTML+=`
    </tbody>
    </table>
    `;

    //remove loader
    $("#loaderQuiz").remove();

    //show button
    $("#quizButton").html("Refresh");
    $("#quizButton").show();

    //show table
    $("#quizScoreLoc").append(quizHTML);


  }).fail(function(jqXHR,textStatus){
    alert( "Request failed: " + textStatus+"/"+ jqXHR.statusText );
  });
}


$(document).ready(function () {
  getAllUsers();

  $("[name=activeCheck]").change(function() {
    if(this.checked){
      memberOnly = true;
    }else {
      memberOnly = false;
    }

    $("#userDataLoc").empty();
    $("#userDataLoc").append(`<h2 class="align-middle text-center">Silahkan pilih user</h2>`);
    selected = 0;
    currentProfile = {};

    getAllUsers();
  });


});
