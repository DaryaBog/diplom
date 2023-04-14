import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import Moon from '../../assets/theme/moon.svg'
import Sun from '../../assets/theme/sun.svg'
import { changeTheme } from '../../Slices/themeSlice';

export const ThemeButton = () => {
  const dispatch = useDispatch()
  const isDark = useSelector(state => state.theme.isDark)


  const onChangeTheme = () => {
    dispatch(changeTheme())
  }

  return <Button onClick={onChangeTheme}>
    {isDark ? <Icon src={Moon}></Icon> : <Icon src={Sun}></Icon>}
  </Button>
}

const Button = styled.div`
  width: 20px;
  height: 20px;
`

const Icon = styled.img`
  width: 20px;
  height: 20px;
`