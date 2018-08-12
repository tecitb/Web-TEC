function generateCoupon(){
  $("#generateButton").hide();
  $("#generateButtonLoc").append(`<div id="generateLoader" class="loader loader-small"></div>`);

  var url = SERVER_URL+"/api/generateCoupon/"+$("#generateJumlah").val();

  if($("#nonPaymentGen").is(':checked')){
    url = SERVER_URL+"/api/generateCoupon/"+$("#generateJumlah").val()+"?type=0";
  }

  $.ajax({
    method: "POST",
    url: url,
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {
    $("#generateButton").show();
    $("#generateLoader").remove();

    if(typeof msg.error != "undefined"){
      $("#generateJumlah").addClass("is-invalid");
      $("#generateFeedback").html("Gagal : " + msg.error.text);
    }else {
      $("#generateJumlah").addClass("is-valid");
    }

  }).fail(function( jqXHR, textStatus ) {
    $("#generateButton").show();
    $("#generateLoader").remove();
    alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
  });
}

function editCoupon(type){
  var cid = $("#couponInput").val();
  $("#couponInput").removeClass("is-invalid");

  if(cid==""){
    $("#editFeedback").html("Gagal : Harus terisi");
    $("#couponInput").addClass("is-invalid");
  }

  $("#editNonButton").hide();
  $("#editPayButton").hide();
  if(type==0){
    $("#editNonButtonLoc").append(`<div id="editLoader" class="loader loader-small"></div>`);
  }else{
    $("#editPayButtonLoc").append(`<div id="editLoader" class="loader loader-small"></div>`);
  }

  $.ajax({
    method: "POST",
    url: SERVER_URL+"/api/changeCoupon",
    headers: {"Authorization": "Bearer " + Cookies.get("token")},
    data:{"cid":cid,"type":type}
  })
  .done(function( msg ) {
    $("#editNonButton").show();
    $("#editPayButton").show();
    $("#editLoader").remove();

    if(typeof msg.error != "undefined"){
      $("#couponInput").addClass("is-invalid");
      $("#editFeedback").html("Gagal : " + msg.error.text);
    }else {
      $("#couponInput").addClass("is-valid");
    }

  }).fail(function( jqXHR, textStatus ) {
    $("#editNonButton").show();
    $("#editPayButton").show();
    $("#editLoader").remove();
    alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
  });
}

function getCoupon(){
  $("#liatButton").hide();
  $("#liatButtonLoc").append(`<div id="liatLoader" class="loader loader-small"></div>`);

  var couponType = 1;

  if($("#nonPaymentSee").is(':checked')){
    couponType = 0;
  }

  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/getCoupon/"+$("#liatJumlah").val(),
    data:{"type":couponType},
    headers: {"Authorization": "Bearer " + Cookies.get("token")}
  })
  .done(function( msg ) {
    $("#liatButton").show();
    $("#liatLoader").remove();

    if(typeof msg.error != "undefined"){
      $("#liatJumlah").addClass("is-invalid");
      $("#liatFeedback").html("Gagal : " + msg.error.text);
    }else {
      $("#liatJumlah").addClass("is-valid");
      $("#couponList").empty();

      var i = 1;
      var isi = `
      <table class="table table-hover">
        <thead>
          <tr>
            <th>No.</th>
            <th>Coupon</th>
            <th>Pakai</th>
          </tr>
        </thead>
        <tbody>
      `;

      $.each(msg, function( index, value ) {
        isi += (`
          <tr>
            <th class="pt-3">`+i+`</th>
            <td class="pt-3">`+msg[i-1].coupon+`</td>
            <td>
              <label class="container">
                <input type="checkbox">
              </label>
            </td>
          </tr>
          `);

          i++;
      });

      isi += `
        </tbody>
      </table>`;

      $("#couponList").append(isi);
    }

  }).fail(function( jqXHR, textStatus ) {
    $("#liatButton").show();
    $("#liatLoader").remove();
    alert( "Connection or server failure: " + textStatus + " / " + jqXHR.statusText );
  });
}
