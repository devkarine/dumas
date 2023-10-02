describe('Tests responsivity', () => {
  it('should show footer on desktop layout, and not on mobile', () => {
    const user = {
      name: 'Teste Teste',
      email: 'teste@teste.com',
      password: 'senhateste'
    };
    cy.viewport('macbook-16');
    cy.visit('http://localhost:5173');
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.wait(6000);
    expect(cy.contains('Copyright © Todos os direitos reservados'));
    cy.viewport('iphone-8');
    cy.get('Copyright © Todos os direitos reservados').should('not.exist');
  });

  it('should show show user name at navbar on desktop, and not on mobile', () => {
    const user = {
      name: 'Teste Teste',
      email: 'teste@teste.com',
      password: 'senhateste'
    };
    cy.viewport('macbook-16');
    cy.visit('http://localhost:5173');
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.wait(6000);
    expect(cy.contains(user.name));
    cy.viewport('iphone-8');
    cy.get(user.name).should('not.exist');
  });
});
