import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Map, Polygon, Placemark, ZoomControl, Polyline } from '@pbe/react-yandex-maps'
import { addPoint, onAddStartPoint } from '../../Slices/mapPointSlice'
import { api } from '../../api'
import { checkLine } from '../../helpers/checkValidLine'
import placemarkIcon from './icon.png'
import startIcon from './flag.png'

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

    // data for style of path
    const firstColor = useSelector(state => state.lines.firstColor)
    const secondColor = useSelector(state => state.lines.secondColor)
    const thirdColor = useSelector(state => state.lines.thirdColor)

    const firstMinDistance = useSelector(state => state.lines.firstMinDistance)
    const secondMinDistance = useSelector(state => state.lines.secondMinDistance)
    const thirdMinDistance = useSelector(state => state.lines.thirdMinDistance)

    const firstMaxDistance = useSelector(state => state.lines.firstMaxDistance)
    const secondMaxDistance = useSelector(state => state.lines.secondMaxDistance)
    const thirdMaxDistance = useSelector(state => state.lines.thirdMaxDistance)
    //

    const [intersectionPoints, setIntersectionPoints] = useState([]);
    const [path, setPath] = useState([])
    const [redPath, setRedPath] = useState([])
    const [greenPath, setGreenPath] = useState([])

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
        const line = await api.getPathInPolygon({ polygon: polygonPoints, startPlace, intersections: intersectionPoints, maxDistance: firstMaxDistance, minDistance: firstMinDistance })
        const lineRed = await api.getPathInPolygon({ polygon: polygonPoints, startPlace, intersections: intersectionPoints, maxDistance: secondMaxDistance, minDistance: secondMinDistance })
        const lineGreen = await api.getPathInPolygon({ polygon: polygonPoints, startPlace, intersections: intersectionPoints, maxDistance: thirdMaxDistance, minDistance: thirdMinDistance })
        checkLine(line) && setPath(line)
        checkLine(lineRed) && setRedPath(lineRed)
        checkLine(lineGreen) && setGreenPath(lineGreen)
    }, [polygonPoints, dataForPath, intersectionPoints, startPlace])

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

        dispatch(addPoint([lat, lan]))
    }

    useEffect(() => {
        setDataForPath({ ...dataForPath, polygon: polygonPoints })
    }, [polygonPoints])

    const getPolygon = useCallback(() => {
        return (
            <Polygon
                onClick={setPolygonPoint}
                geometry={[polygonPoints]}
                options={{
                    fillColor: "#4D9078",
                    strokeColor: "#B4436C",
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
                options={{
                    iconLayout: "default#image",
                    iconImageHref: startIcon,
                    iconImageSize: [30, 40],
                }}
            />)
    }, [startPlace])

    const getAllPlace = (item, index) => {
        return (
            <Placemark
                geometry={item}
                options={{
                    iconLayout: "default#image",
                    iconImageHref: placemarkIcon,
                    iconImageSize: [20, 20],
                }}
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
                    strokeColor: firstColor,
                    strokeWidth: 4,
                    strokeOpacity: 0.8,
                }}
            />)
    }

    const getRedPath = () => {
        return (
            <Polyline
                geometry={redPath}
                options={{
                    balloonCloseButton: false,
                    strokeColor: secondColor,
                    strokeWidth: 4,
                    strokeOpacity: 0.8,
                }}
            />)
    }

    const getGreenPath = () => {
        return (
            <Polyline
                geometry={greenPath}
                options={{
                    balloonCloseButton: false,
                    strokeColor: thirdColor,
                    strokeWidth: 4,
                    strokeOpacity: 0.8,
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
        {redPath?.length ? getRedPath() : null}
        {greenPath?.length ? getGreenPath() : null}
    </Map>
}
