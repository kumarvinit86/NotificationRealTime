import React from 'react';
import PropTypes from 'prop-types';

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

PatientDetails.propTypes = {
    patient: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        documents: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
};

export default PatientDetails;
