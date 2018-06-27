<link rel="stylesheet" type="text/css" href="<?=BASE_URL?>/css/admin-user.css" />

<div class="container mt-5">
  <div class="row">
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <div class="row align-items-center">
            <h3 class="col-lg-8">Daftar Nama</h3>
            <div class="dropdown col-lg-4">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownSort" data-toggle="dropdown">
                Sort
              </button>
              <div class="dropdown-menu">
                <span class="dropdown-item" onclick="sortUser('noTEC_asc');">No Tec(asc)</span>
                <span class="dropdown-item" onclick="sortUser('noTEC_desc');">No Tec(desc)</span>
                <span class="dropdown-item" onclick="sortUser('nama_asc');">Nama(asc)</span>
                <span class="dropdown-item" onclick="sortUser('nama_desc');">Nama(desc)</span>
              </div>
            </div>
          </div>
        </div>
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
