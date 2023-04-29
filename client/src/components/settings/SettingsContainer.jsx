import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { PolygonButton } from './PolygonButton';

export const SettingsContainer = () => {
  const isDark = useSelector(state => state.theme.isDark)
  const [position, setPosition] = useState(20)

  const onChangeSettingsPosition = () =>{
    position? setPosition(0) : setPosition(-185)
  }

  return <SettingsWrapper position={position} isDark={isDark}>
    <Arrow isDark={isDark} onClick={onChangeSettingsPosition}>c</Arrow>
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
  width: 5%;
  height: 100px;
  background-color: ${p => p.isDark ? Colors.DARK_BUTTON : Colors.LIGHT_BUTTON};
  border-radius: 5px;
`

