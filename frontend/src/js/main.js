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

	var  getCookie = function (name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	};

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

	var geoIcon = L.icon({
		iconUrl: '../img/geo-icon.png',
		iconRetinaUrl: 'my-icon@2x.png',
		iconSize: [78, 78],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76]
		/*shadowUrl: 'my-icon-shadow.png',
		shadowRetinaUrl: 'my-icon-shadow@2x.png',*/
		/*shadowSize: [68, 95],
		shadowAnchor: [22, 94]*/
	});

	if ( getCookie(cookie)) {

		L.marker( ).addTo(map);
	}

	map.on('click', function (e) {
		var geoData = JSON.stringify(e.latlng);
		setCookie(cookie, geoData);
		console.log(getCookie(cookie));
		//var myMarker = L.marker([e.latlng.lat, e.latlng.lng], {icon: geoIcon}).addTo(map);
	});
});