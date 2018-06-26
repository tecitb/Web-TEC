//Currently selected quiz
var selected = 0;

// Get all quiz data and display them in list
function getAllQuiz(){

  //Request all quiz
  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/quiz",
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
      $("#quizList").empty();
      var isiList = "";
      $.each(msg,function(index, value){
        isiList += `<span onclick="getQuizData('`+ value.id +`');" id="quiz-`+value.id+`"
                    class="list-group-item list-group-item-action">` + value.title + `</span>`;
      });

      //Append to location
      $("#quizList").append(isiList);
    }

  }).fail(function( jqXHR, textStatus ) {
    //Error dalam pengiriman
    alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
  });
}

// Get single quiz data and display them
function getQuizData(quizID){

  //Hapus centering
  $("#quizDataLoc").removeClass("my-auto");

  //Add loader
  $("#quizDataLoc").empty();
  $("#quizDataLoc").append(`<div class="loader loader-big" id="scoreLoader"></div>`);

  //Cek apakah ada quiz yang dipilih sebelumya
  if(selected!=0){
    //Deselect last selected user
    $("#quiz-"+selected).removeClass("active");
  }

  //Efek aktif pada tombol
  $("#quiz-"+quizID).addClass("active");
  selected = quizID;

  //Load quiz

  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/quiz/"+quizID+"/score",
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  }).done(function(msg){
    //fill data
    dataHTML = `<h3>`+$("#quiz-"+quizID).html()+`</h3>
                <hr/>
                <table class="table">
                  <thead>
                    <th>No.</th>
                    <th>TEC no.</th>
                    <th>NIM</th>
                    <th>Nama</th>
                    <th>Score</th>
                  </thead>
                  <tbody>
    `;

    $.each(msg,function(index,value){
      var nomor = index+1;

      dataHTML+=`
                    <tr>
                      <th>`+nomor+`</th>
                      <td>`+value.tec_regno+`</td>
                      <td>`+value.NIM+`</td>
                      <td>`+value.name+`</td>
                      <Td>`+value.score+`</td>
                    </tr>
      `;

    });

    //close table
    dataHTML += `
                  </tbody>
                </table>
    `;

    $("#quizDataLoc").empty();
    $("#quizDataLoc").append(dataHTML);

  }).fail(function(jqXHR,textStatus){
    //connection or server fail
    alert("Failed to get profile : "+textStatus+"/"+jqXHR.statusText);
  });

}

$(document).ready(function () {
  getAllQuiz();
});
