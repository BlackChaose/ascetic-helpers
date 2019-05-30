/**
*required lodash
*a set of helper methods for tracking form changes
*by Nikita Kalitin, 2019
*e-mail: nikita.s.kalitin@gmail.com
*methods for find and indicate diff in stirngs
*/
;var helperDiff = function() {

  const chkNull = function(param){
  	if(param === null || param === undefined || param === NaN){
  		return '';
  	}
  	else return param;
  }

  const compare = function(str1='NULL', str2='NULL'){
  	let arr1 = str1.split("");
  	let arr2 = str2.split("");
  	let index = 0;
  	let acc1 = [];
  	let acc2 = [];
  	let maxLen = Math.max(arr1.length, arr2.length);

  	for (let i =0; i < maxLen; i++){
  		if(arr1[i] === arr2[i]){
  			acc1.push(chkNull(arr1[i]));
  			acc2.push(chkNull(arr2[i]));
  		}else{
  			acc1.push('<s class="diffString">' + chkNull(arr1[i]) + "</s>");
  			acc2.push('<b class="diffString">' + chkNull(arr2[i]) + '</b>');
  		}
  	}

  	let res = [acc1.join(''), acc2.join('')];

 			console.log("<hr>---------------------------------------------------------");  		
 			console.log(res)
 			console.log("<hr>---------------------------------------------------------");  		

  	return res;
  }	

  return {
  	"compare": compare,
  }
}();