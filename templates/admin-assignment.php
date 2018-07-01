<link rel="stylesheet" type="text/css" href="<?=BASE_URL?>/css/admin-score.css" />

<div class="container mt-5">
  <div class="row">
    <div class="col-md-4">
      <div class="card">
        <h3 class="card-header">Daftar Assignment</h3>
        <div class="card-body px-1">
          <ul id="quizList" class="list-group">
            <!-- Placeholder selama loading daftar quiz -->
            <li class="list-group-item"><div class="loader loader-small"></div></li>
            <span href="#" class="list-group-item list-group-item-action text-center">Loading</span>
          </ul>
        </div>
      </div>


    </div>
    <div id="quizDataLoc" class="col-md-8 my-auto">
      <!-- Placeholder sebelum diselect quiz -->
      <div class="mb-3 hidden-md-up"></div>
      <h2 class="align-middle text-center">Silahkan pilih assignment</h2>
    </div>
  </div>
</div>

<div class="modal fade" id="deleteModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Hapus assignment</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Yakin hapus?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button onclick="deleteAssignment();" id="deleteButton" type="button" data-dismiss="modal" class="btn btn-danger">Hapus</button>
      </div>
    </div>
  </div>
</div>

<script src="<?=BASE_URL?>/js/admin-assignment.js" defer="defer"></script>
<script src="<?=BASE_URL?>/js/admin.js" defer="defer"></script>
