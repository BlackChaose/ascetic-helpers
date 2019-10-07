var gr_wrap = function (selector) {
  var obj = document.querySelector(selector)
  let res2 = _.groupBy(obj.children, function(a){return a.firstChild.dataset.group;});
  _.map(res2,function(el,key,res2){
    let fdSet = document.createElement('fieldset');
    let legend = document.createElement('legend');
    if(key !== ""){
      legend.textContent = key;
    }else if(key == ""){
      legend.textContent = 'опции:';
    }
    fdSet.append(legend);
    _.map(el,function(item){ fdSet.append(item);});
    obj.append(fdSet);
  });
}