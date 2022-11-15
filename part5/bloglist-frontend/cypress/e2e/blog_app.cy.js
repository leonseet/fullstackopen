describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains("log in to application")
    cy.contains("username")
    cy.contains("password")
    cy.contains("login")
  })

  describe('Login',function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: "cypress",
        username: "cypress",
        password: "password"
      }
      cy.request('POST', 'http://localhost:3003/api/users', user)
      cy.visit('http://localhost:3000')
    })

    it('succeeds with correct credentials', function() {
      cy.get("#username").type("cypress")
      cy.get("#password").type("password")
      cy.get("#login-btn").click()

      cy.contains("cypress logged in")
    })

    it('fails with wrong credentials', function() {
      cy.get("#username").type("cypress")
      cy.get("#password").type("wrong")
      cy.get("#login-btn").click()

      cy.contains("wrong username or password")
    })
  })
})