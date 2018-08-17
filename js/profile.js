var myProfile;
const INTEREST = ["Tech|tech", "F&B|fnb", "Fashion|fashion", "Arts & Design|artsndesign", "Books & Magz|booksnmagz", "Financial|financial", "Travel|travel", "Hospitality|hospitality", "Entertainment|entertainment"];
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const HP_REGEX = /^[0-9]{10,12}$/;
const NIM_REGEX = /^[0-9]{8}$/;
const LINE_REGEX = /^@?([A-Za-z0-9\.\-_]+)$/;
const NAME_REGEX = /[a-zA-Z]+/;
const INSTA_REGEX = /^@?(.+)$/; //TODO replace placeholder
const FILLED_REGEX = /[a-zA-Z]+/;

//allow edit
const allowEdit = true;

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
      url: SERVER_URL+"/api/user/"+Cookies.get("uid"),
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
                        <input type="text" class="form-control" id="updateNama" value="`+myProfile.name+`"/>
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
                        <input type="text" class="form-control" id="updateNick" value="`+myProfile.nickname+`"/>
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
                        <input type="email" class="form-control" id="updateEmail" value="`+myProfile.email+`"/>
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
                        <input type="text" class="form-control" id="updateMobile" value="`+myProfile.mobile+`"/>
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
                        <input type="text" class="form-control" id="updateLINE" value="`+myProfile.line_id+`"/>
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
                        <input type="text" class="form-control" id="updateInsta" value="`+myProfile.instagram+`"/>
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
                        <input type="text" class="form-control" id="updateAlamat" value="`+myProfile.address+`"/>
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
                        <textarea class="form-control" maxlength="150" id="updateAbout" >`+myProfile.about_me+`</textarea>
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
    if(myProfile.interests.split(",").includes(dataInterest[1])){
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

//spawn file picker
function changeProfile(){
  $(".profileContainer").attr("onclick","");
  $(".profileContainer").empty();
  $(".profileContainer").removeClass("profileBox");
  $(".profileContainer").addClass("profileUploader");
  $(".profileContainer").append(`<input id="profileUploader" name="profile_picture" type="file">`);

  $("#profileUploader").fileinput({
    theme:"fa",
    allowedFileTypes:["image"],
    maxFileCount:1,
    uploadUrl:SERVER_URL+"/api/uploadImage",
    showClose:false,
    browseLabel: '',
    removeLabel: '',
    uploadLabel: '',
    uploadClass: "btn btn-primary",
    browseOnZoneClick: true,
    ajaxSettings: {
      headers: {"Authorization": "Bearer " + Cookies.get("token")}
    }
  });

  $('#profileUploader').on('fileuploaded', function(event, data, previewId, index) {
    setTimeout(function(){location.reload()},1000);
});
}

// Get single user data and display them
function getUserData(userId){

  //Load profile

  $.when( getProfileData(userId) ).then(function( profileData, textStatus, jqXHR ) {

    //set my profile
    myProfile = profileData;

    //Set name
    $("#nama").html(profileData.name);

    //Set profile picture
    if(profileData.profile_picture!=""){
      $("#profile").attr("src", profileData.profile_picture_url);
    }

    //wait image loaded
    $("#profile").on("load",function(){
      //get image size
      var iWidth = $("#profile").get(0).naturalWidth;
      var iHeight = $("#profile").get(0).naturalHeight;

      //get container size
      var cWidth = $(".profileContainer").width();
      var cHeight = $(".profileContainer").height();

      if(iWidth > iHeight){
        $("#profile").attr("height",cHeight);
      }else{
        $("#profile").attr("width",cHeight);
      }

    })


    //Fill data
    dataHTML = `

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
                      <td class="col-9">: `+ profileData.nickname +`</td>
                    </tr>
                    <tr class="pb-3 d-flex">
                      <td class="col-3">Lunas</td>
                      <td class="col-9">: `+ getCheckCross(profileData.lunas) +`</td>
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
                  <span id="getQuizButton" onclick="getQuizScore('`+ userId+`');" class="col-md-2 btn btn-primary">Nilai Quiz</span>
                  <span id="assignmentButton" onclick="getAssignment('`+ userId+`');" class="mt-2 mt-md-0 col-md-2 ml-2 btn btn-primary">Assignment</span>
                  <a id="changePassButton" href="`+BASE_URL+`/changePass" class="mt-2 mt-md-0 col-md-2 ml-2 btn btn-primary">Ubah Password</a>`;

      if(allowEdit){
        dataHTML+= `
        <span onclick="editProfile();" class="mt-2 mt-md-0 col-md-2 ml-2 btn btn-primary">Edit Profil</span>`;

      }

      //Jika belum lunas
      if(profileData.lunas == 0){
        dataHTML+=`<a href="`+BASE_URL+`/coupon" class="mt-2 mt-md-0 col-md-2 ml-1 btn btn-primary">Input Kupon</a>`
      }

      dataHTML+=
                `</div>
                <div class="mt-2" id="quizScoreLoc">

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
  $("#getQuizButton").html("Nilai Quiz");

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
        <td class="text-center"><a href="`+value.file_url+`"<i class="fas fa-download "></i></a></td>
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
  $("#assignmentButton").html("Assignment");

  //Remove existing table
  $("#quizScoreLoc table").remove();

  //Hide button and add loader
  $("#getQuizButton").hide();
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
    $("#getQuizButton").html("Refresh");
    $("#getQuizButton").show();

    //show table
    $("#quizScoreLoc").append(quizHTML);


  }).fail(function(jqXHR,textStatus){
    alert( "Request failed: " + textStatus+"/"+ jqXHR.statusText );
  });
}


$(document).ready(function () {
   getUserData(Cookies.get("uid"));
});
