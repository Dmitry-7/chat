
function sendButtonClick(event){
	event.preventDefault();
	if (userName.value.trim()!='' && userMessage.value.trim()!=''){
		var xhr = new XMLHttpRequest();
		xhr.open('POST','/publish',true);
		xhr.setRequestHeader("Content-type", "application/json");
		xhr.send(JSON.stringify({message:userMessage.value,nickName:userName.value}));
		xhr.onload = function(){
		}
		userMessage.value='';
	} else{
		userMessage.value='';
	}
}


function subscribe(){
	var xhr = new XMLHttpRequest();
	xhr.open('GET','/subscribe',true);
	xhr.onload = function(){
		//console.log(JSON.parse(xhr.responseText));
		renderMessages(JSON.parse(xhr.responseText));
		deleteMaxMessage();
		subscribe()
	}
	xhr.onerror = function(){
		console.log('error: ' + xhr.responseText);
		setTimeout(subscribe, 500);
	}
	xhr.onabort = function(){
		console.log('abort: ' + xhr.responseText);
		setTimeout(subscribe, 500);
	}
	xhr.send();
}

function renderMessages(responseText){
	responseText.forEach( function(elem) {
		//console.log(elem);
		var newLi = document.createElement('li');
		newLi.innerHTML = elem.nickName+':'+elem.message;
		messagesWindow.appendChild(newLi);
	});
	messagesWindow.scrollTo(0,messagesWindow.scrollHeight);
}

function deleteMaxMessage(){
	var messagesItems = document.querySelectorAll('.messages li');
	if(messagesItems.length>maxNumberOfMessages){
		for(var i=0;i<(messagesItems.length-maxNumberOfMessages);i++){
			console.log(messagesItems[i].innerHTML);
			messagesItems[i].remove();
		}
	}
}

var maxNumberOfMessages = 50;
var userMessage = document.querySelector('.userMessage');
var sendButton = document.querySelector('.sendButton');
var messagesWindow = document.querySelector('.messages');
var userName = document.querySelector('.userName');

sendButton.addEventListener('click',sendButtonClick);

subscribe();