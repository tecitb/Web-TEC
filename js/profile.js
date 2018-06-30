var myProfile;

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
    filepreupload: function(event, data) {
      data.jqXHR.setRequestHeader("Authorization", "Bearer "+ Cookies.get("token"));
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
      $("#profile").attr("src",SERVER_URL+"/../uploads/"+profileData.profile_picture);
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
                      <td class="col-9">: `+ profileData.interests +`</td>
                    </tr>
                  </tbody>

                </table>

                <div class="row">
                  <span id="getQuizButton" onclick="getQuizScore('`+ userId+`');" class="col-sm-3 btn btn-primary">Nilai Quiz</span>
                  `;

      //Jika belum lunas
      if(profileData.lunas == 0){
        dataHTML+=`<a href="`+BASE_URL+`/coupon" class="mt-2 mt-sm-0 col-sm-3 offset-sm-1 btn btn-primary">Input Kupon</a>`
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

// Get cross or check depending on result
function getCheckCross(data){
  if(data==0){
    return `<span class="fas fa-times-circle"></span>`;
  }else if(data==1){
    return `<span class="fas fa-check"></span>`;
  }
}

//Get user scor when requested
function getQuizScore(uid){
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
