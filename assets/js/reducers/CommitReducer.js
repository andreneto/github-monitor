import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  commits: [],
  successMessage: false,
};

const commitsSlice = createSlice({
  name: 'commits',
  initialState,
  reducers: {},
});

export const { commitsRequested } = commitsSlice.actions;
export default commitsSlice.reducer;
