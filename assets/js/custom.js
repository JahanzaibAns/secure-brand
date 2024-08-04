$(window).scroll(function () {
    var header = $('header'),
        scroll = $(window).scrollTop();

    if (scroll >= 1) {
        header.addClass('sticky');
    }
    if (scroll <= 0) {
        header.removeClass('sticky');
    }

});

// Accordian
$('.accordion-list > li > .answer').hide();

$('.accordion-list > li').click(function () {
    if ($(this).hasClass("active")) {
        $(this).removeClass("active").find(".answer").slideUp();
    } else {
        $(".accordion-list > li.active .answer").slideUp();
        $(".accordion-list > li.active").removeClass("active");
        $(this).addClass("active").find(".answer").slideDown();
    }
    return false;
});

//    $(".portfolio-slider").slick({
//     dots: false,
//     arrows: true,
//     infinite: true,
//     autoplay: false,
//     speed: 300,
//     slidesToShow: 1,
//     prevArrow: '<a href="javascript:;" class="arrow-btn left"><img src="assets/images/arrow-left.webp" alt=""></a>',
//     nextArrow: '<a href="javascript:;" class="arrow-btn right"><img src="assets/images/arrow-right.webp" alt=""></a>',
//     responsive: [

//         {
//             breakpoint: 1023,
//             settings: {
//                 slidesToShow: 1,
//                 arrows: false,
//             }
//         }



//     ]
// });

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

document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('phoneNum2').addEventListener('input', function (e) {
        var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
    });

});


document.addEventListener('DOMContentLoaded', function () {
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
        window.location.href = 'https://securebrandrights.com/thankyou-stepper.html';
    });
};

const sendDataToAPI = (data, fields, callback) => {
    const apiUrl = 'https://backendapi.securebrandrights.com/api/contact';

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
        contact_form: {
            fullName: 'c_name',
            email: 'c_email',
            phoneNo: 'c_phone',
            description: 'c_message',
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
                fullName: "Please enter your full name",
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