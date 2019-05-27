var helper = function() {

  let arrSnaps = [];
  let arrBaseSnap = [];
  let messagesFlag = false;

  const getFlatArr = function(selector = "form > table  input[value]") {
    return _.flatMapDepth(document.querySelectorAll(selector), function(x) {
      return x;
    }, 100);
  };
  const getFlatArrVal = function(selector = "form > table  input[value]") {
    return _.flatMapDepth(document.querySelectorAll(selector), function(x) {
      return x.value;
    }, 100);
  };
  const getFlatArrCon = function(selector = "form > p") {
    return _.flatMapDepth(document.querySelectorAll(selector), function(x) {
      return x.textContent;
    }, 100);
  };

  const createSnap = function(selector) {
    return getFlatArr(selector);
  }
  const createSnapVal = function(selector) {
    return getFlatArrVal(selector);
  }

  const createBaseSnap = function(selector) {
    return getFlatArrCon(selector);
  }

  const saveSnap = function(arr) {
    return arrSnaps.push(arr);
  }

  const saveBaseSnap = function(arr) {
    return arrBaseSnap.push(arr);
  }

  const showSnap = function() {
    _.each(arrSnaps, function(el) {
      console.log(el);
    });
    _.each(arrBaseSnap, function(el) {
      console.log(el);
    });
  }

  const getSnap = function(index) {
    return arrSnaps[index];
  }

  const getBaseSnap = function() {
    // console.log("in getBaseSnap");
    // console.log(arrBaseSnap);
    let buf = arrBaseSnap.pop();
    arrBaseSnap.push(buf);
    return buf;
  }

  const getLastSnap = function() {
    let buf = arrSnaps.pop();
    arrSnaps.push(buf);
    return buf;
  }
  const getFirstSnap = function() {
    let buf = arrSnaps.shift();
    arrSnaps.unshift(buf);
    return buf;
  }
  const delLastSnap = function() {
    return arrSnaps.pop();
  }
  const clearSnap = function() {
    return _.remove(arrSnaps);
  }

  const createMessage = function(arrMsgs, objId) {
    let obj = document.getElementById(objId);
    let child = obj.lastElementChild;
    while (child) {
      obj.removeChild(child);
      child = obj.lastElementChild;
    }

    let msg = document.createElement('div');
    msg.display = 'block';
    msg.style.color = 'blue';
    msg.style.backgroundColor = 'lightgray';
    msg.style.fontFamily = 'sans-seriv';
    msg.style.fontSize = 'small'

    let header = document.createElement('p');
    header.style = 'color: black; font-size: larger; font-weight: bolder; font-family: serif;';
    header.textContent = 'лог изменений';
    msg.append(header);

    let msg_ul = document.createElement('ul');
    arrMsgs.map(function(el) {
      let li = document.createElement('li');
      li.textContent = el;
      msg_ul.append(li);
      return li;
    });
    msg.append(msg_ul);
    let hr = document.createElement('hr');
    msg.append(hr);

    obj.append(msg);
    obj.style.display = 'block';
    return msg;
  }

  const getDiffSnap = function(firstSnap, lastSnap) {
    return _.difference(firstSnap, lastSnap);
  }

  const getDiffHistory = function(firstSnap, lastSnap, baseSnap) {
    let res = [];
    for (let i = 0; i < lastSnap.length; i++) {
      if (firstSnap[i] !== lastSnap[i]) {
        res.push(baseSnap[i] + " : " + firstSnap[i] + " ==> " + lastSnap[i]);
      }
    };
    return res;
  }

  return {
    "arrSnaps": arrSnaps,
    "messagesFlag": messagesFlag,
    "getFlatArr": getFlatArr,
    "getFlatArrVal": getFlatArrVal,
    "createSnap": createSnap,
    "createSnapVal": createSnapVal,
    "createBaseSnap": createBaseSnap,
    "saveSnap": saveSnap,
    "saveBaseSnap": saveBaseSnap,
    "showSnap": showSnap,
    "getSnap": getSnap,
    "getBaseSnap": getBaseSnap,
    "getLastSnap": getLastSnap,
    "getFirstSnap": getFirstSnap,
    "delLastSnap": delLastSnap,
    "clearSnap": clearSnap,
    "createMessage": createMessage,
    "getDiffSnap": getDiffSnap,
    "getDiffHistory": getDiffHistory,
  }
}();
