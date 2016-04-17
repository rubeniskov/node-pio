describe('Api Service', function() {

    var suite = {}

    beforeEach(angular.mock.module('pio'));

    beforeEach(angular.mock.inject(function($injector) {
        suite.apiService = $injector.get('apiService');
        suite.$q = $injector.get('$q');
        suite.$httpBackend = $injector.get('$httpBackend');
    }));

    afterEach(function () {
      // NOTE: prevents DOM elements leak
      //suite.element.remove();
    });
    afterAll(function () {
      // NOTE: prevents memory leaks because of JavaScript closures created for
      // jasmine syntax (beforeEach, afterEach, beforeAll, afterAll, it..).
      suite = null;
    });

    // it('should be defined', function() {
    //     expect(suite.apiService).toBeDefined();
    // });

    // describe('User management', function() {
    //
    //     it('should be defined ', function() {
    //         expect(suite.apiService).toBeDefined();
    //     });
    //
    //     // it('should get an user ', function(apiService) {
    //     //     expect(apiService.getUser).to.be.ok;
    //     //
    //     //     var getUserSpy = sinon.spy();
    //     //     expect(apiService.getUser).to.be.ok;
    //     // });
    //     //
    //     // it('should update an user ', function(apiService) {
    //     //     expect(apiService.getUser).to.be.ok;
    //     //
    //     //     var getUserSpy = sinon.spy();
    //     //     expect(apiService.getUser).to.be.ok;
    //     // });
    //     //
    //     // it('should delete an user ', function(apiService) {
    //     //     expect(apiService.getUser).to.be.ok;
    //     //
    //     //     var getUserSpy = sinon.spy();
    //     //     expect(apiService.getUser).to.be.ok;
    //     // });
    // });
});
