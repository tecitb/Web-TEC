//Currently selected user
var selected = 0;

// Get all user data and display them in list
function getAllUsers(){

  //Request all user
  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/users",
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
    }

  }).fail(function( jqXHR, textStatus ) {
    //Error dalam pengiriman
    alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
  });
}

// Get single user data and display them
function getUserData(userId){

  //Hapus centering
  $("#userDataLoc").removeClass("my-auto");

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

    //Fill data
    dataHTML = `<h3>`+ profileData.name +`</h3>
                <hr/>
                <table class="table table-borderless">
                  <tbody>
                    <tr class="d-flex">
                      <td class="col-3">No TEC</td>
                      <td class="col-9">: `+ profileData.tec_regno +`</td>
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
                      <td class="col-9">: `+ profileData.interests +`</td>
                    </tr>
                  </tbody>

                </table>
                <div id="quizScoreLoc">
                  <span onclick="getQuizScore('`+ userId+`');" class="mb-3 btn btn-primary">Get Quiz Score</span>
                </div>`;

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
  $("#quizScoreLoc span").hide();
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
    $("#quizScoreLoc span").html("Refresh");
    $("#quizScoreLoc span").show();

    //show table
    $("#quizScoreLoc").append(quizHTML);


  }).fail(function(jqXHR,textStatus){
    alert( "Request failed: " + textStatus+"/"+ jqXHR.statusText );
  });
}


$(document).ready(function () {
   getAllUsers();
});
