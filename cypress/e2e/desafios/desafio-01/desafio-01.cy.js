/// <reference types="Cypress" />
import Login from "../../../pageObjects/loginPage"
import OnlineShop from "../../../pageObjects/onlineShopPage";
const directoryName = __dirname.replaceAll('\\', '/');
const module = directoryName.split(/[/]/)[2]
const suiteName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const suiteId = directoryName.split(/[-]/).pop();


describe(`${module}`, () => {
    it('test', () => {
        cy.log(directoryName)
        cy.log(module)
        cy.log(suiteId)
        cy.log(suiteName)
    })
    it(`${suiteName}-${suiteId}`, () => {
        cy.fixture(`${module}/${suiteName}-${suiteId}/${suiteId}.json`).then(data => {
            cy.log(data.user.name)
            cy.log(data.user.password)
        cy.visit('/')
        cy.get('[data-cy="registertoggle"]').dblclick()
        cy.get('[data-cy="user"]').type(data.user.name)
        cy.get('[data-cy="pass"]').type(data.user.password)
        cy.get('[data-cy="submitForm"]').click()
        cy.get('[data-cy="onlineshoplink"]').click()
        cy.get('[data-cy="add-product"]').click()
        cy.get('[data-cy="productName"]').type(data.producto.name)
        cy.get('[data-cy="productPrice"]').type(data.producto.price)
        cy.get('[data-cy="productCard"]').type(data.producto.imgUrl)
        cy.get('[data-cy="productID"]').type(data.producto.id)
        cy.get('[data-cy="createProduct"]').click()
        cy.get('[data-cy="closeModal"]').click()
        cy.get('[data-cy="search-type"]').select('id')
        cy.get('[data-cy="search-bar"]').type(`${data.producto.id}{enter}`)
        cy.get('[data-cy="delete-666"]').click()
        cy.get('#saveEdit').click()
        cy.get('[data-cy="closeModal"]').click()
        })
    })
    it(`${suiteName}-${suiteId}`, () => {
        cy.fixture(`${module}/${suiteName}-${suiteId}/${suiteId}.json`).then(data => {
            cy.log(data.user.name)
            cy.log(data.user.password)
        cy.visit('/')
        cy.getByDataCy('registertoggle').dblclick();
        cy.getByDataCy('user').type(data.user.name);
        cy.getByDataCy('pass').type(data.user.password);
        cy.getByDataCy('submitForm').click();
        cy.getByDataCy('onlineshoplink').click();
        cy.getByDataCy('add-product').click();
        cy.getByDataCy('productName').type(data.producto.name);
        cy.getByDataCy('productPrice').type(data.producto.price);
        cy.getByDataCy('productCard').type(data.producto.imgUrl);
        cy.getByDataCy('productID').type(data.producto.id);
        cy.getByDataCy('createProduct').click();
        cy.getByDataCy('closeModal').click();
        cy.getByDataCy('search-type').select('id');
        cy.getByDataCy('search-bar').type(`${data.producto.id}{enter}`);
        cy.getByDataCy('delete-666').click();
        cy.get('#saveEdit').click();
        cy.getByDataCy('closeModal').click();
        })
    });
    it.only('Test', () => {
        cy.fixture(`${module}/${suiteName}-${suiteId}/${suiteId}.json`).then(data => {
        cy.visit('/')
        const login=new Login();
        const add=new OnlineShop()
        login.loginSuccess(data.user.name,data.user.password)
        cy.url().should('include', '/home')
        add.addProduct(data.producto.name, data.producto.price, data.producto.imgUrl, data.producto.id)
        cy.intercept('GET', 'https://pushing-it.onrender.com/api/products?page=1&limit=8').as('productsRequest');
        cy.wait('@productsRequest');
        cy.get('#chakra-modal--body-\\:r58\\:')
        .contains(data.producto.name)
        .should('exist');
        })
    });
});


