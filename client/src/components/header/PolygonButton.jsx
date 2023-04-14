import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { onCancelLastPoint, onDraw } from '../../Slices/polygonPointSlise';

export const PolygonButton = () => {
    const dispatch = useDispatch()
    const isDark = useSelector(state => state.theme.isDark)

    const onDrawBorder = () => {
        dispatch(onDraw())
    }

    const onCansel = () => {
        dispatch(onCancelLastPoint())
    }

    return <ButtonWrapper isDark={isDark}>
        <DrawButton onClick={onDrawBorder} isDark={isDark}> Определить границы населенного пункта</DrawButton>
        <CancelButton onClick={onCansel} isDark={isDark}> Cancel</CancelButton>
    </ButtonWrapper>
}

const ButtonWrapper = styled.div`
    display: flex;
    width: 30%;
`

const DrawButton = styled.div`
    width: 320px;
    height: 30px;
    margin: 5px;
    text-align: center;
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
    background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
`

const CancelButton = styled.div`
    width: 50px;  
    height: 30px;
    margin: 5px;
    text-align: center;
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
    background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
`