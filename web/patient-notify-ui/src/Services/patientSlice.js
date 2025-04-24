import { createSlice } from '@reduxjs/toolkit';

const patientSlice = createSlice({
  name: 'patient',
  initialState: {
    patientId: '',
    patientDetails: {
      id: '',
      name: '',
      documents: [],
    },
  },
  reducers: {
    setPatientId: (state, action) => {
      state.patientId = action.payload;
    },
    setPatientDetails: (state, action) => {
      state.patientDetails = action.payload;
    },
  },
});

export const { setPatientId, setPatientDetails } = patientSlice.actions;
export default patientSlice.reducer;