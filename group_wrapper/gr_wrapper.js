var gr_wrap=function(selector){
	var obj = document.querySelector(selector);
	var arr = Object.keys(obj.children);

	//a.reduce(function(acc,item,index){return acc.push(a.filter(function(el){return (el == item)}))},[]);

  arr.reduce(function(acc, cur, index, arr){
       		console.log(acc,' ',cur,' ',index,' ',arr);

       		if(obj.children[cur].firstChild.dataset.group == )

          acc.push(obj.children[cur].firstChild);
          return acc;

	    }, []);
  console.log(arr);
}