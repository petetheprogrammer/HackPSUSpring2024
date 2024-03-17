import React, { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    major: '',
    gpa: '',
    tuition: '',
    state: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  const majors = ['Biology', 'Computer Science', 'Mechanical Engineering'];
  const states = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
    'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri',
    'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
    'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
    'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submission of form data
    // For this example, let's just log the form data
    console.log(formData);

    // Simulate API call and set results
    const fakeApiResults = {
      major: formData.major,
      results: [
        {
          tuition: '$30,000',
          location: 'Example City, Example State',
          ranking: 'Top 50',
          minimumGPA: '3.5',
          costOfLiving: '$45,000',
          nearestAirport: 'Example Airport',
          walkScore: '75'
        },
        // Add more result objects as needed
      ]
    };
    setResults(fakeApiResults);
    setSubmitted(true);
  };

  return (
    <div className="App">
      <header className='header'>
        <h1>Placeholder Team Name</h1>
      </header>
      <div className="form-container">
        {!submitted ? (
        <form onSubmit={handleSubmit}>
        {step === 1 && (
          <article>
            <h2>What major?</h2>
            <select name="major" value={formData.major} onChange={handleChange}>
              <option value="">Select Major</option>
              {majors.map((major, index) => (
                <option key={index} value={major}>{major}</option>
              ))}
            </select>
          </article>
        )}
        {step === 2 && (
          <article>
            <h2>What is the highest GPA you can expect?</h2>
            <p>Convert your local grade to GPA using this website</p>
            <input type="number" name="gpa" value={formData.gpa} onChange={handleChange} />
          </article>
        )}
        
        {step === 3 && (
          <article>
          <h2>Tuition Budget</h2>
          <select name="tuition" onChange={handleChange}>
              <option value="5-10k">5,000 - 10,000 USD</option>
              <option value="10-20k">10,000 - 20,000 USD</option>
              <option value="20-30k">20,000 - 30,000 USD</option>
              <option value="30-40k">30,000 - 40,000 USD</option>
              <option value="40-50k">40,000 - 50,000 USD</option>
              <option value="50k+">Over 50,000 USD</option>
          </select>
      </article>
      
        )}
        {step === 4 && (
          <article>
            <h2>Desired state?</h2>
            <select name="state" value={formData.state} onChange={handleChange}>
              <option value="">Select State</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </article>
        )}
        <article className="buttons">
          {step > 1 && <button type="button" onClick={handlePrevious}>Previous</button>}
          {step < 4 && <button type="button" onClick={handleNext}>Next</button>}
          {step === 4 && <button type='submit' onClick={handleSubmit}>Submit</button>}
        </article>
      </form>
        ) : (
          <section className="results">
            <h1>Your Results</h1>
            <h2>Major: {results.major}</h2>
            {results.results.map((result, index) => (
              <div key={index} className="result-section">
                <h3>Collapsible Section {index + 1}</h3>
                <ul>
                  <li>Tuition: {result.tuition}</li>
                  <li>Location: {result.location}</li>
                  <li>Ranking: {result.ranking}</li>
                  <li>Minimum GPA: {result.minimumGPA}</li>
                  <li>Cost of Living: {result.costOfLiving}</li>
                  <li>Nearest Airport: {result.nearestAirport}</li>
                  <li>Walk Score: {result.walkScore}</li>
                </ul>
              </div>
            ))}
          </section>
        )}
      </div>
      <footer className='footer'>
        <p>Jeff, Kelly, Mykola, Pete, and Sai for HackPSU 2024</p>
      </footer>
    </div>
  );
}

export default App;
