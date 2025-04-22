import React, { useEffect, useState } from 'react';
import { startConnection, subscribeToPatient, unsubscribeFromPatient } from './Services/SignalRService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div style={{ padding: '2rem' }}>
      <h2>📢 Patient Document Notification</h2>
      <input
        type="number"
        placeholder="Enter Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      <button onClick={handleSubscribe} style={{ marginLeft: '1rem' }}>
        Subscribe
      </button>
      <button onClick={handleUnSubscribe} style={{ marginLeft: '1rem' }}>
        UnSubscribe
      </button>
      <ToastContainer />
    </div>
  );
}

export default App;
