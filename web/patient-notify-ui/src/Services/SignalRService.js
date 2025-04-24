import * as signalR from '@microsoft/signalr';
import { toast } from 'react-toastify';
import { setPatientDetails } from './patientSlice';

let connection = null;

export const startConnection = async (dispatch, getState) => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5220/patientHub") // Change port if needed
    .withAutomaticReconnect()
    .build();

    // 
  connection.on("ReceiveNotification", (message) => {
    try{
    // Parse the message to extract document details
    // Split the message string to extract patientId and document
    const patientId = getState().patient.patientDetails.id;
    const document = message;

    // Show a toast notification
    toast.success(`New document added for patient ID ${patientId}.`, { position: "bottom-right" });

    // Get the current patient details from the Redux store
    const currentPatient = getState().patient.patientDetails;

    // Check if the notification is for the currently selected patient
    if (currentPatient.id === patientId) {
      // Append the new document to the patient's documents array
      const updatedPatientDetails = {
        ...currentPatient,
        documents: [...currentPatient.documents, document],
      };

      // Dispatch the updated patient details to the Redux store
      dispatch(setPatientDetails(updatedPatientDetails));
    }
  }
  catch (error) {
    console.error("Error processing notification:", error);
    toast.error("Error processing notification", { position: "top-right" });
  }
});

  try {
    await connection.start();
    console.log("SignalR connected.");
  } catch (err) {
    console.error("SignalR Connection Error:", err);
  }
};

export const subscribeToPatient = async (patientId) => {
  if (connection && connection.state === signalR.HubConnectionState.Connected) {
    await connection.invoke("SubscribeToPatient", patientId.toString());
    console.log(`Subscribed to patient ${patientId}`);
  }
};

export const unsubscribeFromPatient = async (patientId) => {
  if (connection && connection.state === signalR.HubConnectionState.Connected) {
    await connection.invoke("UnsubscribeFromPatient", patientId.toString());
    console.log(`Unsubscribed from patient ${patientId}`);
  }
};