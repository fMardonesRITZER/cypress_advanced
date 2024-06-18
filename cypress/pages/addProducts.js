export class AddProductsPage {
    clickProductsPage() {
        cy.get('#onlineshoplink', { timeout: 10000 }).should('be.visible').click();
    }

    clickAddProductsPage() {
        cy.get('[data-cy="add-product"]', { timeout: 10000 }).should('be.visible').click();
    }
}
