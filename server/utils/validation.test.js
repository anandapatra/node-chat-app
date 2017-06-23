const expect = require('expect');
var {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non string values', () => {
       var res = isRealString(98);
       expect(res).toBe(false);
    });

    it('should reject empty string', () => {
      var res = isRealString('');
      expect(res).toBe(false);
    });

    it('should not rejct valid string', () => {
      var res = isRealString('Test');
      expect(res).toBe(true);
    });

});
