<?php

/**
 *  ONasController.php
 *  
 *  Контроллер Информации о нас
 * 
 */

// Подключение модели



/**
 * Формирование страницы О Нас
 * 
 * @param object $smarty шаблонизатор
 */ 
function indexAction($smarty) {

    $smarty->assign('pageTitle', 'Информация о нас');
 
	loadTemplate($smarty, 'header');
    loadTemplate($smarty, 'onas');
    loadTemplate($smarty, 'footer');
}