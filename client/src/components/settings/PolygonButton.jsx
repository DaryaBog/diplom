import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { onCancelLastPoint, onDraw, onAddStartPoint } from '../../Slices/mapPointSlice';

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


    return <ButtonWrapper isDark={isDark}>
        <DrawButton onClick={onDrawBorder} isDark={isDark}> Определить границы населенного пункта</DrawButton>
        <CancelButton onClick={onCancel} isDark={isDark}> Отменить</CancelButton>
        <StartPointButton onClick={onStartPoint} isDark={isDark}> Отметить начало трассы пистьеаого водопровода</StartPointButton>
    </ButtonWrapper>
}

const ButtonWrapper = styled.div`
`

const DrawButton = styled.div`
    margin: 5px;
    text-align: center;
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
    background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
    border-radius: 5px;
`

const CancelButton = styled.div`  
    height: 30px;
    margin: 5px;
    text-align: center;
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
    background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
    border-radius: 5px;
`

const StartPointButton = styled.div`  
    margin: 5px;
    text-align: center;
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
    background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
    border-radius: 5px;
`