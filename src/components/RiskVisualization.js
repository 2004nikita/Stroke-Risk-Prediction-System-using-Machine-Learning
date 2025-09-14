import React from 'react';
import './RiskVisualization.css';

const RiskVisualization = ({ riskLevel, prediction }) => {
  const getRiskData = () => {
    if (prediction === 1) {
      return {
        level: 'High',
        percentage: 75,
        color: '#ff4757',
        icon: '⚠️',
        description: 'Elevated Risk',
        factors: [
          { name: 'Age Factor', value: 25, color: '#ff6b7a' },
          { name: 'Health Conditions', value: 30, color: '#ff8a80' },
          { name: 'Lifestyle Factors', value: 20, color: '#ffab91' }
        ]
      };
    } else {
      return {
        level: 'Low',
        percentage: 15,
        color: '#2ed573',
        icon: '✅',
        description: 'Low Risk',
        factors: [
          { name: 'Age Factor', value: 5, color: '#4ade80' },
          { name: 'Health Conditions', value: 3, color: '#6ee7b7' },
          { name: 'Lifestyle Factors', value: 7, color: '#86efac' }
        ]
      };
    }
  };

  const riskData = getRiskData();

  return (
    <div className="risk-visualization">
      <div className="risk-header">
        <h3>Risk Analysis</h3>
        <div className="risk-badge" style={{ backgroundColor: riskData.color }}>
          <span className="risk-icon">{riskData.icon}</span>
          <span className="risk-level">{riskData.level} Risk</span>
        </div>
      </div>

      <div className="risk-chart">
        <div className="risk-circle">
          <div 
            className="risk-progress" 
            style={{ 
              '--progress': `${riskData.percentage}%`,
              '--color': riskData.color
            }}
          >
            <div className="risk-percentage">
              <span className="percentage-number">{riskData.percentage}%</span>
              <span className="percentage-label">Risk Level</span>
            </div>
          </div>
        </div>
      </div>

      <div className="risk-factors">
        <h4>Contributing Factors</h4>
        <div className="factors-list">
          {riskData.factors.map((factor, index) => (
            <div key={index} className="factor-item">
              <div className="factor-info">
                <span className="factor-name">{factor.name}</span>
                <span className="factor-value">{factor.value}%</span>
              </div>
              <div className="factor-bar">
                <div 
                  className="factor-fill"
                  style={{ 
                    width: `${factor.value}%`,
                    backgroundColor: factor.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="risk-description">
        <p>{riskData.description}</p>
        <div className="risk-tips">
          {prediction === 1 ? (
            <>
              <div className="tip-item">
                <span className="tip-icon">🏥</span>
                <span>Consult a healthcare professional</span>
              </div>
              <div className="tip-item">
                <span className="tip-icon">📊</span>
                <span>Monitor vital signs regularly</span>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🥗</span>
                <span>Maintain a healthy diet</span>
              </div>
            </>
          ) : (
            <>
              <div className="tip-item">
                <span className="tip-icon">💪</span>
                <span>Keep up the healthy lifestyle</span>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🔄</span>
                <span>Continue regular check-ups</span>
              </div>
              <div className="tip-item">
                <span className="tip-icon">🎯</span>
                <span>Stay proactive about health</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiskVisualization;


