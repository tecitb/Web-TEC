 <!--EMPTY PADDING -->
  <div class="mb-5"></div>

  <div class="container">


    <div class="row">

      <div class="col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div class="card">
          <div class="card-header">
            <h3 class="card-title mt-3">Coupon Pembayaran</h3>
          </div>
          <div class="card-body">
            <p class="card-text">Silahkan masukkan coupon yang Anda dapatkan</p>
            <form onsubmit="submitCoupon(); return false;">

              <div class="form-group">
                <label for="resetEmail" class="cols-sm-2 control-label">Coupon</label>
                <div class="cols-sm-10">
                  <div class="input-group">
                    <input type="text" class="form-control" id="couponInput"  placeholder="XXXXXXXX"/>
                    <div id="coupon-feedback" class="invalid-feedback">
                      Coupon tidak valid
                    </div>
                    <div class="valid-feedback">
                      Berhasil
                    </div>
                  </div>
                </div>
              </div>

              <div id="couponButtonLoc" class="form-group ">
                <button type="submit" id="couponButton" class="w-100 btn btn-primary">Konfirmasi</button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
  <script src="<?=BASE_URL?>/js/coupon.js" defer="defer"></script>
