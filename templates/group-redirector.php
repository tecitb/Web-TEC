<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">
    <link rel="stylesheet" href="<?=BASE_URL?>/css/style.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js"></script>

    <script type="text/javascript">
        const BASE_URL = "<?=BASE_URL?>";
        const SERVER_URL = "<?=SERVER_URL?>";
    </script>

    <title>TEC LINE Group Redirector</title>

</head>
<body>
<nav class="navbar navbar-expand-md navbar-dark bg-tec">
    <div class="container">
    <a class="navbar-brand" href="<?=BASE_URL?>">
        <img src="<?=BASE_URL?>/img/logo-white.svg" width="30" height="30" class="d-inline-block align-top" alt="">
        TEC Internship 2018
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".mobile-open" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    </div>
</nav>
<!--END NAVBAR -->


<!--EMPTY PADDING -->
<div class="mb-5"></div>

<div class="container">
    <div class="row">
        <div class="col-md-7">
            <h4>A warm welcome from TEC ITB!</h4>
            <p align="justify">Halo intern TEC 2018, selamat datang di TEC Internship 2018! Selama proses kaderisasi, kita semua perlu media komunikasi dan penyebaran informasi, yaitu grup LINE untuk TEC Interns.</p>
            <p align="justify">Nah, untuk menghindari penyusup, kita tidak bisa menyebarkan link grupnya ke siapa saja, sehingga silahkan kamu masukkan email dan password yang telah terdaftar untuk bisa masuk ke grup LINE TEC Interns.</p>
            <p align="justify">Semangat ikut TEC Internship-nya ya!</p>
        </div>
        <div class="col-md-4 offset-md-1">
            <div class="card">
                <div class="card-header">
                    <h5 class="card-title mt-3">Masuk grup LINE TEC Interns</h5>
                </div>
                <div class="card-body">
                    <p class="card-text">Silahkan masukkan email dan password yang terdaftar</p>
                    <form onsubmit="changePass(); return false;">

                        <div class="form-group">
                            <label for="resetEmail" class="cols-sm-2 control-label">Email</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <input type="email" class="form-control" id="email"  placeholder="manasayatahu@domain.com"/>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="resetEmail" class="cols-sm-2 control-label">Password</label>
                            <div class="cols-sm-10">
                                <div class="input-group">
                                    <input type="password" class="form-control" id="password"/>
                                    <div class="invalid-feedback">
                                        Password tidak valid (minimal 10 karakter)
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="changeButtonLoc" class="form-group">
                            <button type="button" id="signinButton" class="w-100 btn btn-primary">Kuy masuk!</button>
                        </div>
                        <div id="signinLoader" class="loader loader-small" style="display: none"></div>
                    </form>
                </div>
            </div>

        </div>
    </div>
</div>

<script type="text/javascript" src="<?=BASE_URL?>/js/line-group-redirect.js" defer></script>