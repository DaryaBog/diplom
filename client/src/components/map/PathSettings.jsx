import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { changeFirstColor, changeFirstMaxDistance, changeFirstMinDistance, changeSecondColor, changeSecondMaxDistance, changeSecondMinDistance, changeThirdColor, changeThirdMaxDistance, changeThirdMinDistance } from '../../Slices/lineDataSlice'
import Circle from '@uiw/react-color-circle';

export const PathSettings = () => {
    const dispatch = useDispatch()
    const isDark = useSelector(state => state.theme.isDark)
    const lengths = useSelector(state => state.lines.length)

    const [colorFirst, setColorFirst] = useState("#4E56F2")
    const [colorSecond, setColorSecond] = useState("#F77254")
    const [colorThird, setColorThird] = useState("#5FAD56")

    const [mixDistanceFirst, setMinDistanceFirst] = useState()
    const [mixDistanceSecond, setMinDistanceSecond] = useState()
    const [mixDistanceThird, setMinDistanceThird] = useState()

    const [maxDistanceFirst, setMaxDistanceFirst] = useState()
    const [maxDistanceSecond, setMaxDistanceSecond] = useState()
    const [maxDistanceThird, setMaxDistanceThird] = useState()

    const changeLineSettings = (e) => {
        e.preventDefault()
        dispatch(changeFirstColor({ firstColor: colorFirst }))
        dispatch(changeSecondColor({ secondColor: colorSecond }))
        dispatch(changeThirdColor({ thirdColor: colorThird }))

        dispatch(changeFirstMinDistance({ firstMinDistance: Number(mixDistanceFirst) }))
        dispatch(changeSecondMinDistance({ secondMinDistance: Number(mixDistanceSecond) }))
        dispatch(changeThirdMinDistance({ thirdMinDistance: Number(mixDistanceThird) }))

        dispatch(changeFirstMaxDistance({ firstMaxDistance: Number(maxDistanceFirst) }))
        dispatch(changeSecondMaxDistance({ secondMaxDistance: Number(maxDistanceSecond) }))
        dispatch(changeThirdMaxDistance({ thirdMaxDistance: Number(maxDistanceThird) }))
    }

    return <SearchControl isDark={isDark}>
        <FormWrapper>
            <BlockWrapper isDark={isDark}>
                <InputWrapper>
                    <Circle
                        colors={['#4E56F2', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00']}
                        color={colorFirst}
                        onChange={color => setColorFirst(color.hex)} />
                </InputWrapper>
                <InputWrapper>
                    <Label isDark={isDark}> Минимальное расстояние до границы: </Label>
                    <Input isDark={isDark} value='0.1' onChange={(e) => setMinDistanceFirst(e.target.value)} />
                </InputWrapper>
                <InputWrapper>
                    <Label isDark={isDark}> Шаговая доступность: </Label>
                    <Input isDark={isDark} value='0.4' onChange={(e) => setMaxDistanceFirst(e.target.value)} />
                </InputWrapper>
                <InputWrapper>
                    <Label isDark={isDark}> Длина: {lengths.firstLength}</Label>
                </InputWrapper>
            </BlockWrapper>
            <BlockWrapper isDark={isDark}>
                <InputWrapper>
                    <Circle
                        colors={['#F77254', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00']}
                        color={colorSecond}
                        onChange={color => setColorSecond(color.hex)} />
                </InputWrapper>
                <InputWrapper>
                    <Label isDark={isDark}> Минимальное расстояние до границы: </Label>
                    <Input isDark={isDark} value='0.1' onChange={(e) => setMinDistanceSecond(e.target.value)} />
                </InputWrapper>
                <InputWrapper>
                    <Label isDark={isDark}> Шаговая доступность: </Label>
                    <Input isDark={isDark} value='0.6' onChange={(e) => setMaxDistanceSecond(e.target.value)} />
                </InputWrapper>
                <InputWrapper>
                    <Label isDark={isDark}> Длина: {lengths.secondLength}</Label>
                </InputWrapper>
            </BlockWrapper>
            <BlockWrapper isDark={isDark}>
                <InputWrapper>
                    <Circle
                        colors={['#5FAD56', '#F44E3B', '#FE9200', '#FCDC00', '#DBDF00']}
                        color={colorThird}
                        onChange={color => setColorThird(color.hex)} />
                </InputWrapper>
                <InputWrapper>
                    <Label isDark={isDark}> Минимальное расстояние до границы: </Label>
                    <Input isDark={isDark} value='0.1' onChange={(e) => setMinDistanceThird(e.target.value)} />
                </InputWrapper>
                <InputWrapper>
                    <Label isDark={isDark}> Шаговая доступность: </Label>
                    <Input isDark={isDark} value='0.8' onChange={(e) => setMaxDistanceThird(e.target.value)} />
                </InputWrapper>
                <InputWrapper>
                    <Label isDark={isDark}> Длина: {lengths.thirdLength}</Label>
                </InputWrapper>
            </BlockWrapper>
        </FormWrapper>
        <SearchButton isDark={isDark} onClick={changeLineSettings}>Применить настройки</SearchButton>
    </SearchControl>
}


const SearchControl = styled.form`
display: flex;
flex-direction: column;
align-items: center;
padding: 0 30px;
width: 100%;
`

const FormWrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 0 30px;
width: 100%;
`

const SearchButton = styled.button`
width: 200px;
height: 30px;
margin: 15px;
text-align: center;
color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
border-radius: 5px;
`

const Input = styled.input`
width: 100px;
height: 30px;
background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
border-radius: 5px;
margin: 10px
`

const BlockWrapper = styled.div`
width: 500px;
display: flex;
flex-direction: column;
border-radius: 5px;
border: 1px solid ${p => p.isDark ? Colors.DARK_BORDER : Colors.LIGHT_BORDER};
margin: 10px
`

const InputWrapper = styled.div`
padding: 5px;
`

const Label = styled.label`
text-align: center;
color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
`