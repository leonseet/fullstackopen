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
      cy.register({ name: "cypress", username: "cypress", password: "password" })
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
  
      
  describe("When logged in", function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.register({ name: "cypress", username: "cypress", password: "password" })
      cy.login({ username: "cypress", password: "password" })
    })

    it("A blog can be created", function() {
      cy.get("#newnote-button").click()
      cy.get(".title-input").type("cypress title")
      cy.get(".author-input").type("cypress author")
      cy.get(".url-input").type("cypress url")
      cy.get(".create-button").click()

      cy.contains("cypress title")
    })

    it("User can like a blog", function() {
      cy.get("#newnote-button").click()
      cy.get(".title-input").type("cypress title")
      cy.get(".author-input").type("cypress author")
      cy.get(".url-input").type("cypress url")
      cy.get(".create-button").click()
      cy.get(".view-button").click()
      cy.get(".like-button").click()
      
      cy.contains("likes 1")
    })

    it("User can delete a blog", function() {
      cy.get("#newnote-button").click()
      cy.get(".title-input").type("cypress title")
      cy.get(".author-input").type("cypress author")
      cy.get(".url-input").type("cypress url")
      cy.get(".create-button").click()
      cy.get(".view-button").click()
      cy.get(".remove-button").click()
      
      cy.get(".success").contains("Blog deleted")
    })

    it.only("Blogs are ordered according to likes", function() {
      cy.createBlog({title: "cypress1", author: "cypress1", url: "cypress1", likes: 1})
      cy.createBlog({title: "cypress2", author: "cypress2", url: "cypress2", likes: 2})
      cy.createBlog({title: "cypress3", author: "cypress3", url: "cypress3", likes: 3})
      cy.get("#newnote-button").click()

      cy.get(".bloglist").eq(0).find(".view-button").click()
      cy.contains("likes 3")
      cy.get(".bloglist").eq(1).find(".view-button").click()
      cy.contains("likes 2")
    })
  })
})
})