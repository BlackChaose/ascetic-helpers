var gr_wrap = function (selector) {
  var obj = document.querySelector(selector)
  let res2 = _.groupBy(obj.children, function(a){return a.firstChild.dataset.group;});
  console.log(res2);

 let o2 = _.mapKeys(res2,function(el, key){
    let domEl = document.createElement('ul');
    console.log(key);
    console.log(el);
    domEl.textContent = key;
    domEl.append(_.map(el,function(item){
      return item.firstChild;
    }));
    return domEl;
  });
  console.log(o2);
  obj.append(o2);
}