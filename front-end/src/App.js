import React, { useState } from 'react';
import './App.css';

// thank you mui for your pre-styled components
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    major: '',
    gpa: '',
    tuition: 0,
    location: '',
    // country: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState(null);

  const majors = ['Biology', 'Computer Science', 'Mechanical Engineering', 'Mathematics', 'Physics', 'Electrical Engineering'];
  const [major, setMajor] = useState('');
  const [country, setCountry] = useState('');
  const [currency, setCurrency] = useState('');

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

  const handleMajorChange = (e) => {
    setMajor(e.target);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target);
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
          school: "Pennsylvania State University",
          tuition: '$30,000/year',
          location: 'State College, Pennsylvania',
          ranking: 'Top 50',
          averageGPA: '3.5',
          costOfLiving: '$45,000',
          nearestAirport: 'State College Airport (SCE) (5 miles)',
          walkScore: '75/100',
          imgURL: 'https://brand.psu.edu/images/backgrounds/veritcal-1-mark_registered.png'
        },
        {
          school: "University of Illinois at Urbana-Champaign",
          tuition: '$47,860/year',
          location: 'Urbana, IL',
          ranking: 'Top 50',
          AverageGPA: '3.7-4.0',
          costOfLiving: '$11,978',
          nearestAirport: 'Champaign Airport (CMI) (5miles) ',
          walkScore: ' 72.3/100',
          imgURL: 'https://marketing.illinois.edu/wp-content/uploads/2021/09/wordmark-orange-background.png'
        },
        {
          school: "Purdue University, West Lafayette",
          tuition: '$45,954/year',
          location: 'West Lafayette, Indiana',
          ranking: 'Top 50',
          averageGPA: '3.74',
          costOfLiving: '$15,276',
          nearestAirport: 'Indianapolis Airport (IND) (59.7 miles)',
          walkScore: '51/100',
          imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Purdue_Boilermakers_logo.svg/1024px-Purdue_Boilermakers_logo.svg.png'
        }
        // Add more result objects as needed
      ]
    };
    setResults(fakeApiResults);
    setSubmitted(true);
  };

  const calculateEquivalentGPA = () => {
    let equivalentGPA = parseFloat(formData.gpa);
    if (!equivalentGPA) return 0;

    if (formData.country === 'Canada' || formData.country === 'India') {
      // Assuming a linear scale where 100% is equivalent to 4.0 GPA
      equivalentGPA = (equivalentGPA / 100) * 4.0;

      // Ensure the GPA does not exceed 4.0
      equivalentGPA = Math.min(equivalentGPA, 4.0);
    } else if (formData.country === 'Thailand') {
      // Assuming Thailand's 4.0 scale is equivalent to the US's
      // Make sure GPA is not more than 4.0
      equivalentGPA = Math.min(equivalentGPA, 4.0);
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
        <p>Anon(Jeff), Kelly, Mykola, Pete, and Sai for HackPSU 2024</p>
      </header>

      <div className="form-container">
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <article>
                <h2>What do you want your major to be?</h2>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Major</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={formData.major}
                    label="Major"
                    onChange={handleChange}
                  >
                    {majors.map((major, index) => <MenuItem value={major} onChange={handleMajorChange}>{major}</MenuItem>)}
                  </Select>
                </FormControl>
              </article>
            )}
            {step === 2 && (
              <article>
                <h2>What are your school grades?</h2>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Country"
                    name='country'
                    onChange={handleChange}
                  >
                    <MenuItem value="Canada" onChange={handleCountryChange}>Canada</MenuItem>
                    <MenuItem value="India" onChange={handleCountryChange}>India</MenuItem>
                    <MenuItem value="Thailand" onChange={handleCountryChange}>Thailand</MenuItem>
                  </Select>
                </FormControl>
                <TextField id="outlined-basic" variant="outlined" type="number" name="gpa" value={formData.gpa} onChange={handleChange} />
                {formData.country && (
                  <p>Your equivalent US GPA is: {calculateEquivalentGPA()}</p>
                )}
              </article>
            )}
            {step === 3 && (
              <article>
                <h2>Tuition budget</h2>
                <FormControl>
                  <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Country"
                    onChange={handleChange}
                    name="currency"
                  >
                    <MenuItem value="" onChange={handleCurrencyChange}>Please choose...</MenuItem>
                    <MenuItem value="thai_baht" onChange={handleCurrencyChange}>Thai Baht (฿)</MenuItem>
                    <MenuItem value="canadian_dollars" onChange={handleCurrencyChange}>Canadian Dollars ($)</MenuItem>
                    <MenuItem value="indian_rupee" onChange={handleCurrencyChange}>Indian Rupee (₹)</MenuItem>
                  </Select>
                </FormControl>
                <TextField id="outlined-basic" variant="outlined" type="number" name="tuition" value={formData.tuition} onChange={handleChange} />
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
                    <div className='too-long'>
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
                  </div>
                )}
                {formData.minorityFriendly && (
                  <div>
                    <h3>How do you measure minority friendliness?</h3>
                    <div className='too-long'>
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
                  </div>
                )}
              </article>
            )}
            <article className="buttons">
              <ButtonGroup variant="contained" aria-label="Basic button group">
                {step > 1 && <Button onClick={handlePrevious}>Previous</Button>}
                {step < 4 && <Button onClick={handleNext}>Next</Button>}
                {step === 4 && <Button type='submit' onClick={handleSubmit}>Submit</Button>}
              </ButtonGroup>

            </article>
          </form>
        ) : (
          <section className="results">
            <h1>Your Results</h1>
            <h2>Major: {results.major}</h2>
            {results.results.map((result, index) => (<Accordion>
              <AccordionSummary
                // expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                {/* penn state */}
                {console.log("a string", result.school)}
                {result.school}
              </AccordionSummary>
              <AccordionDetails>
                <ul>
                  
                  <li>Tuition: {result.tuition}</li>
                  <li>Location: {result.location}</li>
                  <li>Ranking: {result.ranking}</li>
                  <li>Minimum GPA: {result.minimumGPA}</li>
                  <li>Cost of Living: {result.costOfLiving}</li>
                  <li>Nearest Airport: {result.nearestAirport}</li>
                  <li>Walk Score: {result.walkScore}</li>
                  <img src={result.imgURL}></img>

                  <li>Notes: {result.notes}</li>
                </ul>
              </AccordionDetails>
            </Accordion>
            ))}

            {/* <div key={index} className="result-section">
                <h3>Pennsylvania State University </h3>

              </div> */}

          </section>
        )}
      </div>
      <footer className='footer'>

      </footer>
    </div>
  );
}

export default App;
