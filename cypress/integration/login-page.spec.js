/**
 * Use case : A customer is able to successfully log in with valid credentials
 * Pre-condition : Succesfully registered user
 * Acceptance criteria:
 * - Using valid credentials, a customer can successfully log in
 * - Using invalid credentials with not lead to a successful login
 */

import {LoginPage} from '../support/pages/LoginPage'

describe("Login functionality of Shop-apotheke", function () {
    const loginPage = new LoginPage()

    beforeEach(() => {

      //loads the user.json test data fixture
      cy.fixture("user").as("usersData");

      loginPage.navigate();
       
    });

    it("verifies login and registration forms are rendered", function () {
      //verify the login form is dispalyed
      loginPage.ValidateLoginFormTitle('Ich habe bereits ein Kundenkonto');
      //verify 'Passwort vergessen?' link is present and user is redirected to password reset page once the link is clicked
      loginPage.clickForgotPasswordLink();
      cy.url().should("eq", "https://www.shop-apotheke.com/pw_vergessen.htm");
      //go back to login page
      cy.go('back');

      //verify the registration form is dispalyed
      loginPage.ValidateRegistrationFormTitle('Ich möchte ein Kundenkonto erstellen');
      //verify 'Kundenkonto erstellen' link is present and error messages are generated for mandatory fields when an empty registration form is submitted
      loginPage.submitRegistration();
      loginPage.validateErrorMessage('Bitte prüfen Sie Ihre Eingaben.');
      loginPage.validateErrorForMandatoryFields(0,'Bitte wählen Sie eine Anrede.');
      loginPage.validateErrorForMandatoryFields(1,'Bitte geben Sie Ihren Vornamen ein.');
      loginPage.validateErrorForMandatoryFields(2,'Bitte geben Sie Ihren Nachnamen ein.');
      loginPage.validateErrorForMandatoryFields(3,'Bitte geben Sie eine E-Mail-Adresse ein.');
      loginPage.validateErrorForMandatoryFields(4,'Bitte geben Sie ein Passwort ein.');
      loginPage.validateErrorForMandatoryFields(5,'Bitte geben Sie Ihr Geburtsdatum ein.');
     
    });

    it("verifies error messages are generated for mandatory fields when an empty login form is submitted", function () {
      //submits form without providing mandatory fields(email,password)
      loginPage.submit();

      loginPage.validateErrorForMandatoryFields(0,'Bitte geben Sie die in Ihrem Account hinterlegte E-Mail-Adresse an. Eine Anmeldung per Benutzername ist nicht mehr möglich.');
      loginPage.validateErrorForMandatoryFields(1,'Bitte geben Sie Ihr Passwort ein.');

      cy.task("log", "Error messages are generated correctly when an empty login form is submitted!");
      
    });

    it("verifies user can login succesfully with valid credentials", function () {
  
      loginPage.enterEmail(Cypress.env("USER_EMAIL"));
      loginPage.enterPassword(Cypress.env("USER_PASSWORD"));

      loginPage.submit();

      //verify user is redirected to user account page after a succesful login
      cy.url().should("eq", "https://www.shop-apotheke.com/nx/account/");
      cy.contains('Kundennummer '+ Cypress.env("CUSTEMER_NUM"));

      cy.task("log", "Login is succesful with valid user credentials!");
      
    });

    it("verifies login is not succesful with invalid credentials", function () {
  
      //verifies error message incase of invalid email
      loginPage.enterEmail(this.usersData.InvalidEmail);
      loginPage.enterPassword(Cypress.env("USER_PASSWORD"));

      loginPage.submit();

      loginPage.validateErrorMessage('E-Mail-Adresse und/oder Passwort sind falsch. Bitte überprüfen Sie Ihre Eingaben.');

      cy.task("log", "Login is not succesful with invalid email and valid password combination!");
    
      //verifies error message incase of invalid password
      loginPage.enterEmail(Cypress.env("USER_EMAIL"));
      loginPage.enterPassword(this.usersData.InvalidPassword);

      loginPage.submit();

      loginPage.validateErrorMessage('E-Mail-Adresse und/oder Passwort sind falsch. Bitte überprüfen Sie Ihre Eingaben.');

      cy.task("log", "Login is not succesful with valid email and invalid password combination!");
    });
  
  });
  