import React, { useEffect, useState } from 'react';
import { startConnection, subscribeToPatient, unsubscribeFromPatient } from './Services/SignalRService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PatientDetails from './Components/PatientDetails.js';

const patient = {
    id: '12345',
    name: 'John Doe',
    documents: ['Document 1', 'Document 2', 'Document 3'],
};

function App() {
  const [patientId, setPatientId] = useState("");

  useEffect(() => {
    // Start SignalR connection and register toast callback
    startConnection((message) => {
      toast.info(message, { position: "top-right" });
    });
  }, []);

  const handleSubscribe = () => {
    if (patientId) {
      subscribeToPatient(patientId);
      toast.success(`Subscribed to patient ID: ${patientId}`, { position: "bottom-right" });
    }
  };

  const handleUnSubscribe = () => {
    if (patientId) {
      unsubscribeFromPatient(patientId);
      toast.success(`Subscribed to patient ID: ${patientId}`, { position: "bottom-right" });
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f9', minHeight: '100vh', padding: '2rem' }}>
      {/* Header */}
      <header style={{ backgroundColor: '#4CAF50', color: 'white', padding: '1rem', borderRadius: '8px', textAlign: 'center' }}>
        <h1>Patient Notification System</h1>
        <p>Stay updated with real-time patient document notifications</p>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', marginTop: '2rem', gap: '2rem' }}>
        {/* Left Section */}
        <div style={{ flex: 1, backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ color: '#333' }}>📢 Patient Document Notification</h2>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="number"
              placeholder="Enter Patient ID"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #ccc',
                marginBottom: '1rem',
              }}
            />
          </div>
          <div>
            <button
              onClick={handleSubscribe}
              style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginRight: '1rem',
              }}
            >
              Subscribe
            </button>
            <button
              onClick={handleUnSubscribe}
              style={{
                backgroundColor: '#f44336',
                color: 'white',
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              UnSubscribe
            </button>
          </div>
          <ToastContainer />
        </div>

        {/* Right Section */}
        <div style={{ flex: 2, backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <PatientDetails patient={patient} />
        </div>
      </div>
    </div>
  );
}

export default App;
