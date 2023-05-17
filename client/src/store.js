import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./Slices/themeSlice";
import positionReducer from "./Slices/positionSlice";
import mapPointReducer from "./Slices/mapPointSlice";
import calculateDataReducer from "./Slices/calculateDataSlice";
import lineDataSlice from "./Slices/lineDataSlice";
import warningSlice from "./Slices/warningSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    position: positionReducer,
    mapPoint: mapPointReducer,
    calculate: calculateDataReducer,
    lines: lineDataSlice,
    warning: warningSlice
  },
});
