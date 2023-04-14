import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    position: {
        lan: 55.73,
        lat: 37.75,
    }
};

export const positionSlice = createSlice({
    name: 'position',
    initialState,
    reducers: {
        changePosition: (state, action) => {
            const newPosition = {
                ...state.position,
                lan: Number(action.payload[1]),
                lat: Number(action.payload[0]),
            }
            state.position = newPosition
        }
    }
});

export const { changePosition } = positionSlice.actions;
export default positionSlice.reducer;