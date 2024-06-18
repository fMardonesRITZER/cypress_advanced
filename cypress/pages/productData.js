
export class ProductData {
    constructor() {
        this.productName = '[data-cy="productName"]';
        this.productPrice = '[data-cy="productPrice"]';
        this.productCard = '[data-cy="productCard"]';
        this.productId = '[data-cy="productID"]';
        this.createProductButton = '[data-cy="createProduct"]';
    }

    completarFormulario(nombre, precio, imagen, id) {
        cy.get(this.productName).type(nombre);
        cy.get(this.productPrice).type(precio);
        cy.get(this.productCard).type(imagen);
        cy.get(this.productId).type(id);
        cy.get(this.createProductButton).click();
    }

    clickCancelarModal() {
        cy.get('[data-cy="closeModal"]').click();
    }
}

