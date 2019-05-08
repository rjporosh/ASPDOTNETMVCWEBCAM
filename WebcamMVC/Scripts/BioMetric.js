$(document).ready(function () {

    //loadData();


});



//Load Data 




//function loadData() {

//    $('#myDataTable_wrapper .dataTables_filter input').addClass("input-medium "); $('#myDataTable_wrapper .dataTables_length select').addClass("select2-wrapper span12");


//    $('#myDataTable').DataTable({

//        "sDom": "<'row'<'col-md-6'l <'toolbar'>><'col-md-6'f>r>t<'row'<'col-md-12'p i>>",



//        ajax: {

//            url: '/Area/GetByAjax',
//            dataSrc: ""

//        },

//        columns: [
//            {
//                data: "AreaName"
//            },
//            {
//                data: "Address"
//            },

//            {
//                data: "Contact"
//            },
//            {
//                render: function (data, type, obj) {
//                    return "<div class='btn-group'><a href='#' class='btn btn-primary waves-effect waves-light' onclick='return getbyID(" + obj.Id + ")'>Edit</a>" +
//                        "<a href='#' class='btn btn-danger waves-effect waves-light' onclick='Delete(" + obj.Id + ")'>Delete</a></div>";
//                }
//            }
//        ],

//        fixedColumns: {
//            rightColumns: 1
//        },



//        "bDestroy": true
//    });

//    $("div.toolbar").html('<div class="table-tools-actions"><button style="margin-left:20px;width: 90px;" type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal" onclick="clearTextBox();">Add</button></div>');
//    $("#mydatatable").dataTable().fnDestroy();
//}
//Function for getting the Data Based upon Class
function getbyID(id) {
    $('#Name').css('border-color', 'lightgrey');

    $('#Code').css('border-color', 'lightgrey');
    $('#Description').css('border-color', 'lightgrey');
    $.ajax({
        url: "/BioMetric/GetbyID/" + id,
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

        "FullName": $('#FullName').val(),
        "Photo": $('#Photo').val(),
        "FingerPrint": $('#FingerPrint').val()
    };
    $.ajax({
        url: "/BioMetric/Create",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {
            if (result.status) {
                clearTextBox();
                $('#message').addClass('alert alert-success').html("<strong>" + result.message + "</strong>").show(200).delay(2500).hide(200);

                loadData();


            }


        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
}

function Update() {
    var res = validate();
    if (res == false) {
        return false;
    }

    var obj = {

        "ID": $('#ID').val(),
        "RegistrationNumber": $('#RegistrationNumber').val(),

        "FullName": $('#FullName').val(),
        "Photo": $('#Photo').val(),
        "FingerPrint": $('#FingerPrint').val()
    };

    $.ajax({
        url: "/BioMetric/Edit",
        data: JSON.stringify(obj),
        type: "POST",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (result) {

            if (result.status) {


                $('#message').addClass('alert alert-success').html("<strong>" + result.message + "</strong>").show(200).delay(2500).hide(200);

                loadData();



            }
        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });


}

function Delete(id) {

    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/BioMetric/Delete/" + id,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {

                loadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }

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
(function ($) {

    var webcam = {

        "extern": null, // external select token to support jQuery dialogs
        "append": true, // append object instead of overwriting

        "width": 320,
        "height": 240,

        "mode": "callback", // callback | save | stream

        "swffile": "jscam.swf",
        "quality": 85,

        "debug": function () { },
        "onCapture": function () { },
        "onTick": function () { },
        "onSave": function () { },
        "onLoad": function () { }
    };

    window["webcam"] = webcam;

    $["fn"]["webcam"] = function (options) {

        if (typeof options === "object") {
            for (var ndx in webcam) {
                if (options[ndx] !== undefined) {
                    webcam[ndx] = options[ndx];
                }
            }
        }

        var source = '<object id="XwebcamXobjectX" type="application/x-shockwave-flash" data="' + webcam["swffile"] + '" width="' + webcam["width"] + '" height="' + webcam["height"] + '"><param name="movie" value="' + webcam["swffile"] + '" /><param name="FlashVars" value="mode=' + webcam["mode"] + '&amp;quality=' + webcam["quality"] + '" /><param name="allowScriptAccess" value="always" /></object>';

        if (null !== webcam["extern"]) {
            $(webcam["extern"])[webcam["append"] ? "append" : "html"](source);
        } else {
            this[webcam["append"] ? "append" : "html"](source);
        }

        var run = 3;
        (_register = function () {
            var cam = document.getElementById('XwebcamXobjectX');

            if (cam && cam["capture"] !== undefined) {

                /* Simple callback methods are not allowed :-/ */
                webcam["capture"] = function (x) {
                    try {
                        return cam["capture"](x);
                    } catch (e) { }
                }
                webcam["save"] = function (x) {
                    try {
                        return cam["save"](x);
                    } catch (e) { }
                }
                webcam["setCamera"] = function (x) {
                    try {
                        return cam["setCamera"](x);
                    } catch (e) { }
                }
                webcam["getCameraList"] = function () {
                    try {
                        return cam["getCameraList"]();
                    } catch (e) { }
                }
                webcam["pauseCamera"] = function () {
                    try {
                        return cam["pauseCamera"]();
                    } catch (e) { }
                }
                webcam["resumeCamera"] = function () {
                    try {
                        return cam["resumeCamera"]();
                    } catch (e) { }
                }
                webcam["onLoad"]();
            } else if (0 == run) {
                webcam["debug"]("error", "Flash movie not yet registered!");
            } else {
                /* Flash interface not ready yet */
                run--;
                window.setTimeout(_register, 1000 * (4 - run));
            }
        })();
    }

})(jQuery);