$(document).ready(function () {

  


});
var template_2 = "";
var template_1 = "";
var singleData = {};
function MatchWithAllData() {
   
    $.ajax({

        url: "/Home/GetAllUser/",
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",


        success: function (data) {


            // get json data list
            $.each(data, function (key, obj) {
                debugger;
                 template_2 = obj.TemplateBase64;
                 singleData = obj;

                 matchScore(succMatch, failureFunc);
                 
            });

           




        }


    });

};

function SuccessFunc1(result) {
    if (result.ErrorCode == 0) {
        /* 	Display BMP data in image tag
            BMP data is in base 64 format
        */
        if (result != null && result.BMPBase64.length > 0) {
            document.getElementById('FPImage1').src = "data:image/bmp;base64," + result.BMPBase64;
        }
        template_1 = result.TemplateBase64;
    }
    else {
        alert("Fingerprint Capture Error Code:  " + result.ErrorCode + ".\nDescription:  " + ErrorCodeToString(result.ErrorCode) + ".");
    }
     template_1 = obj.TemplateBase64;
}

//function SuccessFunc2(result) {
//    if (result.ErrorCode == 0) {
//        /* 	Display BMP data in image tag
//            BMP data is in base 64 format
//        */
//        if (result != null && result.BMPBase64.length > 0) {
//            document.getElementById('FPImage2').src = "data:image/bmp;base64," + result.BMPBase64;
//        }
//        template_2 = result.TemplateBase64;
//    }
//    else {
//        alert("Fingerprint Capture Error Code:  " + result.ErrorCode + ".\nDescription:  " + ErrorCodeToString(result.ErrorCode) + ".");
//    }
//}

function ErrorFunc(status) {
    /*
        If you reach here, user is probabaly not running the
        service. Redirect the user to a page where he can download the
        executable and install it.
    */
    alert("Check if SGIBIOSRV is running; status = " + status + ":");
}

function CallSGIFPGetData(successCall, failCall) {
    var uri = "https://localhost:8443/SGIFPCapture";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fpobject = JSON.parse(xmlhttp.responseText);
            successCall(fpobject);
        }
        else if (xmlhttp.status == 404) {
            failCall(xmlhttp.status)
        }
    }
    xmlhttp.onerror = function () {
        failCall(xmlhttp.status);
    }
    var params = "Timeout=" + "10000";
    params += "&Quality=" + "50";
    params += "&licstr=" + encodeURIComponent(secugen_lic);
    params += "&templateFormat=" + "ISO";
    xmlhttp.open("POST", uri, true);
    xmlhttp.send(params);
}

function matchScore(succFunction, failFunction) {
    if (template_1 == "" || template_2 == "") {
        alert("Please scan two fingers to verify!!");
        return;
    }
    var uri = "https://localhost:8443/SGIMatchScore";

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            fpobject = JSON.parse(xmlhttp.responseText);
            succFunction(fpobject);
        }
        else if (xmlhttp.status == 404) {
            failFunction(xmlhttp.status)
        }
    }

    xmlhttp.onerror = function () {
        failFunction(xmlhttp.status);
    }
    var params = "template1=" + encodeURIComponent(template_1);
    params += "&template2=" + encodeURIComponent(template_2);
    params += "&licstr=" + encodeURIComponent(secugen_lic);
    params += "&templateFormat=" + "ISO";
    xmlhttp.open("POST", uri, false);
    xmlhttp.send(params);
}

function succMatch(result) {
    var idQuality = document.getElementById("quality").value;
    if (result.ErrorCode == 0) {
        if (result.MatchingScore >= idQuality)
        {
            alert("MATCHED ! (" + result.MatchingScore + ")");
            document.getElementById("Userpic").src = singleData.Userpic;
        }

        else
            alert("NOT MATCHED ! (" + result.MatchingScore + ")");
    }
    else {
        alert("Error Scanning Fingerprint ErrorCode = " + result.ErrorCode);
    }
}

function failureFunc(error) {
    alert("On Match Process, failure has been called");
}
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
        "ImageHeight": $('#ImageHeight').val(),
        "ImageWidth": $('#ImageWidth').val(),
        "ImageDPI": $('#ImageDPI').val(),
        "ImageQuality": $('#ImageQuality').val(),
        "TemplateBase64": $('#TemplateBase64').val(),
        "WSQImageSize": $('#WSQImageSize').val(),
        "WSQImage": $('#WSQImage').val(),
        "NFIQ": $('#NFIQ').val(),
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
