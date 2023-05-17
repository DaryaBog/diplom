import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { api } from '../../api'
import { getOutData } from '../../helpers/getOutData'

export const Calculate = () => {
    const [isAlert, setIsAlert] = useState(true)
    const [outputData, setOutputData] = useState(false)
    const inputData = useSelector(state => state.calculate.inputData)

    const isDark = useSelector(state => state.theme.isDark)

    const onCalculate = () => {
        if (!inputData.population || !inputData.waterFlow || !inputData.quotient || !inputData.length || !inputData.hours || !inputData.min) {
            return
        }
        setIsAlert(false)
        api.getCalculateResult({ ...inputData, lengthPath: 6000 })
            .then(res => setOutputData(res))
    }

    const renderItem = (item, index) => {
        return (
            <OutputWrapper isDark={isDark} key={index}>
                {item.value ?
                    (<Lable isDark={isDark}>{item.text} <span>{item.value}</span></Lable>)
                    : (<Title>{item.text}</Title>)}
            </OutputWrapper>
        )
    }

    return (
        <CalculateWrapper isDark={isDark}>
            <CalculateButton onClick={onCalculate}>Рассчетать</CalculateButton>
            {isAlert ?
                (<Alert>Пожалуйста, заполните пропущенные данные!</Alert>) :
                getOutData(outputData).map((item, index) => renderItem(item, index))}
        </CalculateWrapper>
    )
}

const Alert = styled.div`
    width: 100%;
    background: ${p => p.isDark ? Colors.DARK_WRAPPER : Colors.LIGHT_WRAPPER};
    margin: 50px 0;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid ${p => p.isDark ? Colors.DARK_BORDER : Colors.LIGHT_BORDER}
`

const CalculateWrapper = styled.div`
    width: 100%;
    background: ${p => p.isDark ? Colors.DARK_WRAPPER : Colors.LIGHT_WRAPPER};
    margin: 50px 0;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid ${p => p.isDark ? Colors.DARK_BORDER : Colors.LIGHT_BORDER}
`

const CalculateButton = styled.button`
width: 200px;
height: 30px;
margin: 15px;
text-align: center;
color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
border-radius: 5px;
`

const OutputWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
`

const Lable = styled.p`
    font-size: 20px;
`

const Title = styled.h3`
    font-size: 30px;
    padding-left: 40px;
`