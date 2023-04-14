import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { changePosition } from '../../Slices/positionSlise'

export const Search = () => {
    const dispatch = useDispatch()
    const isDark = useSelector(state => state.theme.isDark)

    const [changingTown, setChangingTown] = useState()

    const getTown = async (e) => {
        await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=2fcf50c3-38d1-4cda-a5a9-da7983b01137&format=json&geocode=${changingTown || 'Новочеркасск'}`, {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        }).then(res => res.json()).then(res => {
            console.log('ok')
            dispatch(changePosition(res?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.Point?.pos.split(' ')))
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