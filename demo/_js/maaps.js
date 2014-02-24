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
			map_name = mp.map_name;
			styles = mp.styles;
			center_latitude = mp.center_latitude;
			center_longitude = mp.center_longitude;
			scaleControl = mp.scaleControl;
			scrollwheel = mp.scrollwheel;
			var styledMap = new google.maps.StyledMapType(styles, {name: map_name});
			var mapOptions = {
				zoom: zoom,
				scaleControl: scaleControl,
				scrollwheel: scrollwheel,
				center: new google.maps.LatLng(center_latitude, center_longitude),
			  mapTypeControlOptions: {
			  	mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
			  }
			};
			var map = new google.maps.Map(document.getElementById(wrapper), mapOptions);
			map.mapTypes.set('map_style', styledMap);
			map.setMapTypeId('map_style');
			maps.push(map);
			var just_created = maps.length - 1;
			callback(just_created);
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
				map.panTo(center);
			} else {
				var center = map.getCenter();
			}
		}
	}
})(this);