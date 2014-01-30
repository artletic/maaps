maaps
=====

Example Usage:


// These Are a few examples of styling options, created as a variable and passed into the map at the point of creation along with the map_parameters.

var styles = [
	{
    stylers: [
      { hue: "#c58430" },
      { saturation: -20 }
    ]
  },{
    featureType: "road",
    elementType: "geometry",
    stylers: [
      { lightness: 100 },
      { visibility: "simplified" }
    ]
  },{
    featureType: "road",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
];

// Here are some of the standard options that maaps uses to create your map.
// Note that styles is a reference to the previously created styles parameters above.

var map_parameters = {
	"address" : "3316 Tejon St. Unit #106  Denver, CO 80211",
	"wrapper" : "googleMap",
	"service" : "google",
	"zoom" : 16,
	"map_id" : "ArtleticMap",
	"map_name" : "Artletic",
	"center_latitude" : "39.763533",
	"center_longitude" : "-105.010884",
	"styles" : styles,
	"scaleControl": false,
	"scrollwheel": false,
}

// This is an example of how the maaps call actually works.
// maaps.create issues parameters to the script and returns the id of the map for further use.
// This is important because if you call the map and then immediately add a marker, for example, there's no way to tell it what map needs the new marker, or whether or not the map exists yet.

var created_map = maaps.create(map_parameters, function(map_id){
	
	// At this point, the map has been created and the id returned as the variable map_id
	// Here, we're going to create a marker and create a popup for when it's clicked.
	// This first bit creates the content for the popup.
	
	var content_string = '<div id="bodyContent" class="info_window_content">'+
	    '<p><a href="https://www.google.com/maps/preview#!q=3316+Tejon+St.+Unit+%23106++Denver%2C+CO+80211&data=!4m15!2m14!1m13!1s0x876c7892efabbee7%3A0x3d887cbadc47b30c!3m8!1m3!1d286661!2d-92.3379275!3d34.724005!3m2!1i1547!2i1049!4f13.1!4m2!3d39.7635328!4d-105.0108845"> Stop by and see us at our&nbsp;Highland&nbsp;office.</a></div>'+
	    '</div>';
	
	// These are the parameters for the new marker, it has things like the id of the map we're targeting, the overlay/popup content, and the latitude and longitude of the marker and popup.
	
	var marker = {
		"map_id" : map_id,
		"overlay_content" : content_string,
		"longitude" : "-105.010884", 
		"latitude" : "39.763533"
	}
	
	// This call actually adds the marker to the map.
	
	maaps.add_marker(marker);

}); // ending of the maaps.create reference.
