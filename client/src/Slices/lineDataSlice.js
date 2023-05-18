import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstColor: "#4E56F2",
  secondColor: "#F77254",
  thirdColor: "#5FAD56",

  firstMinDistance: 0.1,
  secondMinDistance: 0.1,
  thirdMinDistance: 0.1,

  firstMaxDistance: 0.4,
  secondMaxDistance: 0.6,
  thirdMaxDistance: 0.8,
  length: {
    firstLength: 0,
    secondLength: 0,
    thirdLength: 0,
  },

  isHideFirst: false,
  isHideSecond: false,
  isHideThird: false,
};

export const linesSlice = createSlice({
  name: "lines",
  initialState,
  reducers: {
    changeFirstColor: (state, action) => {
      console.log("action.payload.firstColor", action.payload);
      state.firstColor = action.payload.firstColor;
    },
    changeSecondColor: (state, action) => {
      state.secondColor = action.payload.secondColor;
    },
    changeThirdColor: (state, action) => {
      state.thirdColor = action.payload.thirdColor;
    },

    changeFirstMinDistance: (state, action) => {
      state.firstMinDistance = action.payload.firstMinDistance;
    },
    changeSecondMinDistance: (state, action) => {
      state.secondMinDistance = action.payload.secondMinDistance;
    },
    changeThirdMinDistance: (state, action) => {
      state.thirdMinDistance = action.payload.thirdMinDistance;
    },

    changeFirstMaxDistance: (state, action) => {
      state.firstMaxDistance = action.payload.firstMaxDistance;
    },
    changeSecondMaxDistance: (state, action) => {
      state.secondMaxDistance = action.payload.secondMaxDistance;
    },
    changeThirdMaxDistance: (state, action) => {
      state.thirdMaxDistance = action.payload.thirdMaxDistance;
    },

    addLength: (state, action) => {
      state.length = action.payload;
    },

    onHideFirst: (state, action) => {
      state.isHideFirst = !state.isHideFirst;
    },
    onHideSecond: (state, action) => {
      state.isHideSecond = !state.isHideSecond;
    },
    onHideThird: (state, action) => {
      state.isHideThird = !state.isHideThird;
    },
  },
});

export const {
  changeFirstColor,
  changeSecondColor,
  changeThirdColor,
  changeFirstMinDistance,
  changeSecondMinDistance,
  changeThirdMinDistance,
  changeFirstMaxDistance,
  changeSecondMaxDistance,
  changeThirdMaxDistance,
  addLength,
  onHideFirst,
  onHideSecond,
  onHideThird,
} = linesSlice.actions;
export default linesSlice.reducer;
