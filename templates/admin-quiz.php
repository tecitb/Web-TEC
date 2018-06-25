<!--EMPTY PADDING -->
<div class="mb-5"></div>

<div class="container" style="margin-top: 24px">
    <div class="row">
        <div class="col-12">
            <input type="text" class="font-weight-bold text-capitalize form-control" id="judulQuiz" placeholder="Judul quiz">
            <div class="invalid-feedback">
              Jangan lupa diisi
            </div>
            <hr>
        </div>
    </div>

    <div class="row">

        <!-- START QUESTION CARD -->

        <div class="col-md-8 offset-md-2">

            <div class="quiz-card">

                <!-- QUESTION GO HERE -->

            </div>
        </div>
    </div>
    <!-- END QUESTION CARD -->

    <div class="mb-3"></div>

    <!-- START BUTTON-->
    <div class="row">
      <div class="col-md-6 mb-2 text-center">
          <form>
              <span onclick="addQuiz('pilgan');" class="btn btn-primary w-100">Tambah pilgan</span>
              <div class="invalid-feedback">
                  Gagal
              </div>
          </form>
      </div>
      <div class="col-md-6 mtext-center">
          <form>
              <span onclick="addQuiz('isian');" class="btn btn-primary w-100">Tambah isian</span>
              <div class="invalid-feedback">
                  Gagal
              </div>
          </form>
      </div>
    </div>
    <div class="mb-3"></div>
    <div class="row">
        <div class="col-md-4 offset-md-4 text-center">
                <div id="sendButtonLoc">
                  <span id="sendButton" onclick="kirimQuiz();" class="btn btn-primary w-100">Buat quiz</span>
                </div>
                <input id="sendFeedbackLoc" type="text" class="form-control d-none"></input>
                <div id="sendFeedback" class="invalid-feedback">
                    Gagal
                </div>
                <div class="valid-feedback">
                    Sukses
                </div>
        </div>

        <!-- END BUTTON -->



    </div>
</div>
<script src="<?=BASE_URL?>/js/quiz-make.js" defer="defer"></script>
<script src="<?=BASE_URL?>/js/admin.js" defer="defer"></script>
