import osmtogeojson from "osmtogeojson";
import { MAX_DICTANCE, URL_GEOCODE, URL_SERVER } from "./constants";
import { getQueryCalculate } from "./helpers/queryCalculate";
import * as turf from "@turf/turf";
import { getPolygonPointForQuery } from "./helpers/getPolygonForQuery";
import { getFarLine, getLine, getNearestLine, getPath } from "./helpers/searchPath";

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

    static getIntersectionOfStreetsInPolygon({ polygon, startPlace }) {
        return new Promise(async (resolve, reject) => {
            try {
                const polygonPointsForQuery = getPolygonPointForQuery(polygon)
                // get array of intersection
                const overpassUrl = 'https://overpass-api.de/api/interpreter';
                const overpassQuery = `[out:json][timeout:25];
        
                way(poly:"${polygonPointsForQuery}")["highway"~"^(trunk|primary|secondary|tertiary|unclassified|residential)$"]->.streets;
                
                foreach .streets->.street(
                    way.streets(around.street:0)(if: t["name"] == street.u(t["name"]))->.sameStreets;
                    (.streets; - .sameStreets;)->.otherStreets;
                    node(w.street)->.streetNode;
                    node(w.otherStreets)->.otherStreetsNodes;
                    node.streetNode.otherStreetsNodes;
                    (._ ; .intersections;)->.intersections;
                );
                
                .intersections out geom;`

                const overpassQueryStreets = `[out:json][timeout:25];
        
                way(poly:"${polygonPointsForQuery}")["highway"~"^(trunk|primary|secondary|tertiary|unclassified|residential)$"]->.streets;
                
                .streets out geom;`

                const response = await fetch(`${overpassUrl}?data=${encodeURIComponent(overpassQuery)}`);
                const responSetreets = await fetch(`${overpassUrl}?data=${encodeURIComponent(overpassQueryStreets)}`);

                const data = await response.json();
                const dataStreets = osmtogeojson(await responSetreets.json());

                // console.log('dataStreets', osmtogeojson(dataStreets))

                const geojson = osmtogeojson(data);
                const inGeojsonArray = geojson.features.map(item => [item.geometry.coordinates[1], item.geometry.coordinates[0]])
                // get intersection in poltgon
                const points = turf.points(inGeojsonArray)
                const searchWithin = turf.polygon([[...polygon, polygon[0]]])
                const intersectionInPolygon = turf.pointsWithinPolygon(points, searchWithin).features.map(item => item.geometry.coordinates)
                intersectionInPolygon.push(startPlace)
                // get path
                const polylinePoints = [startPlace]

                const lines = getLine(polygon)
                console.log('start')

                const farLine = getFarLine(lines, startPlace, MAX_DICTANCE)
                const nearestLine = getNearestLine(lines, startPlace, farLine, MAX_DICTANCE)
                const line = getPath(polygon, intersectionInPolygon, startPlace, startPlace, polylinePoints, lines, farLine, nearestLine, dataStreets.features)

                console.log('---------line----------', line)
                resolve({ intersection: intersectionInPolygon, line: line })
            } catch (error) {
                console.log('error in getCalculateResult', error)
                reject(error)
            }
        })
    }
}