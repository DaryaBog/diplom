import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { PolygonButton } from './PolygonButton';
import ArrowWhite from '../../assets/arrowWhite.png'

export const SettingsContainer = () => {
  const isDark = useSelector(state => state.theme.isDark)
  const [position, setPosition] = useState(20)

  const onChangeSettingsPosition = () =>{
    position? setPosition(0) : setPosition(-165)
  }

  return <SettingsWrapper position={position} isDark={isDark}>
    <Arrow isDark={isDark} onClick={onChangeSettingsPosition}><Icon src={ArrowWhite}/></Arrow>
   <PolygonButton/>
  </SettingsWrapper>
}


const SettingsWrapper = styled.div`
  position: absolute;
  top: 60px;
  right: ${p => p.position || 20}px;

  width: 200px;

  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`

const Arrow = styled.button`
  width: 35px;
  height: 30px;
  background-color: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
  border-radius: 50px;

`

const Icon = styled.img`
  width: 20px;
  height: 20px;
`
