// Importar comandos relacionados con la API de productos
import './request/product'

// Comando para realizar login en Pushing IT
Cypress.Commands.add('loginToPushingIT', (username, password) => {
    cy.request({
        method: "POST",
        url: `${Cypress.env().baseUrlAPI}/login`,
        body: {
            username: username,
            password: password
        },
    }).then(respuesta => {
        window.localStorage.setItem('token', respuesta.body.token);
        window.localStorage.setItem('user', respuesta.body.user.username);
        window.localStorage.setItem('userId', respuesta.body.user._id);
        Cypress.env().token = respuesta.body.token;
    });
});

// Comando para obtener un elemento por atributo data-cy
Cypress.Commands.add('getByDataCy', (selector) => {
    return cy.get(`[data-cy=${selector}]`);
});

// Comando para interactuar con la API y realizar acciones relacionadas con productos
Cypress.Commands.add('interactuarConAPI', (productId) => {
    cy.loginToPushingIT(Cypress.env().admin.username, Cypress.env().admin.password); // Ejemplo de login
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

// Comando para interactuar con el Frontend
Cypress.Commands.add('interactuarConFE', (productId) => {
    cy.contains('Online Shop').click();
    cy.getByDataCy('search-bar').type(productId);
    cy.getByDataCy('search-button').click();
    cy.get('.product-item').should('contain', 'Producto Editado');
    cy.get('.product-item').should('contain', '$129.99');
    cy.get('.product-item img').should('have.attr', 'src', 'nueva_imagen.jpg');
});

