/// <reference types="Cypress" />
const directoryName = __dirname.replaceAll('\\', '/');
const module = directoryName.split(/[/]/)[2]
const suiteName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const suiteId = directoryName.split(/[-]/).pop();
import { ProductPage } from "../../../support/pages/productPage";
import { HomePage } from "../../../support/pages/homePage";

describe(`${module} `, () => {

    const productpage = new ProductPage();
    const homepage = new HomePage();
    before(() => {
        cy.login(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.visit('');
    })
    it.only(`${suiteName}-${suiteId}`, () => {
        cy.fixture(`${module}/${suiteName}-${suiteId}/data`).then(data => {
            data.product.id = suiteId;
            cy.deleteProductById(data.product.id);
            cy.createProduct(data.product).then(productID  => {
                cy.editProduct(productID, data.updatedProduct);
                homepage.goToOnlineShop()
                productpage.searchProduct(data.product.id);

                cy.intercept('GET', '**/api/products?id=2').as('getProduct');
                cy.wait('@getProduct').its('response.statusCode').should('eq', 200);

                cy.getByDataCy(productpage.productName).eq(0).should('be.visible').invoke('text').then(function(updatedProductName) {
                    expect(updatedProductName).to.be.equal(data.updatedProduct.name)
                });
                cy.getByDataCy(productpage.productPrice).eq(0).should('be.visible').invoke('text').then(function(updatedProductPrice) {
                    expect(updatedProductPrice).to.be.equal(`${data.updatedProduct.price}`)
                });
                cy.get('img[alt="Dan Abramov"]').should('be.visible').invoke('attr', 'src').then(function(updatedProductImg) {
                    expect(updatedProductImg).to.be.equal(data.updatedProduct.img)
                });
            });
        });
    });
})