FlowerPower = function()
{
	var searchButton = $("#searchBtn");
	var photoOffset = 4;
	var photoTable =  $("#photoTable");
	var wikiInfo = $("#wikiInfo");
	var photoTable = $("#image-results");
	var searchValue = $("#searchValue");
	var flowerInfo = $("#flower-info");
	var pHead = $("#panel-head");
	var wikiLink =  $("#wiki-link")
	searchButton.on("click", function() {GetFlkrPhotosByUserId();});

	var flowerUrlP1 = "https://garden.vsapi01.com/api-search/by-url?url="
	var flowerUrlP2 = "&n-results=20&image-origin=web&user-id=dc541307-6bd0-fe2b-16f1-64a61f01049f&apiid=justvisual-demo-id&apikey=justvisul-demo-key";
	var wikiGetPageNameUrlP1 =  "https://en.wikipedia.org/w/api.php?action=opensearch&search=";
	var wikiGetPageNameUrlP2  = "&limit=1&namespace=0&format=json"
	var wikiGetPageCommonNamePageUrlP1 =  "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&explaintext&format=jsonfm&titles=";
	var wikiGetPageCommonNamePageUrlP2  = "&format=json&prop=extracts&callback=?"
	var flkrPhraseSearchUrlP1 =  "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ec5ced9cee7053f8b020c15d45186abd&tags=";
	var flkrPhraseSearchUrlP2 =  "&per_page=500&format=json&nojsoncallback=1";
	var flkrIdSearchUrlP1 = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=ec5ced9cee7053f8b020c15d45186abd&user_id=";
	var flkrIdSearchUrlP2 = "&per_page=500&format=json&nojsoncallback=1";

	HandleDropEvent=function(event, ui){

		var draggable = ui.draggable;
  		dropZone.attr("src",draggable.attr("src"));
  		var commonName = "daylilies";
  		$.ajax({url: flowerUrlP1 + draggable.attr("src") + flowerUrlP2,
		method: "GET"
		}).then(
	    function(response) {
	    	try{
		    	var plantNames = response.images[0].plantNames;
		    	var commonName;
		    	var scienceName;
		    	var index = plantNames.indexOf("(");
		    	if(index > 0){
		    		commonName = plantNames.substring(0, index-1)
		    		scienceName = plantNames.substring(index+1,plantNames.length-2);
		    	}else
		    	{
		    		commonName = plantNames;
		    		scienceName = plantNames;
		    	}
		    	if(commonName === scienceName){	
		    		pHead.text("Name = " + commonName);
		    	}else{
		    		pHead.text("Common name = " + commonName + " " + "Science Name = " + scienceName)
		    	}
	    	}catch(ex){
	    		flowerInfo.text("Flower API parse failure.");
	    	}
 			$.ajax({url: wikiGetPageNameUrlP1 + commonName + wikiGetPageNameUrlP2, method: "GET",dataType: "jsonp"
			}).then(
		    function(response) {
		    	try{
			    	theResponse = response;
			    	var url; 
			    	var index;
			    	var title;
			    	var array=response[3];
			    	if(array !== undefined && array !== null && array.length > 0){
			    		url = array[0];
			    		if(url !== undefined && url !== null && url.length > 0){
			    			 wikiLink.attr("href", url)
			    			 wikiLink.text("Wikipedia Link")
			    			 index = url.lastIndexOf("/");
			    			 if(index > -1){
			    			 	title = url.substring(index+1);
			    			 }else{
			    			 	title = response[0];
			    			 }
			    		}
			    		else{
			    			title = response[0];
			    		}
			    	}else{
			    		title = response[0];
			    	}
			    }catch(ex){
	    			flowerInfo.text("Wiki title page look up API parse failure.");
	    		}
		    	$.ajax({url: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&explaintext&format=jsonfm&titles="+title+"&format=json&prop=extracts&callback=?",
					method: "GET",
					dataType: "jsonp"
					}).then(
				    function(response) {
				    	try{
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

							if(wikiText === undefined || wikiText === null){
								
							}

							if(wikiText.indexOf("This is a redirect from a vernacular") > -1){
												$.ajax({url: "https://en.wikipedia.org/w/api.php?action=opensearch&search="+scienceName+"&limit=1&namespace=0&format=json", method: "GET",dataType: "jsonp"
												}).then(
											    function(response) {

											    	console.log(response);
											    	theResponse = response;
											    	var array=response[3];
											    	var url = array[0];
											    	var index = url.lastIndexOf("/");
											    	var title = url.substring(index+1);
											    	 $.ajax({url: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=max&explaintext&format=jsonfm&titles="+title+"&format=json&prop=extracts&callback=?",
														method: "GET",
														dataType: "json"
														}).then(
													    function(response) {
													    	try{
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

																
																if(wikiText === undefined || wikiText === null || wikiText.indexOf("This is a redirect from a vernacular") > -1){
																}
																console.log(wikiText);
																var index = wikiText.indexOf("== Cultivation ==");

																if(index > -1){
																	cultivationInfo = wikiText.substring(index + cultivationSize);
																	console.log(cultivationInfo);
																	index = cultivationInfo.indexOf("==");
																	cultivationInfo = cultivationInfo.substring(0,index-1);
																	cultivationInfo.trim();
																	if(cultivationInfo == ""){
																		index = wikiText.indexOf("==");
																		cultivationInfo = wikiText.substring(0,index-1);
																		cultivationInfo.trim();
																		console.log(cultivationInfo);
																		wikiInfo.text(cultivationInfo);
																	}else{
																		console.log(cultivationInfo);
																		wikiInfo.text(cultivationInfo);
																	}
																}else{
																	index = wikiText.indexOf("==");
																	cultivationInfo = wikiText.substring(0,index-1);
																	cultivationInfo.trim();
																	console.log(cultivationInfo);
																	wikiInfo.text(cultivationInfo);
																}
																flowerInfo.text(cultivationInfo);
															}catch(ex){
																flowerInfo.text("Wiki science name page look up API parse failure.");
															}

												    	//https://garden.vsapi01.com/api-search/by-url?url=http%3A%2F%2Fdemo.justvisual.com%2Fimg%2Fgallery%2FImageGarden2.jpg&n-results=20&image-origin=web&user-id=dc541307-6bd0-fe2b-16f1-64a61f01049f&apiid=justvisual-demo-id&apikey=justvisul-demo-key
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
								}else{
									console.log(wikiText);
									var index = wikiText.indexOf("== Cultivation ==");
									if(index > -1){
										cultivationInfo = wikiText.substring(index + cultivationSize);
										console.log(cultivationInfo);
										index = cultivationInfo.indexOf("==");
										cultivationInfo = cultivationInfo.substring(0,index-1);
										cultivationInfo.trim();
										if(cultivationInfo == ""){
											index = wikiText.indexOf("==");
											cultivationInfo = wikiText.substring(0,index-1);
											cultivationInfo.trim();
											console.log(cultivationInfo);
											wikiInfo.text(cultivationInfo);
										}else{
											console.log(cultivationInfo);
											wikiInfo.text(cultivationInfo);
										}
									}else{
										index = wikiText.indexOf("==");
										cultivationInfo = wikiText.substring(0,index-1);
										cultivationInfo.trim();
										console.log(cultivationInfo);
										wikiInfo.text(cultivationInfo);
									}
									flowerInfo.text(cultivationInfo);
								}
						}catch(ex){
								flowerInfo.text("Wiki common name page look up API parse failure. Name = " + commonName);
						}
			    	//https://garden.vsapi01.com/api-search/by-url?url=http%3A%2F%2Fdemo.justvisual.com%2Fimg%2Fgallery%2FImageGarden2.jpg&n-results=20&image-origin=web&user-id=dc541307-6bd0-fe2b-16f1-64a61f01049f&apiid=justvisual-demo-id&apikey=justvisul-demo-key
				    }, function(response) {
				        console.log(response);
				    }, function() {
				        //progress update do something
				    });
	
		    }, function(response) {
		        flowerInfo.text("Wiki title page look up API parse failure.");
		    }, function() {
		        flowerInfo.text("Wiki title page look up API parse failure.");
		    });

	    }, function(response) {
	        flowerInfo.text("Flower API failure.");
	    }, function() {
	        flowerInfo.text("Flower API failure.");
	    });






	   





	}

	var dropZone = $("#flower-img");
	dropZone.droppable( {
    	drop: HandleDropEvent
  	});


  	

  	IsFlkrId =function(userId){
  		var s = searchValue.val();
  		if(s.match(/^[a-zA-Z0-9@]+$/)){
  			return true;
  		}else{
  			return false;
  		}

  	}

	GetFlkrPhotosByUserId=function(userId){
		var flkrUrl;
		photoTable .empty()
		searchKey = searchValue.val();
		if(IsFlkrId(userId)){
			url = flkrIdSearchUrlP1 +  searchKey + flkrIdSearchUrlP2;
		}else{
			url = flkrPhraseSearchUrlP1 +  searchKey + flkrPhraseSearchUrlP2;
		}
		
		
		//url: +userId+"&format=json&nojsoncallback=1",


		var id = "pretty purple flowers";

		https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ec5ced9cee7053f8b020c15d45186abd&photo_id="+id+"&per_page=3&format=json&nojsoncallback=1

//"https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=ec5ced9cee7053f8b020c15d45186abd&tags=flower&per_page=500&format=json&nojsoncallback=1"


		$.ajax({url: url,
					method: "GET"
			}).then(
		    function(response) {
		     	var photoId;
				for(var i = 0; i < response.photos.photo.length; i++){
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
							var div = $("<div class=\"col-xs-6 col-md-3\">").addClass("image");
							var atag = $("<a>").addClass("thumbnail").attr("href", "#");
							var img = $("<img>").attr("src", url);
							img.attr("id",anId);
							img.css("width", "250px");
							atag.append(img);
							div.append(atag);
							photoTable.append(div);

					    	var theImage = $("#"+anId);
					    	theImage.draggable({
							      cursor: "move",
							      revert: true
						    });

					    }, function(response) {
					        console.log(response);
					    }, function() {
					        //progress update do something
					    });

				}
		    }, function(response) {
		    	
		    }, function() {
		        
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
					    	var id = response.photos.photo[0].id;
							  $.ajax({url: "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=ec5ced9cee7053f8b020c15d45186abd&photo_id="+id+"&per_page=3&format=json&nojsoncallback=1",
								method: "GET"
								}).then(
							    function(response) {
							    	console.log(response);
							    			var url = response.sizes.size[4].source;
							    		 	$.ajax({url: "https://garden.vsapi01.com/api-search/by-url?url="+url+"&n-results=20&image-origin=web&user-id=dc541307-6bd0-fe2b-16f1-64a61f01049f&apiid=justvisual-demo-id&apikey=justvisul-demo-key",
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


