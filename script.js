mapboxgl.accessToken =
  "pk.eyJ1IjoianBlZ21vdW50YWlubWFuIiwiYSI6ImNsMDMxMG9hZTBmeHAzZG1tOTd2NWxhZnkifQ.aXMcmbPG90l2w8KFx8E2RA";
const map = new mapboxgl.Map({
  container: "map", // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: "mapbox://styles/jpegmountainman/cla5wix8s000214l3pe8h6vya", // style URL
  center: [-99.60554664374831, 41.478777848167454], // starting position [lng, lat]
  zoom: 5.9, // starting zoom
  projection: "globe", // display the map as a 3D globe
  customAttribution: "Civic Nebraska",
});

const legend = document.getElementById("state-legend");
const legend2 = document.getElementById("poverty-legend");
const legend3 = document.getElementById("voter-turnout");
const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");
const layeridP = "cla5wix8s000214l3pe8h6vya";
const layeridM = "cla1p8oxf000f14o4armz7occ";
const scatterPlot = document.getElementById("scatter-plots");

map.on("load", () => {
  function load_home() {
    scatterPlot.innerHTML =
      '<object type="text/html" data="BP_PS.html" ></object>';
  }
});

const nav = new mapboxgl.NavigationControl({
  visualizePitch: true,
});

const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
});

map.addControl(geocoder, "top-left");

map.addControl(nav, "top-right");

map.on("load", () => {
  map.addSource("voting", {
    type: "geojson",
    data: "voter_turnout.geojson",
  });

  map.addLayer({
    id: "voting",
    type: "fill",
    source: "voting",
    paint: {
      "fill-color": "red",
      "fill-opacity": 0,
    },
  });
});

let popup = new mapboxgl.Popup({
  offset: [0, -7],
  closeButton: false,
  closeOnClick: false,
});

for (const input of inputs) {
  input.onclick = (layer) => {
    console.log(layer);
    const layerId = layer.target.id;
    map.setStyle("mapbox://styles/jpegmountainman/" + layerId);

    if (layerId === layeridP) {
      legend2.style.display = "none";
      legend3.style.display = "none";
      legend.style.display = "block";

      //   legend.style.color = "green";
    } else if (layerId === layeridM) {
      legend.style.display = "none";
      legend2.style.display = "block";
      legend3.style.display = "none";
      legend.setAttribute("id", "poverty-legend");
      //   legend.style.color = "black";
    } else {
      legend.style.display = "none";
      legend2.style.display = "none";
      legend3.style.display = "block";
    }
  };
}

map.on("click", (e) => {
  //   const mapStyle = map.getStyle()[0].sourceLayer;
  //   console.log(mapStyle);
  const loader = map.getStyle().name;
  if (loader === "Median_Income") {
    const features = map.queryRenderedFeatures(e.point, {
      layers: ["census-data-ne-income-0hl5n5 copy 3"],
    });
    const income =
      features[0].properties[
        "pointsinpoly_Table_Data2_census_tract_data_master_HOUSEHOLD INCOME IN THE PAST 12 MONTHS (IN 2020 INFLATION-ADJUSTED DOLLARS)!!Median income (dollars)"
      ];

    const turnout = map.queryRenderedFeatures(e.point, {
      layers: ["voting"],
    });
    const voterTurnout =
      turnout[0].properties["Turnout_Hastings_Poly_Turnout_Census"];
    const censusTract = features[0].properties["NAMELSAD"];
    var lat = e.lngLat.lat;
    var lng = e.lngLat.lng;
    var coordinates = [];
    coordinates.push(lng, lat);

    popup
      .setLngLat(coordinates)
      .setHTML(
        `<h6>${censusTract}</h6><p></p>Median Income: $${income}</p><p>Voter Turnout: ${voterTurnout}%`
      )
      .addTo(map);
  } else {
    const povertyStatus = map.queryRenderedFeatures(e.point, {
      layers: ["census-data-ne-poverty-awu9er"],
    });
    const povertyLevel =
      povertyStatus[0].properties[
        "Poverty_Levels_census_tract_data_master_Percent households receiving food stamps/SNAP!!Households!!POVERTY STATUS IN THE PAST 12 MONTHS!!Below poverty level"
      ];

    const censusTract = povertyStatus[0].properties["NAMELSAD"];
    var lat = e.lngLat.lat;
    var lng = e.lngLat.lng;
    var coordinates = [];
    coordinates.push(lng, lat);
    popup
      .setLngLat(coordinates)
      .setHTML(`<h6>${censusTract}</h6><p>Poverty Level: ${povertyLevel}%</p>`)
      .addTo(map);
  }
});

map.on("mouseleave", "census-data-ne-income-0hl5n5 copy 3", function () {
  map.getCanvas().style.cursor = "";
  popup.remove();
});

map.on("mouseleave", "census-data-ne-poverty-awu9er", function () {
  map.getCanvas().style.cursor = "";
  popup.remove();
});
