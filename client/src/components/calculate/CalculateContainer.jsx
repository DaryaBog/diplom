import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { InputForm } from './InputForm'
import { Calculate } from './Calculate'

export const CalculateContainer = () => {
    const isDark = useSelector(state => state.theme.isDark)

    return (
        <ContainerCalculate isDark={isDark}>
            <Title isDark={isDark}>Инженерные рассчеты</Title>
            <InputForm />
            <Calculate />
        </ContainerCalculate>
    )
}

const ContainerCalculate = styled.div`
    width: 80%;
    height: 100%;
    background: ${p => p.isDark ? Colors.DARK_WRAPPER : Colors.LIGHT_HEADER};
    padding-top: 50px;
`

const Title = styled.h2`
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
    font-size: 40px;
    text-align: center;
`

const SubTitle = styled.h3`
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
    font-size: 30px;
    text-align: center;
`

