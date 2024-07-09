export class LoginPage {
    constructor() {
        this.registerToggle = 'registertoggle';
        this.userNameInput = 'user';
        this.passwordInput = 'pass';
        this.submitButton = 'submitForm';
    }


    loginSuccess(username, password) {
        cy.getByDataCy(this.registerToggle).dblclick();
        cy.getByDataCy(this.userNameInput).type(username);
        cy.getByDataCy(this.passwordInput).type(password);
        cy.getByDataCy(this.submitButton).click();
    }
}

