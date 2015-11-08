$(document).ready(function(){var o=L.map("js-map").setView([43.121,131.923],13),e=new Firebase("https://toshamora.firebaseio.com/nashamoru/");L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",{attribution:'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',maxZoom:18,id:"savelevcorr.cieznawwh00pgtbm1kqpsucl5",accessToken:"pk.eyJ1Ijoic2F2ZWxldmNvcnIiLCJhIjoiY2llem5heHA2MDBxNHQ0bTRsMW55eXdjbiJ9.lgwTaEKIr1Fxc-L57JRFOQ"}).addTo(o);var n=(new L.FeatureGroup,"psg"),a="drvr",l=$(".js-driver-link"),t=$(".js-passenger-link"),r=function(o){var e=document.cookie.match(new RegExp("(?:^|; )"+o.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g,"\\$1")+"=([^;]*)"));return e?decodeURIComponent(e[1]):void 0},c=function(o,e,n){n=n||{};var i=n.expires;if("number"==typeof i&&i){var a=new Date;a.setTime(a.getTime()+1e3*i),i=n.expires=a}i&&i.toUTCString&&(n.expires=i.toUTCString()),e=encodeURIComponent(e);var l=o+"="+e;for(var t in n){l+="; "+t;var r=n[t];r!==!0&&(l+="="+r)}document.cookie=l},d=function(o){c(o,"",{expires:-1})},s=function(){return Math.floor(1e4*Math.random())},p=function(o,n,i){var a,l;e.once("value",function(i){return i.forEach(function(i){a=i.key(),l=i.val();var t=l.bio;"undefined"!=typeof n.bio&&(t=n.bio),l.id===o&&(console.log(t),e.child(a).set({id:o,position:n.position,bio:t},function(o){o?console.log(o):console.log("Updated")}))})})},f=function(o,n){return e.push(o,n())},m=function(o,n){var i;e.once("value",function(e){return e.forEach(function(e){i=e.val(),i.id===o&&n(i.position)})})},u=(r(n),L.divIcon({className:"my-div-icon",iconSize:L.point(32,32)})),v=[];if(r(n)){var g=JSON.parse(r(n));console.log(g.id),m(g.id,function(e){console.log("getuserData called");var n=L.marker([e.lat.toFixed(3),e.lng.toFixed(3)],{icon:u,draggable:!0}).addTo(o);n.on("dragend",function(o){var e=o.target._latlng;p(g.id,{id:g.id,position:e})})}),console.log("WE HAVE COOKIE")}else e.once("value",function(e){console.log("DROW INVALID POEOPLE"),e.forEach(function(e){var n=(e.key(),e.val());if("undefined"!=typeof n.bio)for(var i=JSON.parse(n.bio),a={},l=0;l<i.length;l++)a[i[l].name]=i[l].value;var t=$("#bio-template").html(),r=Handlebars.compile(t),c=r(a);v.push(L.marker([n.position.lat,n.position.lng],{icon:u}).bindPopup("<div>"+c+"</div>",{className:n.id}).addTo(o)),console.log("Driver mod add to map")})}),e.on("child_changed",function(e,n){for(var i=(e.key(),e.val()),a=0;a<v.length;a++)if(v[a]._popup.options.className===i.id){o.removeLayer(v[a]);for(var l=JSON.parse(i.bio),t={},r=0;r<l.length;r++)t[l[r].name]=l[r].value;var c=$("#bio-template").html(),d=Handlebars.compile(c),s=d(t);v[a]=L.marker([i.position.lat,i.position.lng],{icon:u}).bindPopup(s,{className:i.id}).addTo(o),console.log("Driver mod changed")}}),e.on("child_added",function(e,i){if(r(n))console.log("Allready have cookie");else{var a=(e.key(),e.val());if("undefined"!=typeof a.bio)for(var l=JSON.parse(a.bio),t={},c=0;c<l.length;c++)t[l[c].name]=l[c].value;var d=$("#bio-template").html(),s=Handlebars.compile(d),p=s(t);v.push(L.marker([a.position.lat,a.position.lng],{icon:u}).bindPopup(p,{className:a.id}).addTo(o)),console.log("Driver mod added")}});var h;$(t).on("click",function(e){if(r(n))console.log("We have kookie");else{L.layerGroup(v);for(i=0;i<v.length;i++)o.removeLayer(v[i]);d(a),c(n,JSON.stringify({id:s()}));var l;o.once("click",function(e){var i,a=e.latlng,t=JSON.parse(r(n));$("#userinfo").modal("show"),$("#userinfo").on("shown.bs.modal",function(o){$("#userinfoform").on("submit",function(o){$("#userinfo").modal("hide"),l=$(this).serializeArray(),o.preventDefault(),i={id:t.id,position:a,bio:JSON.stringify(l)},f(i,function(){console.log("SEAVED")})})});var c=L.marker([a.lat,a.lng],{icon:u,draggable:!0});c.addTo(o),console.log("New Icon set",c),c.on("dragend",function(o){var e=o.target._latlng;i.position=e,p(t.id,i),console.log(i)})}),h=1,console.log("IN THE IF STATEMENT",h)}e.preventDefault()}),$(l).on("click",function(i){d(n),e.off("child_changed"),e.off("child_added"),o.off("click"),c(a,!0),e.once("value",function(e){e.forEach(function(e){var n=(e.key(),e.val());if("undefined"!=typeof n.bio)for(var i=JSON.parse(n.bio),a={},l=0;l<i.length;l++)a[i[l].name]=i[l].value;var t=$("#bio-template").html(),r=Handlebars.compile(t),c=r(a);v.push(L.marker([n.position.lat,n.position.lng],{icon:u}).bindPopup("<div>"+c+"</div>",{className:n.id}).addTo(o)),console.log("Driver mod add to map")})}),e.on("child_changed",function(e,i){if(r(n));else for(var a=(e.key(),e.val()),l=0;l<v.length;l++)if(v[l]._popup.options.className===a.id){if(o.removeLayer(v[l]),console.log("Yes",v[l]),"undefined"!=typeof a.bio)for(var t=JSON.parse(a.bio),c={},d=0;d<t.length;d++)c[t[d].name]=t[d].value;console.log(c);var s=$("#bio-template").html(),p=Handlebars.compile(s),f=p(c);v[l]=L.marker([a.position.lat,a.position.lng],{icon:u}).bindPopup(f,{className:a.id}).addTo(o),console.log("New Change")}}),e.on("child_added",function(e,i){if(r(n));else{var a=(e.key(),e.val());if("undefined"!=typeof a.bio)for(var l=JSON.parse(a.bio),t={},c=0;c<l.length;c++)t[l[c].name]=l[c].value;console.log(t);var d=$("#bio-template").html(),s=Handlebars.compile(d),p=s(t);v.push(L.marker([a.position.lat,a.position.lng],{icon:u}).bindPopup(p,{className:a.id}).addTo(o)),console.log("New added")}}),i.preventDefault()})});