import React from 'react';
import PropTypes from 'prop-types';
import { setPatientDetails } from '../Services/patientSlice.js';
import { toast } from 'react-toastify';

export const fetchPatientData = async (id, dispatch) => {
    try {
      const response = await fetch(`http://localhost:5220/api/PatientDetail/${id}/details`);
      if (!response.ok) {
        throw new Error('Failed to fetch patient data');
      }
      const data = await response.json();
      dispatch(setPatientDetails(data));
    } catch (error) {
      console.error('Error fetching patient data:', error);
      toast.error('Failed to fetch patient data', { position: "top-right" });
    }
  };

const PatientDetails = ({ patient }) => {
    return (
        <div>
            <h2>Patient Details</h2>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>ID:</strong> {patient.id}</p>
            <h3>Documents Received:</h3>
            <ul>
                {patient.documents.map((doc, index) => (
                    <li key={index}>{doc}</li>
                ))}
            </ul>
        </div>
    );
};


export default PatientDetails;
