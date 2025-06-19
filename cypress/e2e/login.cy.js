describe('Login Sayfası Form Testleri', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('Başarılı form doldurulunca success sayfası açılıyor', () => {
    cy.get('input[name=email]').type('test@example.com');
    cy.get('input[name=password]').type('GeçerliSifre1!');
    cy.get('[data-testid="rules-checkbox"]').check();
    cy.get('[data-testid="submit-button"]').should('not.be.disabled').click();

    cy.get('[data-testid="success-message"]').should('contain.text', 'Login Successful');
    cy.url().should('include', '/success');
  });

  it('Sadece email yanlışsa: 1 hata mesajı, doğru mesaj, buton disabled', () => {
    cy.get('input[name=email]').type('yanlisemail');
    cy.get('input[name=password]').type('GeçerliSifre1!');
    cy.get('[data-testid="rules-checkbox"]').check();

    cy.get('[data-testid="submit-button"]').should('be.disabled');

    cy.get('[data-testid="email-error"]').should('contain.text', 'Geçerli bir email girin.');
    cy.get('[data-testid="password-error"]').should('have.text', '');
  });

  it('Hem email hem password yanlışsa: 2 hata mesajı, buton disabled', () => {
    cy.get('input[name=email]').type('yanlisemail');
    cy.get('input[name=password]').type('123');
    cy.get('[data-testid="rules-checkbox"]').check();

    cy.get('[data-testid="submit-button"]').should('be.disabled');

    cy.get('[data-testid="email-error"]').should('contain.text', 'Geçerli bir email girin.');
    cy.get('[data-testid="password-error"]').should('contain.text', 'Şifre en az 8 karakter olmalı');
  });

  it('Email ve password doğru ama checkbox seçilmemiş: buton disabled', () => {
    cy.get('input[name=email]').type('test@example.com');
    cy.get('input[name=password]').type('GeçerliSifre1!');

    cy.get('[data-testid="submit-button"]').should('be.disabled');
  });
});
