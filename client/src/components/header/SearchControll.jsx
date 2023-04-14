import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { changePosition } from '../../Slices/positionSlise'
import { api } from '../../api'

export const Search = () => {
    const dispatch = useDispatch()
    const isDark = useSelector(state => state.theme.isDark)

    const [changingTown, setChangingTown] = useState()

    const getTown = (e) => {
        e.preventDefault()
        api.getNewPosition(changingTown).then(res => {
            dispatch(changePosition(res))
        })
    }

    return <SearchControl isDark={isDark}>
        <SearchInput isDark={isDark} onChange={(e) => setChangingTown(e.target.value)} />
        <SearchButton isDark={isDark} onClick={getTown}>Найти</SearchButton>
    </SearchControl>
}

const SearchControl = styled.form`
display: flex;
align-items: center;
padding: 0 30px;
width: 50%;
height: 50px;
`

const SearchButton = styled.div`
width: 100px;
height: 30px;
margin: 15px;
text-align: center;
color: ${p => p.isDark ? Colors.WHITE : Colors.LIGHT_BORDER};
background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
`

const SearchInput = styled.input`
width: 400px;
height: 30px;
background: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
`