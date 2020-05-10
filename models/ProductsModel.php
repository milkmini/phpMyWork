<?php 

/**
 *  Модель для таблицы продукции (products)
 *
 *  
 */


/** 
 * Получаем последние добавленные товары
 * 
 * @param integer $limit Лимит товаров
 * @return array массив товаров
 */

function getLastProducts($limit = null) {
    global $db;
    $sql  = "SELECT * FROM products ORDER BY id DESC";
    
    if($limit) {
        $sql .= " LIMIT $limit";
    }
    $rs = mysqli_query($db, $sql);

    return createSmartyRsArray($rs);
    
} 


/** 
 * Получаем продукции для категории $itemId
 * 
 * @param integer $itemId ID категории
 * @return array массив продукции
 */
function getProductsByCat($itemId) {
    global $db;
    $itemId = intval($itemId); // перевод любых вставок по ID в тип INTEGER
    $sql  = "SELECT * FROM Products WHERE category_id = '$itemId'";
    $rs = mysqli_query($db, $sql);
        
    return createSmartyRsArray($rs);
}


/** 
 * Получить данные продукта по ID
 * 
 * @param integer $itemId ID продукта
 * @return array массив данных продукта
 */
function getProductById($itemId) {
    global $db;
    $itemId = intval($itemId); // перевод любых вставок по ID в тип INTEGER
    $sql  = "SELECT * FROM Products WHERE id = '$itemId'";
    $rs = mysqli_query($db, $sql);
        
    return mysqli_fetch_assoc($rs);
}


/** 
 * Получать список продуктов из массива идентификаторов (ID`s)
 * 
 * @param array $itemsIds массив идентификаторов продуктов
 * @return array массив данных продукта
 */
function getProductsFromArray($itemsIds) {
    global $db;
    $strIds = implode(', ', $itemsIds);
    $sql  = "SELECT * FROM Products WHERE id in ({$strIds})";
    $rs = mysqli_query($db, $sql);
        
    return createSmartyRsArray($rs);
}



/** 
 * Получение товара из BD для поиска товаров
 * 
 */
function getSearchAllProducts() {
    global $db;
    if(isset($_POST['submit'])) {
        $search = explode(" ", $_POST['search']);
        $count = count($search);
        $array = array();
        $i = 0;
        foreach($search as $key) {
            $i++;
            if($i < $count) $array[] = "CONCAT (`name`) LIKE '%".$key."%' OR "; 
            else $array[] = "CONCAT (`name`) LIKE '%".$key."%'";
        }
        $sql = "SELECT * FROM `products` WHERE ".implode("", $array);

        $rs = mysqli_query($db, $sql);

        $smartyRs = array();
        while ($row = mysqli_fetch_assoc($rs)) {
            $smartyRs[] = $row;
        }
    return $smartyRs;
    }
}