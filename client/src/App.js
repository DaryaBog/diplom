import React from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import { Colors } from './assets/theme/Colors'
import { Header } from './components/header/Header';
import { MapContainer } from './components/map/MapContainer';

function App() {
  const isDark = useSelector(state => state.theme.isDark)

  return (
    <AppWrapper isDark={isDark}>
      <Header />
      <MapContainer />
    </AppWrapper >
  );
}

const AppWrapper = styled.div`
  width: 100%;
  min-height: 100%;
  background: ${p => p.isDark ? Colors.DARK_WRAPPER : Colors.LIGHT_WRAPPER};
`

export default App;
