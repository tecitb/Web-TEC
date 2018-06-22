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
    $this->renderer->render($response, "/header.php", $args);
    $this->renderer->render($response, "/home.php", $args);
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

$app->run();