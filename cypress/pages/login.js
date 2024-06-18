export class LoginPage {
    constructor() {
        this.userInput = '#user'
        this.passInput = '#pass'
        this.logInButton = '#submitForm'
    }
    escribirUsuario(usuario) {
        cy.get(this.userInput).type(usuario);
    };

    escribirContraseña(contraseña) {
        cy.get(this.passInput).type(contraseña);
    };

    clickLogIn() {
        cy.get(this.logInButton).click();
    };
}