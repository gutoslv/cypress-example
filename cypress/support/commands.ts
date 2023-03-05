import '@testing-library/cypress/add-commands';

// Command to login to the application using the UI
Cypress.Commands.add('loginUI', (user: { username: string; password: string }) => {
  cy.findByRole('textbox', {
    name: /username/i,
  }).type(user.username);
  cy.findByLabelText(/password/i).type(user.password);
  cy.findByRole('button', {
    name: /login/i,
  }).click();
});

// Command to login to the application using a request
Cypress.Commands.add('loginRequest', (user: { username: string; password: string }) => {
  cy.request({
    method: 'POST',
    url: '/authenticate.php',
    form: true,
    body: {
      username: user.username,
      password: user.password,
    },
  });
});
