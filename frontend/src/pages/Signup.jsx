import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    referral: '',
    mentalCondition: '',
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    ageGroup: '',
    gender: '',
    country: '',
    goals: '',
    preferences: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const referralOptions = [
    'Social Media',
    'Friend/Family Recommendation',
    'Healthcare Provider',
    'Online Search',
    'Advertisement',
    'Other'
  ];

  const mentalConditionOptions = [
    'Anxiety',
    'Depression',
    'PTSD',
    'Bipolar Disorder',
    'OCD',
    'Prefer not to say',
    'Other'
  ];

  const ageGroupOptions = [
    'Under 18',
    '18-24',
    '25-34',
    '35-44',
    '45-54',
    '55+',
  ];

  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];

  const goalOptions = [
    'Improve mental health',
    'Manage stress',
    'Build resilience',
    'Enhance relationships',
    'Boost productivity',
    'Other',
  ];

  const preferenceOptions = [
    'Text-based communication',
    'Video calls',
    'In-person sessions',
    'No preference'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOptionSelect = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const nextStep = () => {
    const requiredFields = {
      1: 'referral',
      2: 'mentalCondition',
      3: 'ageGroup',
      4: 'gender',
      5: 'country',
      6: 'goals',
      7: 'preferences',
    };

    if (requiredFields[currentStep] && !formData[requiredFields[currentStep]]) {
      setError(`Please select your ${requiredFields[currentStep]}`);
      return;
    }

    setError(null);
    setCurrentStep(currentStep + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', formData);

      if (response.status === 201) {
        setSuccess('You joined our community!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-slate-700 mb-4">How did you find us?</h3>
            <div className="space-y-3">
              {referralOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect('referral', option)}
                  className={`w-full p-3 text-left rounded-lg border ${
                    formData.referral === option
                      ? 'border-sage-500 bg-sage-50'
                      : 'border-slate-200 hover:border-sage-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-slate-700 mb-4">
              What best describes your condition?
            </h3>
            <div className="space-y-3">
              {mentalConditionOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect('mentalCondition', option)}
                  className={`w-full p-3 text-left rounded-lg border ${
                    formData.mentalCondition === option
                      ? 'border-sage-500 bg-sage-50'
                      : 'border-slate-200 hover:border-sage-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
            />
            <input
              type="text"
              name="username"
              placeholder="Pseudo Name"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
            />
            <button
              type="submit"
              className="w-full bg-sage-500 text-white py-3 rounded-lg hover:bg-sage-600 transition-all duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </form>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-slate-700 mb-4">What is your age group?</h3>
            <div className="space-y-3">
              {ageGroupOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect('ageGroup', option)}
                  className={`w-full p-3 text-left rounded-lg border ${
                    formData.ageGroup === option
                      ? 'border-sage-500 bg-sage-50'
                      : 'border-slate-200 hover:border-sage-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-slate-700 mb-4">What is your gender?</h3>
            <div className="space-y-3">
              {genderOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect('gender', option)}
                  className={`w-full p-3 text-left rounded-lg border ${
                    formData.gender === option
                      ? 'border-sage-500 bg-sage-50'
                      : 'border-slate-200 hover:border-sage-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-slate-700 mb-4">What country are you from?</h3>
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:border-sage-400"
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-slate-700 mb-4">What are your goals?</h3>
            <div className="space-y-3">
              {goalOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect('goals', option)}
                  className={`w-full p-3 text-left rounded-lg border ${
                    formData.goals === option
                      ? 'border-sage-500 bg-sage-50'
                      : 'border-slate-200 hover:border-sage-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-slate-700 mb-4">What are your preferences?</h3>
            <div className="space-y-3">
              {preferenceOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect('preferences', option)}
                  className={`w-full p-3 text-left rounded-lg border ${
                    formData.preferences === option
                      ? 'border-sage-500 bg-sage-50'
                      : 'border-slate-200 hover:border-sage-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-8 bg-white/90 rounded-xl shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 text-center text-slate-700">
        Join Our Community
      </h2>
      {renderStep()}
      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
      {currentStep < 8 && (
        <button
          onClick={nextStep}
          className="w-full mt-6 bg-sage-500 text-white py-3 rounded-lg hover:bg-sage-600 transition-all duration-300 ease-in-out"
        >
          Next
        </button>
      )}
      <div className="mt-4 flex justify-center space-x-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
          <div
            key={step}
            className={`w-2 h-2 rounded-full ${
              currentStep === step ? 'bg-sage-500' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Signup;
