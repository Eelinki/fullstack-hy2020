/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Test User',
      username: 'testingzz',
      password: 'salis123'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user) 

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('Log in to application')
      cy.get('#username').type('testingzz')
      cy.get('#password').type('salis123')
      cy.get('#login-button').click()
      cy.contains('Test User logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Log in to application')
      cy.get('#username').type('testingzz')
      cy.get('#password').type('asdsadsda')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', {
        username: 'testingzz', password: 'salis123'
      }).then(response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('A title for a blog')
      cy.get('#author').type('An Author')
      cy.get('#url').type('https://google.com')
      cy.get('#create-button').click()
      cy.contains('A title for a blog')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('A title for a blog')
        cy.get('#author').type('An Author')
        cy.get('#url').type('https://google.com')
        cy.get('#create-button').click()
      })

      it('A blog can be liked', function() {
        cy.get('#blog-title').click()
        cy.contains('like').click()
        cy.get('.likes-amount').contains('1')
      })

      it('A blog can be removed', function() {
        cy.get('#blog-title').click()
        cy.contains('remove').click()
        cy.get('#blog-title').should('not.exist')
      })
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        const token = 'bearer ' + JSON.parse(localStorage.getItem('loggedUser')).token

        const blog1 = {
          title: 'Jepss elikkäs',
          author: 'John Smith',
          url: 'https://google.com',
          likes: 5,
          user: localStorage.getItem('loggedUser').id
        }

        const blog2 = {
          title: 'Toinen blogi ',
          author: 'asdddd',
          url: 'https://google.com',
          likes: 12,
          user: localStorage.getItem('loggedUser').id
        }

        const blog3 = {
          title: 'ISO',
          author: 'Big Poppa',
          url: 'https://google.com',
          likes: 1235,
          user: localStorage.getItem('loggedUser').id
        }

        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs/',
          body: blog1,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        })

        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs/',
          body: blog2,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        })

        cy.request({
          method: 'POST',
          url: 'http://localhost:3001/api/blogs/',
          body: blog3,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          }
        })
        
        cy.visit('http://localhost:3000')
      })

      it('Blogs sorted by likes', function() {
        cy.contains('ISO').click()
        cy.contains('Toinen blogi').click()
        cy.contains('Jepss elikkäs').click()

        cy.get('.likes-amount').eq(0).contains('1235')
        cy.get('.likes-amount').eq(1).contains('12')
        cy.get('.likes-amount').eq(2).contains('5')
      })
    })
  })
})