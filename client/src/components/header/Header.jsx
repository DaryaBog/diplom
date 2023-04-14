import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { Colors } from '../../assets/theme/Colors'
import { ThemeButton } from './ThemeButton'
import { Search } from './SearchControll';
import { PolygonButton } from './PolygonButton';

export const Header = () => {
  const isDark = useSelector(state => state.theme.isDark)

  return <NavBar isDark={isDark}>
    <Title isDark={isDark}>Drinking water supply system</Title>
    <Search />
    <PolygonButton />
    <ThemeButton />
  </NavBar>
}

const NavBar = styled.header`
  min-width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${p => p.isDark ? Colors.DARK_HEADER : Colors.LIGHT_HEADER};
  padding:10px 60px;
`

const Title = styled.div`
  color: ${p => p.isDark ? Colors.WHITE : Colors.BLACK};
  font-family: system-ui;
  font-size: 20px;
  font-weight: 300;
`