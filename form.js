$(document).ready(function () {

    $("#create_patient_form").validate({
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
        submitHandler: function (form) {
            const formFieldValues = $(form).serializeArray();
            console.log('formFieldValues : ', formFieldValues)
            let formInputs = {};

            formFieldValues.forEach(eachField => {
                formInputs[eachField.name] = eachField.value;
            })

            formInputs.is_health_card = false;
            if (formInputs.hasOwnProperty('is_health_card')) {
                formInputs.hasOwnProperty = true;
            }

            console.log(formInputs);
            createPatient(formInputs)
                .then(result => {
                    console.log('result : ', result)
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



})
