const diffSnap = function(lastSnap, newSnap) {

      let a = _.flatMap(lastSnap);
      let b = _.flatMap(newSnap);
      console.log(a);
      console.log(b);
      console.log("==> eq: ")
      return _.isEqual(a,b);

};
