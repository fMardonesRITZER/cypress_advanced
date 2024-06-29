// cypress/support/commands.js

// Importación de comandos globales si los hubiera
import './commands';

// Comando para realizar login en Pushing IT
Cypress.Commands.add('loginToPushingIT', (username, password) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlAPI}/login`,
        body: {
            username: username,
            password: password
        }
    }).then(response => {
        if (response.status === 200) {
            Cypress.env().token = response.body.token;
            // Almacenar en localStorage si es necesario
            window.localStorage.setItem('token', response.body.token);
            window.localStorage.setItem('user', response.body.user.username);
            window.localStorage.setItem('userId', response.body.user._id);
        } 
    });
});

// Comando para obtener un elemento por atributo data-cy
Cypress.Commands.add('getByDataCy', (selector) => {
    return cy.get(`[data-cy=${selector}]`);
});

// Comando para obtener un producto por su ID
Cypress.Commands.add('getProductById', (productID) => {
    return cy.request({
        method: "GET",
        url: `${Cypress.env().baseUrlAPI}/products?id=${productID}`,
        headers: {
            Authorization: `Bearer ${Cypress.env().token}`
        },
        failOnStatusCode: false  // Evita que los errores de estado detengan la prueba
    });
});

// Comando para eliminar un producto por su ID
Cypress.Commands.add('deleteProductById', (productID) => {
    return cy.getProductById(productID).then((response) => {
        const products = response.body.products;
        if (products && products.docs && products.docs.length > 0) {
            const product = products.docs[0];
            return cy.request({
                method: "DELETE",
                url: `${Cypress.env().baseUrlAPI}/product/${product._id}`,
                headers: {
                    Authorization: `Bearer ${Cypress.env().token}`,
                }
            });
        } else {
            cy.log(`El producto con ID ${productID} no existe o no se puede acceder.`);
            return null; // Puedes manejar el caso de producto no encontrado según tu lógica
        }
    });
});

// Comando para crear un nuevo producto
Cypress.Commands.add('createProduct', (product) => {
    return cy.request({
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
        const products = response.body.products;
        if (products && products.docs && products.docs.length > 0) {
            const product = products.docs[0];
            return cy.request({
                method: "PUT",
                url: `${Cypress.env().baseUrlAPI}/product/${product._id}`,
                body: updatedData,
                headers: {
                    Authorization: `Bearer ${Cypress.env().token}`,
                }
            });
        } else {
            cy.log(`El producto con ID ${productID} no existe o no se puede acceder.`);
            return null; // Puedes manejar el caso de producto no encontrado según tu lógica
        }
    }).catch((error) => {
        // Manejar errores de solicitud aquí si es necesario
        cy.log(`Error al intentar actualizar el producto con ID ${productID}: ${error.message}`);
        throw error; // Propagar el error para que Cypress maneje el fallo de la prueba
    });
});

// Comando para interactuar con la API y realizar acciones relacionadas con productos
Cypress.Commands.add('interactuarConAPI', (productId) => {
    return cy.loginToPushingIT(Cypress.env().admin.username, Cypress.env().admin.password).then(() => {
        cy.deleteProductById(productId); // Eliminar el producto si existe
        cy.createProduct({ // Crear un nuevo producto
            name: 'Nuevo Producto',
            price: 99.99,
            image: 'imagen.jpg'
        }).then((createResponse) => {
            const productId = createResponse.body.id;
            // Editar producto
            cy.editProductById(productId, { // Actualizar el producto creado
                name: 'Producto Editado',
                price: 129.99,
                image: 'nueva_imagen.jpg'
            });
        });
    });
});

// Comando para interactuar con el Frontend
Cypress.Commands.add('interactuarConFE', (productId) => {
    cy.contains('Online Shop').click();
    cy.getByDataCy('search-bar').type(productId);
    cy.getByDataCy('search-button').click();
    cy.get('.product-item').should('contain', 'Producto Editado');
    cy.get('.product-item').should('contain', '$129.99');
    cy.get('.product-item img').should('have.attr', 'src', 'nueva_imagen.jpg');
});


