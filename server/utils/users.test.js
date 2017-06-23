const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {
    beforeEach(() => {
      users = new Users();
      users.users = [{
        id:1,
        name:'Mike',
        room:'Node Course'
      }, {
        id:2,
        name:'Julie',
        room:'React Course'
      }, {
        id:3,
        name:'Dave',
        room:'Node Course'
      }]
    });
    it('should add new user', () => {
         var users = new Users();
         var user = {
           id: '123',
           name: 'Andrew',
           room: 'The Office Fans'
         };
         var resUser = users.addUser(user.id, user.name, user.room);
         expect(users.users).toEqual([user]);
    });

    it('should remove a user', ()=> {
       var res = users.removeUser(1);
       expect(res.name).toBe('Mike');
    });

    it('should not remove a user', ()=> {
      var res = users.removeUser(4);
      expect(res).toBe(undefined);
    });

    it('should get a user', () => {
      var res = users.getUser(1);
      expect(res.name).toBe('Mike');
    });

    it('should not get a user', () => {
      var res = users.getUser(4);
      expect(res).toBe(undefined);
    });

    it('returns names for node course', ()=> {
      var userList = users.getUserList('Node Course');
      expect(userList).toEqual(['Mike', 'Dave']);
    });

    it('returns names for react course', ()=> {
      var userList = users.getUserList('React Course');
      expect(userList).toEqual(['Julie']);
    });
});
