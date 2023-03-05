describe('Appointment Page - Logged in', function () {
  beforeEach(function () {
    //clear cookies before each test
    cy.clearCookies();

    //create an alias to intercept the appointment request on php
    cy.intercept('POST', '/appointment.php').as('appointment');

    //login using the request form
    cy.fixture('users').then((users) => {
      cy.loginRequest(users.valid);
    });

    cy.visit('/#appointment');
  });

  it('should successfully book an appointment #TC-01', function () {
    //create the appointment object with the data to be used on the test
    const appointment = {
      facility: 'Hongkong CURA Healthcare Center',
      readmission: true,
      program: 'Medicaid',
      visitDate: '15/03/2023',
      comment: 'Early morning appointment',
    };

    //book an appointment
    bookAppointment(appointment);

    cy.wait('@appointment');

    //validate if the user is redirected to the appointment page summary
    cy.url().should('include', '/appointment.php#summary');

    //validate if the appointment was booked with correct data
    cy.findByRole('heading', {
      name: /appointment confirmation/i,
    }).should('be.visible');

    cy.findByText(/please be informed that your appointment has been booked as following:/i).should(
      'be.visible',
    );

    cy.get('p#facility').should('have.text', appointment.facility).and('be.visible');
    cy.get('p#hospital_readmission')
      .should('have.text', getHospitalReadmissionText(appointment.readmission))
      .and('be.visible');
    cy.get('p#program').should('have.text', appointment.program).and('be.visible');
    cy.get('p#visit_date').should('have.text', appointment.visitDate).and('be.visible');
    cy.get('p#comment').should('have.text', appointment.comment).and('be.visible');
    cy.findByRole('link', {
      name: /go to homepage/i,
    })
      .should('be.visible')
      .and('have.attr', 'href', 'https://katalon-demo-cura.herokuapp.com/');

    //verify if user can see the new appointment on the appointment history page
    cy.visit('/history.php#history');

    cy.get('.panel')
      .first()
      .within(() => {
        cy.get('.panel-heading').should('have.text', appointment.visitDate);

        cy.get('p#facility').should('have.text', appointment.facility).and('be.visible');
        cy.get('p#hospital_readmission')
          .should('have.text', getHospitalReadmissionText(appointment.readmission))
          .and('be.visible');
        cy.get('p#program').should('have.text', appointment.program).and('be.visible');
        cy.get('p#comment').should('have.text', appointment.comment).and('be.visible');
      });
  });

  it('should not book an appointment with empty Visit date #TC-03', function () {
    //make sure that the visit date is empty
    cy.findByRole('textbox', {
      name: /visit date \(required\)/i,
    }).clear();

    //validate that the visit date is a required field, since the warning is generated by the browser
    cy.findByRole('textbox', {
      name: /visit date \(required\)/i,
    }).should('have.attr', 'required');

    //try to book an appointment
    cy.findByRole('button', {
      name: /book appointment/i,
    }).click();

    //user should not be redirected to the appointment page summary
    cy.url().should('include', '/#appointment');

    //user should not see the appointment confirmation message
    cy.findByRole('heading', {
      name: /appointment confirmation/i,
    }).should('not.exist');

    //user should not see the appointment in the appointment history page
    cy.visit('/history.php#history');
    cy.findByText('No appointment.').should('be.visible');
  });

  it('should successfully book an appointment in the same date as an existing appointment #TC-04', function () {
    //create the appointments objects with the data to be used on the test
    const appointment1 = {
      facility: 'Tokyo CURA Healthcare Center',
      readmission: false,
      program: 'None',
      visitDate: '12/04/2023',
      comment: 'Afternoon first appointment',
    };

    const appointment2 = {
      facility: 'Seoul CURA Healthcare Center',
      readmission: true,
      program: 'Medicare',
      visitDate: '12/04/2023',
      comment: 'Afternoon second appointment',
    };

    //create pre-conditional appointment in the same date
    bookAppointment(appointment1);
    cy.wait('@appointment');

    //visit the appointment page to book the second appointment
    cy.visit('/#appointment');

    //create the second appointment in the same date
    bookAppointment(appointment2);
    cy.wait('@appointment');

    //validate if the user is redirected to the appointment page summary
    cy.url().should('include', '/appointment.php#summary');

    //validate if the appointment was booked with correct data
    cy.findByRole('heading', {
      name: /appointment confirmation/i,
    }).should('be.visible');

    cy.findByText(/please be informed that your appointment has been booked as following:/i).should(
      'be.visible',
    );

    cy.get('p#facility').should('have.text', appointment2.facility).and('be.visible');
    cy.get('p#hospital_readmission')
      .should('have.text', getHospitalReadmissionText(appointment2.readmission))
      .and('be.visible');
    cy.get('p#program').should('have.text', appointment2.program).and('be.visible');
    cy.get('p#visit_date').should('have.text', appointment2.visitDate).and('be.visible');
    cy.get('p#comment').should('have.text', appointment2.comment).and('be.visible');
    cy.findByRole('link', {
      name: /go to homepage/i,
    })
      .should('be.visible')
      .and('have.attr', 'href', 'https://katalon-demo-cura.herokuapp.com/');

    //validate that both appointments are displayed in the appointment history page
    cy.visit('/history.php#history');

    //validate the first appointment
    cy.get('.panel')
      .eq(0)
      .within(() => {
        cy.get('.panel-heading').should('have.text', appointment1.visitDate);

        cy.get('p#facility').should('have.text', appointment1.facility).and('be.visible');
        cy.get('p#hospital_readmission')
          .should('have.text', getHospitalReadmissionText(appointment1.readmission))
          .and('be.visible');
        cy.get('p#program').should('have.text', appointment1.program).and('be.visible');
        cy.get('p#comment').should('have.text', appointment1.comment).and('be.visible');
      });

    //validate the second appointment
    cy.get('.panel')
      .eq(1)
      .within(() => {
        cy.get('.panel-heading').should('have.text', appointment2.visitDate);

        cy.get('p#facility').should('have.text', appointment2.facility).and('be.visible');
        cy.get('p#hospital_readmission')
          .should('have.text', getHospitalReadmissionText(appointment2.readmission))
          .and('be.visible');
        cy.get('p#program').should('have.text', appointment2.program).and('be.visible');
        cy.get('p#comment').should('have.text', appointment2.comment).and('be.visible');
      });
  });
});

/**
 * Helper function to book an appointment
 * @param {Object} appointment - The appointment object
 * @param {string} appointment.facility - The facility name
 * @param {boolean} appointment.hospitalReadmission - The hospital readmission value
 * @param {string} appointment.healthcareProgram - The healthcare program value
 * @param {string} appointment.visitDate - The visit date value
 * @param {string} appointment.comment - The comment value
 * @example bookAppointment({ facility: 'Hongkong CURA Healthcare Center', hospitalReadmission: true, healthcareProgram: 'Medicaid', visitDate: '15/03/2023', comment: 'Early morning appointment' })
 */
function bookAppointment(appointment) {
  //get the day from visit date
  const day = appointment.visitDate.split('/')[0];

  //select facility
  cy.findByRole('combobox', {
    name: /facility/i,
  }).select(appointment.facility);

  //toggle hospital readmission if needed
  cy.findByRole('checkbox', {
    name: /apply for hospital readmission/i,
  }).then((checkbox) => {
    if (appointment.readmission && !checkbox.prop('checked')) {
      checkbox.trigger('click');
    } else if (!appointment.readmission && checkbox.prop('checked')) {
      checkbox.trigger('click');
    }
  });

  //select healthcare program
  cy.findByRole('radio', {
    name: appointment.program,
  }).check();

  //select visit date
  cy.findByRole('textbox', {
    name: /visit date \(required\)/i,
  }).type(appointment.visitDate);

  cy.findByRole('cell', {
    name: day,
  }).click();

  //write a comment
  cy.findByRole('textbox', {
    name: /comment/i,
  }).type(appointment.comment);

  //book appointment
  cy.findByRole('button', {
    name: /book appointment/i,
  }).click();
}

/**
 * Helper function that returns the expected text based on hospital readmission value
 * @param {boolean} hospitalReadmission - The hospital readmission value
 * @returns {string} - The expected text
 * @example getHospitalReadmissionText(true) // returns 'Yes'
 */
function getHospitalReadmissionText(hospitalReadmission) {
  return hospitalReadmission ? 'Yes' : 'No';
}
