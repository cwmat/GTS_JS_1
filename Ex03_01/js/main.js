'use-strict;'

// Global variables
var map,
    defPopSymbol,
    onePopSymbol,
    twoPopSymbol,
    threePopSymbol,
    fourPopSymbol,
    fivePopSymbol;

require([
  "esri/urlUtils",
  "esri/map",
  "esri/tasks/query",
  "esri/tasks/QueryTask",
  "esri/symbols/SimpleFillSymbol",
  "esri/InfoTemplate",
  "dojo/domReady!"], function(urlUtils, Map, Query, QueryTask, SimpleFillSymbol, InfoTemplate) {

  // Proxy
  urlUtils.addProxyRule({
      urlPrefix: "sampleserver1.arcgisonline.com",
      proxyUrl: "http://localhost/arc/proxy.php"
  });

  // Construct map
  map = new Map("map", {
    basemap: "streets",
    center: [-105.498, 38.981],
    zoom: 6,
    sliderStyle: "small"
  });

  // Add polygon symbol
  // defPopSymbol = new SimpleFillSymbol().setColor(new dojo.Color([255, 255, 255, 0]));
  onePopSymbol = new SimpleFillSymbol().setColor(new dojo.Color([255, 255, 128, .85])); //yellow
  twoPopSymbol = new SimpleFillSymbol().setColor(new dojo.Color([250, 209, 85, .85]));
  threePopSymbol = new SimpleFillSymbol().setColor(new dojo.Color([242, 167, 46, .85])); //orange
  fourPopSymbol = new SimpleFillSymbol().setColor(new dojo.Color([173, 83, 19, .85]));
  fivePopSymbol = new SimpleFillSymbol().setColor(new dojo.Color([107, 0, 0, .85])); //dark maroon

  // Query counties
  var queryTask = new QueryTask("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/2");

  var query = new Query();

  query.where = "STATE_NAME = 'Colorado'";
  query.returnGeometry = true;
  // query.outFields = ["POP90_SQMI"];
  query.outFields = ["NAME", "POP90_SQMI", "HOUSEHOLDS", "MALES", "FEMALES", "WHITE", "BLACK", "HISPANIC"];

  queryTask.execute(query, addPolysToMap);

  // Create info window
  resultTemplate = InfoTemplate("County Attributes", "${*}");


// End require
});

// Add polys callback function
function addPolysToMap(featureSet) {
  var features = featureSet.features;
  var feature;
  features.forEach(function(d) {
    // map.graphics.add(d.setSymbol(defPopSymbol));
    attributes = d.attributes;
    pop = attributes.POP90_SQMI;
    if (pop < 10) {
      map.graphics.add(d.setSymbol(onePopSymbol)
        .setInfoTemplate(resultTemplate));
    } else if (pop >= 10 && pop < 95) {
      map.graphics.add(d.setSymbol(twoPopSymbol)
        .setInfoTemplate(resultTemplate));
    } else if (pop >= 95 && pop < 365) {
      map.graphics.add(d.setSymbol(threePopSymbol)
        .setInfoTemplate(resultTemplate));
    } else if (pop >= 365 && pop < 1100) {
      map.graphics.add(d.setSymbol(fourPopSymbol)
        .setInfoTemplate(resultTemplate));
    } else {
      map.graphics.add(d.setSymbol(fivePopSymbol)
        .setInfoTemplate(resultTemplate));
    }
  })

}
