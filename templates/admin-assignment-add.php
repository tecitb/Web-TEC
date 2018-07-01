<!--EMPTY PADDING -->
<div class="mb-5"></div>

<div class="container" style="margin-top: 24px">
    <div class="row">
        <div class="col-12">
            <input type="text" class="font-weight-bold text-capitalize form-control" id="judulAssignment" placeholder="Judul Assignment">
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

                <div class="card mb-3">
                    <div class="card-header">
                        <textarea class="form-control" id="descAssignment" placeholder="Deskripsi" aria-label="Soal" rows="2"></textarea>
                    </div>
                </div>

            </div>
        </div>
    </div>
    <!-- END QUESTION CARD -->

    <div class="mb-3"></div>

    <!-- START BUTTON-->

    <div class="mb-3"></div>
    <div class="row">
        <div class="col-md-4 offset-md-4 text-center">
            <div id="sendButtonLoc">
                <span id="sendButton" onclick="kirimQuiz();" class="btn btn-primary w-100">Buat assignment</span>
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
<script src="<?=BASE_URL?>/js/assignment-add.js" defer="defer"></script>
<script src="<?=BASE_URL?>/js/admin.js" defer="defer"></script>
