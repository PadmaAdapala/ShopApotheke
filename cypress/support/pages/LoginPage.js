export class LoginPage {
    navigate() {
      cy.visit("/login.htm");
    }
  
    enterEmail(email) {
        cy.get('[data-qa-id="login-login-email-input"]')
            .clear()
            .type(email);
        return this;
    }
    
    enterPassword(pwd) {
        cy.get('[data-qa-id="login-login-password-input"]')
            .clear()
            .type(pwd,{log: false})
        return this;
    }

    submit() {
        cy.get('[data-qa-id="login-login-submit-button"]')
          .click();
    }

    validateErrorForMandatoryFields(errorIndex,expectedText){

        cy.get('[class="error-msg"]')
          .eq(errorIndex)
          .should('have.text', expectedText)
          .and('be.visible');
    }

    validateErrorMessage(expectedText){

        cy.get('[id="messages-error"]')
          .should('include.text', expectedText)
          .and('be.visible');
    }

    ValidateLoginFormTitle(expectedText)
    {
        cy.get('[data-qa-id="login-login"]')
        .find('.lead')
        .should('have.text', expectedText)
        .and('be.visible');

    }

    ValidateRegistrationFormTitle(expectedText)
    {
        cy.get('[data-qa-id="login-registration"]')
        .find('.lead')
        .should('have.text', expectedText)
        .and('be.visible');

    }
    
    clickForgotPasswordLink() {
        cy.get('[data-qa-id="login-registration-password-reveal"]')
        .click();
    }

    submitRegistration() {
        cy.get('[data-qa-id="login-registration-submit-button"]')
          .click();
    }

  }