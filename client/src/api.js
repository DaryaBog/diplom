import { URL_GEOCODE, URL_SERVER } from "./constants";
import { getQueryCalculate } from "./helpers/queryCalculate";
import * as turf from "@turf/turf";

export class api {
  static getNewPosition(town) {
    return new Promise(async (resolve, reject) => {
      await fetch(`${URL_GEOCODE}${town || "Новочеркасск"}`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((res) =>
          res?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos.split(
            " "
          )
        )
        .then((res) => resolve([Number(res[0]), Number(res[1])]))
        .catch((error) => reject(error));
    });
  }

  static getCalculateResult(inputData) {
    return new Promise(async (resolve, reject) => {
      await fetch(`${URL_SERVER}/calculates?${getQueryCalculate(inputData)}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res", res);
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  }

  static getPath(inputData) {
    console.log("🚀 ~ file: api.js:4 ~ turf:", turf);
    // Define the polygon vertices
    const polygon_vertices = [...inputData.polygon, inputData.polygon[0]];

    console.log(
      "🚀 ~ file: api.js:4 ~ turf:",
      turf.length(polygon_vertices[0], polygon_vertices[1])
    );

    // Create a Turf.js Polygon object from the vertices
    var polygon = turf.polygon([polygon_vertices]);

    // Define the lines that make up the polygon
    var lines = [];
    for (var i = 0; i < polygon_vertices.length - 1; i++) {
      var line = turf.lineString([
        polygon_vertices[i],
        polygon_vertices[i + 1],
      ]);
      lines.push(line);
    }
    var lastLine = turf.lineString([
      polygon_vertices[polygon_vertices.length - 1],
      polygon_vertices[0],
    ]);
    lines.push(lastLine);

    // Find the intersection points between the lines
    var intersection_points = [];
    for (var i = 0; i < lines.length; i++) {
      for (var j = i + 1; j < lines.length; j++) {
        var intersection = turf.lineIntersect(lines[i], lines[j]);
        if (intersection.features.length > 0) {
          intersection_points.push(
            intersection.features[0].geometry.coordinates
          );
        }
      }
    }

    console.log(intersection_points);

    // return new Promise(async (resolve, reject) => {
    //   await fetch(
    //     `https://api.openstreetmap.org/api/0.6/[node|way|relation]/#id.json`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //       },
    //     }
    //   )
    //     // .then((res) => res.json())
    //     .then((res) => {
    //       console.log("res", res);
    //       resolve(res);
    //     })
    //     .catch((error) => reject(error));
    // });
  }
}
