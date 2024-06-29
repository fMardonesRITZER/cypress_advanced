import { ProductsPage } from "../../pages/productPage";

describe('Desafio 1', () => {
    let productsPage;
    let check;

    before(() => {
        productsPage = new ProductsPage();

        cy.fixture('createProducts.json').then((data) => {
            check = data;
            productsPage.initializeProductData(check);
        });
    });

    it('Unico Test', () => {
        cy.visit('/');

        productsPage.logIn(Cypress.env('usuario'), Cypress.env('password'));
        productsPage.addProduct(check);
        productsPage.searchAndDeleteProduct(check.productId);
        productsPage.verifyProductDeletion(check.productId);
    });
});
