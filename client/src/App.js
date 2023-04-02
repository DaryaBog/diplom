import React, { useState } from 'react'
import styled from 'styled-components'
import Moon from './assets/theme/moon.svg'
import Sun from './assets/theme/sun.svg'
import { Colors } from './assets/theme/Colors'

function App() {
  const [isDark, setIsDark] = useState(false)

  const onChangeTheme = () => {
    setIsDark(!isDark)
  }


  return (
    <AppWrapper isDark={isDark}>
      <NavBar isDark={isDark}>
        <Title>Creation of a cellular drinking water supply system project</Title>
        <ThemeButton onClick={onChangeTheme}>
          {isDark ? <Icon src={Moon}></Icon> : <Icon src={Sun}></Icon>}
        </ThemeButton>
      </NavBar>
      <Map isDark={isDark}></Map>
    </AppWrapper>
  );
}

const AppWrapper = styled.div`
  width: 100%;
  min-height: 1000px;
  background: ${p => p.isDark ? Colors.DARK_WRAPPER : Colors.LIGHT_WRAPPER};
`

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
  font-family: system-ui;
  font-size: 20px;
  font-weight: 300;
`

const ThemeButton = styled.div`
  width: 20px;
  height: 20px;
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
`

const Map = styled.div`
  width: 600px;
  height: 600px;
  margin: 100px;
  background: ${p => p.isDark ? Colors.DARK_HEADER : Colors.LIGHT_HEADER};
  padding:10px 60px;
`
export default App;
