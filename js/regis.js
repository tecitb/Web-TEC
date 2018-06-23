const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const HP_REGEX = /^[0-9]{10,12}$/;
const NIM_REGEX = /^[0-9]{8}$/;
const LINE_REGEX = /^@?([A-Za-z0-9\.\-_]+)$/;
const NAME_REGEX = /[a-zA-Z]+/;
const PASS_REGEX = /^.{10,}$/;
const INSTA_REGEX = /^@?(.+)$/; //TODO replace placeholder
const COUPON_REGEX = /^[A-Z]{8}$/;
const FILLED_REGEX = /[a-zA-Z]+/;

function registrasi(){
  console.log($("#regisNama").val());
  console.log($("#regisNick").val());
  console.log($("#regisEmail").val());
  console.log($("#regisPass").val());
  console.log($("#regisConf").val());
  console.log($("#regisLINE").val());
  console.log($("#regisInsta").val());
  console.log($("#regisInter").val());
  console.log($("#regisHP").val());
  console.log($("#regisAlamat").val());
  console.log($("#regisAbout").val());
  console.log($("#regisCoupon").val());

  // Validasi
  var tervalidasi = true;

  // Validasi password
  if(PASS_REGEX.test($("#regisPass").val())){
    $("#regisPass").removeClass("is-invalid");
    if($("#regisPass").val()==$("#regisConf").val()){
      $("#regisConf").removeClass("is-invalid");
    }else {
      tervalidasi = false;
      $("#regisConf").addClass("is-invalid");
    }
  }else {
    tervalidasi = false;
    $("#regisPass").addClass("is-invalid");
  }


  // Validasi email
  if(EMAIL_REGEX.test($("#regisEmail").val().toLowerCase())){
    $("#email-feedback").html("Email tidak valid");
    $("#regisEmail").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#regisEmail").addClass("is-invalid");
  }

    // Validasi NIM
    if(NIM_REGEX.test($("#regisNim").val().toLowerCase())){
        $("#regisNim").removeClass("is-invalid");
    }else {
        tervalidasi = false;
        $("#regisNim").addClass("is-invalid");
    }

  //Validasi no hp
  if(HP_REGEX.test($("#regisHP").val())){
    $("#regisHP").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#regisHP").addClass("is-invalid");
  }

  if(LINE_REGEX.test($("#regisLINE").val())){
    $("#regisLINE").removeClass("is-invalid");
    var hasil = $("#regisLINE").val().match(LINE_REGEX);
    $("#regisLINE").val(hasil[1]);
  }else {
    tervalidasi = false;
    $("#regisLINE").addClass("is-invalid");
  }

  //validasi nama minimal 1 huruf
  if(NAME_REGEX.test($("#regisNama").val())){
    $("#regisNama").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#regisNama").addClass("is-invalid");
  }

  //Validasi nick name minimal 1 huruf
  if(NAME_REGEX.test($("#regisNick").val())){
    $("#regisNick").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#regisNick").addClass("is-invalid");
  }

  //Validasi insta
  if(INSTA_REGEX.test($("#regisInsta").val())){
    $("#regisInsta").removeClass("is-invalid");
    var hasil = $("#regisInsta").val().match(INSTA_REGEX);
    $("#regisInsta").val(hasil[1]);
  }else {
    tervalidasi = false;
    $("#regisInsta").addClass("is-invalid");
  }

  //Validasi Coupon
  if(COUPON_REGEX.test($("#regisCoupon").val())){
    $("#regisCoupon").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#regisCoupon").addClass("is-invalid");
  }

    // Validasi interests
  if($("[name=interest]:checked").length >= 2){
    $("#regisInter").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#regisInter").addClass("is-invalid");
  }

    //Validasi lainnya
  if(FILLED_REGEX.test($("#regisAbout").val())){
    $("#regisAbout").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#regisAbout").addClass("is-invalid");
  }

  if(FILLED_REGEX.test($("#regisAlamat").val())){
    $("#regisAlamat").removeClass("is-invalid");
  }else {
    tervalidasi = false;
    $("#regisAlamat").addClass("is-invalid");
  }

  // Submit
  if(tervalidasi){
    $("#regisButton").hide();
    $("#regisButtonLoc").append(`<div id="regisLoader" class="loader loader-small"></div>`);

    $.ajax({
      method: "POST",
      url: SERVER_URL+"/api/registration",
      data: { name: $("#regisNama").val(),
              email: $("#regisEmail").val(),
              nim: $("#regisNim").val(),
              password: $("#regisPass").val(),
              coupon: $("#regisCoupon").val(),
              interests: $('[name=interest]:checked').map(function() {return this.value;}).get().join(','), //$("#regisInter").val(),
              nickname: $("#regisNick").val(),
              about_me: $("#regisAbout").val(),
              line_id: $("#regisLINE").val(),
              instagram: $("#regisInsta").val(),
              mobile: $("#regisHP").val(),
              address: $("#regisAlamat").val()}
    })
    .done(function( msg ) {
      $("#regisButton").show();
      $("#regisLoader").remove();
      console.log("sukses kirim");
      console.log(msg);
      if(typeof msg.error != "undefined"){
        if(msg.error.text=="Invalid coupon"){
          $("#regisCoupon").addClass("is-invalid");
        } else if (msg.error.text == "User already exists") {
          $("#email-feedback").html("Email sudah terdaftar");
          $(window).scrollTo($("#emailLogin"),500);
          $("#regisEmail").addClass("is-invalid");

        }
      }else {
        Cookies.set("token",msg.token);
        Cookies.set("uid",msg.id);
        console.log(Cookies.get("token"));
        getProfile("/quiz");
      }



    }).fail(function( jqXHR, textStatus ) {
      $("#regisButton").show();
      $("#regisLoader").remove();
      alert( "Registration failed: " + textStatus );
    });
  }


}

$( document ).ready(function() {
    if(isLoggedIn()){
      /*goto user page*/
    }else{

    }
});
