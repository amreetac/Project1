FlowerPower = function()
{
	

	var searchButton = $("#searchBtn");

	searchButton.on("click", function() {GetFlkrPhotosByUserId();});

	var photoOffset = 4;
	var photoTable =  $("#photoTable");
	var wikiInfo = $("#wikiInfo");
	var photoTable = $('#image-results');
	var searchValue = $('#searchValue');

	//var searchValues = $("#");

	/*$(".CanBeDragged").draggable({ revert: 'invalid'});

  	//$(".CanDropIn").droppable({accept: '.CanBeDragged' });


  	  	/*$("#origin").droppable({ accept: ".draggable", drop: function(event, ui) {
                    console.log("drop");
                 //  $(this).removeClass("border").removeClass("over");
            // var dropped = ui.draggable;
           // var droppedOn = $(this);
            //$(dropped).detach().css({top: 0,left: 0}).appendTo(droppedOn);
    })});*/

	/*$(".CanDropIn").droppable({accept: '.CanBeDragged'
	      drop: function(event, ui) {
	        alert(this.id);
	      }
	 }); */  


  	/*function handleDropEvent( event, ui ) {
	  var draggable = ui.draggable;
	  alert( 'The square with ID "' + draggable.attr('id') + '" was dropped onto me!' );
	}*/

	IdentifyFlower=function(flowerName){


	}



	HandleDropEvent=function(event, ui){
		var draggable = ui.draggable;
  		dropZone.attr("src",draggable.attr("src"));


  		//crowtoe (lotus corniculatus)

  		var commonName = "daylilies";
  		/*$.ajax({url: "http://garden.vsapi01.com/api-search/by-url?url="+draggable.attr("src")+"&n-results=20&image-origin=web&user-id=dc541307-6bd0-fe2b-16f1-64a61f01049f&apiid=justvisual-demo-id&apikey=justvisul-demo-key",
		method: "GET"
		}).then(
	    function(response) {
	    	console.log(response);
	    	var plantNames = response.images[0].plantNames;
	    	var commonName;
	    	var scienceName;
	    	var index = plantNames.indexOf("(");
	    	if(index > 0){
	    		commonName = plantNames.substring(0, index-1)
	    		scienceName = plantNames.substring(index+1,plantNames.length-2);
	    	}

	    }, function(response) {
	        console.log(response);
	    }, function() {
	        //progress update do something
	    });*/


 			$.ajax({url: "https://en.wikipedia.org/w/api.php?action=opensearch&search=daylilies&limit=1&namespace=0&format=json", method: "GET",dataType: "jsonp"
			}).then(
		    function(response) {
		    	console.log(response);
		    	theResponse = response;
		    	var array=response[3];
		      	var i = 0;
		      	i++;
		    }, function(response) {
		        console.log(response);
		    }, function() {
		        //progress update do something
		    });




	    $.ajax({url: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&explaintext&format=jsonfm&titles=Clematis&format=json&prop=extracts&callback=?",
			method: "GET",
			dataType: "json"
			}).then(
		    function(response) {
		    	console.log(response);
		    	var firstChild;
		    	var unknownName;
		    	var cultivationText;
		    	var node;
		    	var cultivationInfo;
		    	var cultivationSize = 17;

		    	var revisionsParentNode;
		    	if(response === undefined || response === null){

		    	}
		    	if(response.query === undefined || response.query === null){

		    	}
					if(response.query.pages === undefined || response.query.pages === null){

		    	}
				var firstChild = response.query.pages;
				if(firstChild === undefined || firstChild === null){

				}
				var keys = Object.keys(firstChild);
				var wikiText = "";
				if (keys === undefined || keys === null || keys.length < 1){
				   	
				}
				unKnownName = keys[0]; 
				node = firstChild[unKnownName];
				if(node === undefined || node === null){
					
				}
				
				wikiText = node.extract;
				console.log(wikiText);
				var index = wikiText.indexOf("== Cultivation ==");
				if(index > -1){
					cultivationInfo = wikiText.substring(index + cultivationSize);
					console.log(cultivationInfo);
					index = cultivationInfo.indexOf("==");
					cultivationInfo = cultivationInfo.substring(0,index-1);
					cultivationInfo.trim();
					console.log(cultivationInfo);
					wikiInfo.text(cultivationInfo);
				}

	    	//http://garden.vsapi01.com/api-search/by-url?url=http%3A%2F%2Fdemo.justvisual.com%2Fimg%2Fgallery%2FImageGarden2.jpg&n-results=20&image-origin=web&user-id=dc541307-6bd0-fe2b-16f1-64a61f01049f&apiid=justvisual-demo-id&apikey=justvisul-demo-key
		    }, function(response) {
		        console.log(response);
		    }, function() {
		        //progress update do something
		    });





	}

	var dropZone = $("#flower-img");
	dropZone.droppable( {
    	drop: HandleDropEvent
  	});

	GetFlkrPhotosByUserId=function(userId){
		userId = searchValue.val();
		photoTable .empty();
		$.ajax({url: "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=ec5ced9cee7053f8b020c15d45186abd&user_id="+userId+"&format=json&nojsoncallback=1",
					method: "GET"
			}).then(
		    function(response) {
		     	var photoId;
		    	//var totalRows = response.photos.photo.length/4;
		    	//var remainder = response.photos.photo.length%4;
		    	//var rowIndex = 0;
		    	//var cellIndex = 0;
		    	//totalRows =	Math.floor(totalRows);
		    	//for(var j = 0;  j < totalRows; j++){
		    	//	photoTable.append("<tr><td id="+x+"></td><td>Two</td><td>Three</td><td>Four</td></tr>");
		    	//}

		    	/*if(remainder === 1){
		    		photoTable.append("<tr><td>One</td></tr>");
		    	}else if(remainder === 2){
		    		photoTable.append("<tr><td>One</td><td>Two</td></tr>");
		    	}else if(remainder === 3){
		    		photoTable.append("<tr><td>One</td><td>Two</td>td>Three</td></tr>");
		    	}*/
				for(var i = 0; i < response.photos.photo.length; i++){
					var count = 0;


					photoId = response.photos.photo[i].id;
					  $.ajax({url: "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ec5ced9cee7053f8b020c15d45186abd&photo_id="+photoId+"&per_page=3&format=json&nojsoncallback=1",
						method: "GET"
						}).then(
					    function(response) {
					    	console.log(response);
					    	var url = response.sizes.size[1].source;
					    	var index = url.lastIndexOf("/");
					    	var anId = url.substring(index+1);
					    	index = anId.indexOf(".");
					    	anId = anId.substring(0,index);
					    	/*var  image = "<img src="+url+" id="+anId+"></img>";
							document.getElementById("photoTable").rows[rowIndex].cells[cellIndex].innerHTML = image;
							cellIndex++;
							if(cellIndex > 3){
								cellIndex = 0;
								rowIndex++;
							}*/
							var div = $("<div class='col-xs-6 col-md-3'>").addClass("image");
							var atag = $("<a>").addClass("thumbnail").attr('href', "#");
							var img = $('<img>').attr('src', url);
							img.attr("id",anId);
							atag.append(img);
							div.append(atag);
							photoTable.append(div);

					    	var theImage = $("#"+anId);
					    	theImage.draggable({
							      cursor: 'move',
							      revert: true
						    });

					    }, function(response) {
					        console.log(response);
					    }, function() {
					        //progress update do something
					    });

				}
		    }, function(response) {
		        console.log(response);
		    }, function() {
		        //progress update do something
		    });

	}

	GetFlkrPhotosByPhrase=function(phrase){

	}


	SendChat=function(){


						$.ajax({url: "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=ec5ced9cee7053f8b020c15d45186abd&user_id=143381569@N02&format=json&nojsoncallback=1",
								method: "GET"
						}).then(
					    function(response) {
					    	console.log(response);
					    	var id = response.photos.photo[5].id;
							  $.ajax({url: "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ec5ced9cee7053f8b020c15d45186abd&photo_id="+id+"&per_page=3&format=json&nojsoncallback=1",
								method: "GET"
								}).then(
							    function(response) {
							    	console.log(response);
							    			var url = response.sizes.size[5].source;
							    		 	$.ajax({url: "http://garden.vsapi01.com/api-search/by-url?url="+url+"&n-results=20&image-origin=web&user-id=dc541307-6bd0-fe2b-16f1-64a61f01049f&apiid=justvisual-demo-id&apikey=justvisul-demo-key",
											method: "GET"
											}).then(
										    function(response) {
										    	console.log(response);
										    }, function(response) {
										        console.log(response);
										    }, function() {
										        //progress update do something
										    });
							    }, function(response) {
							        console.log(response);
							    }, function() {
							        //progress update do something
							    });

					    }, function(response) {
					        console.log(response);
					    }, function() {
					        //progress update do something
					    });


						
			    		/*$.ajax({url: "http://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&explaintext&format=jsonfm&titles=Dahlia&format=json&prop=extracts&callback=?",
						method: "GET",
						dataType: "json"
						}).then(
					    function(response) {
					    	console.log(response);
					    	var firstChild;
					    	var unknownName;
					    	var cultivationText;

					    	var revisionsParentNode;
					    	if(response === undefined || response === null){

					    	}
					    	if(response.query === undefined || response.query === null){

					    	}
 							if(response.query.pages === undefined || response.query.pages === null){

					    	}
							var firstChild = response.query.pages;
							if(firstChild === undefined || firstChild === null){

							}
							var keys = Object.keys(firstChild);
							var wikiText = "";
							if (keys === undefined || keys === null || keys.length < 1){
							   	
							}
							unKnownName = keys[0]; 
							revisionsParentNode = firstChild[unKnownName];
							if(revisionsParentNode === undefined || revisionsParentNode === null){
								
							}
							if(revisionsParentNode.revisions === undefined || revisionsParentNode.revisions === null || revisionsParentNode.revisions.length < 1){
								
							}
							wikiText = revisionsParentNode.revisions[0];

					    	//http://garden.vsapi01.com/api-search/by-url?url=http%3A%2F%2Fdemo.justvisual.com%2Fimg%2Fgallery%2FImageGarden2.jpg&n-results=20&image-origin=web&user-id=dc541307-6bd0-fe2b-16f1-64a61f01049f&apiid=justvisual-demo-id&apikey=justvisul-demo-key
					    }, function(response) {
					        console.log(response);
					    }, function() {
					        //progress update do something
					    });*/

			/*var fData = new FormData();
			fData.append("myInfo", JSON.stringify({ firstName: "Bilal", lastName: "Haidar" }));
			 
			 $.ajax({
			       type: "POST",
			       data: fData,
			       url: "/DataService.ashx",
			       processData: false,
			       contentType: false,
			       cache: false,
			       dataType: "json",
			 });

			 $.ajax({url: "https://api.clarifai.com/v1/tag/?url=https://samples.clarifai.com/metro-north.jpg", method: "POST",

			}).then(
		    function(response) {
		    	console.log(response);
		    	theResponse = response;
		      	var i = 0;
		      	i++;
		    }, function(response) {
		        console.log(response);
		    }, function() {
		        //progress update do something
		    });*/

		   /*var i = o;
		   i++;

		    $.ajax({url: " http://it.wikipedia.org/w/api.php?action=query&list=search&srsearch=Passion Flower&format=json&srprop=snippet", method: "GET"
			}).then(
		    function(response) {
		    	console.log(response);
		    	theResponse = response;
		      	var i = 0;
		      	i++;
		    }, function(response) {
		        console.log(response);
		    }, function() {
		        //progress update do something
		    });*/

		    //$.ajax({url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ec5ced9cee7053f8b020c15d45186abd&tags=flower&per_page=1&format=json", method: "POST"


		 /* $.ajax({url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ec5ced9cee7053f8b020c15d45186abd&tags=flower&per_page=3&format=json&nojsoncallback=1",
				method: "GET"
		}).then(
	    function(response) {
	    	console.log(response);
	    	var id = response.photos.photo[0].id;
			  $.ajax({url: "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ec5ced9cee7053f8b020c15d45186abd&photo_id="+id+"&per_page=3&format=json&nojsoncallback=1",
				method: "GET"
				}).then(
			    function(response) {
			    	console.log(response);
			    	var url = response.sizes.size[5].source;
			    	
			    	
			    }, function(response) {
			        console.log(response);
			    }, function() {
			        //progress update do something
			    });

	    }, function(response) {
	        console.log(response);
	    }, function() {
	        //progress update do something
	    });*/

	}
}

$(document).ready(function(){
	
	 var fp = new FlowerPower();
})





