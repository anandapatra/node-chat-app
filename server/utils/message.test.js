var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('it should generate the message object', ()=> {
        var message = generateMessage('Ayaan', 'Test Message');

        expect(message.from).toBe('Ayaan');
        expect(message.text).toBe('Test Message');
        expect(message.createdAt).toExist();
    });
});
