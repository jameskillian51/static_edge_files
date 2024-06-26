
$(document).ready(function () {

    let emailRegex2 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let acctRegex = /^\d{10,}$/;
    $(document).on('blur', '.register_form_wrap .validate-input', function () {
        customInput(this);
    })

    $(document).on('focus', '.register_form_wrap .validate-input', function () {
        hideMsg(this);
    })

    $(document).on('click', '#login', function (e) {
        console.clear();
        console.log('login button');
        e.preventDefault();
        let hasEmptyField = false;
        let action = 'login';
        const email = $('input#email').val();
        const pass = $('input#password').val();
        $('#login').html('Loading <i class=" submit_spin fa fa-spinner"></i>')
        $('input#email').prop("disabled", true);
        $('input#password').prop("disabled", true);

        let emptyInputs = $('.register_form_wrap .validate-input').filter(function () {
            return $(this).val() === "";
        })


        if (emptyInputs.length >= 1 || !email.match(emailRegex2)) {
            emptyInputs.addClass('empty-field');

            hasEmptyField = true;
            $('#login').html('Sign in');
            $('.log_msg').html('Fill all the details');
            $('input#email').prop("disabled", false);
            $('input#password').prop("disabled", false);
        }
        else {
            $.ajax({

                url: 'cred.php',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    uname: email,
                    pass: pass,
                    action: action
                },
                success: function (data) {


                    $('#login').html('Sign in');
                    $('input#email').prop("disabled", false);
                    $('input#password').prop("disabled", false);

                    if (data.code == 200) {
                        $('.log_msg').removeClass('msg_error');
                        $('.log_msg').addClass('msg_success').html(data.msg);
                        window.location.href = "dashboard";
                    } else if (data.code == 404) {
                        $('.log_msg').addClass('msg_error').html(data.msg);
                        $('.log_msg').removeClass('msg_success');
                    }
                },
                error: function () {
                    alert('Sorry we encountered an error');
                    $('input#email').prop("disabled", false);
                    $('input#password').prop("disabled", false);

                }

            })

        }

    })

    $(document).on('click', '.edit-button', function () {
        console.log('edit');

        $('.editable').each(function () {
            var $editable = $(this);
            var $text = $editable.find('.editable-text');
            var currentValue = $text.text().trim();
            var $input = $('<input>').val(currentValue);
            $text.replaceWith($input);
            $editable.find('.edit-button').text('Save');
            $editable.find('.edit-button').click(function () {
                var newValue = $input.val().trim();
                var formData = { value: newValue };
                $.ajax({
                    url: 'process-form.php',
                    method: 'POST',
                    data: formData,
                    success: function (response) {
                        // Handle success response, such as updating the UI
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        // Handle error response
                    }
                });
                $input.replaceWith($text);
                $editable.find('.edit-button').text('Edit');
            });
        });

    });

    $(document).on('click', '.p_switch', function (e) {
        let switcher = $(this);
        let target = switcher.next('.validate-input');
        switcher.toggleClass('off');

        if (switcher.hasClass('off')) {
            console.log('has off class');
            switcher.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,56C48,56,16,128,16,128s32,72,112,72,112-72,112-72S208,56,128,56Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><circle cx="128" cy="128" r="40" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>');
            target.attr('type', 'text');

        } else {
            switcher.html('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="201.1" y1="127.3" x2="224" y2="166.8" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line x1="154.2" y1="149.3" x2="161.3" y2="189.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line x1="101.7" y1="149.2" x2="94.6" y2="189.6" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><line x1="54.8" y1="127.3" x2="31.9" y2="167" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/><path d="M32,104.9C48.8,125.7,79.6,152,128,152s79.2-26.3,96-47.1" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="8"/></svg>');
            target.attr('type', 'password');
        }


    })


    $(document).on('click', '#request_pay', function () {

        $.ajax({
            url: 'cred.php',
            method: 'POST',
            data: {
                pay_request: 'pay_request'

            },
            success: function (data) {
                if (data == 200) {
                    getForm();
                    console.log('payment requested');

                    $('#acctname').val('');



                } else if (data == 400) {

                    Swal.fire({
                        icon: 'error',

                        text: 'You still have a pending request',
                        confirmButtonColor: '#f27474',
                    })

                }
                else if (data == 402) {
                    console.log('You are offline');
                    Swal.fire({
                        icon: 'error',
                        text: 'You are currently offline',
                        confirmButtonColor: '#f27474',
                    })

                }
                else if (data == 403) {
                    console.log('still active');
                    Swal.fire({
                        icon: 'error',
                        text: 'It seems like you still have an active coupon',
                        confirmButtonColor: '#f27474',
                    })


                } else if (data == 404) {

                    Swal.fire({
                        icon: 'error',
                        text: 'Sorry, something went wrong!',
                        confirmButtonColor: '#f27474',
                    })


                }
                else if (data == 405) {

                    Swal.fire({
                        icon: 'error',
                        title: 'Funds are too low',
                        text: 'You need to make more than NGN 5,000.00',
                        confirmButtonColor: '#000',
                    })


                }

            },
            error: function (e) {
                alert('service unavailble');
            }
        })


    })

    $(document).on('blur', '.request .validate-input', function () {
        requestInput(this);
    })

    function requestInput(input_select) {
        let validata = $(input_select).val();
        let elementId = input_select.id;
        let nextSibling = input_select.nextElementSibling;


        if (validata == '') {
            input_select.style.cssText = "border: 1px solid red";
            nextSibling.style.cssText = "display:block;"

            nextSibling.textContent = "This field is required";
            return false

        } else {

            if (elementId == 'acctname') {

                if (validata.match(textRegex2)) {
                    input_select.style.cssText = "border: 1px solid #e8e8e8";
                } else {

                    input_select.style.cssText = "border: 1px solid red !important";
                    nextSibling.style.cssText = "display:block;"
                    nextSibling.textContent = "Enter a valid name. No numbers";
                    return false
                };


            } else if (elementId == 'bname') {
                if (validata.match(textRegex2)) {
                    input_select.style.cssText = "border: 1px solid #e8e8e8";
                } else {

                    input_select.style.cssText = "border: 1px solid red !important";
                    nextSibling.style.cssText = "display:block;"
                    nextSibling.textContent = "Enter a valid Bank Name";
                    return false
                };
            } else if (elementId == 'acctnum') {
                if (validata.match(acctRegex)) {
                    input_select.style.cssText = "border: 1px solid #e8e8e8";
                } else {

                    input_select.style.cssText = "border: 1px solid red !important";
                    nextSibling.style.cssText = "display:block;"
                    nextSibling.textContent = "Enter a valid Account Number";
                    return false
                }
            }
            else {

                input_select.style.cssText = "border: 1px solid #e8e8e8";

            }


        }




    }
    window.requestInput = requestInput;


    $(document).on('focus', '.request  .validate-input', function () {
        hideMsg(this);
    })

    $(document).on('change', '#acctname', function () {
        var acctname_val = $(this).val();
        $('.request input#acctname').val(acctname_val);
    });
    $(document).on('change', '#acctnum', function () {
        var acctnum_val = $(this).val();
        $('.request input#acctnum').val(acctnum_val);
    });
    $(document).on('change', '#bname', function () {
        var bank_val = $(this).val();
        $('.request input#bname').val(bank_val);
    });
    $(document).on('click', '.close', function () {
        $('.modal').modal('hide');
    });

    $(document).on('click', '.pay_request_btn ', function (e) {
        e.preventDefault();

        let hasEmptyField = false;
        let action = 'pay';
        const acctname = $('input#acctname').val();
        const acctnum = $('input#acctnum').val();
        const bank = $('input#bname').val();
        let acctRegex = /^\d{10,}$/;



        let emptyInputs = $('.request .validate-input').filter(function () {
            return $(this).val() === "";
        })



        if (emptyInputs.length >= 1 || acctname.length < 5 || !acctnum.match(acctRegex) || acctnum.length < 6 || !acctname.match(textRegex2) || !bank.match(textRegex2) || bank.length < 6) {
            emptyInputs.addClass('empty-field');

            hasEmptyField = true;
            console.log('bank', bank);
            console.log('acctnum ', acctnum);
            console.log('acctname', acctname);
            console.log('empty', emptyInputs);

            console.log('bad input');
        }


        if (hasEmptyField) {
            console.log('HAS EMPTY');
            return;
        }



        else {
            if (window.confirm('Are you sure you want to request payment ?')) {

                $('input#acctnum').prop("disabled", true);
                $('input#acctname').prop("disabled", true);
                $('input#bname').prop("disabled", true);
                $('.pay_request_btn ').prop("disabled", true);
                $('.pay_request_btn ').addClass("pay_load");
                $('.pay_request_btn span').html("Loading");


                $.ajax({
                    url: 'cred.php',
                    type: 'POST',
                    data: {
                        pay_verify: action,
                        acctname: acctname,
                        bank: bank,
                        acctnum: acctnum


                    },
                    success: function (data) {
                        $('input#acctnum').prop("disabled", false);
                        $('input#acctname').prop("disabled", false);
                        $('input#bname').prop("disabled", false);
                        $('.pay_request_btn ').prop("disabled", false);
                        $('.pay_request_btn ').removeClass("pay_load");
                        $('.pay_request_btn span').html("Done");

                        if (data == 200) {
                            $('.msg_box').addClass('msg_success').html('Payment request succesful');
                            setTimeout(function () {
                                $('.pay_request_btn span').html("Request");
                                $('#exampleModal').modal('hide');
                                location.reload();

                            }, 3000)
                            console.log(data)

                        } else if (data == 402) {
                            $('.msg_box').addClass('msg_error').html('You are currently offline');
                        } else if (data == 404) {
                            $('.msg_box').addClass('msg_error').html('Payment request not successful');

                        }


                    },
                    error: function (e) {
                        console.log('sorry an error occurred ', e)
                    }
                })
                return true;

            } else {
                event.stopPropagation();
                event.preventDefault();

            }


        }



    });

    function getForm() {

        $.ajax({
            url: 'cred.php',
            method: 'GET',
            data: {
                action: 'get_form'

            },
            success: function (data) {
                $('.payment_form_holder').html(data);
                $('#exampleModal').modal('show');
            },
            error: function (e) {
                console.log('sorry an error occurred', e);
            }
        })

    }
    window.getForm = getForm;


    function displayDetails() {
        let get_details = 'get_details';
        $.ajax({
            url: 'cred.php',
            dataType: 'JSON',
            method: 'POST',
            data: {
                get_details: get_details
            },
            success: function (data) {

                $('#product_description_tab').html(data.view);
                $('#review_tab').html(data.editable);


            },
            error: function (e) {
                console.log(e);
            }
        })
    }

    window.displayDetails = displayDetails;

    if(url.fileName() == 'dashboard' || url.fileName() == 'dashboard.php'){

        displayDetails();
    }


    $(document).on('click', '#save_details', function (e) {

        console.log('saving in progress');
        e.preventDefault();
        let hasEmptyField = false;
        const fname = $('input#u_fname');
        const lname = $('input#u_lname');
        const email = $('input#u_email');
        const phone = $('input#u_phone');
        const address = $('input#u_addr');
        const nation = $('input#u_nation');
        const currPass = $('input#curr_pass');
        const newPass = $('input#new_pass');
        const verPass = $('input#con_pass');
        const toastDesc = $('#toast #desc');

        let emptyInputs = $('.editable_holder .not_empty_input').filter(function () {
            return $(this).val() === "";
        })



        if (emptyInputs.length >= 1 || address.val().length < 10 || !email.val().match(emailRegex2) || fname.val().length < 3 || lname.val().length < 3 || nation.val().length < 3 || !phone.val().match(phoneRegex2)) {
            emptyInputs.addClass('empty-field');

            hasEmptyField = true;
            if (!phone.val().match(phoneRegex2)) {
                alert('Please use the international number format. example: +234000000000');
            }
            if (currPass.val() == '' && newPass.val() == '' && verPass.val() == '') {
                currPass.removeClass('empty-field');
                newPass.removeClass('empty-field');
                verPass.removeClass('empty-field');
            }
        }


        console.log('before ajax', hasEmptyField, emptyInputs.length);
        if (hasEmptyField) {
            return;
        } else {

            let action = 'save_details';
            $('body').addClass('loading');
            $('body').append('<div class="processing bring_to_front"></div>');
            $('#save_details').html('<i class=" submit_spin fa fa-spinner"></i>');
            $.ajax({
                url: 'cred.php',
                method: 'POST',
                dataType: 'JSON',
                data: {
                    fname: fname.val(),
                    lname: lname.val(),
                    email: email.val(),
                    phone: phone.val(),
                    address: address.val(),
                    nation: nation.val(),
                    currPass: currPass.val(),
                    newPass: newPass.val(),
                    verPass: verPass.val(),
                    action: action

                },
                success: function (data) {
                    $('body').removeClass('loading');
                    $('.processing').hide();
                    $('#save_details').html('Save Changes');
                    console.clear();
                    console.log(data);

                    $('#toast #img').toggleClass('error_toast', data.code == 404).toggleClass('success_toast', data.code == 200);

                    if (data.code == '200') {



                        toastDesc.html(data.msg);
                        displayDetails();
                        launch_toast();

                    } else if (data.code == '404') {
                        toastDesc.html(data.msg);
                        launch_toast();
                        console.log('error');
                    }
                },
                error: function (e) {
                    alert('Sorry we encountered an error: ', e);
                }

            })


        }



    })



    $('.edit_btn').on('click', function () {
        open_file()

    });

    function launch_toast() {
        var x = document.getElementById("toast")
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    function open_file() {
        document.getElementById('file-input').click();
    }


    $('#file-input').on('change', function () {
        // Get the file data and read it as a Base64-encoded string
        var action = 'upload_file';
        var file_data = $('#file-input').prop('files')[0];
        var form_data = new FormData();
        form_data.append('action', action);
        form_data.append('file', file_data);
        $.ajax({
            url: 'cred.php',
            method: 'POST',
            dataType: 'JSON',
            data: form_data,
            processData: false,
            contentType: false,
            success: function (response) {
                if (response.code == 200) {
                    load_profile_pic();
                } else if (response.code == 404) {
                    Swal.fire({
                        icon: 'error',

                        text: response.msg,
                        confirmButtonColor: '#f27474',
                    })
                }
                else if (response.code == 401) {
                    Swal.fire({
                        icon: 'error',
                        text: response.msg,
                        confirmButtonColor: '#f27474',
                        footer: ' <a href="https://www.compress2go.com/compress-image" class="image_compressor" target="_blank"> Use Image Compressor </a>'
                    })
                }
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });

    });


    function load_profile_pic() {

        $.ajax({
            url: 'cred.php',
            method: 'GET',
            data: {
                action: 'load_pic'
            },
            success: function (data) {

                $('.image_wrap').html(data);


            },
            error: function (e) {
                alert(e);
            }
        })

    }
    window.load_profile_pic = load_profile_pic;

})

