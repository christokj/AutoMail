import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  axios.defaults.baseURL = 'http://localhost:3000/';
  axios.defaults.withCredentials = true;

  const [values, setValues] = useState({});
  const [response, setResponse] = useState(null);

  const ChangeHandler = (e) => {
    setValues(values => ({ ...values, [e.target.name]: e.target.value }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/sendMail/send', { values });
      setResponse(res.data.message);
    } catch (error) {
      console.error('Error:', error);
      setResponse('Failed to send email');
    }
  };
  useEffect(() => {
    if (response) {
      alert("Response: " + response);
    }
  }, [response]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Receiver email</label>
          <input
            type="email"
            name='email'
            value={values.email}
            onChange={ChangeHandler}
            required
          />
        </div>
        <div>
          <label>Subject</label>
          <input
            type="text"
            name='text'
            value={values.text}
            onChange={ChangeHandler}
            required
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            name='message'
            value={values.message}
            onChange={ChangeHandler}
            required
          />
        </div>
        <button type="submit">Send</button>
      </form>

    </div>
  );
}

export default App;
