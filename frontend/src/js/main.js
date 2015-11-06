$(document).ready(function () {
	var map = L.map('js-map').setView([43.121, 131.923], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'savelevcorr.cieznawwh00pgtbm1kqpsucl5',
		accessToken: 'pk.eyJ1Ijoic2F2ZWxldmNvcnIiLCJhIjoiY2llem5heHA2MDBxNHQ0bTRsMW55eXdjbiJ9.lgwTaEKIr1Fxc-L57JRFOQ'
	}).addTo(map);

	var cookie = "psg";

	var cookieOptions = {
		expire: 3600,
		path: '/',
		secure: false
	};

	/**
	 * Get Cookie by name
	 * @param name {string}
	 * @returns {*}
	 */
	var  getCookie = function (name) {
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

	var generateUserId = function () {
		return Math.floor((Math.random() * 100))
	};

	var setIcon = function (cnt) {
		if(cnt !== 1) {
			map.on('click', function (e) {
				L.marker([e.latlng.lat, e.latlng.lng], {icon: myIcon}).addTo(map);
				var userData = {
					id: generateUserId(),
					position: e.latlng
				};

				setCookie(cookie, JSON.stringify(userData));
			});
		}
		cnt = 1;
	};

	/*var geoIcon = L.icon({
		iconUrl: '../img/geo-icon.png',
		iconRetinaUrl: 'my-icon@2x.png',
		iconSize: [78, 78],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76]
		/!*shadowUrl: 'my-icon-shadow.png',
		shadowRetinaUrl: 'my-icon-shadow@2x.png',*!/
		/!*shadowSize: [68, 95],
		shadowAnchor: [22, 94]*!/
	});*/

	var myIcon = L.divIcon({className: 'my-div-icon'});

	if ( getCookie(cookie) ){
		var userData = JSON.parse( getCookie(cookie) );

		console.log(getCookie(cookie));
		L.marker([userData.position.lat.toFixed(3), userData.position.lng.toFixed(3)], {icon: myIcon}).addTo(map);
	} else {
		var cnt;
		setIcon(cnt);
	}

	map.on('click', function (e) {
		L.marker([e.latlng.lat, e.latlng.lng], {icon: myIcon}).addTo(map);
		console.log(myIcon);
	});
});