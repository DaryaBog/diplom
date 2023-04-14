import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    points: [],
    draw: false
}

export const polygonPointSlice = createSlice({
    name: 'polygon',
    initialState,
    reducers: {
        addPoint: (state, action) => {
            state.points.push([action.payload[0], action.payload[1]])
        },
        onCancelLastPoint: (state, action) => {
            state.points.pop()
        },
        onDraw: (state, action) => {
            state.draw = !state.draw
        },
    }
});

export const { addPoint, onCancelLastPoint, onDraw } = polygonPointSlice.actions;
export default polygonPointSlice.reducer;