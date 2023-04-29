import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Map, Polygon, Placemark } from '@pbe/react-yandex-maps'
import { addPoint } from '../../Slices/mapPointSlice'
import { api } from '../../api'

import osmtogeojson from 'osmtogeojson';
import * as turf from "@turf/turf";

export const CastomMap = () => {
    const dispatch = useDispatch()
    const position = useSelector(state => state.position.position)
    const polygonPoints = useSelector(state => state.mapPoint.points)
    const isDraw = useSelector(state => state.mapPoint.draw)
    const isStart = useSelector(state => state.mapPoint.startPoint)
    const isDrawingPath = useSelector(state => state.mapPoint.drawingPath)
    const [startPlace, setStartPlace] = useState()
    const [dataForPath, setDataForPath] = useState({polygon: [], startPoint: startPlace})

    const mapRef = useRef()

    const [intersectionPoints, setIntersectionPoints] = useState([]);

    useEffect(()=>{
        if(!isDrawingPath) return
        // api.getPath(dataForPath)
        console.log('aaaaaaaaa')
        queryOSMData();
    },[isDrawingPath, dataForPath])
    ////////////===========////////////
    const queryOSMData = async () => {
        const polygon = [...dataForPath.polygon, dataForPath.polygon[0]];

        const overpassUrl = 'https://overpass-api.de/api/interpreter';
        const overpassQuery = `[out:json][timeout:25];(way["highway"](${polygon.toGeoJSON().geometry.coordinates.flat().join(',')});node(w););out body;>;out skel qt;`;
        const response = await fetch(`${overpassUrl}?data=${encodeURIComponent(overpassQuery)}`);
        const data = await response.json();
        const geojson = osmtogeojson(data);
        const intersectionPoints = turf.pointsWithinPolygon(geojson, polygon.toGeoJSON());
        setIntersectionPoints(intersectionPoints);
      };
    
    ////////////===========////////////
    const setPolygonPoint = e => {
        if (!isDraw && !isStart) return

        const lat = e.get('coords')[0]
        const lan = e.get('coords')[1]

        if(isDraw) {
            dataForPath.polygon.push([lat, lan])
            setDataForPath({...dataForPath, polygon: dataForPath.polygon})
            dispatch(addPoint([lat, lan]))
        } else {
            setDataForPath({...dataForPath, startPoint: [lat, lan]})
            setStartPlace([lat, lan])
        }
    }

    const getPolygon = useCallback(() => {
        return (
            <Polygon
                geometry={[polygonPoints]}
                options={{
                    editorDrawingCursor: "crosshair",
                    fillColor: "#00FF00",
                    strokeColor: "#0000FF",
                    opacity: 0.5,
                    strokeWidth: 3,
                    strokeStyle: "shortdash",
                }}
            />)
    }, [polygonPoints])

    const getPlacemark = useCallback(() => {
        return (
            <Placemark
                geometry={startPlace}
            />)
    }, [startPlace])

    return <Map
        instanceRef={mapRef}
        width={'100%'}
        height={600}
        state={{ center: [position.lan, position.lat], zoom: 9 }}
        defaultState={{ center: [position.lan, position.lat], zoom: 9, controls: [], }}
        onClick={setPolygonPoint}
    >
        {getPolygon()}
        {getPlacemark()}
    </Map>
}
