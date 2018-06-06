function registrasi(){
  console.log($("#regisNama").val());
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

}

$( document ).ready(function() {
    if(isLoggedIn()){
      /*goto user page*/
    }else{
      $("#regisButton").click(registrasi);
    }
});
