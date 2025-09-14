import React from 'react';
import './FormValidation.css';

const FormValidation = ({ formData, errors }) => {
  const validateField = (fieldName, value) => {
    const fieldErrors = errors[fieldName] || [];
    return fieldErrors.length > 0;
  };

  const getFieldStatus = (fieldName, value) => {
    if (!value) return 'empty';
    if (validateField(fieldName, value)) return 'error';
    return 'valid';
  };

  const getValidationMessage = (fieldName, value) => {
    const fieldErrors = errors[fieldName] || [];
    if (fieldErrors.length > 0) {
      return fieldErrors[0];
    }
    return null;
  };

  const fieldConfigs = [
    {
      name: 'age',
      label: 'Age',
      type: 'number',
      validation: (value) => {
        const age = parseInt(value);
        if (isNaN(age)) return 'Please enter a valid age';
        if (age < 1 || age > 120) return 'Age must be between 1 and 120';
        return null;
      }
    },
    {
      name: 'bmi',
      label: 'BMI',
      type: 'number',
      validation: (value) => {
        const bmi = parseFloat(value);
        if (isNaN(bmi)) return 'Please enter a valid BMI';
        if (bmi < 10 || bmi > 100) return 'BMI must be between 10 and 100';
        return null;
      }
    },
    {
      name: 'avg_glucose_level',
      label: 'Glucose Level',
      type: 'number',
      validation: (value) => {
        const glucose = parseFloat(value);
        if (isNaN(glucose)) return 'Please enter a valid glucose level';
        if (glucose < 50 || glucose > 300) return 'Glucose level must be between 50 and 300 mg/dL';
        return null;
      }
    }
  ];

  const getCompletionStatus = () => {
    const totalFields = Object.keys(formData).length;
    const completedFields = Object.values(formData).filter(value => value !== '').length;
    const percentage = (completedFields / totalFields) * 100;
    
    if (percentage === 100) return { status: 'complete', message: 'All fields completed!' };
    if (percentage >= 75) return { status: 'almost', message: 'Almost there!' };
    if (percentage >= 50) return { status: 'halfway', message: 'Halfway done!' };
    return { status: 'start', message: 'Getting started...' };
  };

  const completionStatus = getCompletionStatus();

  return (
    <div className="form-validation">
      <div className="validation-header">
        <h4>Form Validation</h4>
        <div className={`completion-status ${completionStatus.status}`}>
          {completionStatus.message}
        </div>
      </div>

      <div className="field-validations">
        {fieldConfigs.map((field) => {
          const value = formData[field.name];
          const status = getFieldStatus(field.name, value);
          const message = getValidationMessage(field.name, value);

          return (
            <div key={field.name} className={`field-validation ${status}`}>
              <div className="field-info">
                <span className="field-label">{field.label}</span>
                <span className="field-status">
                  {status === 'valid' && '✓'}
                  {status === 'error' && '✗'}
                  {status === 'empty' && '○'}
                </span>
              </div>
              {message && (
                <div className="validation-message">
                  {message}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="validation-summary">
        <div className="summary-item">
          <span className="summary-label">Required Fields:</span>
          <span className="summary-value">
            {Object.values(formData).filter(value => value !== '').length} / {Object.keys(formData).length}
          </span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Validation Status:</span>
          <span className={`summary-value ${Object.keys(errors).length === 0 ? 'valid' : 'error'}`}>
            {Object.keys(errors).length === 0 ? 'All Valid' : `${Object.keys(errors).length} Errors`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default FormValidation;


