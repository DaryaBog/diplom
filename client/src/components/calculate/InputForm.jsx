import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { addInputData } from '../../Slices/calculateDataSlise'
import { INPUT_DATA } from '../../constants'

export const InputForm = () => {
    const dispatch = useDispatch()
    const isDark = useSelector(state => state.theme.isDark)

    const onChangeData = (e, lable) => {
        dispatch(addInputData({ lable, text: e.target.value }))
    }

    const renderInput = data => {
        return (
            <InputWrapper key={data.text}>
                <Lable >{data.text}</Lable>
                {data.lable ? <Input name='town' onChange={(e) => onChangeData(e, data.lable)} /> : null}
            </InputWrapper>
        )
    }

    return (
        <FormWrapper isDark={isDark}>
            <Form isDark={isDark}>
                {INPUT_DATA.map(data => renderInput(data))}
            </Form>
        </FormWrapper>
    )
}

const FormWrapper = styled.div`
    width: 100%;
    background: ${p => p.isDark ? Colors.DARK_WRAPPER : Colors.LIGHT_WRAPPER};
    margin: 50px 0;
    padding: 10px;
    border-radius: 20px;
    border: 1px solid ${p => p.isDark ? Colors.DARK_BORDER : Colors.LIGHT_BORDER}
`

const Form = styled.form`
    color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
    font-size: 20px;
`

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 40px;
`

const Lable = styled.p``

const Input = styled.input`
height: 30px;
margin: 0 10px;
`