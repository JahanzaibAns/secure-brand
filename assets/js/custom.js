new WOW().init();

$(document).ready(function () {
    $("li:first-child").addClass("first");
    $("li:last-child").addClass("last");

    $('[href="#"],[href=""]').attr("href", "javascript:;");

    var len = $('.menu > li'), str;
    $(".menu-Bar").click(function () {
        $(this).toggleClass("open");
        $(".menuWrap, .sticky").toggleClass("open");
        $("body").toggleClass("ovr-hiddn");
        for (var i = 1; i < len.length; i++) {
            str = (300 + 100 * (i - 1)) + "ms";
            len.eq(i).css('animation-delay', str).css('opacity', '1');
        }
    });

    $(".loginUp").click(function () {
        $(".LoginPopup").fadeIn();
        $(".overlay").fadeIn();
    });

    $(".signUp").click(function () {
        $(".signUpPop").fadeIn();
        $(".overlay").fadeIn();
    });

    $(".closePop,.overlay").click(function () {
        $(".popupMain").fadeOut();
        $(".overlay").fadeOut();
    });

    $(".menu .menu-item-has-children").addClass("dropdown-nav");
    $(".menu .menu-item-has-children ul.sub-menu").addClass("dropdown");

    $('.dropdown-nav').prepend('<span class="toggle_submenu"><i class="fal fa-plus"></i></span>');

    $('.toggle_submenu').click(function () {
        $('ul.dropdown').slideUp();
        $('.toggle_submenu').removeClass('active');

        if ($(this).parent().find('ul.dropdown').is(':visible')) {
            $(this).removeClass('active');
            $(this).parent().find('ul.dropdown').slideUp();
        } else {
            $(this).addClass('active');
            $(this).parent().find('ul.dropdown').slideDown();
        }
    });
    $(".sec_3_slider").slick({
        dots: true,
        infinite: true,
        speed: 1200,
        slidesToShow: 2,
        arrows: false,
        autoplay: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    adaptiveHeight: true,
                }
            },
        ]
    });
});

$(".accordions .acc_title").click(function () {
    $('.accordions li').removeClass('active')
    $('.acc_desc').slideUp();
    $(this).parent('li').addClass('active')
    if (!$(this).next('.acc_desc').is(':visible')) {
        $(this).next('.acc_desc').slideDown();
    } else {
        $('.accordions li').removeClass('active')
    }
});
$("[data-targetit]").on("click", function (e) {
    $(this).addClass("active");
    $(this)
        .siblings()
        .removeClass("active");
    var target = $(this).data("targetit");
    $("." + target)
        .siblings('[class^="box-"]')
        .hide();
    $("." + target).fadeIn();
    $(".tabViewList").slick("setPosition", 0);
});

$(".closePop,.overlay").click(function () {
    $(".popupMain").fadeOut();
    $(".overlay").fadeOut();
});

$('.popstatic').click(function () {
    $('.centercont.static').removeClass('d-none');
    $('#popstatic').fadeIn();
    $('.overlay').fadeIn();
});

$('.closeico,.overlay').click(function () {

    $('.popupmain').fadeOut();
    $('.overlay').fadeOut();


});

document.addEventListener('DOMContentLoaded', function() {
    
    document.getElementById('phoneNum2').addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
    
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('g_phone').addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
    
});

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('c_phone').addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });
    
});

const saveDataAndRedirect = (formId, fields) => {
    const fullName = $(`#${fields.fullName}`).val();
    const email = $(`#${fields.email}`).val();
    const phoneNo = $(`#${fields.phoneNo}`).val();
    const description = fields.description ? $(`#${fields.description}`).val() : '';
    const subject = fields.subject ? $(`#${fields.subject}`).val() : '';

    const dataToStore = { fullName, email, phoneNo, description, subject };

    // Show loader
    $(`#${fields.submit}`).html('Submitting... <i class="fa fa-spinner fa-spin"></i>');

    // Call the API to send data
    sendDataToAPI(dataToStore, fields, () => {
        // Callback: Redirect to 'thank you' page after API call is complete
        // window.location.href = 'thankyou-stepper.html';
    });
};

const sendDataToAPI = (data, fields, callback) => {
    const apiUrl = 'http://192.168.1.112:8000/api/contact';

    // Prepare the data for the API request
    const apiData = {
        fullName: data.fullName,
        phoneNo: data.phoneNo,
        email: data.email,
        description: data.description,
        subject: data.subject
    };

    // Make a POST request to the API with JSON data in the body
    $.ajax({
        url: apiUrl,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(apiData),
        success: function (response) {
            console.log('API response:', response);
            // Handle the API response if needed
            if (typeof callback === 'function') {
                callback(); // Call the callback after API is complete
            }
        },
        error: function (error) {
            console.error('Error sending data to API:', error);
            // Handle errors if needed
            // Hide loader and show error message
            $(`#${fields.submit}`).html('Register Now');
        }
    });
};

$(document).ready(function () {
    // Define form details
    const forms = {
        popup_form: {
            fullName: 'name',
            email: 'email',
            phoneNo: 'phoneNum2',
            submit: 'popup_submit'
        },
        download_guide: {
            fullName: 'g_name',
            email: 'g_email',
            phoneNo: 'g_phone',
            description: 'g_message',
            submit: 'g_submit'
        },
        contact_form: {
            fullName: 'c_name',
            email: 'c_email',
            phoneNo: 'c_phone',
            description: 'c_message',
            subject: 'c_subject',
            submit: 'c_submit'
        }
    };

    // Initialize form validation for each form
    Object.keys(forms).forEach(formId => {
        const fields = forms[formId];
        $(`#${formId}`).validate({
            rules: {
                fullName: "required",
                email: {
                    required: true,
                    email: true
                },
                phoneNo: {
                    required: true,
                }
            },
            messages: {
                fullName: "Please enter your first name",
                email: "Please enter a valid email address",
                phoneNo: {
                    required: "Please enter your phone number",
                }
            },
            submitHandler: function (form) {
                // Prevent default form submission
                event.preventDefault();

                // Form is valid, call the API and redirect
                saveDataAndRedirect(formId, fields);
            }
        });
    });


});