<?php
/**
 * Slim framework entrypoint
 */

use Slim\Views\PhpRenderer;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require 'vendor/autoload.php';

define("BASE_URL", "http://localhost/Web-TEC");

$app = new \Slim\App;

$container = $app->getContainer();
$container['renderer'] = new PhpRenderer("./templates");

/**
 * Home view
 */
$app->get('/', function ($request, $response, $args) {
    // $this->renderer->render($response, "/header.php", $args);
    // $this->renderer->render($response, "/home.php", $args);
    return $this->renderer->render($response, "/landing.php", $args);
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
 * Profile view
 */
$app->get('/profile', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/profile.php", $args);
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

$app->get('/admin/coupon', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-coupon.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

$app->get('/admin/quiz/add', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-quiz.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

$app->get('/admin/quiz/score', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-score.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

$app->get('/admin/user', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-user.php", $args);
    return $this->renderer->render($response, "/footer.php", $args);
});

$app->get('/admin/relations', function ($request, $response, $args) {
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/admin-relations.php", $args);
    return $this->renderer->render($response, "/footer-blank.php", $args);
});

$app->run();
