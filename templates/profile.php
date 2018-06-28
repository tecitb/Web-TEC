<link rel="stylesheet" type="text/css" href="<?=BASE_URL?>/css/profile.css" />
<link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.5/css/fileinput.min.css" media="all" rel="stylesheet" type="text/css" />

<div class="container" style="margin-top: 24px">
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <div class="jumbotron text-center">
                <div onclick="changeProfile();" class="mx-auto profileContainer profileBox">
                    <img id="profile" src="<?=BASE_URL?>/img/users.png"/>
                    <div class="middle">
                        <i class="fas fa-upload"></i>
                    </div>
                </div>

                <br/>
                <h1 class="mt-3" id="nama">...</h1>
            </div>
            <div id="userDataLoc">
                <div class="loader loader-big"></div>
            </div>
        </div>
    </div>
</div>

<script src="<?=BASE_URL?>/js/profile.js" defer="defer"></script>
<!-- the main fileinput plugin file -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.5/js/fileinput.min.js" defer="defer"></script>
<!-- optionally uncomment line below for loading your theme assets for a theme like Font Awesome (`fa`) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-fileinput/4.4.5/themes/fa/theme.min.js" defer="defer"></script>
