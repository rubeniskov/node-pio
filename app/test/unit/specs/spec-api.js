// http://webapplog.com/tdd/

describe('Api Service', function() {

    beforeEach(angular.module('pio'));

    it('should have a title', function() {
        assert.equal('Super Calculator', 'Super Calculator');
    });
});
