$(document).ready(function () {
	
	var map = L.map('js-map').setView([43.121, 131.923], 13);
	

	// Connect to firebase
	var ref = new Firebase('https://toshamora.firebaseio.com/nashamoru/');

	// Init map
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'savelevcorr.cieznawwh00pgtbm1kqpsucl5',
		accessToken: 'pk.eyJ1Ijoic2F2ZWxldmNvcnIiLCJhIjoiY2llem5heHA2MDBxNHQ0bTRsMW55eXdjbiJ9.lgwTaEKIr1Fxc-L57JRFOQ'
	}).addTo(map);

	var markers = new L.FeatureGroup();

	// Variables for cookies
	var passenger = "psg";
	var driver = "drvr";

	var cookieOptions = {
		expire: 3600,
		path: '/',
		secure: false
	};

	//Caching jq elements
	var driverLink = $(".js-driver-link");
	var passengerLink = $(".js-passenger-link");

	/**
	 * Get Cookie by name
	 * @param name {string}
	 * @returns {*}
	 */
	var getCookie = function (name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	};

	/**
	 *
	 * @param name {string}
	 * @param value {string|object}
	 * @param options {object|undefined}
	 */
	var setCookie = function (name, value, options) {
		options = options || {};

		var expires = options.expires;

		if (typeof expires == "number" && expires) {
			var d = new Date();
			d.setTime(d.getTime() + expires * 1000);
			expires = options.expires = d;
		}
		if (expires && expires.toUTCString) {
			options.expires = expires.toUTCString();
		}

		value = encodeURIComponent(value);

		var updatedCookie = name + "=" + value;

		for (var propName in options) {
			updatedCookie += "; " + propName;
			var propValue = options[propName];
			if (propValue !== true) {
				updatedCookie += "=" + propValue;
			}
		}

		document.cookie = updatedCookie;
	};

	var deleteCookie = function (name) {
	  setCookie(name, "", {
	    expires: -1
	  });
	};

	/**
	* 
	* return {number}
	*/
	var generateUserId = function () {
		return Math.floor((Math.random() * 10000))
	};

	// Set icom on the map by click
	var setIcon = function (position) {
			return L.marker([position.lat, position.lng], {icon: myIcon, draggable: true }).addTo(map);
	};

	// update geo and bio info to database
	var updateUserData = function (id, newData, callback) {
		var key,
			data;
		ref.once("value", function(snapshot) {
			return snapshot.forEach(function(childSnapshot) {
				key =  childSnapshot.key()
				data = childSnapshot.val();

			    if (data.id === id) {
			    	console.log(key);
			    	/*ref.update({key: {position: newData}}, function (error) {
			    		if(error) {
			    			console.log(error);
			    		} else {
			    			console.log("Updated")
			    		}
			    	});*/
					ref.child(key).set({"id": data.id, position: newData}, function (error) {
			    		if(error) {
			    			console.log(error);
			    		} else {
			    			console.log("Updated")
			    		}
			    	});
			    }

			});
		});
	};

	// Save geo and bio info to database
	var saveUserData = function (data, callback) {
		return ref.push(data, callback());
	};

	var getUserData = function (id, callback) {
		var data,
	    	position;

		ref.once("value", function(snapshot) {
			return snapshot.forEach(function(childSnapshot) {
			   data = childSnapshot.val();

			    if (data.id === id) {
			    	callback(data.position);
			    }

			});
		});
	};

	var updateForDraivers = function (id, callback) {
		var data,
	    	position;

		ref.once("value", function(snapshot) {
			return snapshot.forEach(function(childSnapshot) {
			   data = childSnapshot.val();

			    if (data.id === id) {
			    	callback(data);
			    }

			});
		});
	};

	// getting all the markers at once
	var getAllMarkers = function () {

	    map.removeLayer(markers);

	}

	var setNewPlace = function (e) {
		var currentPosition = e.latlng;
		var that = this;
		map.removeLayer(that);
	};

	// Create icon template
	var iconId = getCookie(passenger);
	var myIcon = L.divIcon({className: 'my-div-icon',  iconSize: L.point(32, 32)});
	var marker=[];

	if ( getCookie(passenger) ){
		var userData = JSON.parse( getCookie(passenger) );

		console.log(userData.id);

		var currentMarker = getUserData(userData.id, function (position) {

			console.log("getuserData called");
			currentMarker = L.marker([position.lat.toFixed(3), position.lng.toFixed(3)], {icon: myIcon, draggable: true }).addTo(map);
			currentMarker.on('dragend', function (e) {
				var newData = e.target._latlng;
				updateUserData(userData.id, newData);
			});
		});


		console.log("WE HAVE COOKIE");
	} else {
		
		/* checkout to driver and get all data */
		ref.once("value", function(snapshot) {
		
			console.log("DROW INVALID POEOPLE");

			snapshot.forEach(function(childSnapshot) {

					// foreach for child element 'shamora'
					var key = childSnapshot.key();
					// childData will be the actual contents of the child
					var childData = childSnapshot.val();
				  


					marker.push(L.marker([childData.position.lat, childData.position.lng], {icon: myIcon, draggable: true })
						.bindPopup("<div>"+ childData.bio +"</div>", {className: childData.id})
				  	  	.addTo(map));

			  });
		  
		});


		ref.on('child_changed', function (childSnapshot, prevChildKey) {
			// foreach for child element 'shamora'
			var key = childSnapshot.key();
			// childData will be the actual contents of the child
			var childData = childSnapshot.val();

			for (var i =0; i < marker.length; i++) {
				if ( marker[i]._popup.options.className === childData.id ) {
					map.removeLayer(marker[i]);
					console.log("Yes", marker[i]);

					marker[i] = L.marker([childData.position.lat, childData.position.lng], {icon: myIcon, draggable: true })
						.bindPopup("<div> Пока! </div>", {className: childData.id})
				  	  	.addTo(map)
				} else {
					
				}
			}
		})
	}

	var cnt;
	// Remove all icons from map
	$(passengerLink).on('click', function (e) {

		var allMarkers = L.layerGroup(marker);
		console.log(allMarkers);
		
		for(i=0;i<marker.length;i++) {
			map.removeLayer(marker[i]);
		}  
		e.preventDefault();

		

		/*$('.my-div-icon').remove();*/
		map.removeLayer(markers);
		
		setCookie(passenger, JSON.stringify({"id": generateUserId()}));
		
		var formData;
		
			

		if(typeof cnt === 'undefined') {
			map.once('click', function (e) {
			
			var position = e.latlng;
				var userId = JSON.parse( getCookie(passenger) )
				var userData;
			
			
				/* modal when seaved lgt data*/
				$('#userinfo').modal('show');
				$('#userinfo').on('shown.bs.modal', function (event) {
					$( "#userinfoform" ).on( "submit", function( event ) {
						  $('#userinfo').modal('hide');
						  formData = $( this ).serializeArray();
						  event.preventDefault();
						 userData = {								
							"id":  userId.id,
							"position": position,
							"bio": JSON.stringify(formData)				
						 };
						 saveUserData(userData, function () {
						  console.log("SEAVED", userId.id);
						});
					});
					
				});
			
				

				var newIcon = setIcon(position);
				//saveUserData(userData, function () {
					//console.log("SEAVED", userId.id);
				//});

				newIcon.on('dragend', function (e) {
					var newData = e.target._latlng;
					updateUserData(userId.id, newData);
				});
			});

			cnt = 1;

			console.log("IN THE IF STATEMENT", cnt);
		} else {
			map.off('click');
		}

		e.preventDefault();
	});
	
});