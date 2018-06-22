<!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous">
    <link rel="stylesheet" href="<?=BASE_URL?>/css/style.css">
    <link rel="stylesheet" href="<?=BASE_URL?>/css/testi.css">
    <link rel="stylesheet" href="<?=BASE_URL?>/css/kelebihan.css">
    <link rel="stylesheet" href="<?=BASE_URL?>/css/hero.css">

    <title>TEC</title>

    <script type="text/javascript">
        const BASE_URL = "<?=BASE_URL?>";
    </script>

    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js" integrity="sha384-smHYKdLADwkXOn1EmN1qk/HfnUcbVRZyYmZ4qpPea6sjB/pTJ0euyQp0Mk8ck+5T" crossorigin="anonymous"></script>
    <script src="<?=BASE_URL?>/js/jquery.bcSwipe.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
    <script src="<?=BASE_URL?>/js/user.js"></script>
</head>
<body>
<!--  NAVBAR -->
<nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <div class="container">
    <a class="navbar-brand" href="<?=BASE_URL?>">
        <img src="<?=BASE_URL?>/img/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
        TEC Internship 2018
    </a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target=".mobile-open" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse collapse w-100 mobile-open" id="navContent">

        <ul class="navbar-nav mr-auto">
            <li class="nav-item">
                <!-- <a class="nav-link" href="#">News</a> -->
            </li>
        </ul>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" id="loginMenuNav" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Login
                </a>
                <div class="dropdown-menu mobile-open" id="loginMenuDrop">
                    <form onsubmit="login(); return false;" class="px-4 py-3">
                        <div class="form-group">
                            <label>Email</label>
                            <input id="emailLogin" type="email" class="form-control" placeholder="email@example.com">
                            <div class="invalid-feedback">
                                Tolong cek kembali
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input id="passwordLogin" type="password" class="form-control" placeholder="Password">
                            <div class="invalid-feedback">
                                Tolong cek kembali
                            </div>
                        </div>
                        <button type="submit" id="signinButton" class="btn btn-primary">Sign in</button>
                    </form>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="<?=BASE_URL?>/register">Belum punya akun? Daftar</a>
                    <a class="dropdown-item" href="<?=BASE_URL?>/reset">Lupa password?</a>
                </div>

                <div class="dropdown-menu mobile-open">

                    <a class="dropdown-item" href="<?=BASE_URL?>/quiz">Quiz</a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" id="logoutButton">Logout</a>
                </div>
            </li>
        </ul>
    </div>
    </div>
</nav>
<!--END NAVBAR -->