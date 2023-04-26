import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  points: [],
  draw: false,
  startPoint: false,
  drawingPath: false,
};

export const mapPointSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    addPoint: (state, action) => {
      state.points.push([action.payload[0], action.payload[1]]);
    },
    onCancelLastPoint: (state, action) => {
      state.points.pop();
    },
    onDraw: (state, action) => {
      state.draw = !state.draw;
      state.startPoint = false;
    },
    onAddStartPoint: (state, action) => {
      state.draw = false;
      state.startPoint = !state.startPoint;
    },
    onDrawingPath: (state, action) => {
      state.drawingPath = !state.drawingPath;
    },
  },
});

export const {
  addPoint,
  onCancelLastPoint,
  onDraw,
  onAddStartPoint,
  onDrawingPath,
} = mapPointSlice.actions;
export default mapPointSlice.reducer;
