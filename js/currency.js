
function changeCurrency(e) {
    console.clear();
    let currency = $(e).val();
    const countrySigns = $('.currency');
    const amountHolds = $('.amount');


    /*   const amountElement = $(this);
      const amount = parseFloat(amountElement.text());
*/
    $('body').addClass('loading');
    $('body').append('<div class="processing bring_to_front"></div>');
    $.ajax({
        url: 'ajax_handler.php',
        method: 'POST',
        dataType: 'JSON',
        data: {
            sign: currency,
            convert: 'convert'
        },
        success: function (data) {
   
            countrySigns.html(data.sign);
            $('body').removeClass('loading');
            $('.processing').hide();
            window.location.href = location.href;
            // Perform multiplication step and update amountElement
            /*  const convertedAmount = amount * parseFloat(data.rate);
             amountElement.html(convertedAmount.toFixed(2)); */
        },
        error: function (e) {
            console.log(e);
        }
    });

}


function autoChangeCurrency(sign) {
  console.clear();
  let currency = sign;
  const countrySigns = $(".currency");
  const amountHolds = $(".amount");

  /*   const amountElement = $(this);
      const amount = parseFloat(amountElement.text());
*/
  $("body").addClass("loading");
  $("body").append('<div class="processing bring_to_front"></div>');
  $.ajax({
    url: "ajax_handler.php",
    method: "POST",
    dataType: "JSON",
    data: {
      sign: currency,
      convert: "convert",
    },
    success: function (data) {
      countrySigns.html(data.sign);
      $("body").removeClass("loading");
      $(".processing").hide();
      window.location.href = location.href;
      // Perform multiplication step and update amountElement
      /*  const convertedAmount = amount * parseFloat(data.rate);
             amountElement.html(convertedAmount.toFixed(2)); */
    },
    error: function (e) {
      console.log(e);
    },
  });
}


function checkRateIsSet() {
    const countrySigns = $('.currency');

    $.ajax({
        url: 'ajax_handler.php',
        method: 'POST',
        dataType: 'JSON',
        data: {
            checkRateSet: 'checkRateSet'
        },
        success: function (data) {

            console.log(data)
            if (data.code == 200) {
                countrySigns.html(data.msg);
            } 

            if (data.code == 404) {
                autoChangeCurrency("usd");
            }

        },
        error: function (e) {
            console.log(e);
        }
    });


}

checkRateIsSet();
window.checkRateIsSet = checkRateIsSet;

$(document).on('change', '.nice-select.convert', function () {
    changeCurrency(this);
});


window.changeCurrency = changeCurrency;


    ////////////////////////////////End of Currency Block///////////////////////////////////////

