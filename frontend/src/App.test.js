import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// App component is the UserProvider component for the whole app. We are testing the useContect hook here as well.

it("Renders app without crashing", function () {
  render(
    <MemoryRouter >
      <App />
    </MemoryRouter>);
});

