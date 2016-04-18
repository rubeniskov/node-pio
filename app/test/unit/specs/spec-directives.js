describe('Unit: Testing Directives', function() {

    var $rootScope, $compile,
        suite = {}

    beforeEach(angular.mock.module('pio'));

    beforeEach(angular.mock.inject(function($injector) {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
    }));

    // afterEach(function() {
    //     suite.element.remove();
    // });
    //
    // afterAll(function() {
    //     suite = null;
    // });

    // beforeEach(function(){
    //     suite.directive = $compile('<input-password >User</input-password>');
    //     $compile = $c;
    //     $rootScope = $rs;
    // }));

    describe('Testing inputCodePassword', function() {
        var scope, element, ctrModel;

        beforeEach(function(){
            scope = $rootScope.$new(),
            element = $compile('<input-code-password ng-model="model" icp-fields="CODE"></input-code-password>')(scope),
            ctrModel = element.controller('ngModel');
        });

        it("should throw an exception ng-model is required", function() {
            expect(function() {
                $compile('<input-code-password></input-code-password>')($rootScope);
            }).to.throw(new RegExp("Controller \'ngModel\'"));
        });

        it("should throw an exception icp-fields property is required", function() {
            expect(function() {
                $compile('<input-code-password ng-model="model"></input-code-password>')($rootScope);
            }).to.throw(new RegExp("Controller \'ngModel\'"));
        });

        it("should have a fields property in scope", function() {
            expect(scope.fields).defined;
        });

        it("should have a fields property in scope", function() {
            expect(scope.fields).defined;
        });

        /*
        code
        reset
        validate
        next
        watch;
        */
    });
});



// console.log(ctrModel.$error.notZero);
// expect(ctrModel.$error.notZero).not.falsy;
// expect(ngModel.$error.notZero).toBeFalsy();
//
// scope.model = 1;
// scope.$apply();
// expect(ngModel.$error.notZero).toBeFalsy();
