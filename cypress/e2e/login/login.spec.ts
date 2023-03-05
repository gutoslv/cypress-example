describe('Login Page', function () {
  beforeEach(function () {
    //create an alias to intercept the login request on php
    cy.intercept('POST', '/authenticate.php').as('login');

    //loads users from fixtures and uses fixture to get the user login and password
    cy.fixture('users').as('users');

    cy.visit('/profile.php#login');

    //clear cookies before each test
    cy.clearCookies();
  });

  it('should login with valid credentials #TC-01', function () {
    //the password could be stored as a variable on .env file if we don't want to expose info on the code
    //since the data is available on the website we can store it on fixture file for now
    cy.loginUI(this.users.valid);

    //wait for the login request to finish

    cy.wait('@login');

    //verify if the user is redirected to the appointment page
    cy.url().should('include', '/#appointment');

    //verify if the user is logged in by checking if Book Appointment button is clickable
    cy.findByRole('button', {
      name: /book appointment/i,
    }).should('be.enabled');
  });

  it('should not login with invalid credentials #TC-02', function () {
    cy.loginUI(this.users.invalid);

    //wait for the login request to finish
    cy.wait('@login');

    //verify if the user stays on the login page
    cy.url().should('include', '/profile.php#login');

    //verify if the user is not logged in by checking that the Book Appointment button doesn't exist
    cy.findByRole('button', {
      name: /book appointment/i,
    }).should('not.exist');
  });

  it('should not login with empty credentials #TC-03', function () {
    //uses cy.clear() instead of cy.type() to clear the input
    cy.findByRole('textbox', {
      name: /username/i,
    }).clear();

    cy.findByLabelText(/password/i).clear();

    cy.findByRole('button', {
      name: /login/i,
    }).click();

    //wait for the login request to finish
    cy.wait('@login');

    //verify if the user stays on the login page
    cy.url().should('include', '/profile.php#login');

    //verify if the user is not logged in by checking that the Book Appointment button doesn't exist
    cy.findByRole('button', {
      name: /book appointment/i,
    }).should('not.exist');
  });
});
