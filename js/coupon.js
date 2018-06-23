function generateCoupon(){
  $("#generateButton").hide();
  $("#generateButtonLoc").append(`<div id="generateLoader" class="loader loader-small"></div>`);

  $.ajax({
    method: "POST",
    url: SERVER_URL+"/api/generateCoupon/"+$("#generateJumlah").val(),
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

function getCoupon(){
  $("#liatButton").hide();
  $("#liatButtonLoc").append(`<div id="liatLoader" class="loader loader-small"></div>`);

  $.ajax({
    method: "GET",
    url: SERVER_URL+"/api/getCoupon/"+$("#liatJumlah").val(),
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
