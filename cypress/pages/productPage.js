export class ProductsPage {
    constructor() {
        // Login Page Selectors
        this.userInput = '#user';
        this.passInput = '#pass';
        this.logInButton = '#submitForm';

        // Add Products Page Selectors
        this.productsPageLink = '#onlineshoplink';
        this.addProductButton = '[data-cy="add-product"]';

        // Product Data Selectors
        this.productNameInput = '[data-cy="productName"]';
        this.productPriceInput = '[data-cy="productPrice"]';
        this.productCardInput = '[data-cy="productCard"]';
        this.productIdInput = '[data-cy="productID"]';
        this.createProductButton = '[data-cy="createProduct"]';
        this.closeModalButton = '[data-cy="closeModal"]';

        // Search Product Selectors
        this.searchTypeSelect = '[data-cy="search-type"]';
        this.searchBarInput = '[data-cy="search-bar"]';

        // Delete Product Selectors
        this.deleteButton = '[data-cy="delete-9999"]';
        this.confirmDeleteButton = '#saveEdit';

        // Edit Product Selectors
        this.editProductButton = '[data-cy="edit-product"]';
        this.saveEditButton = '[data-cy="save-edit"]';
    }

    // Login Methods
    escribirUsuario(usuario) {
        cy.get(this.userInput).type(usuario);
    }

    escribirContraseña(contraseña) {
        cy.get(this.passInput).type(contraseña);
    }

    clickLogIn() {
        cy.get(this.logInButton).click();
    }

    // Add Products Methods
    clickProductsPage() {
        cy.get(this.productsPageLink, { timeout: 10000 }).should('be.visible').click();
    }

    clickAddProductsPage() {
        cy.get(this.addProductButton, { timeout: 10000 }).should('be.visible').click();
    }

    completarFormulario(nombre, precio, imagen, id) {
        cy.get(this.productNameInput).type(nombre);
        cy.get(this.productPriceInput).type(precio);
        cy.get(this.productCardInput).type(imagen);
        cy.get(this.productIdInput).type(id);
        cy.get(this.createProductButton).click();
    }

    // Search Product Methods
    clickSearchProduct(id) {
        cy.get(this.searchTypeSelect).select(id);
    }

    enterProductId(id) {
        cy.get(this.searchBarInput).type(id);
    }

    // Delete Product Methods
    DeleteProductById() {
        cy.get(this.deleteButton).click();
    }

    DeleteDefitivo() {
        cy.get(this.confirmDeleteButton).click();
    }

    closeModal() {
        cy.get(this.closeModalButton).click();
    }

    // Edit Product Methods
    clickEditProduct() {
        cy.get(this.editProductButton).click();
    }

    editProductData(nombre, precio, imagen) {
        cy.get(this.productNameInput).clear().type(nombre);
        cy.get(this.productPriceInput).clear().type(precio);
        cy.get(this.productCardInput).clear().type(imagen);
        cy.get(this.saveEditButton).click();
    }

    // Helper Methods
    initializeProductData(data) {
        this.productData = data;
    }

    logIn(usuario, password) {
        cy.get('[data-cy="registertoggle"]').dblclick();
        this.escribirUsuario(usuario);
        this.escribirContraseña(password);
        this.clickLogIn();
    }

    addProduct(productData) {
        this.clickProductsPage();
        this.clickAddProductsPage();
        this.completarFormulario(
            productData.productName,
            productData.productPrice,
            productData.productCard,
            productData.productId
        );
    }

    searchAndDeleteProduct(productId) {
        this.clickSearchProduct('id');
        this.enterProductId(productId + '{enter}');
        this.DeleteProductById();
        this.DeleteDefitivo();
        this.closeModal();
        this.enterProductId(productId + '{enter}');
    }

    verifyProductDeletion(productId) {
        cy.get(`[data-cy="producto-${productId}"]`).should('not.exist');
    }

    searchProductById(productId) {
        this.clickSearchProduct('id');
        this.enterProductId(productId + '{enter}');
    }

    verifyProductDetails(nombre, precio, imagen) {
        cy.get('[data-cy="product-details"]').within(() => {
            cy.get('[data-cy="productName"]').should('have.text', nombre);
            cy.get('[data-cy="productPrice"]').should('have.text', precio);
            cy.get('[data-cy="productCard"]').should('have.attr', 'src', imagen);
        });
    }
}
