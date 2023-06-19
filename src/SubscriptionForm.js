import React, { useState } from 'react';

const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [preferences, setPreferences] = useState({
    politics: false,
    sports: false,
    economy: false,
    entertainment: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const chosenPreferences = Object.keys(preferences).filter(preference => preferences[preference]);

    fetch('http://localhost:3001/subscriptions', { // substitua com a URL correta do seu servidor
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, preferences: chosenPreferences }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  };

  const handleCheckboxChange = (e) => {
    setPreferences(prevPreferences => ({
      ...prevPreferences,
      [e.target.name]: e.target.checked,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>

      <div>
        Preferências:
        <label>
          <input
            type="checkbox"
            name="politics"
            checked={preferences.politics}
            onChange={handleCheckboxChange}
          />
          Política
        </label>
        <label>
          <input
            type="checkbox"
            name="sports"
            checked={preferences.sports}
            onChange={handleCheckboxChange}
          />
          Esporte
        </label>
        <label>
          <input
            type="checkbox"
            name="economy"
            checked={preferences.economy}
            onChange={handleCheckboxChange}
          />
          Economia
        </label>
        <label>
          <input
            type="checkbox"
            name="entertainment"
            checked={preferences.entertainment}
            onChange={handleCheckboxChange}
          />
          Entretenimento
        </label>
      </div>

      <button type="submit">Inscrever-se</button>
    </form>
  );
};

export default SubscriptionForm;
