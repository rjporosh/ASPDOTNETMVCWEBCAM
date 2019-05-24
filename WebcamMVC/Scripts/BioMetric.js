$(document).ready(function () {

  


});

var fingerpos = ["LEFT_THUMB", "LEFT_INDEX", "LEFT_MIDDLE", "LEFT_RING", "LEFT_LITTLE",
				"RIGHT_THUMB", "RIGHT_INDEX", "RIGHT_MIDDLE", "RIGHT_RING", "RIGHT_LITTLE"];
var service_handle = "";
var ENROLL_OBJ;
var cdate = new Date();
var TotalEnrollments = 0;

//Function for clearing the textboxes
function clearTextBox() {
    $('#myCustomForm')[0].reset();
    $('#btnUpdate').hide();
    $('#btnAdd').show();
}


//Function Login
function Login() {
   
    $.ajax({
        url: "/Home/Login",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.status) {
                clearTextBox();
                $('#message').addClass('alert alert-success').html("<strong>" + result.message + "</strong>").show(200).delay(2500).hide(200);




            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
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
        //"Userpic": $('#ViewBag.pic').val(),
        "SerialNumber": $('#SerialNumber').val(),
        //"TemplateBase64": $('#TemplateBase64').val(),
        "FullName": $('#FullName').val(),
        "ImagePath": $('#ImagePath').val(),
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

            


            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}


function captureFP(arridx) {
    var imgid = fingerpos[arridx];
    if (ENROLL_OBJ && ENROLL_OBJ.length > arridx && ENROLL_OBJ.EnrollData[arridx].na >= 3) {
        alert("Maximum Attempts Over!");
        return;
    }
    document.getElementById(imgid).src = ".\Images\wait.gif";
    CallSGIFPGetData(arridx, SuccessFunc, ErrorFunc);
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
