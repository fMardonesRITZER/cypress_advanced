export class SearchProduct {
    clickSearchProduct(id) {
        cy.get('[data-cy="search-type"]').select(id);
    }

    enterProductId(id) {
        cy.get('[data-cy="search-bar"]').type(id);
    }
}
