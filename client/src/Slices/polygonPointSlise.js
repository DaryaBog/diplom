import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    points: []
};

export const polygonPointSlice = createSlice({
    name: 'polygon',
    initialState,
    reducers: {
        addPoint: (state, action) => {
            state.points.push([action.payload[0], action.payload[1]])
        },

        changeTheme: (state, action) => {
            state.isDark = !state.isDark
        }
    }
});

export const { addPoint } = polygonPointSlice.actions;
export default polygonPointSlice.reducer;