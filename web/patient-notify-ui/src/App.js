import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPatientId } from './Services/patientSlice';
import { startConnection, subscribeToPatient, unsubscribeFromPatient } from './Services/SignalRService';
import PatientDetails, { fetchPatientData } from './Components/PatientDetails.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store, { dispatch, getState } from './Services/store'; 

function App() {
  const dispatch = useDispatch();
  const patientId = useSelector((state) => state.patient.patientId);
  const patient = useSelector((state) => state.patient.patientDetails);

  useEffect(() => {
    // Pass dispatch and getState to startConnection
    startConnection(dispatch, store.getState);
  }, [dispatch]);

  const handleSubscribe = () => {
    if (patientId) {
      subscribeToPatient(patientId);
      fetchPatientData(patientId, dispatch);
      toast.success(`Subscribed to patient ID: ${patientId}`, { position: "bottom-right" });
    }
  };

  const handleUnSubscribe = () => {
    if (patientId) {
      unsubscribeFromPatient(patientId);
      toast.success(`Unsubscribed from patient ID: ${patientId}`, { position: "bottom-right" });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'Arial, sans-serif', backgroundColor: '#f9f9f9' }}>
      <header style={{ backgroundColor: '#4CAF50', color: '#fff', padding: '1rem', textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold' }}>
        Patient Documents Notification System
      </header>

      <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
        <div style={{ flex: 1, padding: '2rem', backgroundColor: '#ffffff', boxShadow: '2px 0 5px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ color: '#4CAF50', marginBottom: '1rem' }}> 📢 Subscribe to Patient Documents Updates. </h1>
            <input
              type="number"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => dispatch(setPatientId(e.target.value))}
              style={{
                width: '100%',
                padding: '0.5rem',
                marginBottom: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '1rem',
              }}
            />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleSubscribe}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                Subscribe
              </button>
              <button
                onClick={handleUnSubscribe}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  backgroundColor: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                }}
              >
                UnSubscribe
              </button>
            </div>
          </div>
          <ToastContainer />
        </div>

        <div style={{ flex: 2, padding: '2rem', backgroundColor: '#f0f0f0', overflowY: 'auto' }}>
          <PatientDetails patient={patient} />
        </div>
      </div>
    </div>
  );
}

export default App;