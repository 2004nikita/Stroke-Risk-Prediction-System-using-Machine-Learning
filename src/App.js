// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import RiskVisualization from './components/RiskVisualization';
import FormValidation from './components/FormValidation';

function App() {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    hypertension: '',
    heart_disease: '',
    ever_married: '',
    work_type: '',
    Residence_type: '',
    avg_glucose_level: '',
    bmi: '',
    smoking_status: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formProgress, setFormProgress] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const totalFields = Object.keys(formData).length;
  const completedFields = Object.values(formData).filter(value => value !== '').length;

  useEffect(() => {
    setFormProgress((completedFields / totalFields) * 100);
  }, [completedFields, totalFields]);

  const validateField = (name, value) => {
    const errors = [];
    
    switch (name) {
      case 'age':
        const age = parseInt(value);
        if (isNaN(age)) errors.push('Please enter a valid age');
        else if (age < 1 || age > 120) errors.push('Age must be between 1 and 120');
        break;
      case 'bmi':
        const bmi = parseFloat(value);
        if (isNaN(bmi)) errors.push('Please enter a valid BMI');
        else if (bmi < 10 || bmi > 100) errors.push('BMI must be between 10 and 100');
        break;
      case 'avg_glucose_level':
        const glucose = parseFloat(value);
        if (isNaN(glucose)) errors.push('Please enter a valid glucose level');
        else if (glucose < 50 || glucose > 300) errors.push('Glucose level must be between 50 and 300 mg/dL');
        break;
      default:
        if (!value) errors.push('This field is required');
    }
    
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null);
    
    // Validate the field
    const fieldErrors = validateField(name, value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: fieldErrors
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const API_URL = process.env.REACT_APP_API_URL";
const response = await axios.post(`${API_URL}/predict`, formData);


      // const response = await axios.post('http://localhost:5000/predict', formData);
      setPrediction(response.data.stroke);
      setShowResult(true);
    } catch (error) {
      setError('Failed to get prediction. Please check your connection and try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      gender: '',
      age: '',
      hypertension: '',
      heart_disease: '',
      ever_married: '',
      work_type: '',
      Residence_type: '',
      avg_glucose_level: '',
      bmi: '',
      smoking_status: ''
    });
    setPrediction(null);
    setShowResult(false);
    setError(null);
    setValidationErrors({});
  };

  const getRiskLevel = () => {
    if (prediction === 1) return { level: 'High', color: '#ff4757', icon: '⚠️' };
    return { level: 'Low', color: '#2ed573', icon: '✅' };
  };

  const riskInfo = prediction !== null ? getRiskLevel() : null;

  return (
    <div className="app-container">
      <div className="app-header">
        <h1 className="app-title">
          Stroke Risk Assessment
        </h1>
        <p className="app-subtitle">Get your personalized stroke risk prediction</p>
      </div>

      <div className="main-content">
        <div className="form-container">
          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
            <p className="progress-text">
              {completedFields} of {totalFields} fields completed ({Math.round(formProgress)}%)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="prediction-form">
            <div className="form-grid">
              {/* Personal Information */}
              <div className="form-section">
                <h3 className="section-title">Personal Information</h3>
                
                <div className="form-group">
                  <label className="form-label">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="1"
                    max="120"
                    className="form-input"
                    placeholder="Enter your age"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">BMI (Body Mass Index) *</label>
                  <input
                    type="number"
                    name="bmi"
                    value={formData.bmi}
                    onChange={handleChange}
                    required
                    min="10"
                    max="100"
                    step="0.1"
                    className="form-input"
                    placeholder="Enter your BMI"
                  />
                </div>
              </div>

              {/* Health Information */}
              <div className="form-section">
                <h3 className="section-title">Health Information</h3>
                
                <div className="form-group">
                  <label className="form-label">Hypertension *</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="hypertension"
                        value="0"
                        onChange={handleChange}
                        required
                      />
                      <span>No</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="hypertension"
                        value="1"
                        onChange={handleChange}
                        required
                      />
                      <span>Yes</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Heart Disease *</label>
                  <div className="radio-group">
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="heart_disease"
                        value="0"
                        onChange={handleChange}
                        required
                      />
                      <span>No</span>
                    </label>
                    <label className="radio-label">
                      <input
                        type="radio"
                        name="heart_disease"
                        value="1"
                        onChange={handleChange}
                        required
                      />
                      <span>Yes</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Average Glucose Level *</label>
                  <input
                    type="number"
                    name="avg_glucose_level"
                    value={formData.avg_glucose_level}
                    onChange={handleChange}
                    required
                    min="50"
                    max="300"
                    step="0.1"
                    className="form-input"
                    placeholder="Enter glucose level (mg/dL)"
                  />
                </div>
              </div>

              {/* Lifestyle Information */}
              <div className="form-section">
                <h3 className="section-title">Lifestyle Information</h3>
                
                <div className="form-group">
                  <label className="form-label">Ever Married *</label>
                  <select
                    name="ever_married"
                    value={formData.ever_married}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Work Type *</label>
                  <select
                    name="work_type"
                    value={formData.work_type}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Work Type</option>
                    <option value="Private">Private</option>
                    <option value="Self-employed">Self-employed</option>
                    <option value="Govt_job">Government Job</option>
                    <option value="children">Children</option>
                    <option value="Never_worked">Never Worked</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Residence Type *</label>
                  <select
                    name="Residence_type"
                    value={formData.Residence_type}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Residence Type</option>
                    <option value="Urban">Urban</option>
                    <option value="Rural">Rural</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Smoking Status *</label>
                  <select
                    name="smoking_status"
                    value={formData.smoking_status}
                    onChange={handleChange}
                    required
                    className="form-select"
                  >
                    <option value="">Select Smoking Status</option>
                    <option value="never smoked">Never Smoked</option>
                    <option value="formerly smoked">Formerly Smoked</option>
                    <option value="smokes">Currently Smokes</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading || completedFields < totalFields}
                className={`submit-button ${loading ? 'loading' : ''}`}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Analyzing...
                  </>
                ) : (
                  'Get Risk Assessment'
                )}
              </button>
            </div>
          </form>

          {/* Form Validation Component */}
          <FormValidation formData={formData} errors={validationErrors} />

          {error && (
            <div className="error-message">
              <span className="error-icon">❌</span>
              {error}
            </div>
          )}

          {showResult && prediction !== null && (
            <div className="result-container">
              <div className="result-header">
                <h3>Risk Assessment Result</h3>
                <button onClick={resetForm} className="reset-button">
                  New Assessment
                </button>
              </div>
              
              <div 
                className="result-card"
                style={{ borderColor: riskInfo.color }}
              >
                <div className="result-icon" style={{ color: riskInfo.color }}>
                  {riskInfo.icon}
                </div>
                <div className="result-content">
                  <h4 className="result-title" style={{ color: riskInfo.color }}>
                    {riskInfo.level} Risk of Stroke
                  </h4>
                  <p className="result-description">
                    {prediction === 1 
                      ? "Based on your health profile, you have an elevated risk of stroke. Please consult with a healthcare professional for personalized advice and preventive measures."
                      : "Great news! Based on your health profile, you have a low risk of stroke. Continue maintaining a healthy lifestyle."
                    }
                  </p>
                </div>
              </div>

              <div className="recommendations">
                <h4>Recommendations</h4>
                <ul>
                  {prediction === 1 ? (
                    <>
                      <li>Schedule regular check-ups with your doctor</li>
                      <li>Monitor blood pressure and glucose levels</li>
                      <li>Maintain a healthy diet and exercise routine</li>
                      <li>Quit smoking if applicable</li>
                      <li>Manage stress levels</li>
                    </>
                  ) : (
                    <>
                      <li>Continue regular exercise</li>
                      <li>Maintain a balanced diet</li>
                      <li>Keep up with regular health check-ups</li>
                      <li>Avoid smoking and excessive alcohol</li>
                      <li>Manage stress effectively</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {/* Risk Visualization Component */}
          {showResult && prediction !== null && (
            <RiskVisualization 
              riskLevel={prediction === 1 ? 'high' : 'low'} 
              prediction={prediction} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
