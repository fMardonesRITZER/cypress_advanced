export class DeleteProduct {
    DeleteProductById() {
        cy.get('[data-cy="delete-9999"]').click();
    }

    DeleteDefitivo () {
        cy.get('#saveEdit').click();
        
    }
    closeModal() {
        cy.get('[data-cy="closeModal"]').click();
    }
    
}

