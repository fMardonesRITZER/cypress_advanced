export class CheckOut {
    constructor() {
        // Definir los selectores de los campos del formulario
        this.firstNameInput = '[data-cy="firstName"]';
        this.lastNameInput = '[data-cy="lastName"]';
        this.cardNumberInput = '[data-cy="cardNumber"]';
    }

    // Método para llenar los campos del formulario de checkout
    CheckOutSuccess(firstName, lastName, cardNumber) {


        // Escribir el primer nombre en el campo correspondiente
        cy.get(this.firstNameInput).type('Francisco');

        // Escribir el apellido en el campo correspondiente
        cy.get(this.lastNameInput).type('NANDO');

        // Escribir el nombre en la tarjeta en el campo correspondiente
        cy.get(this.cardNumberInput).type(1234567891234567);
    }

    buttonCheckoutBuy () {
        cy.get('[data-cy="purchase"]').click();
    }

    buttonTy () {
        cy.get('[data-cy="thankYou"]').click();
    }
}

