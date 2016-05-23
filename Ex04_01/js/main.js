'use-strict;'

// Global map variable
var map;

require([
  "esri/map",
  "esri/layers/FeatureLayer",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/renderers/SimpleRenderer",
  "esri/InfoTemplate",
  "esri/graphic",
  "dojo/on",
  "dojo/_base/Color",
  "dojo/domReady!"], function(Map, FeatureLayer, SimpleFillSymbol, SimpleLineSymbol, SimpleRenderer, InfoTemplate, Graphic, on, Color) {

  // Construct map
  map = new Map("map", {
    basemap: "streets",
    center: [-122.45, 37.75],
    zoom: 13,
    sliderStyle: "small"
  });

  // Construct feature layer
  var olderStates = new FeatureLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/5", {
    mode: FeatureLayer.MODE_SNAPSHOT,
    outFields: ["STATE_NAME", "MED_AGE", "MED_AGE_M", "MED_AGE_F"]
  });
  olderStates.setDefinitionExpression("MED_AGE > 36");

  // Create symbology
  var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
    new Color([255, 255, 255, 0.35]), 1),
    new Color([125, 125, 125, 0.35]));

  // COnstruct renderer and add layer to map
  olderStates.setRenderer(new SimpleRenderer(symbol));
  map.addLayer(olderStates);

  // Cosntruct info window
  var infoTemplate = new InfoTemplate();
  infoTemplate.setTitle("${STATE_NAME}");
  infoTemplate.setContent("<b>Median Age: </b>${MED_AGE}<br/>" +
                          "<b>Median Age - Male: </b>${MED_AGE_M}<br/>" +
                          "<b>Median Age - Female: </b>${MED_AGE_F}");
  map.infoWindow.resize(245, 125);

  // Create hover effect
  var highlightSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
      new Color([255, 0, 0]),
    new Color([125, 125, 125, 0.35])));

  // Handler mouse over event
  on(olderStates, "mouse-over", function(evt) {
    // Create info window
    console.log(evt);
    // Clear the graphics layer (remove old info window)
    map.graphics.clear();

    // Grab the graphic object from the event geom and set the info window template
    evt.graphic.setInfoTemplate(infoTemplate);

    // Retrieve the attributes (content) from the event geom and set the map's info window content to that content and title
    var content = evt.graphic.getContent();
    map.infoWindow.setContent(content);
    var title = evt.graphic.getTitle();
    map.infoWindow.setTitle(title);

    // Highlight Feature
    var highlightGraphic = new Graphic(evt.graphic.geometry, highlightSymbol);
    map.graphics.add(highlightGraphic);
    map.infoWindow.show(evt.screenPoint, map.getInfoWindowAnchor(evt.screenPoint));
  });

// End require
});
