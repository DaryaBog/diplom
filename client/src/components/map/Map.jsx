import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Map, Polygon, Placemark, ZoomControl, Polyline } from '@pbe/react-yandex-maps'
import { addPoint, onAddStartPoint } from '../../Slices/mapPointSlice'
import { api } from '../../api'

export const CastomMap = () => {
    const dispatch = useDispatch()
    const position = useSelector(state => state.position.position)
    const polygonPoints = useSelector(state => state.mapPoint.points)
    const isDraw = useSelector(state => state.mapPoint.draw)
    const isStart = useSelector(state => state.mapPoint.startPoint)
    const isDrawingPath = useSelector(state => state.mapPoint.drawingPath)
    const [startPlace, setStartPlace] = useState()
    const [dataForPath, setDataForPath] = useState({ polygon: [], startPoint: startPlace })
    const mapRef = useRef()

    const [intersectionPoints, setIntersectionPoints] = useState([]);
    const [path, setPath] = useState([])

    useEffect(() => {
        if (isStart && dataForPath.polygon.length) {
            queryIntersections()
        }
    }, [isStart, dataForPath])

    useEffect(() => {
        if (!isDrawingPath) return
        queryOSMData()
    }, [isDrawingPath, dataForPath])

    const queryIntersections = async () => {
        if (!dataForPath?.polygon.length) return
        const { intersection } = await api.getIntersectionOfStreetsInPolygon({ polygon: dataForPath.polygon })
        setIntersectionPoints(intersection);
    }

    const queryOSMData = useCallback(async () => {
        if (!dataForPath?.polygon.length) return
        const { line } = await api.getPathInPolygon({ polygon: dataForPath.polygon, startPlace, intersections: intersectionPoints })
        setPath(line)
    }, [dataForPath, intersectionPoints, startPlace])

    const setStartPoint = item => {
        if (!isStart) return
        setDataForPath({ ...dataForPath, startPoint: item })
        setStartPlace(item)
        dispatch(onAddStartPoint())
    }

    const setPolygonPoint = e => {
        if (!isDraw) return

        const lat = e.get('coords')[0]
        const lan = e.get('coords')[1]
        dataForPath.polygon.push([lat, lan])
        setDataForPath({ ...dataForPath, polygon: dataForPath.polygon })
        dispatch(addPoint([lat, lan]))
    }

    const getPolygon = useCallback(() => {
        return (
            <Polygon
                onClick={setPolygonPoint}
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

    const getAllPlace = (item, index) => {
        return (
            <Placemark
                geometry={item}
                key={index}
                onClick={() => setStartPoint(item)}
            />)
    }

    const getPath = () => {
        return (
            <Polyline
                geometry={path}
                options={{
                    balloonCloseButton: false,
                    strokeColor: "#000",
                    strokeWidth: 4,
                    strokeOpacity: 0.5,
                }}
            />)
    }

    return <Map
        instanceRef={mapRef}
        width={'100%'}
        height={600}
        state={{ center: [position.lan, position.lat], zoom: 15 }}
        onClick={setPolygonPoint}
    >
        <ZoomControl options={{ float: "right" }} />
        {getPolygon()}
        {getPlacemark()}
        {isStart ? intersectionPoints?.map((item, index) => getAllPlace(item, index)) : null}
        {path?.length ? getPath() : null}
    </Map>
}
