import * as signalR from '@microsoft/signalr';
import { ToastContainer, toast } from 'react-toastify';
let connection = null;

export const startConnection = async () => {
  connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5220/patientHub") //  Change port if needed 
    .withAutomaticReconnect()
    .build();

  connection.on("ReceiveNotification", (message) => {
    //alert(message);
    toast.success(`${message}`, { position: "bottom-right" });
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
}
