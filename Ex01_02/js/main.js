'use-strict;'

// Global map variable
var map;

require(["esri/map", "dojo/domReady!"], function(Map) {
  // Construct map
  map = new Map("map", {
    basemap: "topo",
    center: [-122.45, 37.75],
    zoom: 13,
    sliderStyle: "small"
  });

// End require
});
