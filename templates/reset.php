 <!--EMPTY PADDING -->
  <div class="mb-5"></div>

  <div class="container">


    <div class="row">

      <div class="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title mt-3">Lupa Password</h3>
          </div>
          <div class="card-body">
            <p class="card-text">Silahkan masukkan email Anda</p>
            <form onsubmit="submitReset(); return false;">

              <div class="form-group">
                <label for="resetEmail" class="cols-sm-2 control-label">Email</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <input type="email" class="form-control" id="resetEmail"  placeholder="email@example.com"/>
                    <div id="email-feedback" class="invalid-feedback">
                      Email tidak valid
                    </div>
                  </div>
                </div>
              </div>

              <div id="resetButtonLoc" class="form-group ">
                <button type="submit" id="resetButton" class="w-100 btn btn-primary">Reset</button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
  <script src="<?=BASE_URL?>/js/reset.js" defer="defer"></script>
