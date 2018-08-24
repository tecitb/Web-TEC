<link rel="stylesheet" href="<?=BASE_URL?>/css/landing.css">
<link rel="stylesheet" href="https://cdn.plyr.io/3.3.23/plyr.css">
<script src="<?=BASE_URL?>/js/jquery.bcSwipe.js"></script>
<script src="https://cdn.plyr.io/3.3.23/plyr.polyfilled.js"></script>
<style type="text/css">
    .spoiler-testi {
        display: none;
    }
    a.spoiler {
        cursor: pointer;
    }
</style>

<div class="container-fluid">
    <div class="row">
        <div id="hero" class="w-100 hero carousel slide" data-ride="carousel">
            <div class="carousel-inner" role="listbox">
                <div class="carousel-item active" id="carousel-item-1">
                    <div class="container">
                        <div class="carousel-caption d-md-block text-left">
                            <h1>Apa itu TEC?</h1>
                            <p>TEC merupakan tempat untuk mengembangkan jati diri kewirausahaan kamu. Bergabunglah bersama kami dan kobarkan semangat kewirausahaan kamu!</p>
                        </div>
                    </div>
                </div>
                <div class="carousel-item" id="carousel-item-2">
                    <div class="container">
                        <div class="carousel-caption d-md-block text-left">
                            <h1>Tempat kamu bisa mengembangkan diri</h1>
                            <p>Suka teknologi, fashion, kuliner, atau yang lainnya? Semua bisa dijadiin bisnis!</p>
                        </div>
                    </div>
                </div>
            </div>
            <a class="carousel-control-prev" href="#hero" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#hero" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
</div>

<div id="landing-segment-1">
    <div class="row">
        <div class="col-md-6 order-md-1 text-center d-flex align-items-center justify-content-center" id="landing-segment-1-right">
            <div>
                <div class="section-heading">
                    <h1>Visi Kami</h1>
                </div>

                <h3>
                    Global, enrich, high impact
                </h3>
            </div>
        </div>
        <div class="col-md-6 order-md-0 d-flex" id="landing-segment-1-left">
            &nbsp;
        </div>
    </div>
</div>
<div id="landing-segment-2">
    <div class="container" align="center">
        <div class="section-heading">
            <h1>Ayo masuk TEC!</h1>
        </div>

        <h3>
            Salah satu co-founder TEC mengajak kamu untuk join TEC
        </h3>

        <video poster="" id="landing-player" playsinline controls>
            <source src="https://tec-test.sgp1.digitaloceanspaces.com/landing.mp4" type="video/mp4">
        </video>
    </div>
</div>
<div id="testimonials-landing-section">
    <div class="container">
        <!-- START TESTI -->
        <div class="section-heading black" align="center">
            <h1>Testimonial Kece</h1>
        </div>

        <div class="row flex-md-row">
            <div class="col-md-4">
                <div class="testimonial">
                    <div class="quote">
                        TEC adalah komunitas yang mampu mengubah pandangan saya tentang berkarir, dari bercita-cita untuk bisa berkarir di perusahaan besar berubah menjadi membangun usaha yang bisa berdampak bagi banyak orang. <span class="spoiler-testi" id="sp-testi1">Di komunitas ini saya belajar mengenai dunia entrepreneurship dan berkembang bersama rekan rekan yang akan menjadi pengusaha sukses dimasa depan. Dan lewat TEC inilah saya bisa memulai perjalanan entrepreneur saya sejak masih berkuliah. Jadi ini adalah komunitas wajibnya entrepreneur entrepreneur masa depan dari ITB.</span> <a class="spoiler" data-target="#sp-testi1">[...]</a>
                    </div>
                    <div class="name">
                        <b>Alvin</b>, co-founder Lnpoint
                    </div>
                    <img class="image" src="http://via.placeholder.com/100x100">
                </div>
            </div>
            <div class="col-md-4">
                <div class="testimonial">
                    <div class="quote">
                        TEC itu sebagai basis komunitas untuk para mahasiswa ITB cukup membuat saya terinspirasi untuk menjadi seseorang yg disebut dengan &quot;entrepreneur&quot;. <span class="spoiler-testi" id="sp-testi2">Di dalam TEC lah sebenernya saya belajar banyak hal kalo menjadi entrepreneur itu sangat susah  tapi disanalah resikonya menjadi seorang entrepreneur apalagi saat menjadi mahasiswa.  Sebagai entrepreneur setidaknya saya belajar untuk merealisasikan fungsi mahasiswa itu sendiri yang katanya sebagai  &quot;agent of changes&quot; dengan menjadi entrepreneur kita tidak hanya berbisnis tapi bisa menyelesaikan suatu permasalahan di dalam lingkungan kita sendiri,  berkat menjadi entrepreneur pula saya bisa berjumpa CEO hebat dan itu suatu motivasi tersendiri untuk tetap <i>keep going for business</i>. Perjalanan menjadi entrepreneur pasti tidak mudah, tapi karena adanya TEC jugalah saya masih bisa tetap konsisten karena banyak teman-teman yg memiliki pemikiran yang sama dengan saya.</span> <a class="spoiler" data-target="#sp-testi2">[...]</a>
                    </div>
                    <div class="name">
                        <b>Erwan</b>, founder Cethik
                    </div>
                    <img class="image" src="http://via.placeholder.com/100x100">
                </div>
            </div>
            <div class="col-md-4">
                <div class="testimonial">
                    <div class="quote">
                        TEC sangat membantu dalam menambah wawasan fundamental saya dalam berbisnis di dunia teknologi, dan menjadi lebih berani mengambil tindakan dalam berbisnis.
                    </div>
                    <div class="name">
                        <b>Aul</b>, founder Avant Grande
                    </div>
                    <img class="image" src="http://via.placeholder.com/100x100">
                </div>
            </div>
        </div>
        <!-- END TESTI -->
    </div>
</div>
<div id="business-landing-section">
    <div class="container">
        <div class="section-heading black" align="center">
            <h1>Bisnis Rintisan Anggota TEC</h1>
        </div>

        <p align="center">Sudah banyak bisnis yang dirintis oleh anggota TEC. Kami tunggu kedatangan bisnis kamu!</p>

        <div align="center">
            <img src="<?=BASE_URL?>/img/showcase/1.jpg" />
            <img src="<?=BASE_URL?>/img/showcase/2.jpg" />
            <img src="<?=BASE_URL?>/img/showcase/3.jpg" />
            <img src="<?=BASE_URL?>/img/showcase/4.jpg" />
            <img src="<?=BASE_URL?>/img/showcase/5.jpg" />
            <img src="<?=BASE_URL?>/img/showcase/6.jpg" />
            <img src="<?=BASE_URL?>/img/showcase/7.jpg" />
            <img src="<?=BASE_URL?>/img/showcase/8.jpg" />
            <img src="<?=BASE_URL?>/img/showcase/9.jpg" />
            <img src="<?=BASE_URL?>/img/showcase/10.jpg" />
            <img src="<?=BASE_URL?>/img/showcase/11.jpg" />
            <img src="<?=BASE_URL?>/img/showcase/12.jpg" />
        </div>
    </div>
</div>
<div id="ohu-landing-section">
    <div class="container">
        <h2 align="center">Kami tunggu kedatangan kamu di OHU 2018!</h2>
        <p align="center">Kunjungi stand TEC di Parkiran Labtek VIII</p>

        <div align="center">
            <img style="width: 100%; margin-top: 64px; margin-bottom: 32px; max-width: 500px;" src="<?=BASE_URL?>/img/tec-ohu.svg" />
        </div>
    </div>
</div>
<!-- START REGISTRATION JUMBOTRON -->
<div class="row">

    <div class="col-12">
        <div class="jumbotron" id="promo-daftar">
            <div class="container">
                <div class="row">
                    <div class="col-md-6" id="reg-segment-1-right">
                        <div>
                            <h1 class="display-4">Sudah tertarik?</h1>
                            <p class="lead">Dijamin gak nyesel jadi intern di TEC</p>
                            <hr class="my-4">
                            <p>Jalan menuju manusia kaya, keren, dan kece</p>
                            <a class="btn btn-primary btn-lg" href="<?=BASE_URL?>/register" role="button">Daftar TEC</a>
                        </div>
                    </div>
                    <div class="col-md-6 d-flex" id="reg-segment-1-left">
                        &nbsp;
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- END REGISTRATION JUMBOTRON -->
<script type="text/javascript">
    $(".spoiler").on('click', function() {
        $($(this).attr("data-target")).fadeToggle(0);
    });
</script>