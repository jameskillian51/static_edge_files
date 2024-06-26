



//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
let emailRegex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
/* let phoneRegex = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; */
let phoneRegex2 = /^\+(?:[0-9] ?){6,14}[0-9]$/;
let zipRegex2 = /^([0-9]{6})+$/;
let textRegex2 = /^[a-zA-Z\s\-\']+$/;


$(document).on('keyup', '.validate-input', function () {
	if ($(this).hasClass('empty-field')) {
		if ($(this).val() !== '') {
			$(this).removeClass('empty-field')
		}
	}

})



$('.select-active').change(function () {
	if ($(this).hasClass('empty-field')) {
		if ($(this).val() !== '') {
			$(this).removeClass('empty-field')
		}
	}

})


$("#cts").click(function (e) {
	e.preventDefault();
	let hasEmptyField = false;
	let action = 'sanitize';
	const fname = $('input#fname').val();
	const lname = $('input#lastname').val();
	const email = $('input#email').val();
	const phone = $('input#phone').val();
	const address = $('input#address').val();

	const country = $('#country option:selected').text();
	const iso2 = $('#country option:selected').val();

	const region = $('select#region option:selected').text();
	const regionID = $('select#region option:selected').val();

	const city = $('input#city').val();

	const town = $('input#town').val();
	const postcode = $('input#postcode').val();
	//let selOp = $('#town option:selected');
	//const town = $('#town option:selected').text();
	//const townID = $('#town option:selected').val();

	console.log(country, iso2, region, regionID, town);

	let emptyInputs = $('.customer-info .validate-input').filter(function () {
		return $(this).val() === "";
	})
	let emptySelect = $('.customer-info .select-active').filter(function () {
		return $(this).val() === "";
	})


	if (emptyInputs.length >= 1 || emptySelect.length >= 1 || address.length < 15 || !email.match(emailRegex2) || postcode.length < 4 || !phone.match(phoneRegex2) || iso2 == '' || regionID == '') {
		emptyInputs.addClass('empty-field');
		emptySelect.addClass('empty-field');
		hasEmptyField = true;
		if (postcode.length < 5) {
			alert('Kindly verify your postal code/Zip Code and fill all fields');
		}
	}


	if (hasEmptyField) {
		return;
	}



	else {
		$.ajax({
			url: 'ajax_handler.php',
			type: 'POST',
			dataType: 'JSON',
			data: {
				sanitize: action,
				fname: fname,
				lname: lname,
				email: email,
				phone: phone,
				address: address,
				country: country,
				iso2: iso2,
				region: region,
				regionID: regionID,
				city: city,
				postcode: postcode,
				town: town

			},
			success: function (data) {
				console.clear();
				console.log(data);
				if (data.verdict == 'error') {
					//$('.customer-info .validate-input').addClass('empty-field');
					let emptyInputs = $('.customer-info .validate-input').filter(function () {
						return $(this).val() === "";
					})
					emptyInputs.addClass('empty-field');

					$('input#fname').val(data.fname);
					$('input#lastname').val(data.lname);
					$('input#email').val(data.email);
					$('input#phone').val(data.phone);
					$('input#address').val(data.address);
					$('input#postcode').val(data.postcode);
					$('input#town').val(data.town);
				} else {

					$('input#fname').val(data.fname);
					$('input#lastname').val(data.lname);
					$('input#email').val(data.email);
					$('input#phone').val(data.phone);
					$('input#address').val(data.address);
					$('input#postcode').val(data.postcode);
					$('input#town').val(data.town);
					//User Details (shipping)
					let currentAddr = data.address + ', ' + data;
					$('.edit_contact').html(data.email);

					$('.edit_addr').html(data.full_addr);

					if (animating) return false;
					animating = true;

					current_fs = $('.customer-info');
					next_fs = $('.shipping-form');

					//activate next step on progressbar using the index of next_fs
					$("#progressbar li.ship").addClass("active");
					//$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
					//show the next fieldset
					next_fs.show();
					//hide the current fieldset with style
					current_fs.animate({ opacity: 0 }, {
						step: function (now, mx) {
							//as the opacity of current_fs reduces to 0 - stored in "now"
							//1. scale current_fs down to 80%
							scale = 1 - (1 - now) * 0.2;
							//2. bring next_fs from the bottom (100%)
							top = (now * 100) + "%";
							//3. increase opacity of next_fs to 1 as it moves in
							opacity = 1 - now;
							current_fs.css({

								'position': 'relative'
							})
							next_fs.css({
								'top': top,
								'opacity': opacity
							});
						},
						duration: 100,
						complete: function () {
							current_fs.hide();
							animating = false;
						}
					});
				}



			},
			error: function () {
				console.log('sorry an error occurred')
			}
		})
	}



});

$(".next").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	next_fs = $(this).parent().next();

	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the bottom (100%)
			top = (now * 100) + "%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({

				'position': 'relative'
			})
			next_fs.css({
				'top': top,
				'opacity': opacity
			});
		},
		duration: 100,
		complete: function () {
			current_fs.hide();
			animating = false;
		}
	});


});



$(".previous").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();

	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the bottom(100%) - from 0%
			top = ((1 - now) * 100) + "%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({ 'top': top });
			previous_fs.css({
				'opacity': opacity
			});
		},
		duration: 100,
		complete: function () {
			current_fs.hide();
			animating = false;
		}
	});
});




$(".edit-info").click(function () {
	if (animating) return false;
	animating = true;

	current_fs = $('.shipping-form');
	previous_fs = $('.customer-info');


	//de-activate current step on progressbar
	$("#progressbar li.ship").removeClass("active");
	//$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

	//show the previous fieldset
	previous_fs.show();
	//hide the current fieldset with style
	current_fs.animate({ opacity: 0 }, {
		step: function (now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the bottom(100%) - from 0%
			top = ((1 - now) * 100) + "%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({ 'top': top });
			previous_fs.css({
				'opacity': opacity
			});
		},
		duration: 100,
		complete: function () {
			current_fs.hide();
			animating = false;
		}
	});
});






$("#paynow").click(function () {
	//return false;
	payWithPaystack();
})


$(document).ready(function () {
	io5rer();
	function io5rer() {
		let holder = $('#check-cart');
		let action = 'checkcart';

		$.ajax({
			url: 'fetch-data.php',
			type: 'POST',
			data: {
				checkcart: action
			},
			success: function (data) {
				holder.html(data);
				checkRateIsSet();
			},
			error: function () {
				console.log('error loading check cart')
			}
		})



	}
	window.io5rer = io5rer;




	function jkjkj() {

		let action = 'unsetd';

		$.ajax({
			url: 'ajax_handler.php',
			type: 'POST',
			data: {
				unsetd: action
			},
			success: function (data) {
				io5rer();
				minicart();
				loadCart();
				payOp();
			},
			error: function () {
				console.log('error loading check cart')
			}
		})



	}
	window.jkjkj = jkjkj;

	function apasas() {
		let code = $('#dxxdgf').val();
		let action = 'discount';
		$.ajax({
			url: 'ajax_handler.php',
			type: 'POST',
			data: {
				discount: action,
				code: code
			},
			success: function (data) {
				$('#apply').html('<div class="svg-wrapper-1"> <div class="svg-wrapper"> <i class="fa fa-ticket-alt thin-icon"></i> </div> </div> <span>Redeem</span>')
				$('#apply').prop("disabled", false);
				$('#dxxdgf').prop("disabled", false);

				console.log(data);
				if (data == '200') {

					io5rer();
					minicart();
					loadCart();
					payOp();

				}
				if (data == '401') {

					$('.err_msg').html('Invalid coupon code. Please check and try again.');

				}
				if (data == '402') {

					$('.err_msg').html('Maximum number of tries. Try again later');
				}
				if (data == '404') {

					$('.err_msg').html('we encountered an error');
				}/* else{
					$('.err_msg').html(data);
				} */
				console.log('end of line');

			},
			error: function (e) {
				console.log('error loading check cart ', e)
			}
		})

	}
	window.apasas = apasas;


})

$(document).on('click', '#apply', function () {

	if ($('#dxxdgf').val() == '') {
		$('#dxxdgf').css('border', '1px solid var(--primary)');
	} else {
		$('#apply').html('<i class=" submit_spin fa fa-spinner"></i>')
		$('#apply').prop("disabled", true);
		$('#dxxdgf').prop("disabled", true);
		apasas();


	}
});





$(document).on('click', '#remove-code', function () {


	$('#remove-code').html('<i class=" submit_spin fa fa-spinner"></i>')
	$('remove-code').prop("disabled", true);
	jkjkj();



});

$(document).on('change', '#country', function () {
	chhtuyk(this);
	$('#city').html('<option value="">Select a City</option>');
})
$(document).on('change', '#region', function () {
    if($('#country').val() == 'NG'){
        getfee();
    }
    

})
$(document).on('change', '#city', function () {
	//ciitty(this);
	//getfee(this);
})
$(document).on('change', '#town', function () {
	//getfee(this);
})

$(document).on('blur', '.customer-info .validate-input', function () {
	customInput(this);
})

$(document).on('focus', '.customer-info .validate-input', function () {
	hideMsg(this);
})

$(document).ready(function () {

	$('.select-active').select2();
	function customInput(input_select) {
		let validata = $(input_select).val();
		let elementId = input_select.id;
		let nextSibling = input_select.nextElementSibling;


		if (validata == '') {
			input_select.style.cssText = "border: 1px solid red";
			nextSibling.style.cssText = "display:block;"

			nextSibling.textContent = "This field is required";
			return false

		} else {

			if (elementId == 'fname') {

				if (validata.match(textRegex2)) {
					input_select.style.cssText = "border: 1px solid #e8e8e8";
				} else {

					input_select.style.cssText = "border: 1px solid red";
					nextSibling.style.cssText = "display:block;"
					nextSibling.textContent = "Enter a valid name";
					return false
				};


			} else if (elementId == 'lastname') {
				if (validata.match(textRegex2)) {
					input_select.style.cssText = "border: 1px solid #e8e8e8";
				} else {

					input_select.style.cssText = "border: 1px solid red";
					nextSibling.style.cssText = "display:block;"
					nextSibling.textContent = "Enter a valid name";
					return false
				};
			} else if (elementId == 'email') {
				if (validata.match(emailRegex2)) {
					input_select.style.cssText = "border: 1px solid #e8e8e8";
				} else {

					input_select.style.cssText = "border: 1px solid red";
					nextSibling.style.cssText = "display:block;"
					nextSibling.textContent = "This email is not valid";
					return false
				}


			} else if (elementId == 'zip') {
				if (validata.match(zipRegex2)) {
					input_select.style.cssText = "border: 1px solid #e8e8e8";
				} else {

					input_select.style.cssText = "border: 1px solid red";
					nextSibling.style.cssText = "display:block;"
					nextSibling.textContent = "Enter a valid Zipcode";
					return false
				}
			} else if (elementId == 'town') {
				if (validata.match(textRegex2)) {
					input_select.style.cssText = "border: 1px solid #e8e8e8";
				} else {

					input_select.style.cssText = "border: 1px solid red";
					nextSibling.style.cssText = "display:block;"
					nextSibling.textContent = "enter a valid name";
					return false
				}
			} else if (elementId == 'phone') {

				if (validata.match(phoneRegex2)) {
					input_select.style.cssText = "border: 1px solid #e8e8e8";
				} else {

					input_select.style.cssText = "border: 1px solid red";
					nextSibling.style.cssText = "display:block;"
					nextSibling.textContent = "Enter a valid phone number ( +country code followed by the number) ";
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
	window.customInput = customInput;

	function loadCountry() {

		const country = $('#country');


		$.ajax({
			url: 'shipresult.php',
			type: 'POST',
			data: {

				action: 'listall'
			},
			success: function (data) {


				country.html(data);
				$('#city').html('<option value="">Select a City</option>');


			},
			error: function (e) {
				console.log(e);
			}
		})

	}
	window.loadCountry = loadCountry;
	$(window).on('load', function () {
	})
		loadCountry();

	function chhtuyk(e) {
		const con = $('#country');
		action = "country_val";
		if (con.val() === '') {
			$(e).addClass('empty-field');
			$('#region').html('<option value="">Select a State</option>');
			$('#city').html('<option value="">Select a City</option>');
			$('#town').html('');
			return;
		} else {
			$(e).removeClass('empty-field');

			$('body').addClass('loading');
			$('body').append('<div class="processing bring_to_front"></div>');

			$.ajax({
				url: 'shipresult.php',
				type: 'POST',
				data: {
					c_id: con.find('option:selected').text(),
					find_con: action
				},
				success: function (data) {
					console.clear();
					
	getfee();
					$('body').removeClass('loading');
					$('.processing').hide();

					$('#region').html(data);
				
					$('#town').html('');
					$('#region').removeClass('empty-field');
					//$('#town').css('border', '1px solid #e8e8e8'); */

				}
			})
		}

	}
	window.chhtuyk = chhtuyk;


	function rrerr(e) {
		const country = $('#country');
		const state = $('#region');

		action = "find_city";
		if (country.val() === '' && state.val() === '') {
			$(e).addClass('empty-field');
			$('#city').html('<option value="">Select a City</option>');
			$('#town').html('');
			return;
		} else {
			$(e).removeClass('empty-field');

			$('body').addClass('loading');
			$('body').append('<div class="processing bring_to_front"></div>');
			let countryText = country.find('option:selected').text();
			let stateText = state.find('option:selected').text();
			console.clear();
			console.log(countryText);
			console.log(stateText);
			$.ajax({
				url: 'shipresult.php',
				type: 'POST',
				data: {
					country: countryText,
					state: stateText,
					find_city: action
				},
				success: function (data) {
					console.log(data);
					$('body').removeClass('loading');
					$('.processing').hide();

					$('#city').html(data);
					$('#city').removeClass('empty-field');
					//$('#town').css('border', '1px solid #e8e8e8'); */

				}
			})
		}

	}
	window.rrerr = rrerr;



	function ciitty(e) {
		const con = $('#city');
		action = "find_town";
		if (con.val() === '') {
			$(e).addClass('empty-field');
			$('#town').html('<option value="">Select a Town</option>');
			return;
		} else {
			$(e).removeClass('empty-field');

			$('body').addClass('loading');
			$('body').append('<div class="processing bring_to_front"></div>');

			$.ajax({
				url: 'shipresult.php',
				type: 'POST',
				data: {
					c_id: con.val(),
					find_town: action
				},
				success: function (data) {
					console.clear();

					$('body').removeClass('loading');
					$('.processing').hide();

					$('#town').html(data);
					$('#town').removeClass('empty-field');
					//$('#town').css('border', '1px solid #e8e8e8'); */

				}
			})
		}

	}
	window.ciitty = ciitty;



	function getfee(e) {
		const country = $('#country');
		const region = $('#region');
		action = "getfee";
		if (country.val() === '' ) {
			$(e).addClass('empty-field');
			$('#town').html('');
			$('.shiptotal').html('0.00');
			return;
		}else if (country.val() == 'NG' && region.val() == '') {
			$(e).addClass('empty-field');
			$('.shiptotal').html('0.00');
			return;
		}  else {
			$(e).removeClass('empty-field');
			$('body').addClass('loading');
			$('body').append('<div class="processing bring_to_front"></div>');
console.log(country);
			$.ajax({
				url: 'shipresult.php',
				type: 'POST',
				data: {
					country: country.val(),
					region: region.val(),
					getfee: action,


				},
				success: function (data) {
					//console.clear();
					console.log(data);
					$('body').removeClass('loading');
					$('.processing').hide();
					if (data == '0.00') {
						$('.shiptotal').html('unavailable');
						$('#town').addClass('empty-field');
						$('#cts').hide();
					} else {
						$('.allmodes').html(data);
						$('#town').removeClass('empty-field');
						$('#cts').show();
					}




					//$('#town').css('border', '1px solid #e8e8e8'); */

				}
			})
		}

	}
	window.getfee = getfee;


	

	function payOp(total) {
		$.ajax({
			method: 'GET',
			url: 'ajax_handler.php',
			data: {
				options: 'options',
				ship_total: total

			},
			success: function (data) {
				$('.pay-options').html(data);
			},
			error: function () {
				alert('sorry an error occurred');
			}
		})
	}
	window.payOp = payOp;


	function selectedCourier(item) {
		console.clear();
		courierID = $(item).find('input').attr('id');
		console.log(courierID);
		$('body').addClass('loading');
		$('body').append('<div class="processing bring_to_front"></div>');
		$.ajax({
			url: 'shipresult.php',
			method: 'POST',
			dataType: 'JSON',
			data: {
				option: courierID,
				action: 'get_courier'

			},
			success: function (data) {
				let shipTotal = $('.final-ship');
				let shipOption = $('.ship-form');
				shipOption.html(data.courier);
				shipTotal.html(data.pay_format);
				console.log(data);
				
								const amount = $('.shift-right .fixedamt').text();
				const fixedsub = $('.shift-right .fixedsub').text();
				const fixedtax = $('.shift-right .fixedtax').text();
				const fixedship = $('.shift-right .fixedship').text();
				const newAmount = parseFloat(amount.replace(',', ''));
				const newTax = parseFloat(fixedtax.replace(',', ''));
				const newSub = parseFloat(fixedsub.replace(',', ''));
				const newShip = parseFloat(fixedship.replace(',', ''));

				

				
				const displayAmount = newTax + newSub + newShip;
				console.log(amount);
				console.log(newAmount);
				console.log(displayAmount);
				$('.shift-right .fixedamt').html(displayAmount.toLocaleString());



				
				payOp(data.payment_amount);
				   $('body').removeClass('loading');
                $('.processing').hide();
				checkRateIsSet();
			},
			error: function (e) {
				console.log(e);
			}
		})
	}

	$(document).on('click', '.shipping-holder.courier', function (e) {
		e.stopPropagation();
		selectedCourier(this);
	})

});


$("input#phone").on("keyup", function () {
	var inputValue = $(this).val();
	var spacedValue = inputValue.replace(/[^\d+]/g, "").replace(/(\d{4})/g, "$1 ").trim();
	$(this).val(spacedValue);
});

