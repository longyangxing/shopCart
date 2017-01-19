window.onload = function(){
	var item_i = document.getElementsByClassName('item_i');
	var totalCount = document.getElementById('totalCount');
	var totalPrice =document.getElementById('totalPrice');
	var checkAll = document.getElementsByClassName('checkAll check');
	var check = document.getElementsByClassName('check');
	var deleteAll = document.getElementById('deleteAll');
	var selected = document.getElementById('selected');
	var cart_footer = document.getElementById('cart_footer');
	var selectedView = document.getElementById('selectedView');

	//每一商品行小计
	function getSubTotal(item){
		var count_input = parseInt(item.getElementsByClassName('count_input')[0].value);
		var price = parseFloat(item.getElementsByClassName('price')[0].innerHTML).toFixed(2);
		item.getElementsByClassName('subTotal')[0].innerHTML = (count_input*price).toFixed(2);
	}

	//商品列表事件委托
	for( var i = 0; i < item_i.length; i++){
		item_i[i].onclick = function (event){
			var event = event || window.event;
			var target = event.target || event.srcElement;
			var count_input = this.getElementsByClassName('count_input')[0];
			var val = parseInt(count_input.value);
			switch(target.className){
				case 'add':
					count_input.value = val+1;
					getSubTotal(this)
					break;
				case 'reduce':
					count_input.value = val-1;
					if(count_input.value <=1){
						count_input.value = 1;
					}
					getSubTotal(this)
					break;
				case 'delete':
					var conf = confirm('确认删除商品吗？');
					if(conf){
						this.parentNode.removeChild(this);
					}
					break;
				default:
					break;
			}
		getTotal()
		}
	}

	//总计
	function getTotal(){
		var tCount = 0;
		var tPrice = 0;
		var HTMLstr = '';
		for( var i = 0; i < item_i.length; i++){
		 	var itemCheck = item_i[i].getElementsByClassName('check')[0];
		 	if(itemCheck.checked){
		 		 tCount += parseInt(item_i[i].getElementsByClassName('count_input')[0].value);
		 		 tPrice += parseFloat(item_i[i].getElementsByClassName('subTotal')[0].innerHTML);
		 		 HTMLstr += '<div><img src="'+item_i[i].getElementsByTagName('img')[0].src+'"><span class="del" index="'+i+'">×</span></div>';
		 	}
		}
		totalPrice.innerHTML = tPrice.toFixed(2);
		totalCount.innerHTML = tCount;
		selectedView.innerHTML = HTMLstr;
	}

	//选择框逻辑
	for( var i = 0; i <check.length; i++){
		check[i].onclick = function(event){
			var event = event || window.event;
			var target = event.target || event.srcElement;
			if( target.className === 'checkAll check'){
				for( var j = 0; j < check.length; j++){
					check[j].checked = this.checked;
				}
			}
			//使用check[i]会造成闭包
			if( !this.checked){
				for( var k = 0; k < checkAll.length; k++){
					checkAll[k].checked = false;
				}
			}
			getTotal()
		}
	}

	//删除全部
	deleteAll.onclick = function(){
		var conf = confirm('确定删除全部商品吗？');
		for( var i = 0; i < item_i.length; i++){
			if( conf ){
				item_i[i].parentNode.removeChild(item_i[i]);
				}
			i--;
		}
	}
	//已选商品显示
	selected.onclick = function(){
		cart_footer.className = cart_footer.className == "show" ? '':'show';
	}
	//已选商品删除
	selectedView.onclick = function(){
		var event = event || window.event;
		var target = event.target || event.srcElement;
		if( target.className == 'del'){
			var index = target.getAttribute('index');
			item_i[index].getElementsByClassName('check')[0].checked = false;
		}
		getTotal();
	}

	checkAll[0].checked = true;
	checkAll[0].onclick()
	getTotal()
}