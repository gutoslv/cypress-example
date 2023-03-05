import './commands';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to log in to the application using the UI
       * @param user - user object to log in
       * @param user.username - username to log in
       * @param user.password - password to log in
       * @example cy.loginUI({ username: 'John Doe', password: 'ThisIsNotAPassword' });
       */
      loginUI(user: { username: string; password: string }): Chainable<Element>;

      /**
       * Custom command to log in to the application using a request
       * @param user - user object to log in
       * @param user.username - username to log in
       * @param user.password - password to log in
       * @example cy.loginRequest({ username: 'John Doe', password: 'ThisIsNotAPassword' })
       */
      loginRequest(user: { username: string; password: string }): Chainable<Element>;
    }
  }
}
