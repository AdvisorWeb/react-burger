import '@4tw/cypress-drag-drop'

describe('service is available', function () {
    it('should be available on localhost:3000', function () {
        cy.visit('/');
        cy.viewport(1920, 900)
        cy.wait(3000);
    });
});

describe('popup ingredients', function () {

    it('should open popup', function () {
        cy.get('[data-cy="element"]').first().as('element')
        cy.get('@element').should('have.attr', 'href')
        cy.get('@element').click()
    })

    it('should check popup exist', function () {
        cy.get('[data-cy="popup"]').as('popup')
        cy.get('@popup').should('exist')
    })

    it('should check popup contains', function () {
        let elementText
        cy.get('[data-cy="element"]').first().as('element')
        cy.get('@element').find('[data-cy="element-name"]').as('elementName')
        cy.get('[data-cy="popup"]').as('popup')

        cy.get('@elementName').should(($div) => {
            elementText = $div.text();
        });

        cy.get('@popup').find('[data-cy="popup-name"]').should(($div) => {
            const popupText = $div.text()
            expect(elementText).includes(popupText)
        });
        cy.get('@element')
            .then(($el) => {
                const href = $el.prop('href')
                cy.url().should('include', href)
            })
    })

    it('should close popup', function () {
        cy.get('[data-cy="popup"]').as('popup')
        cy.get('[data-cy="popup-close"]').as('popupClose')
        cy.get('[data-cy="element"]').first().as('element')
        cy.get('@popupClose').click()
        cy.get('@popup').should('not.exist')
        cy.get('@element')
            .then(($el) => {
                const href = $el.prop('href')
                cy.url().should('not.include', href)
            })
    });
});

describe('drag ingredients BUN', function () {

    it('should button disabled', () => {
        cy.get('[data-cy="submitOrder"]').find('button').as('btn')
        cy.get('@btn').should('be.disabled')
    })

    it('should drag BUNs', () => {

        cy.get('[data-cy="element"]').first().as('element')
        cy.get('[data-cy="dropTarget"]').first().as('dropTarget')

        cy.dragAndDrop('@element', '@dropTarget', 0, 0);
        cy.get('@element').drag('@dropTarget').then(() => {
            cy.get('@element').find('[class^="counter_counter"]').contains('2')
        })
        cy.get('[data-cy="element"]').first().next().as('element1')
        cy.dragAndDrop('@element1', '@dropTarget', 0, 0);
        cy.get('@element1').drag('@dropTarget').then(() => {
            cy.get('@element1').find('[class^="counter_counter"]').contains('2')
            cy.get('@element').find('[class^="counter_counter"]').should('not.be')
        })

        cy.dragAndDrop('@element', '@dropTarget', 0, 0);
        cy.get('@element').drag('@dropTarget').then(() => {
            cy.get('@element').find('[class^="counter_counter"]').contains('2')
        })
    })

    it('should button enabled', () => {
        cy.get('[data-cy="submitOrder"]').find('button').as('btn')
        cy.get('@btn').should('not.be.disabled')
    })

});

describe('drag ingredients OTHER', function () {

    it('should drag OTHER', () => {
        cy.get('[data-cy="element"]').eq(2).as('element')
        cy.get('[data-cy="element"]').eq(4).as('element1')
        cy.get('[data-cy="dropTarget"]').first().as('dropTarget')


        cy.dragAndDrop('@element', '@dropTarget', 0, 0);
        cy.get('@element').drag('@dropTarget').then(() => {
            cy.get('@element').find('[class^="counter_counter"]').contains('1')
        })

        cy.dragAndDrop('@element', '@dropTarget', 0, 0);
        cy.get('@element').drag('@dropTarget').then(() => {
            cy.get('@element').find('[class^="counter_counter"]').contains('2')
        })


        cy.dragAndDrop('@element', '@dropTarget', 0, 0);
        cy.get('@element1').drag('@dropTarget').then(() => {
            cy.get('@element1').find('[class^="counter_counter"]').contains('1')
        })
    })

});

describe('popup order', function () {

    it('should button click', () => {
        cy.get('[data-cy="submitOrder"]').find('button').as('button')
        cy.get('@button').click()
    })

    it('should go login', () => {
        cy.url().should('include', '/login')
    })

    it('should logIn', () => {
        const email = 'new@admin.admin'
        const password = 'AdminAdmin'
        cy.get('[data-cy="loginEmail"]').find('input').as('loginEmail')
        cy.get('[data-cy="loginPassword"]').find('input').as('loginPassword')
        cy.get('form').as('loginForm')

        cy.get('@loginEmail').type(`${email}`)
        cy.get('@loginPassword').type(`${password}{enter}`)
    })

    it('should button click', () => {
        cy.wait(1000)
        cy.url().should('not.include', '/login')
        cy.get('[data-cy="submitOrder"]').find('button').as('button')
        cy.get('@button').click()
    })

    it('should opened order popup', () => {
        cy.wait(15000)
        cy.get('[data-cy="popup"]').as('popup')
        cy.get('@popup').should('be.visible')

        cy.get('@popup').find('img').should('be.visible')
        cy.get('@popup').contains('идентификатор заказа')
        cy.get('@popup').contains('Ваш заказ начали готовить')
    })

    it('should close order popup', () => {
        cy.get('[data-cy="popup"]').as('popup')
        cy.get('[data-cy="popup-close"]').as('popupClose')

        cy.get('@popupClose').click()
        cy.get('@popup').should('not.exist')
    })

});