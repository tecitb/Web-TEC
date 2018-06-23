var dataPertanyaan = [];

function addQuiz(tipe){
  console.log(tipe);
}

function kirimQuiz(){
  $.ajax({
    method: "POST",
    url: SERVER_URL+"/api/quiz/",
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
    data: { },
    dataType: 'json'
  })
  .done(function( msg ) {

  }).fail(function( jqXHR, textStatus ) {

  });
}

$( document ).ready(function() {

});
