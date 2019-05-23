$(document).ready(function () {

  


});


function getbyID(id) {
    $('#Name').css('border-color', 'lightgrey');

    $('#Code').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $.ajax({
        url: "/Home/GetbyID/" + id,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#ID').val(result.ID);
            $('#RegistrationNumber').val(result.RegistrationNumber);

            $('#FullName').val(result.FullName);
            $('#Photo').val(result.Photo);
            $('#FingerPrint').val(result.FingerPrint);

            $('#myModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
}

//Function for clearing the textboxes
function clearTextBox() {
    $('#myCustomForm')[0].reset();
    $('#Userpic').reset();
    $('#btnUpdate').hide();
    $('#btnAdd').show();
}



//Add Data Function   
function Add() {
    var res = validate();
    if (res == false) {
        return false;
    }
    var obj = {

        "ID": $('#ID').val(),
        "RegistrationNumber": $('#RegistrationNumber').val(),
        "Userpic":$('#Userpic').val(),
        "FullName": $('#FullName').val(),
        "Photo": $('#Photo').val(),
        "FingerPrint": $('#FingerPrint').val()
    };
    $.ajax({
        url: "/Home/Create",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.status) {
                clearTextBox();
                $('#message').addClass('alert alert-success').html("<strong>" + result.message + "</strong>").show(200).delay(2500).hide(200);

                clearTextBox();


            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}





//Valdidation using jquery  
function validate() {
    var isValid = true;
    if ($('#FullName').val().trim() == "") {
        $('#FullName').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#FullName').css('border-color', 'lightgrey');
    }

    if ($('#RegistrationNumber').val().trim() == "") {
        $('#RegistrationNumber').css('border-color', 'Red');
        isValid = false;
    }
    else {
        $('#RegistrationNumber').css('border-color', 'lightgrey');
    }

    return isValid;
}
