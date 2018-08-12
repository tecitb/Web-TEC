<!--EMPTY PADDING -->
<div class="mb-5"></div>

<div class="container">


  <div class="row">

    <div class="col-md-8 offset-md-2 col-lg-6 offset-lg-3">
      <div class="card">
        <div class="card-header">
          <h3 class="card-title mt-3">Coupon</h3>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <h4 class="card-title">Generate Coupon</h4>

            <!-- Form generate coupon -->
            <form onsubmit="generateCoupon(); return false;">
              <div class="form-row">
                <div class="col-9 my-1">
                  <label class="sr-only" for="inlineFormInputName">Jumlah Kupon</label>
                  <input type="number" min="1" max="50" class="form-control" id="generateJumlah" placeholder="Jumlah kupon">
                  <div class="valid-feedback">
                    Sukses
                  </div>
                  <div id="generateFeedback" class="invalid-feedback">
                    Gagal
                  </div>
                </div>
                <div class="col-3 my-1">
                  <div id="generateButtonLoc">
                    <button type="submit" id="generateButton" class="btn btn-primary w-100">Submit</button>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="ml-2 form-check">
                  <input type="checkbox" class="form-check-input" id="nonPaymentGen">
                  <label class="form-check-label" for="nonPaymentGen">Kupon non pembayaran</label>
                </div>
              </div>
            </form>

          </li>
          <li class="list-group-item">
            <h4 class="card-title">Edit Coupon</h4>

            <!-- Form edit coupon -->
            <form onsubmit="return false;">
              <div class="form-row">
                <div class="col-6 my-1">
                  <label class="sr-only" for="inlineFormInputName">Kode Kupon</label>
                  <input type="text" class="form-control" id="couponInput" placeholder="Kode kupon">
                  <div class="valid-feedback">
                    Sukses
                  </div>
                  <div id="editFeedback" class="invalid-feedback">
                    Gagal
                  </div>
                </div>
                <div class="col-3 my-1">
                  <div id="editNonButtonLoc">
                    <button onclick="editCoupon(0);" id="editNonButton" class="btn btn-primary w-100">Non paying</button>
                  </div>
                </div>
                <div class="col-3 my-1">
                  <div id="editPayButtonLoc">
                    <button onclick="editCoupon(1);" id="editPayButton" class="btn btn-primary w-100">Paying</button>
                  </div>
                </div>
              </div>
            </form>

          </li>
          <li class="list-group-item">
            <h4 class="card-title">Liat Coupon</h4>

            <!-- Form generate coupon -->
            <form onsubmit="getCoupon(); return false;">
              <div class="form-row">
                <div class="col-9 my-1">
                  <label class="sr-only" for="inlineFormInputName">Jumlah Kupon</label>
                  <input type="number" min="1" class="form-control" id="liatJumlah" placeholder="Jumlah kupon">
                  <div class="valid-feedback">
                    Sukses
                  </div>
                  <div id="liatFeedback" class="invalid-feedback">
                    Gagal
                  </div>
                </div>
                <div class="col-3 my-1">
                  <div id="liatButtonLoc">
                    <button type="submit" id="liatButton" class="btn btn-primary w-100">Submit</button>
                  </div>
                </div>
              </div>
              <div class="form-row">
                <div class="ml-2 form-check">
                  <input type="checkbox" class="form-check-input" id="nonPaymentSee">
                  <label class="form-check-label" for="nonPaymentSee">Kupon non pembayaran</label>
                </div>
              </div>
            </form>

            <div class="mb-3"></div>

            <!--  Coupon list go here -->
            <div id="couponList">

            </div>

          </li>
        </ul>

      </div>

    </div>
  </div>
</div>
<script src="<?=BASE_URL?>/js/admin-coupon.js" defer="defer"></script>
<script src="<?=BASE_URL?>/js/admin.js" defer="defer"></script>
