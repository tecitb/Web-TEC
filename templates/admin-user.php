<link rel="stylesheet" type="text/css" href="<?=BASE_URL?>/css/admin-user.css" />


<script type="text/javascript">
var argsId = "<?php
if(!isset($tecId)){
  echo "";
}else {
  echo $tecId;
}
?>";
</script>

<div class="container mt-5">
  <div class="row">
    <div class="col-md-4">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <h3 class="col-12">Daftar Nama</h3>
          </div>
          <div class="row">
            <div class="dropdown col-sm-6">
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

            <div class="col-sm-6">
              <div class="input-group">
                <input type="hidden" class="form-control" id="selectActive">
                <div class="searchable-container">

                  <div class="info-block block-info clearfix">
                    <div class="square-box pull-left">
                      <span class="glyphicon glyphicon-tags glyphicon-lg"></span>
                    </div>
                    <div data-toggle="buttons" class="btn-group bizmoduleselect">
                      <label class="m-0 mt-2 mt-sm-0 btn btn-default">
                        <div class="bizcontent">
                          <input type="checkbox" name="activeCheck" autocomplete="off" value="memberOnly">
                          <span class="glyphicon glyphicon-ok glyphicon-lg"></span>
                          <span>Aktif</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <div class="row">
            <div class="col-12">
              <form onsubmit="search(); return false;">
              <div class="input-group mt-2">

                  <input type="text" id="userSearch" class="form-control" placeholder="Search" aria-label="Search">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="submit">Search</button>
                  </div>

              </div>
              </form>
            </div>
          </div>

        </div>
        <div class="card-body px-1">
          <ul id="userList" class="list-group">
            <!-- Placeholder selama loading daftar user -->
            <li class="list-group-item"><div class="loader loader-small"></div></li>
            <span href="#" class="list-group-item list-group-item-action text-center">Loading</span>
          </ul>
          <nav id="paginationLoc" class="mt-2">
            <ul class="pagination justify-content-center mb-0">
              <li class="page-item">
                <a class="page-link" onclick="prevPage();" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li class="page-item"><input id="paginationInput" class="no-spinners text-center page-link" type="number"></input></li>
              <li class="page-item">
                <a class="page-link" onclick="nextPage();" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>


    </div>
    <div id="userDataLoc" class="col-md-8 mt-2 mt-md-0">
      <!-- Placeholder sebelum diselect user -->
      <h2 class="align-middle text-center">Silahkan pilih user</h2>
    </div>
  </div>
</div>

<div class="modal fade" id="deleteModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Coret user</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Yakin coret?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button onclick="coretUser();" type="button" data-dismiss="modal" class="btn btn-danger">Coret</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="uncoretModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Uncoret user</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        Yakin uncoret?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button onclick="uncoretUser();" type="button" data-dismiss="modal" class="btn btn-success">Uncoret</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="passModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Change password</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="newPass" class="col-form-label">Password:</label>
            <input type="password" class="form-control" id="newPass">
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button onclick="submitNewPass();" type="button" data-dismiss="modal" class="btn btn-success">Submit</button>
      </div>
    </div>
  </div>
</div>

<script src="<?=BASE_URL?>/js/admin-user.js" defer="defer"></script>
<script src="<?=BASE_URL?>/js/admin.js" defer="defer"></script>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/css/bootstrap-select.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-select/1.13.1/js/bootstrap-select.min.js" defer="defer"></script>
