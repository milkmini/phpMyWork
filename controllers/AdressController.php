<?php

/**
 *  AdressControiller.php
 *  
 *  Контроллер страницы адреса
 * 
 */

// Подключение модели



/**
 * Формирование страницы продукта
 * 
 * @param object $smarty шаблонизатор
 */ 
function indexAction($smarty) {


    $smarty->assign('pageTitle', 'Контакты');
 
	loadTemplate($smarty, 'header');
    loadTemplate($smarty, 'adress');
    loadTemplate($smarty, 'footer');
}