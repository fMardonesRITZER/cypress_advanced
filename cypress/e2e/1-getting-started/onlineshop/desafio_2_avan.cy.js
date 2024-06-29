describe('Interactuar con la API de Pushing IT', () => {
    let productId;

    before(() => {
        // Paso 1: Ingresar en Pushing IT
        cy.loginToPushingIT(Cypress.env('admin').username, Cypress.env('admin').password);
    });

    it('Buscar, eliminar, crear, y editar productos', () => {
        // Paso 2: Buscar el producto (opcional dependiendo de tu flujo)
        cy.interactuarConAPI('productoBuscado');

        // Paso 3: Eliminar el producto si existe (aquí supongo que pasas el productId correcto)
        cy.deleteProductById('id_del_producto_a_eliminar').then((deleteResponse) => {
            if (deleteResponse.status === 200) {
                cy.log('Producto eliminado correctamente.');
            } else {
                cy.log('El producto no existía o no se pudo eliminar.');
            }
        });

        // Paso 4: Crear un nuevo producto
        const newProduct = {
            name: 'Nuevo Producto',
            price: 99.99,
            image: 'imagen.jpg'
        };
        cy.createProduct(newProduct).then((createResponse) => {
            expect(createResponse.status).to.eq(200);
            productId = createResponse.body.id;
            expect(productId).to.exist;

            // Paso 5: Editar el producto creado
            const updatedProduct = {
                name: 'Producto Editado',
                price: 129.99,
                image: 'nueva_imagen.jpg'
            };
            cy.editProductById(productId, updatedProduct).then((editResponse) => {
                expect(editResponse.status).to.eq(200);
            });
        });
    });
});


