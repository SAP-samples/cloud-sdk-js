describe('e2e tests for cds test app', () => {
  function checkEndpoint(endpoint: string) {

    cy.request(`${Cypress.env('url')}/bupa/${endpoint}`).then((resp) => {
      expect(resp.status).to.eq(200);
    });
  }
  it('tests getAll function import', () => {
    checkEndpoint('getAll()');
  });
});
