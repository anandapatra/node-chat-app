var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('it should generate the message object', ()=> {
        var message = generateMessage('Ayaan', 'Test Message');

        expect(message.from).toBe('Ayaan');
        expect(message.text).toBe('Test Message');
        expect(message.createdAt).toExist();
    });
});

describe('generateLocationMessage', () => {
    it('it should generate the correct location object', ()=> {
        var coord = {
          lat: 12,
          lon: 13
        };
        var message = generateLocationMessage('Ayaan', coord);
        var url = `https://www.google.com/maps?q=${coord.lat},${coord.lon}`;
        expect(message.from).toBe('Ayaan');
        expect(message.url).toBe(url);

    });
});
