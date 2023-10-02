describe('Login teste', () => {
  it('should have login button disabled when page loads', () => {
    cy.visit('http://localhost:5173');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('should not log in with invalid email', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[name="email"]').type('emailinvalido@teste.com');
    cy.get('input[name="password"]').type(`senhainvalida{enter}`);
    cy.wait(6000);

    expect(cy.contains('Email ou senha incorretos'));
  });

  it('should validate email', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[name="email"]').type('notAnEmail');
    cy.get('input[name="password"]').type(`senhanvalida{enter}`);

    expect(cy.contains('Insira um email válido'));
  });

  it('should validate password', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[name="email"]').type('email@teste.com');
    cy.get('input[name="password"]').type(`123`).blur();

    expect(cy.contains('A senha deve ter pelo menos 6 caracteres'));
  });

  it('should log in with valid email', () => {
    const user = {
      email: 'teste@teste.com',
      password: 'senhateste'
    };
    cy.visit('http://localhost:5173');
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('button[type="submit"]').click();
    cy.wait(6000);
    expect(cy.contains('Pratos próximos'));
  });
});
