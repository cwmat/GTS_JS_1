'use-strict;'

// Global map variable
var map;

require([
  "esri/map",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "dojo/domReady!"], function(Map, ArcGISDynamicMapServiceLayer) {

  // Construct map
  map = new Map("map", {
    basemap: "streets",
    center: [-122.45, 37.75],
    zoom: 13,
    sliderStyle: "small"
  });

  // Add dynamic map service
  var dynamicLayer = new ArcGISDynamicMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/Demographics/USA_Population_Density/MapServer");
  map.addLayer(dynamicLayer);

// End require
});
