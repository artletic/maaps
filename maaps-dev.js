var maaps = (function(window, undefined) {
	var address, latitude, longitude, type, zoom;
	var maps = [];
	var markers = [];
	return {
		create: function(mp, callback){
			address = mp.address;
			wrapper = mp.wrapper;
			type = mp.service;
			zoom = mp.zoom;
			google.maps.event.addDomListener(window, 'load', maaps.getGeocode(
				function(just_created) {
					callback(just_created);
				}
			));
		},
		getGeocode: function(callback){
			googleGeocoder.geocode( { 'address': address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
		    	latitude = results[0].geometry.location.lat();
					longitude = results[0].geometry.location.lng();
					maaps.make(function(map_length){
						var just_created = map_length;
						callback(just_created);
					});
		    }
			});
		},
		add_marker: function(mkr){
			var map_id = mkr.map_id;
			var content_string = mkr.overlay_content;
			var marker_lat = mkr.latitude;
			var marker_long = mkr.longitude;
			var map = maps[map_id];
			marker = new google.maps.Marker({
			    map:map,
			    draggable:false,
			    animation: google.maps.Animation.DROP,
			    position: new google.maps.LatLng(marker_lat, marker_long)
			});
			var infowindow = new google.maps.InfoWindow({
				content: content_string
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
			infowindow.open(map,marker);
			markers.push(marker)
		},
		center_map: function(map_id, cp){
			var map = maps[map_id];
			if (cp) {
				var center_lat = cp.latitude;
				var center_long = cp.longitude;
				var center = new google.maps.LatLng(center_lat, center_long);
				console.log(center);
				map.panTo(center);
			} else {
				console.log('centering');
				var center = map.getCenter();
				console.log(center);
				map.panTo(center);
			}
		},
		make: function(callback){
			var styles = [
			    {
			    }
			];
			var options = {
				mapTypeControlOptions: {
					mapTypeIds: ['Styled']
				},
				center: new google.maps.LatLng(latitude, longitude),
				zoom: zoom,
				scrollwheel: false,
				navigationControl: false,
				mapTypeControl: false,
				zoomControl: true,
				disableDefaultUI: true,
			};
			var div = document.getElementById(wrapper);
			var map = new google.maps.Map(div, options);
			maps.push(map);
			var map_count = maps.length - 1;
			callback(map_count);
		}
	}
})(this);