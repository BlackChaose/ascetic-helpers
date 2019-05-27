var helper = function() {

  let arrSnaps = [];
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

  const createSnap = function(selector) {
    return getFlatArr(selector);
  }
  const createSnapVal = function(selector) {
    return getFlatArrVal(selector);
  }

  const saveSnap = function(arr) {
    return arrSnaps.push(arr);
  }

  const getSnap = function(index) {
    return arrSnaps[index];
  }

  const showSnap = function() {
    _.each(arrSnaps, function(el) {
      console.log(el);
    });
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
    let msg = document.createElement('div');
    msg.display = 'block';
    msg.style.color = 'blue';
    msg.style.backgroundColor = 'lightgray';
    msg.style.fontFamily = 'sans-seriv';
    msg.style.fontSize = 'small'
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
    let obj = document.getElementById(objId);
    obj.append(msg);
    obj.style.display = 'block';
    return msg;
  }

  const getDiffSnap = function(firstSnap, lastSnap) {
    console.warn("Diff: ");
    console.warn(firstSnap, lastSnap);
    return _.difference(firstSnap, lastSnap);
  }

  const getDiffHistory = function(firstSnap, lastSnap) {
    let res = [];
    let resIndex
    for (let i = 0; i < lastSnap.length; i++) {
      if (firstSnap[i] !== lastSnap[i]) {
        res.push(firstSnap[i] + " ==> " + lastSnap[i]);
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
    "saveSnap": saveSnap,
    "getSnap": getSnap,
    "showSnap": showSnap,
    "getLastSnap": getLastSnap,
    "getFirstSnap": getFirstSnap,
    "delLastSnap": delLastSnap,
    "clearSnap": clearSnap,
    "createMessage": createMessage,
    "getDiffSnap": getDiffSnap,
    "getDiffHistory": getDiffHistory,
  }
}();
