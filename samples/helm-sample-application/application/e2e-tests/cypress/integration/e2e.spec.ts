describe('e2e tests for k8s test app', () => {
  function checkEndpoint(endpoint: string) {
    cy.visit(
      'https://s4sdk.e2e.ingress.cloud-sdk-js.sdktests.shoot.canary.k8s-hana.ondemand.com/',
    );

    cy.get('#j_username')
      .type(Cypress.env('username'))
      .get('#j_password')
      .type(Cypress.env('password'))
      .get('#logOnFormSubmit')
      .click();

    cy.request(`backend-app/${endpoint}`).then((resp) => {
      expect(resp.status).to.eq(200);
    });
  }
  it('tests cloud endpoint', () => {
    checkEndpoint('cloud-business-partner');
  });

  it('tests onpremise endpoint', () => {
    checkEndpoint('onpremise-business-partner');
  });

  /* Commented out until principal propagation bug is fixed
  it('tests principal propagation endpoint', () => {
    checkEndpoint('principal-business-partner');
  });
  */
});
