<div class="container" style="margin-top: 24px">
    <div class="row">
        <div class="col-12">
            <h1 id="judulQuiz"></h1>
            <hr>
        </div>
    </div>

    <div class="row">

        <!-- START QUESTION CARD -->

        <div class="col-md-8 offset-md-2">
            <div class="mb-5 hidden-md-up"></div>
            <div class="loader loader-big"></div>
            <div class="quiz-card">

                <!-- QUESTION GO HERE -->

            </div>
        </div>
    </div>
    <!-- END QUESTION CARD -->

    <!-- START PAGINATION -->
    <div class="row">
        <div class="col-md-6 offset-md-2">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <!-- PAGINATION HERE -->
                </ul>
            </nav>
        </div>
        <div class="col-md-2 text-center">
            <form id="submitForm">
                <span id="submitButton" onclick="submitQuiz();" class="btn btn-primary">Kirim jawaban</span>
                <div class="invalid-feedback">
                    Ada yang belum diisi
                </div>
            </form>
        </div>

        <!-- END PAGINATION -->



    </div>
</div>
<script src="<?=BASE_URL?>/js/quiz-do.js" defer="defer"></script>
