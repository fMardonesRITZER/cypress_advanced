import '../support/commands';



Cypress.Commands.add('getProductById', (productID) => {
    cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlAPI}/products?id=${productID}`,
        failsOnStatusCode: false,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        }
    })
})
Cypress.Commands.add('deleteProductById', (productID) => {
    cy.getProductById(productID).its('body.products.docs').each((product) => {
        cy.request({
            method: "DELETE",
            url: `${Cypress.env().baseUrlAPI}/product/${product._id}`,
            headers: {
                Authorization: `Bearer ${Cypress.env().token}`,
            }
        });
    });
});

Cypress.Commands.add('createProduct', (product) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlAPI}/create-product`,
        body: product,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`,
        }
    });
});

// Comando para actualizar un producto por su ID
Cypress.Commands.add('editProductById', (productID, updatedData) => {
    return cy.getProductById(productID).then((response) => {
        const product = response.body.products.docs[0]; // Assumiendo que solo se devuelve un producto
        if (product) {
            return cy.request({
                method: "PUT",
                url: `${Cypress.env().baseUrlAPI}/product/${product._id}`,
                body: updatedData,
                headers: {
                    Authorization: `Bearer ${Cypress.env().token}`,
                }
            });
        } else {
            cy.log(`El producto con ID ${productID} no existe.`);
            return null; // O maneja el caso de producto no encontrado según tu lógica
        }
    });
});
