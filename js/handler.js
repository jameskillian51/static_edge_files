
//Handles Checkout and payment verifier 
const url = new Url;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
/* let phoneRegex = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; */
let phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
let zipRegex = /^([0-9]{6})+$/;
let textRegex = /^([A-Za-z]{3,})$/
let errMsg = $('.qty-error');
errMsg.hide();
let selected = $('#state');

let firstname = $('#firstname');
let towncss = document.getElementById("town");
function formSubmit() {
    let checkOutForm = $('#checkout-form');

    console.log('button clicked');
    let city = $('#town');
    let lastname = $('#lastname');
    let pNum = $('#phone');
    let addr = $('#address');
    let emailAddr = $('#email');
    let zip = $('#zip');
    if (city.val() == '') {
        $('#town').cssText = "border: 1px solid red";
    }

    if (!firstname.val().match(textRegex) || !lastname.val().match(textRegex) || !pNum.val().match(phoneRegex) || !zip.val().match(zipRegex) || !emailAddr.val().match(emailRegex) || addr.val() <= 15 || city.val() == '' || selected.val() == 'default') {
        console.log('error occurred');





        if (!firstname.val().match(textRegex) || firstname.value == '') {
           
            firstname[0].style.cssText = "border: 1px solid red !important";
        }
        if (!lastname.val().match(textRegex) || lastname.val() == '') {
            lastname[0].style.cssText = "border: 1px solid red";
        }
        if (selected.val() == 'default') {
            selected[0].style.cssText = "border: 1px solid red";

        }
        if (!pNum.val().match(phoneRegex) || pNum.val() == '') {
            pNum[0].style.cssText = "border: 1px solid red";
        }
        if (!zip.val().match(zipRegex) || zip.val() == '') {
            zip[0].style.cssText = "border: 1px solid red";
        }
        if (!emailAddr.val().match(emailRegex) || emailAddr.val() == '') {
            emailAddr[0].style.cssText = "border: 1px solid red";
        }
        if (addr.val() < 15 || addr.val() == '') {
            addr[0].style.cssText = "border: 1px solid red";
        }
        if (towncss.value == '') {
            towncss.style.cssText = "border: 1px solid red";
        }
    } else {
        console.log('good')
        // document.getElementById('checkout-form').submit();
        payWithPaystack()
        return true;

    }



}




function validateSelect(sel) {
    let element = sel.value;
    let elementName = $("#state :selected").text();
    let nextSibling = sel.nextElementSibling;
    if (element == 'default') {
        sel.style.cssText = "border: 1px solid red";
        nextSibling.style.cssText = "display:block;"
        nextSibling.textContent = "Please select a state";
        $('#town').html('');
        towncss.style.cssText = "border: 1px solid red";
        return false;

    } else {
        $('body').addClass('loading');
        $('body').append('<div class="processing bring_to_front"></div>');

        $.ajax({
            url: 'ajax_handler.php',
            type: 'POST',
            data: {
                state_id: element,
                find_state: 'find_state'
            },
            success: function (data) {
                console.clear();
                console.log(data);
                $('body').removeClass('loading');
                $('.processing').hide();
                $('#town').html(data);
                $('#town').css('border', '1px solid #e8e8e8');

            },
            error: function (e) {
                console.log(e);
            }
        })

    }
}

function validateInput(input_select) {
    let validata = $(input_select).val();
    let elementId = input_select.id;
    let nextSibling = input_select.nextElementSibling;


    if (validata == '') {
        input_select.style.cssText = "border: 1px solid red";
        nextSibling.style.cssText = "display:block;"

        nextSibling.textContent = "This field is required";
        return false

    } else {

        if (elementId == 'firstname' || elementId == 'lastname' || elementId == 'fullname') {

            if (validata.match(textRegex)) {
                input_select.style.cssText = "border: 1px solid #e8e8e8";
            } else {

                input_select.style.cssText = "border: 1px solid red";
                nextSibling.style.cssText = "display:block;"
                nextSibling.textContent = "Enter a valid name";
                return false
            };


        } else if (elementId == 'email') {
            if (validata.match(emailRegex)) {
                input_select.style.cssText = "border: 1px solid #e8e8e8";
            } else {

                input_select.style.cssText = "border: 1px solid red";
                nextSibling.style.cssText = "display:block;"
                nextSibling.textContent = "This email is not valid";
                return false
            }


        } else if (elementId == 'zip') {
            if (validata.match(zipRegex)) {
                input_select.style.cssText = "border: 1px solid #e8e8e8";
            } else {

                input_select.style.cssText = "border: 1px solid red";
                nextSibling.style.cssText = "display:block;"
                nextSibling.textContent = "Enter a valid Zipcode";
                return false
            }
        } else if (elementId == 'town') {
            if (validata.match(textRegex)) {
                input_select.style.cssText = "border: 1px solid #e8e8e8";
            } else {

                input_select.style.cssText = "border: 1px solid red";
                nextSibling.style.cssText = "display:block;"
                nextSibling.textContent = "enter a valid name";
                return false
            }
        } else if (elementId == 'phone') {

            if (validata.match(phoneRegex)) {
                input_select.style.cssText = "border: 1px solid #e8e8e8";
            } else {

                input_select.style.cssText = "border: 1px solid red";
                nextSibling.style.cssText = "display:block;"
                nextSibling.textContent = "Enter a valid phone number (International Format) ";
                return false
            }



        } else if (elementId == 'address') {

            if (validata.length > 15) {
                input_select.style.cssText = "border: 1px solid #e8e8e8";
            } else {

                input_select.style.cssText = "border: 1px solid red";
                nextSibling.style.cssText = "display:block;"
                nextSibling.textContent = "Enter a valid address ";
                return false
            }



        } else if (elementId == 'message-box') {

            if (validata.length > 15) {
                input_select.style.cssText = "border: 1px solid #e8e8e8";
            } else {

                input_select.style.cssText = "border: 1px solid red";
                nextSibling.style.cssText = "display:block;"
                nextSibling.textContent = "What's on your mind ?";
                return false
            }



        }
        else {

            input_select.style.cssText = "border: 1px solid #e8e8e8";

        }


    }




}


function hideMsg(input_select) {

    let nextSibling = input_select.nextElementSibling;
    input_select.style.cssText = "border: 1px solid #99caff";
    nextSibling.style.cssText = "display:none;"

}

function hideBorder(input_select) {
    $(input_select).removeClass('empty-field');
}

$(document).on('focus', '#contact_form .validate-input', function () {
    hideBorder(this);
})

function contactForm() {
    console.log('conatct form here');
    let msgResponse = $('#mail_result');
    let form = $('#contact_form');

    console.log('button clicked');
    let fullname = $('#fullname')
    let subject = $('#subject');
    /*     let pNum = $('#phone'); */
    let emailAddr = $('#email');
    let message = $('#message-box');
    let token = $('#g_token')
    let remoteip = $('#remoteip')
    let submitBtn = $('#submit_mail');



    if (fullname.val().length < 3 || subject.val().length < 3 || !emailAddr.val().match(emailRegex) || message.val().length < 10) {
        console.log('error occurred');



        if (fullname.val().length < 3 || fullname.value == '') {
           
            fullname.addClass('empty-field');
        }
        if (subject.val().length < 3 || subject.value == '') {
           
            subject.addClass('empty-field');
        }
        if (message.val().length < 10 || message.value == '') {
           
            message.addClass('empty-field');
        }
      
        if (!emailAddr.val().match(emailRegex) || emailAddr.val() == '') {
            emailAddr.addClass('empty-field');
        }

        msgResponse.html('<span class="mail_error">Please fill up all the required fields and verify inputs </span>')


    } else {
        msgResponse.html('');

        submitBtn.html('<span>Loading</span> <i class=" submit_spin fa fa-spinner"></i>');
        form.find(':input, textarea').prop('disabled', true);
        submitBtn.prop('disabled', true);
        $.ajax({
            url: 'ajax_handler.php',
            type: 'POST',
            dataType: 'JSON',
            data: {
                sendmail: 'sendmail',
                email: emailAddr.val(),
                /*   phone: pNum.val(), */
                subject: subject.val(),
                fullname: fullname.val(),
                token: token.val(),
                remoteip: remoteip.val(),
                msg: message.val()

            },
            success: function (data) {
                Recaptcha();
                console.log(data.msg);
                form.find(':input, textarea').prop('disabled', false);
                submitBtn.prop('disabled', false);
                submitBtn.html('Send Message');

                if (data.code == 200) {

                   
                    Swal.fire({
                        title: 'Successful',
                        text: data.msg,
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonText: 'Done',
                        confirmButtonColor: '#c61d48'
                    });
                  
                    form[0].reset();
                } else if (data == 404 || data.code == 401) {
                    Swal.fire({
                        title: 'Error',
                        text: data.msg,
                        icon: 'warning',
                        confirmButtonText: 'Try again',
                        confirmButtonColor: '#c61d48'
                    });

                 

                }
            },
            error: function (e) {
                console.log('Error sending mail: ', e);
            }
        })
    }



}

$(document).on('click', '#submit_mail', function () {
    console.clear();
    contactForm();
})




//////////////Google Recaptcha//////////////////////
function Recaptcha() {

    grecaptcha.ready(function () {
        //localhost
        //let key = "6LfO0ZkhAAAAALXa-i2sp--CNjnPWNc-jhLvxhq5";

        //Live
        let key = '6LdHfZglAAAAACKO3j9EiEQ7ILNKQh8GuWsaOFec';


        grecaptcha.execute(key, {
            action: 'homepage'
        }).then((token) => {

            jQuery('#g_token').val(token);

        });
    });
}
window.Recaptcha = Recaptcha;
Recaptcha();
//-----------------------------------------end of checkout handler-------------------------------------//

//START load cart data
const counter = $('#cart-count')


minicart();
let miniCartData = document.getElementById('display_cart');
let buttnData = $('#mini-button-div');

function minicart() {
    let miniCartData = document.getElementById('display_cart');
    action = 'minicart'
    console.log('gotten data')
    $.ajax({
        url: 'fetch-data.php',
        type: 'GET',
        // dataType: "json",
        data: {
            action: action
        },
        success: function (data) {

            if (data == '404') {
                console.log('no data')
                miniCartData.innerHTML = '<div class="no_data show_bg "><h5>Your cart is currently empty</h5><br><a href="" class="continue-shop">Continue shopping </a></div>';
            }
            // $('#mini-button-div').html(data.buttons)
            else {
                miniCartData.innerHTML = data;
                checkRateIsSet();


            }
        }, error: function (e) {
            console.log(e);
        }


    })
}



//-----------------------------------------end of search -------------------------------------//

//-----------------------------------------end of ambiance control-------------------------------------//
let notify = $('#notify');
let toastTitle = $('.toast-title');



// START -> handles the Add to Cart function
function addToCart(item) {

    let $form = $(item).parent('.hidden-form');

    let counter = $('#cart-count');
    let product_id = $form.find('.product_id').val();

    let qty = $form.find('.qty').val();
    let size = $form.find('.size').val();



    let flagS = false;

    $.ajax({
        url: 'ajax_handler.php',
        type: 'POST',
        dataType: 'JSON',
        data: {
            getprice: 'getprice',
            prod_id: product_id,
            qty: qty,
            size: size

        },
        success: function (data) {
            let product_id = data.id;
            let product_name = data.name;
            let product_price = data.price;
            let max_qty = data.max_qty;
            let thumb = data.thumb;
            let sum = data.sum;
            let weight = data.weight;
            let size = data.size;
            weight = parseFloat(weight);
            /*  let totalWeight = weight * qty; */
            let addtocart = 'add';
            flagS = true;
            if (flagS == true) {



                $('body').addClass('loading');
                $('body').append('<div class="processing bring_to_front"></div>');
                $.ajax({
                    url: "ajax_handler.php",
                    type: "POST",
                    data: {
                        addtocart: addtocart,
                        product_id: product_id,
                        product_name: product_name,
                        product_price: product_price,
                        max_qty: max_qty,
                        qty: qty,
                        thumb: thumb,
                        sum: sum,
                        size: size,
                        weight: weight


                    },
                    success: function (data) {

                        // minicart();
                        minicart();

                        $('body').removeClass('loading');
                        $('.processing').hide();

                        count = parseInt(counter.html());
                        if (data == 200) {
                            counter.html(count + 1);
                            notify.html(product_name + ' has been added successfully')
                            toastTitle.html(product_name);
                            pushNotify();



                        } else if (data == 201) {
                            notify.html(product_name + ' has exceeded the stock')
                            toastTitle.html(product_name);
                            pushNotify();
                            console.log('quantity exceeded');
                        } else if (data == 202) {
                            notify.html(product_name + ' has been updated')
                            toastTitle.html(product_name);
                            pushNotify();
                            console.log('quantity updated');
                        } else {
                            console.log('nothing came');
                            console.log(data);
                        }




                    },
                    error: function () {
                        alert("Problem occured")
                    }

                })


            }
        },
        error: function () {
            flagS = false;
        }
    })





}
window.addToCart = addToCart;

//-----------------------------------------end of add to cart -------------------------------------//




function addProdToCart(item) {

    let $form = $(item).parent('.hidden-form');
    let product_id = $form.find('.product_id').val();


    let qty = $form.find('.input_number').val();
    let size = $(item).closest('.hidden-form').siblings('.size_info').find('.size_option').val();



    let flagS = false;
    $(item).html('<i class=" submit_spin fa fa-spinner"></i>');
    $.ajax({
        url: 'ajax_handler.php',
        type: 'POST',
        dataType: 'JSON',
        data: {
            getprice: 'getprice',
            prod_id: product_id,
            qty: qty,
            size: size

        },
        success: function (data) {
            let product_id = data.id;
            let product_name = data.name;
            let product_price = data.price;
            let max_qty = data.max_qty;
            let thumb = data.thumb;
            let sum = data.sum;
            let weight = data.weight;
            let size = data.size;
            weight = parseFloat(weight);
            let addtocart = 'addtocart';
            /*  let totalWeight = weight * qty; */

            flagS = true;
            if (flagS == true) {



                $('body').addClass('loading');
                $('body').append('<div class="processing bring_to_front"></div>');
                $.ajax({
                    url: "ajax_handler.php",
                    type: "POST",
                    data: {
                        addtocart: addtocart,
                        product_id: product_id,
                        product_name: product_name,
                        product_price: product_price,
                        max_qty: max_qty,
                        qty: qty,
                        thumb: thumb,
                        sum: sum,
                        size: size,
                        weight: weight


                    },
                    success: function (data) {

                        // minicart();
                        minicart();
                        checkRateIsSet();
                        $('body').removeClass('loading');
                        $('.processing').hide();
                        $(item).html('<i class=" fa fa-check"></i>');

                        setTimeout(function () {
                            $(item).html('<i class="fa fa-cart-plus" aria-hidden="true"></i> Add to cart');

                        }, 3000);
                        count = parseInt(counter.html());
                        if (data == 200) {
                            counter.html(count + 1);
                            notify.html(product_name + ' has been added successfully')
                            toastTitle.html(product_name);
                            pushNotify();



                        } else if (data == 201) {
                            notify.html(product_name + ' has exceeded the stock')
                            toastTitle.html(product_name);
                            pushNotify();
                            console.log('quantity exceeded');
                        } else if (data == 202) {
                            notify.html(product_name + ' has been updated')
                            toastTitle.html(product_name);
                            pushNotify();
                            console.log('quantity updated');
                        } else {
                            console.log('nothing came');
                            console.log(data);
                        }



                    },
                    error: function () {
                        alert("Problem occured")
                    }

                })


            }
        },
        error: function () {
            flagS = false;
        }
    })







}

window.addProdToCart = addProdToCart;

//-----------------------------------------end of add to cart -------------------------------------//


//START Handles quantity Verifier and assigns recommended values
quantityVerify();

function quantityVerify() {


    $('.error-msg').hide();


    let total = $('.qty-check').attr('max');
    total = parseInt(total);
    $('.qty-check').blur(function () {
        let currVal = $(this).val();
        currVal = parseInt(currVal);



        if (currVal > total) {

            $('.error-msg').show();
            $(this).val(total);

        } else if (isNaN(currVal) || currVal == 0) {
            $('.error-msg').show();
            $('.error-msg').html('Invalid! Input is not a number');

            $(this).val(1);
        } else {


            $('.error-msg').hide();
        }


    })

}
//----------------------------------end Quantity Verifier (product details) -------------------------------------//

//START -> Removes Cart without Relaoding 

function removeFromCart(item) {

    let counter = $('#cart-count');
    let product = (item).closest('.minicart-product');
    product_id = item.id;
    let action = 'remove';
    count = parseInt(counter.html());

    $('body').addClass('loading');
    $('body').append('<div class="processing bring_to_front"></div>');
    $.ajax({
        url: 'ajax_handler.php',
        type: 'POST',
        data: {
            remove: action,
            id: product_id
        },
        success: function (data) {
            $('body').removeClass('loading');
            $('.processing').hide();
            if (data == 200) {
                product.style.display = "none";
                //loadCart();
                counter.html(count - 1);
                console.log('removed');
                minicart();
                checkRateIsSet();
                loadCart();
            }
        }
    })





}

function removeFromBasket(item) {
    let product = (item).closest('.product-data');
    product_id = item.id;
    let action = 'remove';
    count = parseInt(counter.html());
    $('body').addClass('loading');
    $('body').append('<div class="processing bring_to_front"></div>');
    //product.style.display= "none";
    $.ajax({
        url: 'ajax_handler.php',
        type: 'POST',
        data: {
            remove: action,
            id: product_id
        },
        success: function (data) {
            $('body').removeClass('loading');
            $('.processing').hide();
            if (data == 200) {
                product.style.display = "none";
                //loadCart();
                counter.html(count - 1);
                console.log('removed');
                minicart();
                loadCart();
                checkRateIsSet();
            }
        }
    })
}

//-----------------------------------------end of remove cart -------------------------------------//
/*  */

const pushNotify = () => {
    $(".toast").css({
        opacity: '1',
        display: 'block'

    });

    setTimeout(function () {
        $(".toast").css({
            opacity: '0',
            display: 'none'

        });

    }, 3000);
}
//------------------------------------------------------
//------------------------------------------------------

const cartHolder = $('.cartdata');
function loadCart() {
    let action = ''
    $.ajax({
        url: 'fetch-data.php',
        type: 'POST',
        data: {
            cartdata: 'cartdata'
        },
        success: function (data) {
            cartHolder.html(data);
            checkRateIsSet();
        },
        error: function (e) {
            console.log(e);
        }
    })

}
window.loadCart = loadCart;

loadCart();


//------------------------------------------------------
//---------Quanity Update------------------------------
//------------------------------------------------------("
$(document).ready(function () {
    $(".upd-sel").change(function () {
        sizeUpdate(this);
    })

})


function sizeUpdate(varr) {
    let code = $(varr).attr("key");

    let size = $(varr).val();

    console.log('code is ', code);
    console.log('size is ', size);
    $('body').addClass('loading');
    $('body').append('<div class="processing bring_to_front"></div>');
    let update = 'update_size';
    $.ajax({
        url: "ajax_handler.php",
        type: "POST",
        data: {
            update_size: update,
            code: code,
            size: size
        },
        success: function (data, status) {
            /*  $("#total_price").html(data) */

            $('body').removeClass('loading');
            $('.processing').hide();
            console.log(data);
            if (data == 200) {
                console.log('size update done');
                loadCart();
                minicart();

            }
        },
        error: function () {
            alert("Problem in sending reply!")
        }
    });


}
window.sizeUpdate = sizeUpdate;



function qtyUpdate(varr) {


    let nxtSibling = varr.nextElementSibling;
    nxtSibling.style.cssText = "display:block;"
    let total = varr.max;
    let el_data = parseInt(varr.value);
    total = parseInt(total);
    var code = $(varr).attr("id");

    let currPrice = $(this).closest('.qty-cont').find('.total_price').val();
    console.log(currPrice)


    if (el_data > total || isNaN(el_data) || typeof el_data !== 'number') {
        alert("Verify your quantity");
        console.log('error')
        varr.value = '1';

        /*  setTimeout(function () {
             nxtSibling.style.cssText = "display:none;"
 
         }, 2000); */

    } else {

        $('body').addClass('loading');
        $('body').append('<div class="processing bring_to_front"></div>');
        let update = 'update';
        $.ajax({
            url: "ajax_handler.php",
            type: "POST",
            data: {
                action: update,
                code: code,
                quantity: el_data
            },
            success: function (data, status) {
                /*  $("#total_price").html(data) */
                loadCart();
                minicart();
                checkRateIsSet();
                $('body').removeClass('loading');
                $('.processing').hide();
                if (data == 404) {

                    let zeroCheck = $(this).closest('.tr');
                    console.log(zeroCheck)
                    $(zeroCheck).css("display", "none");
                    count = parseInt(counter.html());
                    counter.html(count - 1);

                }
            },
            error: function () {
                alert("Problem in sending reply!")
            }
        });

    }

}


window.qtyUpdate = qtyUpdate;
resize();
var flag = false;

function checkSize(size) {
    if (size == false) {
        $('.shop_five_col .single-item').addClass('two_col');
    } else if (size == true) {
        $('.shop_five_col .single-item').removeClass('two_col');
    } else {
        $('.shop_five_col .single-item').addClass('two_col');
    }
}
window.checkSize = checkSize;


function resize() {

    $('.column_option').click(function () {

        let id = $(this).attr('id')

        if (id == 'default') {
            $('.shop_five_col .single-item').removeClass('two_col');
            $('#default').addClass('active')

            $('#column_2').removeClass('active')
            flag = true;

        } else if (id == 'column_2') {

            $('.shop_five_col .single-item').addClass('two_col');
            $('#column_2').addClass('active')
            $('#default').removeClass('active')
            flag = false;
        }
    })

}

$(document).ready(function () {

    filter_data();
    category();

    function category(pager) {
        var action = 'fetch_data';
        var cat = $('#searchval').val();
        console.log('cat: ', cat);
        $.ajax({
            url: "filter.php",
            method: "POST",
            dataType: 'JSON',
            data: { page: pager, action: action, cat: cat },
            success: function (data) {
                $('body').removeClass('loading');
                $('.processing').hide();
                $('.filter_data').html(data.output);
                checkRateIsSet();

                console.log(pager);
                if (pager !== undefined) {
                    $('html, body').animate({
                        scrollTop: $('#scrollTop').offset().top
                    }, 200);

                }

                console.log(data.option)
                if (data.total < 9 || data.option == '404') {
                    $('#pagination').html(data.page);
                }
                else {
                    $('#pagination').html(data.page);
                }



            }
        });
    }
    window.category = category;


    $('#search_form').on('submit', function (e) {

        e.preventDefault();
        let query = $('#search_val').val();
        console.log(query);

        $.ajax({
            url: 'ajax_handler.php',
            type: 'POST',
            data: {
                sanitize: 'sanitize_val',
                query: query
            },
            success: function (data) {
                console.log('data is', data)

                $('#search_val').val(data);


                window.location.href = 'search?q=' + data;


            },
            error: function (e) {
                console.log('error: ', e)
            }
        })


    })

    ///////////////////Search Block////////////////////////////
    if (url.fileName() == 'search' || url.fileName() == 'search.php') {

        search();
        checkRateIsSet();
    }
    function search(pager) {
        const searchval = $('#search').val();

        $('body').addClass('loading');
        $('body').append('<div class="processing bring_to_front"></div>');
        var search = 'search';


        $.ajax({
            url: "filter.php",
            method: "POST",
            dataType: 'JSON',
            data: {
                page: pager,
                search: search,
                searchval: searchval
            },
            success: function (data) {

                $('body').removeClass('loading');
                $('.processing').hide();
                $('.search_data').html(data.output);

                checkSize(flag);
                $('.query_count').html(data.total);


                console.log(data.option)
                if (data.total < 9 || data.option == '404') {
                    $('#pagination_s').html(data.page);
                }
                else {
                    $('#pagination_s').html(data.page);
                }



            },
            error: function (e) {
                console.log(e);
            }
        });



    }
    window.search = search;
    /////////////////////End of Search Block///////////////////////////////////


    function filter_data(pager) {
        console.log('filter activated')


        $('body').addClass('loading');
        $('body').append('<div class="processing bring_to_front"></div>');
        var action = 'fetch_data';

        var color = get_filter('color');

        var low = get_filter('low_high');
        var high = get_filter('high_low');
        var material = get_filter('material');
        var tailoring = get_filter('tailoring');
        var show_cat = get_filter('show_cat');
        var reset = get_filter('reset_btn');
        var cat = $('#searchval').val();





        $.ajax({
            url: "filter.php",
            method: "POST",
            dataType: 'JSON',
            data: {
                page: pager,
                action: action,
                color: color,
                low: low,
                high: high,
                material: material,
                tailoring: tailoring,
                show_cat: show_cat,
                reset: reset,
                cat: cat
            },
            success: function (data) {
                $('body').removeClass('loading');
                $('.processing').hide();
                $('.filter_data').html(data.output);

                checkSize(flag);
                checkRateIsSet();
                console.log(data.total);


                console.log(data.option)
                if (data.total < 9 || data.option == '404') {
                    $('#pagination').html(data.page);
                }
                else {
                    $('#pagination').html(data.page);
                }



            },
            error: function (e) {
                console.log(e.responseText);
            }
        });
    }
    window.filter_data = filter_data;

    function get_filter(class_name) {

        var filter = [];
        $('.' + class_name + ':checked').each(function () {
            filter.push($(this).val());
        });
        return filter;
    }

    $('.common_selector').click(function () {

        filter_data();
        $('html, body').animate({
            scrollTop: $('#scrollTop').offset().top
        }, 200);
    });

    $(document).on('click', '#pagination li', function () {

        var id = $(this).attr('id');

        filter_data(id);
        checkSize(flag);
        $('html, body').animate({
            scrollTop: $('#scrollTop').offset().top
        }, 200);
        checkRateIsSet();

    })

    $(document).on('click', '#pagination_s li', function () {

        var id = $(this).attr('id');

        //filter_data(id);
        search(id);
        checkSize(flag);
        $('html, body').animate({
            scrollTop: $('#scrollTop').offset().top
        }, 200);
        checkRateIsSet();


    })



    // START -> handles the Add to Cart function
    $(document).on('click', '.quickadd', function () {
        addProdToCart(this);
    })
    $(document).on('click', '.additembtn', function () {
        addToCart(this);
    })

    $(document).on('click', '.rmcart', function () {
        removeFromCart(this);
    })

    $(document).on('click', '.rmbasket', function () {
        removeFromBasket(this);
    })

    $(document).on('change', '.input_number', function () {
        qtyUpdate(this);
    })

});


$('#reset_btn').click(function () {
    $('#fs_price_2').prop("checked", false);
    $('#fs_price_1').prop("checked", false);

})


function payWithPaystack() {
    function generateUniqueNumber() {
        const timestamp = new Date().getTime(); // Get current timestamp
        const random = Math.floor(Math.random() * 1000); // Generate random number between 0 and 999999
        const uniqueNumber = `${timestamp}${random}`; // Concatenate timestamp and random number
        return uniqueNumber;
    }
    const refNum = generateUniqueNumber();

    $.ajax({
        method: 'POST',
        url: 'ajax_handler.php',
        dataType: 'JSON',
        data: {
            payverify: 'payverify'
        },
        success: function (data) {
            let firstname = data.info.fname;
            let lastname = data.info.lname;
            let pNum = data.info.phone;
            let addr = data.info.address;
            let country = data.info.country;
            let iso2 = data.iso2;
            let state = data.info.region;
            let state_id = data.info.region_id;
            let city = data.info.city;
            let town = data.town;
            let zip = data.info.postcode;
            let ids = data.ids;
            let quantities = data.quantities;
            let size = data.sizes;


            if (data.msg == 404) {
                alert('Service Unavailable');
            } else if (data.msg == 200) {


                var handler = PaystackPop.setup({
                    key: 'pk_live_9b03d33b55a5ffcf82f0f0ad717979d99c004083',
                    email: data.info.email,
                    amount: data.amount * 100,
                    currency: "NGN",
                    metadata: {
                        phone: pNum,
                        address: addr,
                        country: country,
                        countryID: iso2,
                        state_id: state_id,
                        zip: zip,
                        city: city,
                        state: state,
                        fullname: firstname + ' ' + lastname,
                        ids: ids,
                        quant: quantities,
                        size: size,
                        town: town,


                    },
                    ref: 'EDGE' + Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you

                    callback: function (response) {
                        // document.getElementById("checkout-form").submit();
                        // window.location = "http://localhost/lit/callback.php?reference=" + response.reference;

                        $('.holder').show();


                        $.ajax({
                            url: 'ajax_handler.php',
                            method: 'POST',
                            data: {
                                enc_verify: 'enc_verify',
                                enc_value: response.reference
                            },
                            success: function (data) {

                                window.location = "callback?reference=" + data;
                            }
                        })


                    },
                    onClose: function () {
                        Swal.fire({
                            title: 'Purchase not Successful',
                            text: "We encountered a problem, please try again later.",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',

                        });
                    }
                });
                handler.openIframe();

            }


        },
        error: function () {
            alert('Service Unavailable');
        }
    })


}



$('#sub_email').focus(function () {

    $('#msg_err').html('');
});
$('#subscribe').click(function () {

    subscribe()
});


function subscribe() {
    console.log('clicked');
    let email = $('#sub_email').val();
    let msg = $('#msg_err');

    if (email == '' || !email.match(emailRegex)) {
        msg.html('<span style="color:red"> Please enter a valid email');

    } else {
        $('#subscribe').html('<i class=" submit_spin fa fa-spinner"></i>')
        $('#subscribe').prop("disabled", true);
        $('#sub_email').prop("disabled", true);

        $.ajax({
            url: 'ajax_handler.php',
            method: 'POST',
            data: {
                mailchimp: 'mailchimp',
                email: email
            },
            success: function (data) {
                console.log(data);
                $('#subscribe').prop("disabled", false);
                $('#sub_email').prop("disabled", false);
                if (data == '200') {
                    msg.html('<span style="color: #34A853">You have sucessfully subscribed to the newsletter</span>');
                    $('#subscribe').html('<i class="fa fa-envelope"></i>');
                } else if (data == '214') {
                    msg.html('<span style="color: red">You are already subscribed</span>')
                    $('#subscribe').html('<i class="fa fa-envelope"></i>');
                } else if (data == '404') {
                    msg.html('<span style="color: red">Some error occurred, please try again later</span>')

                    $('#subscribe').html('<i class="fa fa-envelope"></i>');

                } else {

                    msg.html('<span style="color: red">Please enter a valid email</span>')
                    $('#subscribe').html('<i class="fa fa-envelope"></i>');
                }
            },
            error: function (e) {
                console.log(e);
            }

        })

    }
}
window.subscribe = subscribe;

function printPageArea(areaID) {
    var printContent = document.getElementById(areaID).innerHTML;
    var originalContent = document.body.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
}



$(document).ready(function () {
    let switcher = $('#show-hide-btn');
    let book_app = $('#book-app');
    let appointmentArea = $('.appointment-area');
    appointmentArea.hide();
    switcher.click(function () {
        book_app.hide();
        appointmentArea.show('fast', 'linear');

    });


    $(document).on('click', '.measure_modal_btn', function () {
        $('#myModal').modal('show');
    })


});



$(document).on('change', '.convert', function () {

    changeCurrency();
})

$(document).ready(function () {


    ///////////////////////////Traking Order//////////////////////////////////

    ////////check from Url////////////////
    if (url.checkQuery()) {

        console.log(url.checkQuery())

        if (url.fileName() == 'tracking.php' || url.fileName() == 'tracking') {
            const queryArray = url.getQuery();
            const param = queryArray.param;
            const value = queryArray.value;
            $('body').addClass('loading');
            $('body').append('<div class="processing bring_to_front"></div>');


            $.ajax({
                url: 'shipresult.php',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    param: param,
                    value: value,
                    track: 'trackid'
                }, success: function (data) {
                    $('body').removeClass('loading');
                    $('.processing').hide();
                    if (data.code == 200) {

                        $('.track-body').html(data.msg);
                        $('html, body').animate({
                            scrollTop: $('#scrollTop').offset().top
                        }, 200);

                    } else if (data.code == 404) {

                        alert(data.msg)
                    }
                }, error: function (e) {
                    alert('We encountered an error', e);
                }
            })

        }

    }

    /////////////////////////End of Tracking Order/////////////////////////////////


//////////////end of url check////////////////////
    /////////////////////////Social Media share/////////////////////////

    function shareUrl(e) {
        console.log('share btn');

        const fbShare = "https://www.facebook.com/sharer/sharer.php?u=";
        const tweet = "https://twitter.com/intent/tweet?text=buy%20this%20from%20EdgeAbah%20&url=";
        const whatsapp = 'https://api.whatsapp.com/send?text=Hey%20Check%20out%20this%20product!%20';
        const telegram = 'https://t.me/share/url?url=';

        const element = e.id;
        console.log(element);

        let link = window.location.href;
        let defaultLink = window.location.href;
        let getId = defaultLink.split('=')[1];
        link = link.slice(7);

        let shareUrl;

        if (element === 'facebook') {
            shareUrl = window.location.href;
        } else if (element === 'whatsapp') {
            shareUrl = whatsapp + encodeURI(defaultLink);
        } else if (element === 'twitter') {
            shareUrl = tweet + link;
        } else if (element === 'telegram') {
            shareUrl = telegram + encodeURI(defaultLink);
        }

        if (shareUrl) {
            if (element === 'facebook') {
                // Open Facebook sharing in a new window/tab
                
                var isFacebookAppAvailable = /(FB_IAB\/FB4A|FBAN\/FBIOS)/i.test(navigator.userAgent);
                if (isFacebookAppAvailable){
                    window.location.href = 'fb://share/?url=' + encodeURIComponent(shareUrl);
                }else{
                    
                window.open('http://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl), '', 'left=0,top=0,width=650,height=420,personalbar=0,toolbar=0,scrollbars=0,resizable=0');
                }
           
            } else {
                // Set the href attribute for other platforms
                const $shareBtn = $(e);
                $shareBtn.attr("href", shareUrl);
                $shareBtn.attr("target", "_blank");
            }
        }
    }



    window.shareUrl = shareUrl;

    $(document).on('click', '.share-btn', function () {
        shareUrl(this);
    })

    ////////////////////////////////end of social media share/////////////////////////////////

})

/////////////////////////////Start of Tracking Function with Value////////////////////////////////////
$(document).on('click', '#alice', function () {
    console.clear();
    console.log('voyage started');
    voyage();
});

$(document).on('click', '.track-inp', function () {
    if ($('.track_err').html() != '') {

        $('.track_err').hide();
    } else {
        $('.track_err').show();
    }
})

function voyage() {

    let trackid = $('.track-inp').val();
    let msg = $('.track_err');
    let action = 'track_no';

    if (trackid == '' || trackid.length < 5) {

        msg.html('<span style="color:red"> Please enter a tracking number');
        msg.show();
    } else {
        $('body').addClass('loading');
        $('body').append('<div class="processing bring_to_front"></div>');
        $.ajax({
            url: 'shipresult.php',
            method: 'POST',
            data: {
                track: action,
                value: trackid
            },
            success: function (data) {
                console.clear();
                console.log('track data gotten');
                $('body').removeClass('loading');
                $('.processing').hide();
                $('.track-body').html(data)
                $('html, body').animate({
                    scrollTop: $('#scrollTop').offset().top
                }, 200);


            }, error: function (e) {
                console.log(e);
            }
        })



    }
}

window.voyage = voyage;



//////////////////////////////////End of Tracking Function///////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////