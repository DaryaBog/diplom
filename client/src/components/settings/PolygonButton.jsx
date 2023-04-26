import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { onCancelLastPoint, onDraw, onAddStartPoint, onDrawingPath } from '../../Slices/mapPointSlice';

export const PolygonButton = () => {
    const dispatch = useDispatch()
    const isDark = useSelector(state => state.theme.isDark)

    const onDrawBorder = () => {
        dispatch(onDraw())
    }

    const onCancel = () => {
        dispatch(onCancelLastPoint())
    }

    const onStartPoint = () => {
        dispatch(onAddStartPoint())
    }

    const onDrawPath = () => {
        dispatch(onDrawingPath())
    }


    return <ButtonWrapper isDark={isDark}>
        <SettingsButton onClick={onDrawBorder} isDark={isDark}> Определить границы населенного пункта</SettingsButton>
        <SettingsButton onClick={onCancel} isDark={isDark}> Отменить последнюю точку границы</SettingsButton>
        <SettingsButton onClick={onStartPoint} isDark={isDark}> Отметить начало трассы пистьеаого водопровода</SettingsButton>
        <SettingsButton onClick={onDrawPath} isDark={isDark}> Построить план трассы</SettingsButton>
    </ButtonWrapper>
}

const ButtonWrapper = styled.div`
    width: 95%;
`

const SettingsButton = styled.button`
    margin: 2px 10px;
    min-height: 40px;
    width: 100%;
    text-align: center;
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
    background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
    border-radius: 5px;
`