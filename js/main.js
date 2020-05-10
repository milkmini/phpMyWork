/**
 *  функция добавления товара в корзину
 * 
 *  @param integer itemId ID продукта
 *  @return в случае успеха обновятся данные корзины на странице 
 */
function addToCart(itemId) {
    //console.log("js-addToCart()");
    $.ajax({
        type: 'POST',
        async: false,
        url: "/cart/addtocart/" + itemId + '/',
        dataType: 'json',
        success: function(data) {
            if(data['success']) {
                swal({
                    title: "Отлично!",
                    text: "Товар добавлен в корзину",
                    icon: "success",
                });
                $('#cartCntItems').html(data['cntItems']);
            }
        }
    });
}


/**
 *  функция удаления товара из корзины
 * 
 *  @param integer itemId ID продукта
 *  @return в случае успеха обновятся данные корзины на странице 
 */
function removeFromCart(itemId) {
    //console.log("js - removeFromCart("+itemId+")");
    $.ajax({
        type: 'POST',
        async: false,
        url: "/cart/removefromcart/" + itemId + '/',
        dataType: 'json',
        success: function(data) {
            if(data['success']) {
                $('#cartCntItems').html(data['cntItems']);
                $('#addCart_' + itemId).show();
                $('#removeCart_' + itemId).hide();               
            }
        }
    });
}


/**
 * 
 * Подсчет стоимости купленного товара
 * 
 * @param integer itemId ID продукта
 */
function conversionPrice(itemId) {
    let newCnt = $('#itemCnt_' + itemId).val();
    let itemPrice = $('#itemPrice_' + itemId).attr('value');
    let itemRealPrice = newCnt * itemPrice;

    $('#itemRealPrice_' + itemId).html(itemRealPrice);
}


/**
 *  Получение данных с формы
 * 
 */
function getData(obj_form) {
    let hData = {};
    $('input, textarea, select', obj_form).each(function() {
        if(this.name && this.name!='') {
            hData[this.name] = this.value;
            //console.log('hData[' + this.name + '] = ' + hData[this.name]);
        }
    });
    return hData;
}
/**
 *  Регистрация нового пользователя
 * 
 */
function registerNewUser() {
    let postData = getData('#registerBox');

    $.ajax({
        type: 'POST',
        async: false,
        url: "/user/register/",
        data: postData,
        dataType: 'json',
        success: function(data) {
            if(data['success']) {
                alert('Регистрация прошла успешно');

                //> блок в левом столбце
                $('#registerBox').hide();

                $('#userLink').attr('href', '/user/');
                $('#userLink').html(data['userName']);
                $('#userBox').show();
                //>

                //> страница заказа
                $('#lodinBox').hide();
                $('#btnSaveOrder').show();
                //<

            } else {
                alert(data['message']);
            }
        }
    });
}



/**
 *  Авторизация пользователя
 * 
 */
function login() {
    let email = $('#loginEmail').val();
    let pwd = $('#loginPwd').val();

    let postData = "email="+ email +"&pwd=" +pwd;

    $.ajax({
        type: 'POST',
        async: false,
        url: "/user/login/",
        data: postData,
        dataType: 'json',
        success: function(data) {
            if(data['success']) {
                $('#registerBox').hide();
                $('#loginBox').hide();

                $('#userLink').attr('href', '/user/');
                $('#userLink').html(data['displayName']);
                $('#userBox').show();

                //> Заполняем поля на странице заказа
                $('#name').val(data['name']);
                $('#phone').val(data['phone']);
                $('#adress').val(data['adress']);
                //<

                $('#btnSaveOrder').show();

            } else {
                alert(data['message']);
            }
        }
    });
}


/**
 *  Показать или прятать форму регистрации
 * 
 */
function showRegisterBox() {
    if( $("#registerBoxHidden").css('display') != 'block') {
        $("#registerBoxHidden").show();
    } else {
        $("#registerBoxHidden").hide();
    }
}


/**
 *  Обновление данных пользователя
 * 
 */
function updateUserData() {
    //console.log("js - updateUserData()");
    let phone  = $('#newPhone').val();
    let adress = $('#newAdress').val();
    let pwd1   = $('#newPwd1').val();
    let pwd2   = $('#newPwd2').val();
    let curPwd = $('#curPwd').val();
    let name   = $('#newName').val();

    let postData = {phone: phone,
                    adress: adress,
                    pwd1: pwd1,
                    pwd2: pwd2,
                    curPwd: curPwd,
                    name: name};

    $.ajax({
        type: 'POST',
        async: false,
        url: "/user/update/",
        data: postData,
        dataType: 'json',
        success: function(data) {
            if(data['success']) {
                $('#userLink').html(data['userName']);
                alert(data['message']);
            } else {
                alert(data['message']);
            }
        }
    });
}


/**
 * Сохранение заказа
 * 
 */
function saveOrder() {
    let postData = getData('form');
    $.ajax({
        type: 'POST',
        async: false,
        url: "/cart/saveorder/",
        data: postData,
        dataType: 'json',
        success: function(data) {
            if(data['success']) {
                alert(data['message']);
                document.location = '/';
            } else {
                alert(data['message']);
            }
        }
    });
} 


/**
 *  Позказывать или прятать данные о заказе
 * 
 */
function showProducts(id) {
    let objName = "#purchasesForOrderId_" + id;
    if( $(objName).css('display') != 'table-row' ) {
        $(objName).show();
    } else {
        $(objName).hide();
    }
}


/**
 *  Галерея magnificPopup
 * 
 */
$(function(){
    $('.gallery__inner, .gallery__inner__1').magnificPopup({
		delegate: 'a',
		type: 'image',
		tLoading: 'Loading image #%curr%...',
		mainClass: 'mfp-img-mobile',
		gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			}
		}
    });
    
    $(".popup").magnificPopup();
});



$(document).ready(function(){
	$(".slider").owlCarousel({
		items: 1,
		loop: true,
		autoplay: true,
		autoplayTimeout: 3000,
	});

	$(".btn-nav").on("click", function() {
		var target = $(this).data("target");
		$(target).toggleClass("nav__list--open");
    });
    
});

$(function(){

    $('.slider__inner, .news__slider-inner').slick({
      nextArrow: '<button type="button" class="slick-btn slick-next"></button>',
      prevArrow: '<button type="button" class="slick-btn slick-prev"></button>',
      infinite: false
    });
  
    $('select').styler();
  
    $('.header__btn-menu').on('click', function(){
      $('.menu ul').slideToggle();
    });
  
});




$("#form").submit(function() {
	$.ajax({
		type: "POST",
		url: "../../mailIndex.php",
		data: $(this).serialize()
	}).done(function() {
		swal({
            title: "Отлично!",
            text: "Ваш праздник уже стал лучше!",
            icon: "success",
        });
		setTimeout(function() {
			$.magnificPopup.close();
		}, 1000);
	});
	return false;
});






