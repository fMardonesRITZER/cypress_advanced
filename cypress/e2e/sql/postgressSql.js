const directoryName = __dirname.replaceAll('\\', '/');
const module = directoryName.split(/[/]/)[2]
const prodName = directoryName.slice(directoryName.lastIndexOf('/') + 1).split('-').slice(0, -1).join('-');
const prodId = directoryName.split(/[-]/).pop();
import { ProductPage } from "../../support/pages/productPage";
import { HomePage } from "../../../support/pages/homePage";
import { ShoppingCart } from "../../../support/pages/shoppingCart";
import { CheckOut } from "../../../support/pages/checkout";

describe('Sql', () => {
    before(() => {
        cy.fixture(`${module}/${prodName}-${prodId}/data`).as('data');
    })
    it('First Sql Test', function () {
        const getProductQuery = `SELECT product, price  FROM public."purchaseProducts" where product = '${this.data.product.name}'`
        const getPurchaseProductQuery = `SELECT product, price  FROM public."purchaseProducts" where sell_id = '22685'`
        cy.task("connectDB", getProductQuery).then(result => {
            expect(result[0].product).to.be.equal(this.data.product.name)
            this.data.product.price = result[0].price;

            cy.then(() => {
                //agregar el proeducto al carrito de compras. 
                //comprar el producto
                cy.task("connectDB", getPurchaseProductQuery).then(result => {
                    expect(result[0].product).to.be.equal(this.data.product.name)
                    expect(result[0].price).to.be.equal(this.data.product.price)
                })
            })
        });
    });

    it.only('Test PG res', function () {
        const getProductQuery = `SELECT product, price  FROM public."purchaseProducts" where product = '${this.data.product.name}'`
        cy.task("connectDB", getProductQuery).then(result => {
            cy.log(result)
        });
    });
});