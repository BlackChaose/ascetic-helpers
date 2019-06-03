/**
 *required lodash
 *a set of helper methods for tracking form changes
 *by Nikita Kalitin, 2019
 *e-mail: nikita.s.kalitin@gmail.com
 */
;
var helper = function() {
    "use strict";

    /**
     * arrSnaps array of snaps
     * @type {Array}
     */
    var arrSnaps = [];

    /**
     * arrTitleSnap  // array of titles to snaps
     * @type {Array}
     */
    var arrTitleSnap = [];

    /**
     * messagesFlag flag for messages
     * @type {Boolean}
     */
    var messagesFlag = false;

    /**
     * indexes  // array of diffs indexes
     * @type {Array}
     */
    var indexes = [];

    /**
     * titleSnapSelector title for every celectors result
     * @type {String}
     */
    var titleSnapSelector = ''; //selectors 

    var snapSelector = ''; //selectore

    var arrDiffSnapValues = [];

    /**
     * config - config for compare function
     * @type {Object}
     */
    var config = {
        "lastTextView": {
            "color": "blue",
            "wrapTag": "s"
        },
        "newTextView": {
            "color": "green",
            "wrapTag": 'u'
        },
        'graduality': "symbol", //"symbol", "word"
    }

    const setConfig = function(param) {
        config.lastTextView = param;
    };
    /**
     * chkNull autochanges for zero, null, undefined
     * @param  string param
     * @return string 
     */
    const chkNull = function(param) {
        if (param === null || param === undefined || param === NaN) {
            return '';
        } else return param;
    }

    /**
     * compare find difference
     * @param  {String} str1 [description]
     * @param  {String} str2 [description]
     * @return {[type]}      [description]
     */
    const compare = function(str1 = 'NULL', str2 = 'NULL') {
        var arr1 = str1.split("");
        var arr2 = str2.split("");
        var index = 0;
        var acc1 = [];
        var acc2 = [];
        var acc3 = [];

        var maxLen = Math.max(arr1.length, arr2.length);
        var i = 0;
        if (config.graduality === 'symbol') {
            for (i = 0; i < maxLen; i += 1) {
                if (arr1[i] === arr2[i]) {
                    acc1.push(chkNull(arr1[i]));
                    acc2.push(chkNull(arr2[i]));
                    acc3.push(chkNull(arr1[i]));
                } else {
                    acc1.push('<s class="diffString">' + chkNull(arr1[i]) + "</s>");
                    acc2.push('<b class="diffString">' + chkNull(arr2[i]) + "</b>");
                    acc3.push('<s class="diffString">' + chkNull(arr1[i]) + '</s>');
                    acc3.push('<b class="diffString">' + chkNull(arr2[i]) + '</b>');
                }
            }

            var res = [acc1.join(''), acc2.join('')];
        }

        if (config.graduality === 'word') {
            arr1 = str1.split(/(\s)|(,)|(;)|(\?)|(!)|(\.)/g);
            arr2 = str2.split(/(\s)|(,)|(;)|(\?)|(!)|(\.)/g);
            var maxLen = Math.max(arr1.length, arr2.length);
            var i = 0;
            for (i = 0; i < maxLen; i += 1) {
                if (arr1[i] === arr2[i]) {
                    acc1.push(chkNull(arr1[i]));
                    acc2.push(chkNull(arr2[i]));
                    acc3.push(chkNull(arr1[i]));
                } else {
                    acc1.push('<s class="diffString">' + chkNull(arr1[i]) + "</s>");
                    acc2.push('<b class="diffString">' + chkNull(arr2[i]) + "</b>");
                    acc3.push('<s class="diffString">' + chkNull(arr1[i]) + '</s>');
                    acc3.push('<b class="diffString">' + chkNull(arr2[i]) + '</b>');
                }
            }

            var res = [acc1.join(''), acc2.join(''), acc3.join(' ')];
        }


        return res;
    }

    /**
     * get "flat array of DOM objects" by selector
     * @param String selector
     * @return array
     * */
    const getFlatArr = function(selector = "form > table  input[value]") {
        return _.flatMapDepth(document.querySelectorAll(selector), function(x) {
            return x;
        }, 100);
    };

    /**
     * get "flat array of DOM objects's values" by selector
     * @param  String selector
     * @return array
     */
    const getFlatArrVal = function(selector = "form > table  input[value]") {
        return _.flatMapDepth(document.querySelectorAll(selector), function(x) {
            return x.value;
        }, 100);
    };

    /**
     * get "flat array of DOM object's values" by selector
     * @param  String   selector
     * @return array
     */
    const getFlatArrCon = function(selector = "form > p") {
        return _.flatMapDepth(document.querySelectorAll(selector), function(x) {
            return x.textContent;
        }, 100);
    };

    /**
     * getFlatArrValEx extended function - for get flat arrays of values by selectors from array 'listSelectors'
     * @param  {[type]} listSelectors [description]
     * @return {[type]}               [description]
     */
    const getFlatArrValEx = function(listSelectors) {
        var res = [];
        var buf = [];
        var i = 0;
        for (i = 0; i < listSelectors.length; i++) {
            buf = document.querySelector(listSelectors[i]);
            res[i] = buf.value;
        }
        return res;
    }

    /**
     * createSnap of objects, values or content text's by selector
     * @param  string selector
     * @return array
     */
    const createSnap = function(selector) {
        snapSelector = selector;
        return getFlatArr(selector);
    };
    /**
     * createSnapVal
     * @param  string selector
     * @return array
     */
    const createSnapVal = function(selector) {
        snapSelector = selector;
        if (_.isArray(selector)) {
            return getFlatArrValEx(selector);
        } else {
            return getFlatArrVal(selector);
        }
    }

    /**
     * createTitleSnap - create snap of titles-captions for every chooses elements
     * @param  string selector
     * @return array
     */
    const createTitleSnap = function(param) {
        if (_.isArray(param)) {
            arrTitleSnap = param;
        } else {
            titleSnapSelector = param;
            arrTitleSnap = getFlatArrCon(param);
        }
    };

    /**
     * saveSnap save createdSnap
     * @param  array arr
     * @return int length of new array
     */
    const saveSnap = function(arr) {
        return arrSnaps.push(arr);
    };

    /**
     * saveTitleSnap save Titles snap
     * @param  arr
     * @return no
     */
    const saveTitleSnap = function(arr) {
        console.warn(arrTitleSnap);
        console.warn(arr);
        arrTitleSnap.push(arr);
    };

    /**
     * showSnap show Snaps for debug in console log
     * @return no
     */
    const showSnap = function() {
        _.each(arrSnaps, function(el) {
            console.log(el);
        });
        _.each(arrTitleSnap, function(el) {
            console.log(el);
        });
    };

    /**
     * getSnap
     * @param  int index 
     * @return (Array)
     */
    const getSnap = function(index) {
        return arrSnaps[index];
    };

    /**
     * getSnap
     * @param  int index 
     * @return (Array)
     */
    const getTitleSnap = function() {
        var buf = arrTitleSnap.pop();
        arrTitleSnap.push(buf);
        return buf;
    };

    /**
     * getSnap
     * @param  int index 
     * @return (Array)
     */
    const getLastSnap = function() {
        var buf = arrSnaps.pop();
        arrSnaps.push(buf);
        return buf;
    };

    /**
     * getSnap
     * @param  int index 
     * @return (Array)
     */
    const getFirstSnap = function() {
        var buf = arrSnaps.shift();
        arrSnaps.unshift(buf);
        return buf;
    };

    /**
     * getSnap
     * @param  int index 
     * @return (Array)
     */
    const delLastSnap = function() {
        return arrSnaps.pop();
    };

    /**
     * clearSnap removes all data in varables in this context
     * 
     * @return (Array): Returns the new array of removed elements.
     */
    const clearSnap = function() {
        _.remove(arrTitleSnap);
        _.remove(indexes);
        _.remove(arrDiffSnapValues);
        _.remove(snapSelector);
        return _.remove(arrSnaps);
    };

    /**
     * createMessage factory function for create information message
     * @param  (Array) arrMsgs   array of messages
     * @param  (string) objId    obect ID - in string format 
     * @param  (string) headTitle title for Message
     * @param  (string) configMsgBlock styles for messageBlock
     * @return (Object)
     */
    const createMessage = function(arrMsgs, objId, headTitle) {
        var obj = document.getElementById(objId);
        var child = obj.lastElementChild;
        while (child) {
            obj.removeChild(child);
            child = obj.lastElementChild;
        }

        var msg = document.createElement('div');

        var header = document.createElement('p');

        header.textContent = headTitle;
        header.className = 'heads';
        msg.append(header);

        var msg_ul = document.createElement('ul');
        arrMsgs.map(function(el) {
            var li = document.createElement('li');
            li.innerHTML = el;
            msg_ul.append(li);
            return li;
        });
        msg.append(msg_ul);
        var hr = document.createElement('hr');
        msg.append(hr);

        obj.append(msg);
        obj.style.display = 'block';
        return msg;
    };

    /**
     * getDiffSnap get difference beetween firstSnap and lastSnap
     * @param  {[type]} firstSnap [description]
     * @param  {[type]} lastSnap  [description]
     * @return {[type]}           [description]
     */
    const getDiffSnap = function(firstSnap, lastSnap) {
        var res = _.difference(firstSnap, lastSnap);
        arrDiffSnapValues.push(res);
        return res;
    };

    /**
     * getDiffHistory factory function for creating history diff message (caption + oldvalue + newvalue)
     * @param  {[type]} firstSnap [description]
     * @param  {[type]} lastSnap  [description]
     * @param  {[type]} titleSnap [description]
     * @return {[type]}           [description]
     */
    const getDiffHistory = function(firstSnap, lastSnap) {
        var res = [];
        var i = 0;
        var cmpStr = '';
        for (i = 0; i < Math.max(firstSnap.length, lastSnap.length); i += 1) {
            if (firstSnap[i] !== lastSnap[i]) {
                cmpStr = compare(firstSnap[i], lastSnap[i]);
                if (config.graduality === 'word') {
                    res.push(arrTitleSnap[i] + " : " + cmpStr[2]);
                } else if (config.graduality == 'symbol') {
                    res.push(arrTitleSnap[i] + " : " + cmpStr[0] + " ===> " + cmpStr[1]);
                }
                indexes.push(i);
            }
        }
        return res;
    };

    /**
     * specifyModifiedInputs indicate whats DOM's elemetn was changed
     * @return 0
     */
    //@FIXME!здесьнадо пофисксить  - должно остаться только методы для работы со снапами и дифами. 
    //методов для обработки полей нвдо выносить наружу.
    const specifyModifiedInputs = function(selector) {

        if (selector == undefined || (!_.isArray(selector) && selector.length > 0)) {
            console.warn(titleSnapSelector);
            var inputs = document.querySelectorAll(titleSnapSelector);
            console.warn(inputs);
            if (inputs.length > 0) {
                _.each(indexes, function(el) {
                    console.warn("bingo!");
                    console.warn(el);
                    inputs[el].style.border = '3px solid tomato';
                });
            } else {
                console.error("no selected fields for titleSnapSelector");
            }
            return 0;
        } else {
            console.log(snapSelector);
            var inputs = [];
            _.each(snapSelector, function(el) {
                var obj = document.querySelector(el);
                inputs.push(obj);
            });
            _.each(indexes, function(el) {
                inputs[el].style = 'border: 2px solid blue;';
                if (inputs[el].tagName == 'SELECT') {
                    inputs[el].nextElementSibling.style = 'min-width: 244px; border: 2px solid blue; border-radius: 4px;';
                }
            });
        }
        return 0;
    };

    const showDebug = function() {
        console.warn("DebugInfo");
        console.warn("=================================");
        console.debug('arrSnaps');
        console.dir(arrSnaps[0]);
        console.dir(arrSnaps[1]);
        /*  console.log('arrBaseSnap');
         console.warn(arrBaseSnap); */
        console.log('arrDiffSnapValues');
        console.warn(arrDiffSnapValues);
        console.log('arrTitlesSnap');
        console.warn(arrTitlesSnap);
        console.log('indexes');
        console.warn(indexes);
        console.warn("=================================");
    }

    return {
        "arrSnaps": arrSnaps,
        "messagesFlag": messagesFlag,
        "getFlatArr": getFlatArr,
        "getFlatArrVal": getFlatArrVal,
        "createSnap": createSnap,
        "createSnapVal": createSnapVal,
        "createTitleSnap": createTitleSnap,
        "saveSnap": saveSnap,
        "saveTitleSnap": saveTitleSnap,
        "showSnap": showSnap,
        "getSnap": getSnap,
        "getTitleSnap": getTitleSnap,
        "getLastSnap": getLastSnap,
        "getFirstSnap": getFirstSnap,
        "delLastSnap": delLastSnap,
        "clearSnap": clearSnap,
        "createMessage": createMessage,
        "getDiffSnap": getDiffSnap,
        "getDiffHistory": getDiffHistory,
        "specifyModifiedInputs": specifyModifiedInputs,
        "compare": compare,
        "config": config,
    };
}();