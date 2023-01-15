import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  isModalOpen: false,
};
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
    },
    closeModal: (state, action) => {
      state.isModalOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
