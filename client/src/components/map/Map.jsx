import React, { useCallback, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Map, Polygon } from '@pbe/react-yandex-maps'
import styled from 'styled-components'
import { addPoint } from '../../Slices/polygonPointSlise'

export const CastomMap = () => {
    const dispatch = useDispatch()
    const position = useSelector(state => state.position.position)
    const polygonPoints = useSelector(state => state.polygonPoint.points)
    const draw = useSelector(state => state.polygonPoint.draw)

    const polygonRef = useRef()
    const mapRef = useRef()

    const setPolygonPoint = e => {
        if (!draw) return

        const lat = e.get('coords')[0]
        const lan = e.get('coords')[1]

        dispatch(addPoint([lat, lan]))
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

    return <Map
        instanceRef={mapRef}
        width={'100%'}
        height={600}
        state={{ center: [position.lan, position.lat], zoom: 9 }}
        defaultState={{ center: [position.lan, position.lat], zoom: 9, controls: [], }}
        onClick={setPolygonPoint}
    >
        {getPolygon()}
        <CastPolygon ref={polygonRef} />
    </Map>
}

const CastPolygon = styled.div``