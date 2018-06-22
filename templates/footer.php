<div class="container">
    <hr />
    <footer>
        <p>&copy; TEC 2018</p>
    </footer>
</div>

<script>
    $('#testi').bcSwipe({ threshold: 50 });
    $('#hero .carousel-item').each(function( index ) {
        var properti = "url('"+$(this).attr('hero-bg')+"') no-repeat center center";
        $( this ).css("background",properti);
        $( this ).css("background-size","cover");
    });
    $('#hero').bcSwipe({ threshold: 50 });
</script>
</body>
</html>
