<?php 

/**
 *  Модель для таблицы категорий (categories)
 * 
 */


/** 
 * Получить дочернии категориии для категории $catId
 * 
 * @param integer $catId ID катеригии
 * @return array массив дочерних категорий
 */
function getChildrenForCat($catId) {
    global $db;
    $sql  = "SELECT * FROM categories WHERE parent_id = '$catId'";
    $rs = mysqli_query($db, $sql);
    
    return createSmartyRsArray($rs);
}


/**
 * 
 *  Получить главные категории с привязками дочерних
 * 
 * @return array массив категорий
 */
function getAllMainCatsWithChildren() {
    global $db;
    $sql  = 'SELECT * FROM categories WHERE parent_id = 0';
    $rs = mysqli_query($db, $sql);

    $smartyRs = array();
    while ($row = mysqli_fetch_assoc($rs)) {

        $rsChildren = getChildrenForCat($row['id']);

        if($rsChildren) {
            $row['Children'] = $rsChildren;
        }

        $smartyRs[] = $row;
    }

    return $smartyRs;
}


/** 
 * Получить данные категории по id
 * 
 * @param integer $catId ID катеригии
 * @return array массив - строка категории
 */
function getCatById($catId) {
    global $db;
    $catId = intval($catId); // перевод любых вставок по ID в тип INTEGER
    $sql  = "SELECT * FROM categories WHERE id = '$catId'";
    $rs = mysqli_query($db, $sql);
    
    return mysqli_fetch_assoc($rs);
}