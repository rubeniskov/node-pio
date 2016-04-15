// http://webapplog.com/tdd/

describe('Api Service', function() {

    var scope = {}

    beforeEach(module('pio'));

    beforeEach(inject(function($injector) {
        scope.apiService = $injector.get('apiService');
        scope.$q = $injector.get('$q');
        scope.$httpBackend = $injector.get('$httpBackend');
    }));

    it('should be defined', function() {
        expect(scope.apiService).to.be.ok;
    });

    describe('User management', function(apiService) {

        it('should be defined ', function() {
            expect(scope.apiService.createUser).to.be.ok;
        });

        // it('should get an user ', function(apiService) {
        //     expect(apiService.getUser).to.be.ok;
        //
        //     var getUserSpy = sinon.spy();
        //     expect(apiService.getUser).to.be.ok;
        // });
        //
        // it('should update an user ', function(apiService) {
        //     expect(apiService.getUser).to.be.ok;
        //
        //     var getUserSpy = sinon.spy();
        //     expect(apiService.getUser).to.be.ok;
        // });
        //
        // it('should delete an user ', function(apiService) {
        //     expect(apiService.getUser).to.be.ok;
        //
        //     var getUserSpy = sinon.spy();
        //     expect(apiService.getUser).to.be.ok;
        // });
    });
});
