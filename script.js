const gallery = document.getElementById('gallery-item');
const tagdata = document.getElementById('tag-data');
var htmlStr = "";
var ran_tagName = null;

// Create an array of common tag keywords
var arr_tag = ['island','city','hamster','rabbit','bear','elephant'];

// Create buttons for use to click
var htmlStr_btn = '';
for( var i=0; i<arr_tag.length; i++ ){
	htmlStr_btn += '<button type="submit" class="buttonPic" id="'+arr_tag[i]+'" onclick="onClickBtn(this)">'+arr_tag[i]+'</button>';
}
htmlStr_btn += '';
tagdata.innerHTML = htmlStr_btn;

// Get random tag
ran_tagName = randomTagGenerator(arr_tag);

// fetch posts tagged with keyword
getAPIData(ran_tagName);

// Function - randomtag generator	
function randomTagGenerator(arr_tag){
	var idx = Math.floor((Math.random() * arr_tag.length) + 0);
	var tagName = arr_tag[idx];
	return tagName;
}

// Function - Display photos to user
function distributeImage(data){
	data = data.response;
	var htmlImage = "";
	var photoCounter = 0;

	for( var i=0; i<data.length; i++ ){
		// Display only photo because API returns other data, for eg: text, audio
		if( data[i].type != "photo" ){
			continue;
		}

		// Provide 4 different answers for user to guess
		if( photoCounter > 3 ){
			break;
		}
		photoCounter++;

		for( var j=0; j<data[i].photos.length; j++ ){
			var photoURL = data[i].photos[j].original_size.url;
			htmlImage += '<img src="'+photoURL+'">';
		}
	}

	gallery.innerHTML = htmlImage;
}

// Function - use API to get tagged photos 
function getAPIData(tagName){
	fetch('https://api.tumblr.com/v2/tagged?tag=' + tagName + '&api_key=VqsLujS4lmieUHuWZyJAFLpVMFf4YmDh3Oc60cDXTapmrzJj0N')
	.then(
		function(response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' + response.status);
				return;
			}

			// Examine the text in the response
			response.json().then(function(data) {
				// console.log(data);
				// Display photos to user
				distributeImage(data);
			});
		}
	)
	.catch(function(err) {
		console.log('Fetch Error :-S', err);
		return;
	});
}

// Function - check if answer correct or not
function onClickBtn(_this){
	var tagName = _this.getAttribute("id");
	
	if( ran_tagName == tagName ){
		alert( "You are too cool for school!" );
	}else{
		alert( "Sorry, you are wrong. The correct answer is " + ran_tagName );
	}

	// Reset the game
	resetGame();
}

// Function - to refresh page
function resetGame(){
	location.reload();
}

/*Exercise Checklist
Create an array of common tag keywords

Randomly select a keyword and fetch posts tagged with keyword

Display photos to user

Ask user to guess what the common tag keyword for the photos are

Provide 4 different answers for user to guess

If user guesses the right tag keyword, reset game starting from step 2

If user guesses the wrong tag keyword, show the correct answer and reset game from step 2*/