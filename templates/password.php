 <!--EMPTY PADDING -->
  <div class="mb-5"></div>

  <div class="container">


    <div class="row">

      <div class="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title mt-3">Ubah Password</h3>
          </div>
          <div class="card-body">
            <p class="card-text">Silahkan masukkan password lama dan baru</p>
            <form onsubmit="changePass(); return false;">

              <div class="form-group">
                <label for="resetEmail" class="cols-sm-2 control-label">Password lama</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <input type="password" class="form-control" id="oldPassInput"  placeholder="Password lama"/>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="resetEmail" class="cols-sm-2 control-label">Password baru</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <input type="password" class="form-control" id="newPassInput"  placeholder="Password baru"/>
                    <div class="invalid-feedback">
                      Password tidak valid (minimal 10 karakter)
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label for="resetEmail" class="cols-sm-2 control-label">Konfirmasi password baru</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <input type="password" class="form-control" id="konfirmasiInput"  placeholder="Password baru"/>
                    <div class="invalid-feedback">
                      Konfirmasi tidak sama
                    </div>
                  </div>
                </div>
              </div>

              <div id="changeButtonLoc" class="form-group ">
                <button type="submit" id="changeButton" class="w-100 btn btn-primary">Konfirmasi</button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
  <script src="<?=BASE_URL?>/js/changePass.js" defer="defer"></script>
