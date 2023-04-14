import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { YMaps } from '@pbe/react-yandex-maps'
import { CastomMap } from './Map';

export const MapContainer = () => {
    const isDark = useSelector(state => state.theme.isDark)

    return (
        <YMaps isDark={isDark}>
            <ContainerMap isDark={isDark}>
                <CastomMap />
            </ContainerMap>
        </YMaps>
    );
}

const ContainerMap = styled.div`
  width: 100%;
  height: 100%;
  background: ${p => p.isDark ? Colors.DARK_HEADER : Colors.LIGHT_HEADER};
`