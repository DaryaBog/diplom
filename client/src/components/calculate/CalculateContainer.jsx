import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { InputForm } from './InputForm'

export const CalculateContainer = () => {
    const isDark = useSelector(state => state.theme.isDark)
    const inputData = useSelector(state => state.calculate.inputData)

    return (
        <ContainerCalculate isDark={isDark}>
            <Title isDark={isDark}>Инженерные расчеты</Title>
            <InputForm />
        </ContainerCalculate>
    )
}

const ContainerCalculate = styled.div`
    width: 80%;
    height: 1000px;
    background: ${p => p.isDark ? Colors.DARK_WRAPPER : Colors.LIGHT_HEADER};
    padding-top: 50px;
`

const Title = styled.h2`
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
    font-size: 40px;
    text-align: center;
`