<!--EMPTY PADDING -->
<link rel="stylesheet" type="text/css" href="<?=BASE_URL?>/css/admin-landing.css" />
<div class="mb-5"></div>

<div class="container">


  <div class="row">

    <div class="col-12">
      <div>
        <div class="card-deck mx-auto">

          <!-- Coupon card -->
          <div class="card card-select text-center">
            <div class="card-header">
              <h3 class="card-title mt-3">Coupon</h3>
            </div>
            <img class="card-img-top" src="<?=BASE_URL?>/img/coupon.png" alt="Coupon">
            <div class="card-body">
              <a href="<?=BASE_URL?>/admin/coupon" class="btn w-100 btn-primary">Akses</a>
            </div>
          </div>

          <!-- Quiz card -->
          <div class="card card-select text-center">
            <div class="card-header">
              <h3 class="card-title mt-3">Quiz</h3>
            </div>
            <img class="card-img-top" src="<?=BASE_URL?>/img/quiz.png" alt="Quiz">
            <div class="card-body">
              <a href="<?=BASE_URL?>/admin/quiz/add" class="btn w-100 btn-primary">Tambah Quiz</a>
              <a href="<?=BASE_URL?>/admin/quiz/score" class="mt-2 btn w-100 btn-primary">Lihat Quiz</a>
            </div>
          </div>

          <!-- User card -->
          <div class="card card-select text-center">
            <div class="card-header">
              <h3 class="card-title mt-3">Users</h3>
            </div>
            <img class="card-img-top" src="<?=BASE_URL?>/img/users.png" alt="user"></img>
            <div class="card-body">
              <a href="<?=BASE_URL?>/admin/user" class="btn w-100 btn-primary">Lihat User</a>
            </div>
          </div>

          <!-- Relations card -->
          <div class="card card-select text-center">
            <div class="card-header">
              <h3 class="card-title mt-3">Relations</h3>
            </div>
            <img class="card-img-top" src="<?=BASE_URL?>/img/network.png" alt="sna" style="padding: 16px;" />
            <div class="card-body">
              <a href="<?=BASE_URL?>/admin/relations" class="btn w-100 btn-primary">Peta Relasi</a>
            </div>
          </div>

          <!-- Relations card -->
          <div class="card card-select text-center">
            <div class="card-header">
              <h3 class="card-title mt-3">Assignment</h3>
            </div>
            <img class="card-img-top" src="<?=BASE_URL?>/img/assignment.png" alt="assignment" />
            <div class="card-body">
              <a href="<?=BASE_URL?>/admin/assignment" class="btn w-100 btn-primary">Lihat Submission</a>
              <a href="<?=BASE_URL?>/admin/assignment/add" class="mt-2 btn w-100 btn-primary">Buat Assignment</a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>
<script src="<?=BASE_URL?>/js/admin.js" defer="defer"></script>
