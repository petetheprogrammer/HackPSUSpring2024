import React, { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    major: '',
    gpa: '',
    tuition: 0,
    location: '',
    country: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  const majors = ['Biology', 'Computer Science', 'Mechanical Engineering'];
  const locations = [
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
          location: 'State College, Pennsylvania',
          ranking: 'Top 50',
          minimumGPA: '3.5',
          costOfLiving: '$45,000',
          nearestAirport: 'State College Airport (SCE)',
          walkScore: '75'
        },
        // Add more result objects as needed
      ]
    };
    setResults(fakeApiResults);
    setSubmitted(true);
  };

  const calculateEquivalentGPA = () => {
    let equivalentGPA = 0;
    if (formData.country === 'canada') {
      equivalentGPA = formData.gpa * 2;
    } else if (formData.country === 'india') {
      equivalentGPA = formData.gpa * 3;
    } else if (formData.country === 'thailand') {
      equivalentGPA = formData.gpa * 4;
    }
    return equivalentGPA;
  };

  const calculateEquivalentTuition = () => {
    let equivalentTuition = formData.tuition;
    if (equivalentTuition > 0) {
      if (formData.currency === 'canadian_dollars') {
        equivalentTuition *= 0.74;
      } else if (formData.currency === 'thai_baht') {
        equivalentTuition /= 35.84;
      } else if (formData.currency === 'indian_rupee') {
        equivalentTuition /= 82.89;
      }
    }

    return equivalentTuition.toFixed(2);
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
                <h2>What do you want your major to be?</h2>
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
                <h2>What are your school grades?</h2>
                <select name="country" value={formData.country} onChange={handleChange}>
                  <option value="">Select Country</option>
                  <option value="canada">Canada</option>
                  <option value="india">India</option>
                  <option value="thailand">Thailand</option>
                </select>
                <input type="number" name="gpa" value={formData.gpa} onChange={handleChange} />
                {formData.country && (
                  <p>Your equivalent US GPA is: {calculateEquivalentGPA()}</p>
                )}
              </article>
            )}
            {step === 3 && (
              <article>
                <h2>Tuition budget</h2>
                <select name="currency" type='number' value={formData.currency} onChange={handleChange}>
                  <option value="">Select Currency</option>
                  <option value="thai_baht">Thai Baht (฿)</option>
                  <option value="canadian_dollars">Canadian Dollars ($)</option>
                  <option value="indian_rupee">Indian Rupee (₹)</option>
                </select>
                <input type="number" name="tuition" value={formData.tuition} onChange={handleChange} />
                {formData.currency && (
                  <p>This is the equivalent of USD ${calculateEquivalentTuition()}</p>
                )}
              </article>
            )}
            {step === 4 && (
              <article>
                <h2>What traits of a location are important to you?</h2>
                <label>
                  <input type="checkbox" name="safety" checked={formData.safety} onChange={handleChange} />
                  Safety
                </label>
                <label>
                  <input type="checkbox" name="transit" checked={formData.transit} onChange={handleChange} />
                  Transit Accessible
                </label>
                <label>
                  <input type="checkbox" name="minorityFriendly" checked={formData.minorityFriendly} onChange={handleChange} />
                  Minority Friendly
                </label>
                {formData.safety && (
                  <div>
                    <h3>What safety risks do you want to avoid?</h3>
                    <label>
                      <input type="checkbox" name="violentCrime" checked={formData.violentCrime} onChange={handleChange} />
                      Violent Crime
                    </label>
                    <label>
                      <input type="checkbox" name="earthquakes" checked={formData.earthquakes} onChange={handleChange} />
                      Earthquakes
                    </label>
                    <label>
                      <input type="checkbox" name="tornadoes" checked={formData.tornadoes} onChange={handleChange} />
                      Tornadoes
                    </label>
                  </div>
                )}
                {formData.transit && (
                  <div>
                    <h3>What type of transit?</h3>
                    <label>
                      <input type="checkbox" name="personalVehicle" checked={formData.personalVehicle} onChange={handleChange} />
                      Personal Vehicle
                    </label>
                    <label>
                      <input type="checkbox" name="metropolitanSubway" checked={formData.metropolitanSubway} onChange={handleChange} />
                      Metropolitan Subway or Light Rail
                    </label>
                    <label>
                      <input type="checkbox" name="metropolitanBus" checked={formData.metropolitanBus} onChange={handleChange} />
                      Metropolitan Bus
                    </label>
                    <label>
                      <input type="checkbox" name="regionalTrain" checked={formData.regionalTrain} onChange={handleChange} />
                      Regional Train
                    </label>
                    <label>
                      <input type="checkbox" name="regionalBus" checked={formData.regionalBus} onChange={handleChange} />
                      Regional Bus
                    </label>
                  </div>
                )}
                {formData.minorityFriendly && (
                  <div>
                    <h3>How do you measure minority friendliness?</h3>
                    <label>
                      <input type="checkbox" name="racialDiversity" checked={formData.racialDiversity} onChange={handleChange} />
                      Racial Diversity
                    </label>
                    <label>
                      <input type="checkbox" name="internationalStudents" checked={formData.internationalStudents} onChange={handleChange} />
                      Number of International Students
                    </label>
                    <label>
                      <input type="checkbox" name="variedLanguages" checked={formData.variedLanguages} onChange={handleChange} />
                      Varied Languages Spoken
                    </label>
                  </div>
                )}
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
                <h3>Pennsylvania State University </h3>
                <ul>
                  <li>Tuition: {result.tuition}</li>
                  <li>Location: {result.location}</li>
                  <li>Ranking: {result.ranking}</li>
                  <li>Minimum GPA: {result.minimumGPA}</li>
                  <li>Cost of Living: {result.costOfLiving}</li>
                  <li>Nearest Airport: {result.nearestAirport}</li>
                  <li>Walk Score: {result.walkScore}</li>
                  <img src="https://brand.psu.edu/images/backgrounds/veritcal-1-mark_registered.png"></img>
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
