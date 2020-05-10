<?php

/**
 *  ProductController.php
 *  
 *  Контроллер страницы товара (/product/1)
 * 
 */

// Подключение модели
include_once 'models/ProductsModel.php';
include_once 'models/CategoriesModel.php';


/**
 * Формирование страницы продукта
 * 
 * @param object $smarty шаблонизатор
 */ 
function indexAction($smarty) {
    $itemId = isset($_GET['id']) ? $_GET['id'] : null;
    if( ! $itemId) exit();

    //  Получить данные продукта
    $rsProduct = getProductById($itemId);
    
    // Получить все категории
    $rsCategories = getAllMainCatsWithChildren();

    $smarty->assign('itemInCart', 0);
    if(in_array($itemId, $_SESSION['cart'])) {
        $smarty->assign('itemInCart', 1);
    }

    $smarty->assign('pageTitle', '');
    $smarty->assign('rsCategories', $rsCategories);
    $smarty->assign('rsProduct', $rsProduct);
 
	loadTemplate($smarty, 'header');
    loadTemplate($smarty, 'product');
    loadTemplate($smarty, 'footer');
}
