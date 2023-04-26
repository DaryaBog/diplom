import React, { useCallback, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Map, Polygon, Placemark } from '@pbe/react-yandex-maps'
import styled from 'styled-components'
import { addPoint } from '../../Slices/mapPointSlice'

export const CastomMap = () => {
    const dispatch = useDispatch()
    const position = useSelector(state => state.position.position)
    const polygonPoints = useSelector(state => state.mapPoint.points)
    const isDraw = useSelector(state => state.mapPoint.draw)
    const isStart = useSelector(state => state.mapPoint.startPoint)
    const [startPlace, setStartPlace] = useState()

    const mapRef = useRef()

    const setPolygonPoint = e => {
        if (!isDraw && !isStart) return

        const lat = e.get('coords')[0]
        const lan = e.get('coords')[1]

        if(isDraw) {
            dispatch(addPoint([lat, lan]))
        } else {
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
