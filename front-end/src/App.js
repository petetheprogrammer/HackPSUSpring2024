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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

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
        imgURL: 'https://brand.psu.edu/images/backgrounds/veritcal-1-mark_registered.png',
        notes: 'beautiful campus set in the hills of pennsylvania, bike friendly campus'
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
        imgURL: 'https://marketing.illinois.edu/wp-content/uploads/2021/09/wordmark-orange-background.png',
        notes: 'extremely bike friendly campus, great computer science program, low cost of living'
      },
      {
        school: "Purdue University",
        tuition: '$45,954/year',
        location: 'West Lafayette, Indiana',
        ranking: 'Top 50',
        averageGPA: '3.74',
        costOfLiving: '$15,276',
        nearestAirport: 'Indianapolis Airport (IND) (59.7 miles)',
        walkScore: '51/100',
        imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Purdue_Boilermakers_logo.svg/1024px-Purdue_Boilermakers_logo.svg.png',
        notes: 'moderate cost of living, cradle of astronauts, great college atmosphere'
      },
      {
        school: "University of Pittsburgh",
        tuition: '$36,000/year',
        location: 'Pittsburgh, Pennsylvania',
        ranking: 'Top 100',
        averageGPA: '3.93-4.37',
        costOfLiving: '$17,880',
        nearestAirport: 'Pittsburgh Intl Aiport (PIT) (19.5 miles)',
        walkScore: '62/100',
        imgURL: 'https://skyfoundationinc.org/wp-content/uploads/2018/06/University_of_Pittsburgh_LOGO.png',
        notes: "Walkable city, good public transit, awesome access to airport"
      },
      {
        school: "New York University",
        tuition: "$60,438",
        location: "New York, New York",
        ranking: "35/100",
        averageGPA: "3.7",
        costOfLiving: "$24,102",
        nearestAirport: "New York La Guardia (LGA) (7.3 miles)",
        walkScore: "88/100",
        imgURL: 'https://logos-download.com/wp-content/uploads/2021/01/New_York_University_Logo.png',
        notes: "Expensive, and you get to live in new york city. Enough said."
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
        <h1>007</h1>
        <p>No time to code</p>
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
                    value={formData.major}
                    label="Major"
                    onChange={handleChange}
                    name='major'
                  >
                    {majors.map((major, index) => (
                      <MenuItem value={major} onChange={handleMajorChange}>{major}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </article>
            )}
            {step === 2 && (
              <article>
                <h2>What are your school grades, in your country?</h2>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-label">Country</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Country"
                    name='country'
                    onChange={handleChange}
                  >
                    <MenuItem value="" onChange={handleCurrencyChange}>Please choose...</MenuItem>
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
                <h2>What is your budget for tuition, per year?</h2>
                <FormControl sx={{ minWidth: 120 }}>
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
                <FormControlLabel
                  control={<Checkbox name="safety" checked={formData.safety} onChange={handleChange} />}
                  label="Safety"
                />
                <FormControlLabel
                  control={<Checkbox name="transit" checked={formData.transit} onChange={handleChange} />}
                  label="Transit Accessible"
                />
                <FormControlLabel
                  control={<Checkbox name="minorityFriendly" checked={formData.minorityFriendly} onChange={handleChange} />}
                  label="Minority Friendly"
                />
                {formData.safety && (
                  <div>
                    <h3>What safety risks do you want to avoid?</h3>
                    <FormControlLabel
                      control={<Checkbox name="violentCrime" checked={formData.violentCrime} onChange={handleChange} />}
                      label="Violent Crime"
                    />
                    <FormControlLabel
                      control={<Checkbox name="earthquakes" checked={formData.earthquakes} onChange={handleChange} />}
                      label="Earthquakes"
                    />
                    <FormControlLabel
                      control={<Checkbox name="tornadoes" checked={formData.tornadoes} onChange={handleChange} />}
                      label="Tornadoes"
                    />
                  </div>
                )}
                {formData.transit && (
                  <div>
                    <h3>What type of transit will you need?</h3>
                    <div className='too-long'>
                      <FormControlLabel
                        control={<Checkbox name="personalVehicle" checked={formData.personalVehicle} onChange={handleChange} />}
                        label="Personal Vehicle"
                      />
                      <FormControlLabel
                        control={<Checkbox name="metropolitanSubway" checked={formData.metropolitanSubway} onChange={handleChange} />}
                        label="Metropolitan Subway or Light Rail"
                      />
                      <FormControlLabel
                        control={<Checkbox name="metropolitanBus" checked={formData.metropolitanBus} onChange={handleChange} />}
                        label="Metropolitan Bus"
                      />
                      <FormControlLabel
                        control={<Checkbox name="regionalTrain" checked={formData.regionalTrain} onChange={handleChange} />}
                        label="Regional Train"
                      />
                      <FormControlLabel
                        control={<Checkbox name="regionalBus" checked={formData.regionalBus} onChange={handleChange} />}
                        label="Regional Bus"
                      />
                    </div>
                  </div>
                )}
                {formData.minorityFriendly && (
                  <div>
                    <h3>How do you measure minority friendliness?</h3>
                    <div className='too-long'>
                      <FormControlLabel
                        control={<Checkbox name="racialDiversity" checked={formData.racialDiversity} onChange={handleChange} />}
                        label="Racial Diversity"
                      />
                      <FormControlLabel
                        control={<Checkbox name="internationalStudents" checked={formData.internationalStudents} onChange={handleChange} />}
                        label="Number of International Students"
                      />
                      <FormControlLabel
                        control={<Checkbox name="variedLanguages" checked={formData.variedLanguages} onChange={handleChange} />}
                        label="Varied Languages Spoken"
                      />
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
            <h3>Major: {formData.major}</h3>
            {results.results.map((result, index) => (
              <Accordion>
                <AccordionSummary
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <img src={result.imgURL}></img>
                  <h4>{result.school}</h4>
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
                    <li className='italics'>What the locals say: {result.notes}</li>
                  </ul>
                </AccordionDetails>
              </Accordion>
            ))}
          </section>
        )}
      </div>
      <footer className='footer'>

      </footer>
    </div>
  );
}

export default App;
