import osmtogeojson from "osmtogeojson";
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

    static async getPath(inputData) { }

    static async getIntersectionOfStreetsInPolygon(inputData) {
        return new Promise(async (resolve, reject) => {
            try {
                const overpassUrl = 'https://overpass-api.de/api/interpreter';
                const overpassQuery = `[out:json][timeout:25];
        
                way(poly:"${inputData}")["highway"~"^(trunk|primary|secondary|tertiary|unclassified|residential)$"]->.streets;
                
                foreach .streets->.street(
                    way.streets(around.street:0)(if: t["name"] == street.u(t["name"]))->.sameStreets;
                    (.streets; - .sameStreets;)->.otherStreets;
                    node(w.street)->.streetNode;
                    node(w.otherStreets)->.otherStreetsNodes;
                    node.streetNode.otherStreetsNodes;
                    (._ ; .intersections;)->.intersections;
                );
                
                .intersections out geom;`;
                const response = await fetch(`${overpassUrl}?data=${encodeURIComponent(overpassQuery)}`);
                const data = await response.json();
                const geojson = osmtogeojson(data);
                const inGeojsonArray = geojson.features.map(item => item.geometry.coordinates)
                console.log('ppp inGeojsonArray', inGeojsonArray)
                resolve(inGeojsonArray)
            } catch (error) {
                console.log('error in getCalculateResult', error)
                reject(error)
            }
        })
    }
}