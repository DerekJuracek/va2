for (const input of inputs) {
  input.onclick = (layer) => {
    const layerId = layer.target.id;

    map.on("click", (e) => {
      if (layerId === layeridM) {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["census-data-ne-income-0hl5n5"],
        });
        const censusTract = features[0].properties["NAMELSAD"];
        const income =
          features[0].properties[
            "pointsinpoly_Table_Data2_census_tract_data_master_HOUSEHOLD INCOME IN THE PAST 12 MONTHS (IN 2020 INFLATION-ADJUSTED DOLLARS)!!Median income (dollars)"
          ];
      } else {
        const povertyStatus = map.queryRenderedFeatures(e.point, {
          layers: ["census-data-ne-poverty-awu9er"],
        });

        const povertycen = povertyStatus[0].properties["NAMELSAD"];
      }

      const voterTurnout =
        turnout[0].properties["Turnout_Hastings_Poly_Turnout_Census"];
      const turnout = map.queryRenderedFeatures(e.point, {
        layers: ["voting"],
      });
      var lat = e.lngLat.lat;
      var lng = e.lngLat.lng;
      var coordinates = [];
      coordinates.push(lng, lat);
      popup
        .setLngLat(coordinates)
        .setHTML(
          `<h6>${censusTract}</h6> <p></p>Median Income: $${income}</p><p>Voter Turnout: ${voterTurnout}%`
        )
        .addTo(map);
    });
  };
}

// map.on('mousemove', (e) => {
//   const features = map.queryRenderedFeatures(e.point);

//   // Limit the number of properties we're displaying for
//   // legibility and performance
//   const displayProperties = [
//   'type',
//   'properties',
//   // 'id',
//   // 'layer',
//   // 'source',
//   // 'sourceLayer',
//   // 'state'
//   ];

//   const displayFeatures = features.map((feat) => {
//   const displayFeat = {};
//   displayProperties.forEach((prop) => {
//   displayFeat[prop] = feat[prop];
//   });
//   return displayFeat;
//   });

// Write object as string with an indent of two spaces.
// document.getElementById('features').innerHTML = JSON.stringify(
// displayFeatures,
// null,
// 2
// );
// });

// map.on('load', function() {
// map.on('click', 'test', function(e) {
// map.getCanvas().style.cursor = 'pointer';

// var coordinates = e.features[0].geometry.coordinates.slice();
// var title = e.features[0].properties.pointsinpoly_Table_Data2_NAMELSAD;
// var description = e.features[0].properties.pointsinpoly_Table_Data2_NAMELSAD;
// var title2 = e.features[0].properties.title2;
// var description2 = e.features[0].properties.description2;

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
// while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
// coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
// }

// Populate the popup and set its coordinates
// based on the feature found.
// popup
// .setLngLat(coordinates)
// .setHTML(displayProperties )
// .addTo(map);
// });

// map.on('mouseleave', 'test', function() {
// map.getCanvas().style.cursor = '';
// popup.remove();
// });
// });

// returned object from queryrenderedfeatures
// [
//   {
//     "type": "Feature",
//     "properties": {
//       "COUNTYFP": "111",
//       "GEOID": "31111959700",
//       "NAME": "9597",
//       "NAMELSAD": "Census Tract 9597",
//       "STATEFP": "31",
//       "TRACTCE": "959700",
//       "pointsinpoly_Table_Data2_GEOCODE": "31111959700",
//       "pointsinpoly_Table_Data2_GEOID": "31111959700",
//       "pointsinpoly_Table_Data2_MTFCC": "G5020",
//       "pointsinpoly_Table_Data2_NAMELSAD": "Census Tract 9597",
//       "pointsinpoly_Table_Data2_NUMPOINTS": "0",
//       "pointsinpoly_Table_Data2_SDE_STATE_ID": "0",
//       "pointsinpoly_Table_Data2_Shape_Area": "0.346178592",
//       "pointsinpoly_Table_Data2_Shape_Length": "2.860213416",
//       "pointsinpoly_Table_Data2_TRACT": "959700",
//       "pointsinpoly_Table_Data2_Turnout_Census": "0",
//       "pointsinpoly_Table_Data2_census_tract_data_master_HOUSEHOLD INCOME IN THE PAST 12 MONTHS (IN 2020 INFLATION-ADJUSTED DOLLARS)!!Median income (dollars)": 77188
//     },

// Create a popup, but don't add it to the map yet.

// for (const input of inputs) {
//   input.onclick = (layer) => {
//     console.log(layer);

//     const layerId = layer.target.id;
//     if (layerId === layeridP) {
//       legend.style.color = 'green';
//     }
//    else {

//     legend.setAttribute("id", "poverty-legend");
//     legend.style.color = 'black';
//    }

// };

// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(function (position) {
//     console.log(position);
//     const lat = position.coords.latitude;
//     const long = position.coords.longitude;

//     map.on("click", (mapEvent) => {
//       //   console.log(mapEvent);
//       coords = mapEvent.lngLat;
//       const Lat = mapEvent.lngLat.lat;
//       const lng = mapEvent.lngLat.lng;

//       const popup = new mapboxgl.Popup({ offset: 25 }).setText(
//         `You clicked at ${Lat}, ${lng} `
//       );
//       const marker1 = new mapboxgl.Marker()
//         .setLngLat([lng, Lat])
//         .setPopup(popup)
//         .addTo(map);
//     });
//   });
// }
