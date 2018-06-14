var el = document.getElementById('signpad')

function init() {

  // window.onunload = PPL398_UnInitialDevice(2)

  if (!!!el.PPL398_GetProtectValidStatus(2)) {
    alert('设备不可用')
    return false
  }

  if (el.PPL398_InitialDevice(2, 0, 0, 400, 250) !== 0) {
    // alert('初始化失败')
    location.reload(true)
    return false
  }

  // console.log(el.PPL398_GetHWPadID(2))
  // console.log(el.PPL398_GetHWPenID(2))
  // console.log(el.PPL398_GetHWVersionID(2))

  // if (el.PPL398_SetPenColor(2, 0, 0, 0) !== 0) { console.log('设定画笔颜色失败：') }

  if (el.PPL398_SetPenStyle(2, 0) !== 0) {
    alert('设定画笔种类失败')
    return false
  }

  if (el.PPL398_SetPenWidth(2, 1) !== 0) {
    alert('设定画笔宽度失败')
    return false
  }

  if (el.PPL398_SetSaveCenterImageClip(2, 1, 16, 16) !== 0) {
    alert('设定笔迹边界失败')
    return false
  }

  setTimeout(function() {
    var result = el.PPL398_SignatureStatusCallback(2, 'eventCallback');
  }, 100);
}

function eventCallback(event) {
  if (event === '1') {
    var b64Enc = el.PPL398_PacketsBase64Encode(2, 3)
    el.PPL398_Clear(2)
    document.getElementById('result').setAttribute('src', 'data:image/png;base64,' + b64Enc)
  } else if (event === '0') {
    el.PPL398_Clear(2)
  } else {}
}
