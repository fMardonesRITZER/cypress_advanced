export class HomePage {
    constructor() {
        this.onlineShopLink = 'onlineshoplink'
    }
    onlineShop() {
        cy.getByDataCy(this.onlineShopLink).click();
    }
}