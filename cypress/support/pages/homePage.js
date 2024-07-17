export class HomePage {
    constructor() {
        this.onlineShopLink = 'onlineshoplink'
    }
    onlineShop() {
        cy.getByDataCy(this.onlineShopLink).click();
    }

    shoppingShopProduct_1() {
        cy.get('[data-cy="add-to-cart-1001"]').click()
        cy.get('[data-cy="closeModal').click();
    }
    shoppingShopProduct_2() {
        cy.get('[data-cy="add-to-cart-1004"]').click();
        cy.get('[data-cy="closeModal').click();
    }

    buttonShoppingCart() {
        cy.get('[data-cy="goShoppingCart"]').click();
    }

}