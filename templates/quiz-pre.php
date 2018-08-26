
  <div class="container" style="margin-top: 24px">
    <div class="row">
      <div class="col-12">
        <h1>Quiz</h1>
        <hr>
      </div>
    </div>

    <!-- START QUIZ CARD-->
    <div class="row">
      <div class="order-lg-1 d-flex justify-content-center align-items-center col-lg-4">
        <div>
            <h4>Semangat ngisi quiznya!</h4>
            <p style="margin-bottom: 48px;">
                Pilih salah satu quiz untuk mulai mengerjakan. Quiz hanya bisa dikerjakan <b>satu kali</b>, dan nilai quiz kamu akan langsung ditampilkan setelah dikerjakan.
            </p>
            <img class="w-100" src="<?=BASE_URL?>/img/quiz.svg"/>
      </div>
      </div>
      <div class="col-lg-8">
        <div class="mb-5 hidden-md-up"></div>
        <div class="loader loader-big"></div>
        <div class="card-columns quiz-card">
            <!-- CARD DISINI -->

        </div>
      </div>
    </div>

    <!-- END QUIZ CARD-->

    <div class="row">
      <div class="col-lg-8">
        <nav aria-label="Quiz Page Navigation">
          <ul class="pagination">
            <!-- PAGINATION HERE -->
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <script src="<?=BASE_URL?>/js/quiz-pre.js" defer="defer"></script>
