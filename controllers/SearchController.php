<?php

/**
 *  SearchController.php
 * 
 */

// Подключение модели
include_once 'models/CategoriesModel.php';
include_once 'models/ProductsModel.php';

/**
 * Формирование страницы категорий
 * 
 * @param object $smarty шаблонизатор
 */ 
function indexAction($smarty) {

    $rsProduct = getSearchAllProducts();

    $rsCategories = getAllMainCatsWithChildren();
    

    $smarty->assign('pageTitle', 'Поиск товаров');

    $smarty->assign('rsProduct', $rsProduct);

    $smarty->assign('rsCategories', $rsCategories);
    
	loadTemplate($smarty, 'header');
    loadTemplate($smarty, 'search');
    loadTemplate($smarty, 'footer');
}