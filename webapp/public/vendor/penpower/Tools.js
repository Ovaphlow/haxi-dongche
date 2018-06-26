// external_script.js

var m_deviceID;

window.onbeforeunload = function (event) {
    var message = 'Are you sure you want to leave this page?';
    if (typeof event == 'undefined') {
        event = window.event;
    }

    if (event) {
        event.returnValue = message;

    }

    return message;
};

window.onunload = ppSignUninitialize;

function CreateControl(DivID, CLSID, ObjectID, nWidth, nHeight) {
    var doc = document.getElementById(DivID);
    doc.innerHTML = '<object ID="' + ObjectID + '" border=0 width="' + nWidth + '" height="' + nHeight + '" classid="' + CLSID + '">';
}

function jsPPL398_StatusChanged(status) {
    if (status == '1') {
        jsSaveToImageFilePath("myObject");
    } else {
        alert(status);
    }
}

function jsPPL500_StatusChanged(status) {
    if (status == '1') {
        jsSaveToImageFilePath("myObject");
    } else {
        alert(status);
    }
}

function ControlInitial(ObjectID, nWidth, nHeight) {
    var obj = document.getElementById(ObjectID);
    var canvasWidth = nWidth;
    var canvasHeight = nHeight;

    var initial;
    if (m_deviceID == 1) {
        initial = obj.PPNature_InitialDevice(m_deviceID);
        if (initial == 0) {
            obj.PPNature_SetCanvasSize(m_deviceID, 0, 0, canvasWidth, canvasHeight);
            obj.PPNature_SetPenWidth(m_deviceID, 5);
            obj.PPNature_SetPenColor(m_deviceID, 0, 0, 0);
        }
    } else if (m_deviceID == 5) {
		initial = obj.PPL500_InitialDevice(m_deviceID, 0, 0, canvasWidth, canvasHeight);
		if (initial == 0) {
			setTimeout(function() {
				obj.PPL500_SetCanvasSize(m_deviceID, 0, 0, canvasWidth, canvasHeight);
				obj.PPL500_SetPenColor(m_deviceID, 0, 0, 0);
				var i = obj.PPL500_SignatureStatusCallback(m_deviceID, 'jsPPL500_StatusChanged');
			}, 50);
		}
    } else {
        initial = obj.PPL398_InitialDevice(m_deviceID, 0, 0, canvasWidth, canvasHeight);
        if (initial == 0) {
            setTimeout(function() {
                obj.PPL398_SetCanvasSize(m_deviceID, 0, 0, canvasWidth, canvasHeight);
                obj.PPL398_SetPenColor(m_deviceID, 0, 0, 0);
                var i = obj.PPL398_SignatureStatusCallback(m_deviceID, 'jsPPL398_StatusChanged');
            }, 50);
        }
    }
}

function jsInitialByDeviceType() {
    var typeIndex = window.location.href.indexOf("=") || 2;
    if (typeIndex != -1) {
        var type = window.location.href.substring(typeIndex + 1);
        var devicename = document.getElementById("devicename");
        if (devicename != null) {
            if (type == 1) {
                devicename.value = "Nature";
                m_deviceID = 1;
            } else if (type == 2) {
                devicename.value = "L398";
                m_deviceID = 2;
            } else if (type == 4) {
                devicename.value = "L10B";
                m_deviceID = 4;
            } else if (type == 5) {
                devicename.value = "L500";
                m_deviceID = 5;
            } else {
                devicename.value = "E560";
                m_deviceID = 2;
            }
        }
    }

    if (m_deviceID == 2) {
        CreateControl("EXAMPLE_DIV_ID", "clsid:BFAA2FD5-B6E7-41D0-B104-A433ED33F461", "myObject", 800, 500);
        ControlInitial("myObject", 800, 500);
    } else {
        CreateControl("EXAMPLE_DIV_ID", "clsid:BFAA2FD5-B6E7-41D0-B104-A433ED33F461", "myObject", 800, 400);
        ControlInitial("myObject", 800, 400);
    }

    jsSetCtrStatusByInitial();
    InitialSelectOption();
    disabledPointOptions();
}


function disabledPointOptions() {
    document.getElementById('points').disabled = true;
    document.getElementById('pointInfo').disabled = true;
}

function enabledPointOptions() {
    document.getElementById('points').disabled = false;
    document.getElementById('pointInfo').disabled = false;
}

function InitialSelectOption() {
    var style_select = document.getElementById("penstyle");

    style_select.removeAttribute("disabled");
    style_select.options.length = 0;

    style_select.options.add(new Option("0 Pressure sensitivity"));
    style_select.options.add(new Option("1 Fixed width"));
    style_select.selectedIndex = 0;

    jsSetPenWidthSelect(0);

    var color_select = document.getElementById("pencolor");
    color_select.selectedIndex = 3;

}

function jsSetPenWidthSelect(style) {
    jsEnableControl("penwidth");
    var penwidth_select = document.getElementById("penwidth");
    penwidth_select.removeAttribute("disabled")
    penwidth_select.options.length = 0;
    for (var i = 1; i <= 8; i++) {
        penwidth_select.options.add(new Option(i));
    }
    penwidth_select.selectedIndex = 2;
    var obj = document.getElementById("myObject");
    if (m_deviceID == 1)
        obj.PPNature_SetPenWidth(m_deviceID, 3);
	else if (m_deviceID == 5)
		obj.PPL500_SetPenWidth(m_deviceID, 3);
    else
        obj.PPL398_SetPenWidth(m_deviceID, 3);
    }

function jsDisableControl(id) {
    var ctrl = document.getElementById(id);
    ctrl.setAttribute("disabled");
}

function jsEnableControl(id) {
    var ctrl = document.getElementById(id);
    ctrl.removeAttribute("disabled");
}

function jsSetCtrStatusByInitial() {
    jsEnableControl("About");
    jsEnableControl("Clear");
    jsEnableControl("savetype");
    jsEnableControl("saveformat");
    jsEnableControl("getvalid");
    jsEnableControl("SaveDraingImage");
    jsEnableControl("SaveDraingVideo");
    jsEnableControl("getsize");
    jsEnableControl("points");
    jsEnableControl("encode1");
    jsEnableControl("encode2");
    jsEnableControl("encode3");
    jsEnableControl("encode4");
    jsEnableControl("encode5");
    jsEnableControl("encode6");
    jsEnableControl("decode");
    jsEnableControl("savedpi");
    jsEnableControl("savefps");
    jsEnableControl("SetCenterImageClip");
    if (m_deviceID == 2 || m_deviceID == 5) {
        jsEnableControl("padid");
        jsEnableControl("penid");
        jsEnableControl("versionid");
        jsEnableControl("displayversionid");
        jsEnableControl("closeled");
        jsEnableControl("openled");
        jsEnableControl("SaveDeviceData");
        jsEnableControl("ReadDeviceData");
        jsEnableControl("ClearDeviceData");
        jsEnableControl("deletefileselect");
        jsEnableControl("hideversionid");
        jsEnableControl("SaveDeviceImage");
        jsEnableControl("writefile");
        jsEnableControl("readfile");
    } else {
        jsEnableControl("pencolor");
        jsEnableControl("enabletablet");
        jsEnableControl("disenabletablet");
    }
}

function jsSetCtrStateByUnInitial(ObjectID) {
    var oSel = document.getElementsByTagName('select');
    for (i = 0; i < oSel.length; i++) {
        jsDisableControl(oSel[i].id);
    }

    var arrAll = document.all;
    for (i = 0; i < arrAll.length; i++) {
        if (arrAll[i].type == 'button') {
            jsDisableControl(arrAll[i].id);
        }
    }

    jsEnableControl("change");
}

function jsInitialDevice(ObjectID) {
    jsSetCtrStateByInitial();
    InitialSelectOption();
}

function ppSignUninitialize() {
    jsUnInitialDevice('myObject');
}

function jsUnInitialDevice(ObjectID) {
    var obj = document.getElementById(ObjectID);

    var uninital;
    if (m_deviceID == 2)
        uninital = obj.PPL398_UnInitialDevice(m_deviceID);
	else if (m_deviceID == 5)
		uninital = obj.PPL500_UnInitialDevice(m_deviceID);
    else
        uninital = obj.PPNature_UnInitialDevice(m_deviceID);

    jsSetCtrStateByUnInitial(ObjectID);
}

function jsAboutBox(ObjectID) {

    var obj = document.getElementById(ObjectID);

    if (m_deviceID == 2)
        obj.PPL398_AboutBox(m_deviceID);
	else if (m_deviceID == 5)
		obj.PPL500_AboutBox(m_deviceID);
    else
        obj.PPNature_AboutBox(m_deviceID);
    }

function jsClear(ObjectID) {
    var obj = document.getElementById(ObjectID);

    if (m_deviceID == 2)
        obj.PPL398_Clear(m_deviceID);
	else if (m_deviceID == 5)
		obj.PPL500_Clear(m_deviceID);
    else
        obj.PPNature_Clear(m_deviceID);

    var points = document.getElementById("points");
    points.innerHTML = "";
    disabledPointOptions();
}

function jsSetPenColor(ObjectID) {
    var obj = document.getElementById(ObjectID);

    var uR = 0,
        uG = 0,
        uB = 0;
    var pencolor = document.getElementById("pencolor");
    var color_index = pencolor.selectedIndex;
    if (color_index == 0)
        uR = 255;
    else if (color_index == 1)
        uG = 255;
    else if (color_index == 2)
        uB = 255;
    else if (color_index == 4) {
        uR = 255;
        uG = 255;
        uB = 255;
    } else {
        uR = 0;
        uG = 0;
        uB = 0;
    }

    if (m_deviceID == 2)
        obj.PPL398_SetPenColor(m_deviceID, uR, uG, uB);
	else if (m_deviceID == 5)
		obj.PPL500_SetPenColor(m_deviceID, uR, uG, uB);
    else
        obj.PPNature_SetPenColor(m_deviceID, uR, uG, uB);
    }

function jsSetPenWidth(ObjectID) {
    var obj = document.getElementById(ObjectID);

    var pen_width = document.getElementById("penwidth");
    var widthindex = pen_width.selectedIndex;
    var width = widthindex + 1;

    var style_select = document.getElementById("penstyle");
    var styleID = style_select.selectedIndex;
    var style = styleID;

    if (m_deviceID == 1)
        obj.PPNature_SetPenWidth(m_deviceID, width);
	if (m_deviceID == 5)
		obj.PPL500_SetPenWidth(m_deviceID, width);
    else
        obj.PPL398_SetPenWidth(m_deviceID, width);
    }

function jsSetPenStyle(ObjectID) {
    var obj = document.getElementById(ObjectID);

    var style_select = document.getElementById("penstyle");
    var styleID = style_select.selectedIndex;
    var style = styleID;

    jsSetPenWidthSelect(style);

    if (m_deviceID == 2)
        obj.PPL398_SetPenStyle(m_deviceID, style);
	if (m_deviceID == 5)
		obj.PPL500_SetPenStyle(m_deviceID, style);
    else
        obj.PPNature_SetPenStyle(m_deviceID, style);
    }

function jsSetCenterImageClip(ObjectID) {
    var obj = document.getElementById(ObjectID);
    var HorMargin = document.getElementById('HorMargin').value;
    var VerMargin = document.getElementById('VerMargin').value;

    if (m_deviceID == 2)
        obj.PPL398_SetSaveCenterImageClip(m_deviceID, "1", HorMargin, VerMargin);
	if (m_deviceID == 5)
		obj.PPL500_SetSaveCenterImageClip(m_deviceID, "1", HorMargin, VerMargin);
    else
        obj.PPNature_SetSaveCenterImageClip(m_deviceID, "1", HorMargin, VerMargin);

    alert('Set clip success. Please click "Save Drawing Image" button to review result.');
}

function getCurrentDirectory() {
    /*	var syspath = location.href;
	syspath = syspath.toLowerCase();
	myPosition = syspath.lastIndexOf("/");
	syspath = syspath.substring(0,parseInt(myPosition)+1);
	syspath = syspath.replace("file:///","");
	syspath = syspath.replace(new RegExp("%20","gm")," ");
*/

    var wsh = new ActiveXObject("wscript.shell");
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var syspath = wsh.SpecialFolders("MyDocuments");

    if (!fso.FolderExists(syspath))
        fso.CreateFolder(syspath);
    syspath = syspath + "\\";
    return syspath;
}

function jsSaveToImageFilePath(ObjectID) {
    var obj = document.getElementById(ObjectID);

    var save_type = document.getElementById("savetype");
    var typeindex = save_type.selectedIndex;

    // var save_dpi = document.getElementById("savedpi");
    // var dpiindex = save_dpi.selectedIndex;
    //
    // alert(typeindex);
    // alert(dpiindex)

    var type = save_type.options[typeindex].text;
    var ext = "." + type;

    var name = "SaveDrawingImage_" + generateString(5) + ext;

    var dir = getCurrentDirectory();

    var fullname = dir + name;
    alert("Save file " + fullname);
    var dpi_select = document.getElementById("savedpi");
    var dpi = dpi_select.selectedIndex;
    // var dpi = dpi_select.options[dpi_select.selectedIndex].text;

    var ret;

    if (m_deviceID === 1) {
        ret = obj.PPNature_SaveDrawingImage(m_deviceID, typeindex + 1, fullname, dpi);
    } else if (m_deviceID === 2) {
        ret = obj.PPL398_SaveDrawingImage(m_deviceID, typeindex + 1, fullname, dpi);
    } else if (m_deviceID === 5) {
    	ret = obj.PPL500_SaveDrawingImage(m_deviceID, typeindex + 1, fullname, dpi);
    }

    // if (m_deviceID == 2)
    // 	ret = obj.PPL398_SaveDrawingImage(m_deviceID, typeindex + 1, fullname, dpi);
    // if (m_deviceID == 4)
    // 	ret = obj.PPL10B_SaveDrawingImage(m_deviceID, typeindex + 1, fullname, dpi);
    // else
    // 	ret = obj.PPNature_SaveDrawingImage(m_deviceID, typeindex + 1, fullname, dpi);
}

function jsSaveToVideoFilePath(ObjectID) {
    var obj = document.getElementById(ObjectID);

    var save_format = document.getElementById("saveformat");
    var typeindex = save_format.selectedIndex;

    var save_fps = document.getElementById("savefps");
    var fpsindex = save_fps.selectedIndex;

    // alert(typeindex + 1);
    // alert(fpsindex + 1);

    var type = save_format.options[typeindex].text;
    var ext = "." + type;

    var name = "SaveDrawingVideo_" + generateString(5) + ext;

    var dir = getCurrentDirectory();

    var fullname = dir + name;

    var ret;

    if (m_deviceID === 1) {
        ret = obj.PPNature_SaveDrawingVideo(m_deviceID, typeindex + 1, fpsindex + 1, fullname);
    } else if (m_deviceID === 2) {
        ret = obj.PPL398_SaveDrawingVideo(m_deviceID, typeindex + 1, fpsindex + 1, fullname);
    } else if (m_deviceID === 5) {
    	ret = obj.PPL500_SaveDrawingVideo(m_deviceID, typeindex + 1, fpsindex + 1, fullname);
    }

    alert("Save file " + fullname);
}

function jsGetPointSize(ObjectID) {
    var obj = document.getElementById(ObjectID);
    var size;

    // 20160819 Eric edit
    if (m_deviceID === 1) {
        size = obj.PPNature_GetTotalPacketsNumber(m_deviceID);
    } else if (m_deviceID === 2) {
        size = obj.PPL398_GetTotalPacketsNumber(m_deviceID);
    } else if (m_deviceID === 5) {
    	size = obj.PPL500_GetTotalPacketsNumber(m_deviceID);
    }

    // if (m_deviceID == 2)
    // 	size = obj.PPL398_GetTotalPacketsNumber(m_deviceID);
    // if (m_deviceID == 4)
    // 	size = obj.PPL10B_GetTotalPacketsNumber(m_deviceID);
    // else
    // 	size = obj.PPNature_GetTotalPacketsNumber(m_deviceID);

    if (size == -8) {
        window.alert("Ink Empty.");
        return;
    }

    var points = document.getElementById("points");
    enabledPointOptions();

    points.removeAttribute("ShowPointInfo");
    points.options.length = 0;
    for (var i = 0; i < size; i++) {
        var new_option = new Option(i + 1);
        points.options.add(new_option);
    }
    points.selectedIndex = 0;
}

function jsGetPointData(ObjectID) {
    var obj = document.getElementById(ObjectID);
    var pointIndex = document.getElementById("points").selectedIndex;

    var x;
    var y;
    var e;
    var str = "";
    var totalSize = 0;
    var timeStr = "";

    // 20160819 Eric edit
    if (m_deviceID == 2) {
        totalSize = obj.PPL398_GetTotalPacketsNumber(m_deviceID);
    } else if (m_deviceID == 5) {
    	totalSize = obj.PPL500_GetTotalPacketsNumber(m_deviceID);
    } else {
        totalSize = obj.PPNature_GetTotalPacketsNumber(m_deviceID);
    }

    if (totalSize == 0) {
        window.alert("no point");
        return;
    }

    if (m_deviceID === 1) {
        x = obj.PPNature_GetPointData(m_deviceID, pointIndex, 1);
        y = obj.PPNature_GetPointData(m_deviceID, pointIndex, 2);
        e = obj.PPNature_GetPointData(m_deviceID, pointIndex, 3);
        timeStr = obj.PPNature_GetPointTime(m_deviceID, pointIndex);
    } else if (m_deviceID === 2) {
        x = obj.PPL398_GetPointData(m_deviceID, pointIndex, 1);
        y = obj.PPL398_GetPointData(m_deviceID, pointIndex, 2);
        e = obj.PPL398_GetPointData(m_deviceID, pointIndex, 3);
        timeStr = obj.PPL398_GetPointTime(m_deviceID, pointIndex);
    } else if (m_deviceID === 5) {
		x = obj.PPL500_GetPointData(m_deviceID, pointIndex, 1);
        y = obj.PPL500_GetPointData(m_deviceID, pointIndex, 2);
        e = obj.PPL500_GetPointData(m_deviceID, pointIndex, 3);
        timeStr = obj.PPL500_GetPointTime(m_deviceID, pointIndex);
    }

    pointInfoStr = 'Index : ' + (pointIndex + 1) + '\n' + 'X : ' + x + '\n' + 'Y : ' + y + '\n' + 'StrokeEnd : ' + e + '\n' + 'Time : ' + timeStr;

    window.alert(pointInfoStr);

    // 舊的CODE
    // var count = 0;
    // for(count = 0; count < totalSize; count ++)
    // {
    // 	if (m_deviceID == 2)
    // 	{
    // 		x = obj.PPL398_GetPointData(m_deviceID, count, 1);
    // 		y = obj.PPL398_GetPointData(m_deviceID, count, 2);
    // 		e = obj.PPL398_GetPointData(m_deviceID, count, 3);
    // 		timeStr = obj.PPL398_GetPointTime(m_deviceID,count);
    // 	}
    // 	if (m_deviceID == 4)
    // 	{
    // 		x = obj.PPL10B_GetPointData(m_deviceID, count, 1);
    // 		y = obj.PPL10B_GetPointData(m_deviceID, count, 2);
    // 		e = obj.PPL10B_GetPointData(m_deviceID, count, 3);
    // 		timeStr = obj.PPL398_GetPointTime(m_deviceID,count);
    // 	}
    // 	else
    // 	{
    // 		x = obj.PPNature_GetPointData(m_deviceID, count, 1);
    // 		y = obj.PPNature_GetPointData(m_deviceID, count, 2);
    // 		e = obj.PPNature_GetPointData(m_deviceID, count, 3);
    // 		timeStr = obj.PPNature_GetPointTime(m_deviceID,count);
    // 	}
    // 	str += "index = " + count;
    // 	str += "; x = ";
    // 	str += x;
    // 	str += "; y = ";
    // 	str += y;
    // 	str += "; end = ";
    // 	str += e;
    // 	str += "; time= ";
    // 	str += timeStr;
    // 	str += "\n";
    // }

    // window.alert(str);
}

function jsGetProtectValidStatus(ObjectID) {
    var obj = document.getElementById(ObjectID);

    var bValid;
    if (m_deviceID == 2)
        bValid = obj.PPL398_GetProtectValidStatus(2);
	else if (m_deviceID == 5)
		bValid = obj.PPL500_GetProtectValidStatus(2);
    else if (m_deviceID == 4)
        bValid = obj.PPNature_GetProtectValidStatus(2);
    else
        bValid = obj.PPNature_GetProtectValidStatus(1);

    if (bValid)
        window.alert("Protect is Valid");
    else
        window.alert("Protect is inValid");
    }

function jsActiveTablet(ObjectID, active) {
    var obj = document.getElementById(ObjectID);

    if (m_deviceID == 1)
        obj.PPNature_ActiveTablet(1, active);
    }

function jsShowIDResult(id) {
    window.alert(id);
}

function jsGetPadID(ObjectID) {
    var obj = document.getElementById(ObjectID);

    if (m_deviceID == 2) {
        var padid = obj.PPL398_GetHWPadID(m_deviceID);
        jsShowIDResult(padid);
    } else if (m_deviceID == 5) {
    	var padid = obj.PPL500_GetHWPadID(m_deviceID);
		jsShowIDResult(padid);
    }
}

function jsGetPenID(ObjectID) {
    var obj = document.getElementById(ObjectID);

    if (m_deviceID == 2) {
        var penid = obj.PPL398_GetHWPenID(m_deviceID);
        jsShowIDResult(penid);
    } else if (m_deviceID == 5) {
		var penid = obj.PPL500_GetHWPenID(m_deviceID);
        jsShowIDResult(penid);
    }
}

function jsGetVersionID(ObjectID) {
    var obj = document.getElementById(ObjectID);

    if (m_deviceID == 2) {
        var versionid = obj.PPL398_GetHWVersionID(m_deviceID);
        jsShowIDResult(versionid);
    } else if (m_deviceID == 5) {
		var versionid = obj.PPL500_GetHWVersionID(m_deviceID);
        jsShowIDResult(versionid);
    }
}

function jsSetBackgroundImage(ObjectID) {
    var obj = document.getElementById(ObjectID);

    var save_type = document.getElementById("savetype");
    var typeindex = save_type.selectedIndex;

    var type = save_type.options[typeindex].text;
    var ext = "." + type;

    var name = "test" + ext;

    var dir = getCurrentDirectory();

    var fullname = dir + name;
    if (m_deviceID == 2) {
        obj.PPL398_SetBackgroundImage(m_deviceID, fullname);
    } else if (m_deviceID == 5) {
    	obj.PPL500_SetBackgroundImage(m_deviceID, fullname);
    } else {
        obj.PPNature_SetBackgroundImage(m_deviceID, fullname);
    }
}

function jsDisplayVersionID(ObjectID, display) {
    var obj = document.getElementById(ObjectID);
    if (m_deviceID == 2) {
        obj.PPL398_DisplayHWVersion(m_deviceID, display);
    } else if (m_deviceID == 5) {
    	obj.PPL500_DisplayHWVersion(m_deviceID, display);
    }
}

function jsCloseLed(ObjectID) {
    var obj = document.getElementById(ObjectID);
    if (m_deviceID == 2)
        obj.PPL398_CloseLed(m_deviceID);
    else if (m_deviceID == 5)
    	obj.PPL500_CloseLed(m_deviceID);
}

function jsOpenLed(ObjectID) {
    var obj = document.getElementById(ObjectID);
    if (m_deviceID == 2)
        obj.PPL398_OpenLed(m_deviceID);
	else if (m_deviceID == 5)
		obj.PPL500_OpenLed(m_deviceID);
}

function jsCloseDevice(ObjectID) {
    var obj = document.getElementById(ObjectID);
    if (m_deviceID == 2)
        obj.PPL398_CloseDevice(m_deviceID);
	else if (m_deviceID == 5)
		obj.PPL500_CloseDevice(m_deviceID);
}

function jsSaveDeviceIamge(ObjectID) {
    var obj = document.getElementById(ObjectID);

    if (m_deviceID == 2) {
        var path = getCurrentDirectory();
        var name = path;
        name = name + "PPDeviceImage.bmp";
        obj.PPL398_SaveDeviceImage(m_deviceID, name);
    } else if (m_deviceID == 5) {
		var path = getCurrentDirectory();
        var name = path;
        name = name + "PPDeviceImage.bmp";
        obj.PPL500_SaveDeviceImage(m_deviceID, name);
    }
}

function jsSaveDeviceData(ObjectID) {
    var obj = document.getElementById(ObjectID);
    if (m_deviceID == 2) {
        var save_select = document.getElementById("writefile");
        var saveindex = save_select.selectedIndex;
        saveindex++;

        var path = getCurrentDirectory();
        var fullname = path;
        fullname += "sample_save.txt";
        obj.PPL398_SaveDeviceData(m_deviceID, fullname, saveindex);
    } else if (m_deviceID == 5) {
		var save_select = document.getElementById("writefile");
        var saveindex = save_select.selectedIndex;
        saveindex++;

        var path = getCurrentDirectory();
        var fullname = path;
        fullname += "sample_save.txt";
        obj.PPL500_SaveDeviceData(m_deviceID, fullname, saveindex);
    }
}

function jsReadDeviceData(ObjectID) {
    var obj = document.getElementById(ObjectID);
    if (m_deviceID == 2) {
        var read_select = document.getElementById("readfile");
        var readindex = read_select.selectedIndex;
        readindex++;

        var path = getCurrentDirectory();
        var fullname = path;
        fullname += "sample_read.txt";
        obj.PPL398_ReadDeviceData(m_deviceID, fullname, readindex);
    } else if (m_deviceID == 5) {
		var read_select = document.getElementById("readfile");
        var readindex = read_select.selectedIndex;
        readindex++;

        var path = getCurrentDirectory();
        var fullname = path;
        fullname += "sample_read.txt";
        obj.PPL500_ReadDeviceData(m_deviceID, fullname, readindex);
    }
}

function jsClearDeviceData(ObjectID) {
    var obj = document.getElementById(ObjectID);
    if (m_deviceID == 2) {
        var delete_select = document.getElementById("ClearDeviceData");
        var deleteindex = delete_select.selectedIndex;
        obj.PPL398_ClearDeviceData(m_deviceID, deleteindex);
    } else if (m_deviceID == 5) {
		var delete_select = document.getElementById("ClearDeviceData");
        var deleteindex = delete_select.selectedIndex;
        obj.PPL500_ClearDeviceData(m_deviceID, deleteindex);
    }
}

var m_ulFormat;
function jsPacketsBase64Encode(ObjectID, ulFormat) {
    var obj = document.getElementById(ObjectID);
    var encodetext = document.getElementById("theTextEncode");

    m_ulFormat = ulFormat;

    // 20160818 Eric
    if (m_deviceID === 1) {
        encodetext.value = obj.PPNature_PacketsBase64Encode(m_deviceID, ulFormat);
    } else if (m_deviceID === 2) {
        encodetext.value = obj.PPL398_PacketsBase64Encode(m_deviceID, ulFormat);
    } else if (m_deviceID === 5) {
    	encodetext.value = obj.PPL500_PacketsBase64Encode(m_deviceID, ulFormat);
    }

    // var bstrEncode;
    // if (m_deviceID == 2)
    // 	bstrEncode = obj.PPL398_PacketsBase64Encode(m_deviceID, ulFormat);
    // if (m_deviceID == 4)
    // 	bstrEncode = obj.PPL10B_PacketsBase64Encode(m_deviceID, ulFormat);
    // else
    // 	bstrEncode = obj.PPNature_PacketsBase64Encode(m_deviceID, ulFormat);

    // var encodetext = document.getElementById("theTextEncode");
    // encodetext.value = bstrEncode;
}

function jsBase64Decode(ObjectID) {
    var obj = document.getElementById(ObjectID);
    var encodetext = document.getElementById("theTextEncode");
    var bstrEncode = encodetext.value;

    if (m_ulFormat == 6) {
        var fullname = "";
        if (m_deviceID == 2)
            obj.PPL398_Base64Decode(m_deviceID, m_ulFormat, bstrEncode, "");
		if (m_deviceID == 5)
			obj.PPL500_Base64Decode(m_deviceID, m_ulFormat, bstrEncode, "");
        else
            obj.PPNature_Base64Decode(m_deviceID, m_ulFormat, bstrEncode, "");

        jsGetDecodePacketsData(ObjectID);
        return;
    }

    var ext = ".bmp";
    if (m_ulFormat == 2)
        ext = ".jpg";
    else if (m_ulFormat == 3)
        ext = ".png";
    else if (m_ulFormat == 4)
        ext = ".gif";
    else if (m_ulFormat == 5)
        ext = ".tiff"

    var path = getCurrentDirectory();
    var fullname = path;
    fullname += "DecodeSign_";
    fullname += generateString(5);
    fullname += ext;
    alert("Save file " + fullname);
    if (m_deviceID == 2)
        obj.PPL398_Base64Decode(m_deviceID, m_ulFormat, bstrEncode, fullname);
	if (m_deviceID == 5)
		obj.PPL500_Base64Decode(m_deviceID, m_ulFormat, bstrEncode, fullname);
    else
        // obj.PPNature_Base64Decode(m_deviceID, m_ulFormat, bstrEncode, fullname);
        obj.PPNature_Base64Decode(m_deviceID, m_ulFormat, bstrEncode, fullname);
    }

function jsGetDecodePacketsData(ObjectID) {
    var obj = document.getElementById(ObjectID);
    var x;
    var y;
    var e;
    var lInkSize;

    // 20160818 17:37 Eric
    if (m_deviceID === 1) {
        lInkSize = obj.PPNature_GetTotalDecodePacketsNumber(m_deviceID);
    } else if (m_deviceID === 2) {
        lInkSize = obj.PPL398_GetTotalDecodePacketsNumber(m_deviceID);
    } else if (m_deviceID === 5) {
    	lInkSize = obj.PPL500_GetTotalDecodePacketsNumber(m_deviceID);
    }

    // if (m_deviceID == 2)
    // 	lInkSize = obj.PPL398_GetTotalDecodePacketsNumber(m_deviceID);
    // if (m_deviceID == 4)
    // 	lInkSize = obj.PPL10B_GetTotalDecodePacketsNumber(m_deviceID);
    // else
    // 	lInkSize = obj.PPNature_GetTotalDecodePacketsNumber(m_deviceID);

    if (lInkSize == -8) {
        window.alert("Ink Empty.");
        return;
    }

    var str = "Idx\t\tX\t\tY\t\tStrokeEnd\n";
    var iCount = 0;
    for (iCount = 0; iCount < lInkSize; iCount++) {
        if (m_deviceID == 2) {
            x = obj.PPL398_GetDecodePacketsData(m_deviceID, iCount, 1);
            y = obj.PPL398_GetDecodePacketsData(m_deviceID, iCount, 2);
            e = obj.PPL398_GetDecodePacketsData(m_deviceID, iCount, 3);
        } else if (m_deviceID == 5) {
			x = obj.PPL500_GetDecodePacketsData(m_deviceID, iCount, 1);
            y = obj.PPL500_GetDecodePacketsData(m_deviceID, iCount, 2);
            e = obj.PPL500_GetDecodePacketsData(m_deviceID, iCount, 3);
        } else {
            x = obj.PPNature_GetDecodePacketsData(m_deviceID, iCount, 1);
            y = obj.PPNature_GetDecodePacketsData(m_deviceID, iCount, 2);
            e = obj.PPNature_GetDecodePacketsData(m_deviceID, iCount, 3);
        }
        str += ("[" + iCount + "]" + "\t\t" + x + "\t\t" + y + "\t\t" + e + "\n");
    }

    var encodetext = document.getElementById("theTextInkData");
    encodetext.value = str;
}

function jsSetSaveCenterImageClip(ObjectID) {
    var obj = document.getElementById(ObjectID);

    var path = getCurrentDirectory();
    var fullname = path + "\\";
    fullname += "DecodeSign";

}

function jsBackToSelectDevice(ObjectID) {
    window.history.go(-1);
}

function generateString(length) {
    var text = "";
    var possible = "0123456789";

    for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
