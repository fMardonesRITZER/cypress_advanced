import { LoginPage } from "../../pages/login";
import { AddProductsPage } from "../../pages/addProducts";
import { ProductData } from "../../pages/productData";
import { SearchProduct } from "../../pages/searchProducts";
import { DeleteProduct } from "../../pages/deleteProducts"; 

describe('Desafio 1', () => {
    let loginPage;
    let addProducts;
    let productData;
    let searchProducts;
    let deleteProducts; 
    let check; 

    before(() => {
        loginPage = new LoginPage();
        addProducts = new AddProductsPage();
        searchProducts = new SearchProduct();
        deleteProducts = new DeleteProduct();
        
        cy.fixture('createProducts.json').then((data) => {
            check = data;
            productData = new ProductData(check.productName, check.productPrice, check.productCard, check.productId);
        });
    });

    it('Unico Test', () => {
        cy.visit('/');
        cy.get('[data-cy="registertoggle"]').dblclick();

        loginPage.escribirUsuario(Cypress.env('usuario')); 
        loginPage.escribirContraseña(Cypress.env('password')); 
        loginPage.clickLogIn();

        addProducts.clickProductsPage();
        addProducts.clickAddProductsPage();

        productData.completarFormulario(check.productName, check.productPrice, check.productCard, check.productId);

        searchProducts.clickSearchProduct('id');
        searchProducts.enterProductId(check.productId + '{enter}');
        deleteProducts.DeleteProductById(check.productId)
        deleteProducts.DeleteDefitivo();
        deleteProducts.closeModal();
        searchProducts.enterProductId(check.productId + '{enter}');

        cy.get('[data-cy="producto-' + check.productId + '"]').should('not.exist');

    });
});






