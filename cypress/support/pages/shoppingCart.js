export class ShoppingCart {

    buttonSibbling () {

        cy.get('[data-cy="goBillingSummary"]').click();
    }

    buttonCheackout () {
        cy.get('[data-cy="goCheckout"]').click();
    }

    
}