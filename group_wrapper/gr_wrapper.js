var gr_wrap = function (selector) {
  var obj = document.querySelector(selector)
  var arr = []
  console.log(obj)
  Object.keys(obj.children).forEach(function (index) {
    arr.push(obj.children[index])
  })
  //a.reduce(function(acc,item,index){return acc.push(a.filter(function(el){return (el == item)}))},[]);

  console.log(arr)

  // var res = arr.reduce(function (acc, cur, index, arr) {
  //
  //   acc.push(arr.filter(function (el) {
  //     return (_.isEqual(el,cur) );
  //   }))
  //   return acc
  //
  // }, [])

  let res = _.reduce(obj.children,function(acc,item){
    console.log(item.firstChild.dataset.group);

    acc.push(_.filter(obj.children,function(el){return el.firstChild.dataset.group === item.firstChild.dataset.group }));

    return acc;
  }, []);

  res = _.clone(_.filter(res,function(a,b){return !_.isEqual(a,b) }));

  console.log(res[0]);
  console.log(res[7]);
  console.log(_.isEqual(res[0],res[7]));
  console.log(res)
}