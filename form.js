$(document).ready(function () {

    var validator = $("#create_patient_form").validate({
        focusInvalid: false,
        rules: {
            firstname: "required",
            lastname: "required",
            gender: {
                required: true
            },
            dob: {
                required: true
            },
            mobile: {
                required: true
            },
            email: {
                required: true,
                email: true
            },
            aadhar_card_number: {
                required: true,
                minlength: 12,
                maxlength: 12
            },
            street_address: {
                required: false
            },
            city: {
                required: false
            },
            pincode: {
                required: false
            },
            state: {
                required: false
            },
            city: {
                required: false
            },
            pincode: {
                required: false
            },
            is_health_card: {
                required: false
            },
        },
        messages: {
            firstname: "firstname is required",
            lastname: "lastname is required",
            gender: {
                required: "gender is required"
            },
            dob: "date of birth is required",
            mobile: "mobile is required",
            email: {
                required: "email is required",
                email: "enter valid email address"
            },
            aadhar_card_number: {
                required: "Aaadhar number is required",
                minlength: "minimum length of Aaadhar number is 12",
                maxlength: "maximum length of Aaadhar number is 12"
            }
        },
        errorPlacement: function(error, element) {
            const elementName = $(element).attr('name');
            $(`#${elementName}_error`).append(error);
        },
        submitHandler: function (form) {
            const formFieldValues = $(form).serializeArray();
            let formInputs = {};

            formFieldValues.forEach(eachField => {
                formInputs[eachField.name] = eachField.value;
            })

           
            if (formInputs.hasOwnProperty('is_health_card')) {
                formInputs.is_health_card = true;
            } else {
                formInputs.is_health_card = false;
            }
            createPatient(formInputs)
                .then(result => {

                    if(result.is_health_card) {
                        let qrc = new QRCode(document.getElementById("qrcode"), {
                            text: `http://localhost:8000/health-card-id/${result.health_card_id}`,
                            width: 150,
                            height: 150,
                          });

                          const addressOne = (result.street_address !== '') ? result.street_address : '';
                          const city = (result.city !== '') ? result.city : '';
                          const state = (result.state !== '') ? result.state : '';



                          $('#patient-details-div').append(`
                            <p>${result.firstname} ${result.lastname}</p>
                            <p>${result.mobile}</p>
                            <p>${addressOne}, ${city}, ${state}, ${result.pincode}</p>
                        `);
                        $(form).addClass('hide');
                        $('#result-section').removeClass('hide');
                    }

                    validator.resetForm();
                })
                .catch(err => {
                    console.log('err : ', JSON.stringify(err))
                })
        }
    });


    function createPatient(formInputs) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: 'http://localhost:8000/patient/create',
                data: JSON.stringify(formInputs),
                contentType: "application/json",
                success: (result) => {
                    resolve(result)
                },
                error: (error) => {
                    reject(error)
                }
            })
        })
    }

    
    $(document).on('click', '#resetForm', () => {
       
        validator.resetForm();
    });

})
