<?php
/**
 * Slim framework entrypoint
 */
header("X-Env-Hostname: ".gethostname());

use Slim\Views\PhpRenderer;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';

define("BASE_URL", getenv("BASE_URL") ?: "http://localhost/Web-TEC");
define("SERVER_URL", getenv("SERVER_URL") ?: "https://intern.tec.or.id/restsvc/public");

$app = new \Slim\App;

$container = $app->getContainer();
$container['renderer'] = new PhpRenderer("./templates");

/**
 * Home view
 */
$app->get('/', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/landing.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Register view
 */
$app->get('/register', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/register.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});


/**
 * Reset credentials view
 */
$app->get('/reset', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/reset.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});


/**
 * Quiz list view
 */
$app->get('/quiz', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/quiz-pre.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Quiz do view
 */
$app->get('/quiz-do', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/quiz-do.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Assignment list view
 */
$app->get('/assignment', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/assignment-pre.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Assignment do view
 */
$app->get('/assignment-do', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/assignment-do.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Coupon view
 */
$app->get('/coupon', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/coupon.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Profile view
 */
$app->get('/profile', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/profile.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Change password view
 */
$app->get('/changePass', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/password.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Admin landing view
 */
$app->get('/admin', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-landing.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Admin coupon view
 */
$app->get('/admin/coupon', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-coupon.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Admin quiz add view
 */
$app->get('/admin/quiz/add', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-quiz.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Admin quiz score view
 */
$app->get('/admin/quiz/score', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-score.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Admin users view
 */
$app->get('/admin/user', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-user.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Admin users spesific view
 */
$app->get('/admin/user/{tecId}', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-user.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Admin view assignment
 */
$app->get('/admin/assignment', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-assignment.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * Admin add assignment view
 */
$app->get('/admin/assignment/add', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-assignment-add.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

/**
 * No Javascript view
 */
$app->get('/nojs', function ($request, $response, $args) {
    return $this->renderer->render($response, "/nojs.php", $args);
});

/**
 * Assignment download helper
 * This is required since download is commenced by browser, bypassing AJAX, thus eliminating the possibility
 * of appending an additional Authorization header
 */
$app->get('/assignment/download/{filename}', function ($request, $response, $args) {
    $filename = str_replace(array("/", "\\", "%"), array("_", "_", ""), $args['filename']);
    $token = $_COOKIE['token'];

    // Retrieves file
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, SERVER_URL."/api/download/assignment/".$filename);
    curl_setopt($ch, CURLOPT_HEADER, true);            // No header in the result
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: Bearer '.$token,
        'X-TEC-Agent: InternWeb'
    ));
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // Return, do not echo result

    // Fetch and return content, save it.
    $raw_data = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if($code === 200) {
        return $response->withHeader('Content-Type', 'application/force-download')
            ->withHeader('Content-Type', 'application/octet-stream')
            ->withHeader('Content-Type', 'application/download')
            ->withHeader('Content-Description', 'File Transfer')
            ->withHeader('Content-Transfer-Encoding', 'binary')
            ->withHeader('Content-Disposition', 'attachment; filename="' . $filename . '"')
            ->withHeader('Expires', '0')
            ->withHeader('Cache-Control', 'must-revalidate, post-check=0, pre-check=0')
            ->withHeader('Pragma', 'public')
            ->write($raw_data); // all stream contents will be sent to the response
    } else {
        return $response->withHeader('Content-Type', 'text/plain')->write($code);
    }
});

/**
 * Admin relation view
 */
$app->get('/admin/relations', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-relations.php", $args);
    return $this->renderer->render($response, "/footer-blank.php", $args);
});

$app->run();
