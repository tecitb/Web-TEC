<link rel="stylesheet" type="text/css" href="<?=BASE_URL?>/css/admin-user.css" />

<div class="container mt-5">
  <div class="row">
    <div class="col-md-4">
      <div class="card">
        <h3 class="card-header">Daftar Nama</h3>
        <div class="card-body px-1">
          <ul id="userList" class="list-group">
            <!-- Placeholder selama loading daftar user -->
            <li class="list-group-item"><div class="loader loader-small"></div></li>
            <span href="#" class="list-group-item list-group-item-action text-center">Loading</span>
          </ul>
        </div>
      </div>


    </div>
    <div id="userDataLoc" class="col-md-8 my-auto">
      <!-- Placeholder sebelum diselect user -->
      <h2 class="align-middle text-center">Silahkan pilih user</h2>
    </div>
  </div>
</div>

<script src="<?=BASE_URL?>/js/admin-user.js" defer="defer"></script>
<script src="<?=BASE_URL?>/js/admin.js" defer="defer"></script>
