import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './Slices/themeSlice'
import positionReduser from './Slices/positionSlise';
import polygonPointReduser from './Slices/polygonPointSlise';
import calculateDataReduser from './Slices/calculateDataSlise';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    position: positionReduser,
    polygonPoint: polygonPointReduser,
    calculate: calculateDataReduser,
  },
});