const directoryName = __dirname.replaceAll('\\', '/');
const module = directoryName.split(/[/]/)[2]
const prodName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const prodId = directoryName.split(/[-]/).pop();
import { ProductPage } from "../../../support/pages/productPage";
import { HomePage } from "../../../support/pages/homePage";
import { ShoppingCart } from "../../../support/pages/shoppingCart";
import { CheckOut } from "../../../support/pages/checkout";

describe(`${module} `, () => {
    const productpage = new ProductPage();
    const homepage = new HomePage();
    const shoppingCart = new ShoppingCart();
    const checkout = new CheckOut();

    before(() => {
        cy.loginApi(Cypress.env().admin.username, Cypress.env().admin.password);
        cy.visit('');
    })

    it.only(`${prodName}-${prodId}`, () => {
        cy.fixture(`${module}/${prodName}-${prodId}/data`).then(data => {
            data.product.id = prodId;

            cy.deleteProductById(data.product.id);
            cy.createProduct(data.product)
            cy.deleteProductById(data.product.id);
            cy.createProduct(data.product)
            
            

                homepage.onlineShop()
                homepage.shoppingShopProduct_1();
                homepage.shoppingShopProduct_1();
                homepage.shoppingShopProduct_2();
                homepage.shoppingShopProduct_2();
                homepage.buttonShoppingCart();
                shoppingCart.buttonSibbling();
                shoppingCart.buttonCheackout();
                checkout.CheckOutSuccess();
                checkout.buttonCheckoutBuy();
                checkout.buttonTy();

                cy.getByDataCy(productpage.purchase).click()

                cy.getByDataCy(productpage.sellId).invoke('text').as('sellId');
    
                cy.get('@sellId').then(sellId => {
                    cy.log(sellId);
                    const getSellIdQuery = `SELECT pp.product, pp.quantity, pp.price, s.id, s."firstName", s."lastName", s."cardNumber" FROM public."purchaseProducts" AS pp INNER JOIN public."sells" AS s ON s.id = pp.sell_id WHERE s."id" = ${sellId}`;
                    cy.task("connectDB", getSellIdQuery).then(result => {
                        expect(result[0].product).to.be.equal(data.products[0].name)
                        expect(result[0].quantity).to.be.equal(2)
                        expect(result[0].cardNumber).to.be.equal(data.checkout.cardNumber)
                        expect(result[1].product).to.be.equal(data.products[1].name)
                        expect(result[1].quantity).to.be.equal(2)
                        expect(result[1].cardNumber).to.be.equal(data.checkout.cardNumber)
                    });


        });
        });
});
});
