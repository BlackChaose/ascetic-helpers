				if (!(org_info['ERROR1'] || org_info['ERROR2'])) {
					newSnap = getFlatArr();
					let dif = _.difference(lastSnap, newSnap);
					let cnt_dif = _.size(dif);
					_.flatMap(dif, function(el) {
						let element = document.querySelector("[value=\"" + el + "\"]");
						let arrow = document.createElement('img');
						arrow.src = '/img/updateArrows.svg';
						arrow.className = 'updateArrows';
						element.parentNode.append(arrow);
					});

					let messageBox = document.getElementById("messageInfo");

					let p1 = document.createElement('p');
					p.textContent = 'Ответ от сервера был получен. Кол-во изменений: ' + cnt_dif;
					p.className = "heads";

					let hr = document.createElement('hr');
					messageBox.append(p);

					let list = document.createElement('ul');
					messageBox.append(hr);

					_.flatMap(dif, function(el) {
						let listElement = document.createElement('li');
						listElement.textContent = el;
						list.append(listElement);
					});

					messageBox.append(list);
					messageBox.append(hr);

					messageBox.style.display = 'block';