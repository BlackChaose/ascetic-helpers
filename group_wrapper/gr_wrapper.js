var gr_wrap=function(selector){
	var obj = document.querySelector(selector);
	let grupped=[];
	let markers=[];
	let ungrupped=[];
	let tmp=[];
	let res=[];
			
	Object.keys(obj.children).forEach(function(index){			
		//console.log(obj.children[index])
		tmp.push(obj.children[index].children[0]);
		})
		
	console.log(tmp);	

	tmp.forEach(function(el){
		if(el.dataset.group != ""){
			grupped.push(el);
			}
		else {
			ungrupped.push(el);
			}			
		});
	console.log(grupped, ungrupped);
	
	markers=grupped.map(function(el){
		return el.dataset.group;
		})
		.filter(function(el,i,a){
		return (i==a.indexOf(el));
		});
	console.log(markers);

	markers.map(function(el){
		res.push(grupped.filter(function(e){
			return (e.dataset.group == el);
			}))
		});
	//todo add sort	
	res.push(ungrupped);
	console.log(res);
	
	//obj.innerHTML='';
			
	res.map(function(el){
		if(el[0].dataset.group != ""){
			el.map(function(item){
				let li = document.createElement('li');
				let input = document.createElement('input');
				//<li><input type="checkbox" name="sms_agree" data-type="option" --><?//= ($data[0])?"checked": NULL ?><!--/>Получать уведомления по СМС</li>-->
				input.type="checkbox";
				input.dataset.name="noname";
				input.dataset.group=item.dataset.group;
				input.textContent = "";
				li.append(input);
				li.textContent = item.dataset.group;
				obj.append(li);
				});
			}
		})
	
/*	res.push(grupped.filter(function(el){
		if(
		}));	*/
	
}
