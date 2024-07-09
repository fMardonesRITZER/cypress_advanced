/// <reference types="Cypress" />
const directoryName = __dirname.replaceAll('\\', '/');
const module = directoryName.split(/[/]/)[2]
const prodName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const prodId = directoryName.split(/[-]/).pop();
import { ProductPage } from "../../../support/pages/productPage";
import { HomePage } from "../../../support/pages/homePage";

describe(`${module} `, () => {
    const productpage = new ProductPage();
    const homepage = new HomePage();

    before(() => {
        cy.loginApi(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.visit('');
    })

    it.only(`${prodName}-${prodId}`, () => {
        cy.fixture(`${module}/${prodName}-${prodId}/data`).then(data => {
            data.product.id = prodId;
            cy.deleteProductById(data.product.id);
            cy.createProduct(data.product).then(productID  => {
                cy.editProduct(productID, data.updatedProduct);
                homepage.onlineShop()
                productpage.searchProduct(data.product.id);



                cy.getByDataCy(productpage.searchedId).eq(0).should('be.visible').invoke('text').then(function(updatedProductName) {
                    expect(updatedProductName).to.be.equal(data.updatedProduct.name)
                });
                cy.getByDataCy(productpage.searchedProductPrice).eq(0).should('be.visible').invoke('text').then(function(updatedProductPrice) {
                    expect(updatedProductPrice).to.be.equal(`${data.updatedProduct.price}`)
                });
                cy.get('img[alt="Dan Abramov"]').should('be.visible').invoke('attr', 'src').then(function(updatedProductImg) {
                    expect(updatedProductImg).to.be.equal(data.updatedProduct.img)
                });
            });
        });
    });
})
