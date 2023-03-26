const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('User tests', () => {
  let token;

  describe('POST /api/users/signup', () => {

    it('should not create a user with the same email', (done) => {
      const user = {
        username: 'testuser2',
        email: 'testuser@example.com',
        password: 'testpassword2',
      };

      chai
        .request(app)
        .post('/api/users/signup')
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('User already exists');
          done();
        });
    });
  });

  describe('POST /api/users/login', () => {
    it('should log in the user and return a token', (done) => {
      const user = {
        email: 'testuser@example.com',
        password: 'testpassword',
      };

      chai
        .request(app)
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          token = res.body.token;
          done();
        });
    });

    it('should not log in the user with an incorrect password', (done) => {
      const user = {
        email: 'testuser@example.com',
        password: 'wrongpassword',
      };

      chai
        .request(app)
        .post('/api/users/login')
        .send(user)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Invalid email or password');
          done();
        });
    });
  });

  describe('GET /api/users/info', () => {
    it('should return user info', (done) => {
      chai
        .request(app)
        .get('/api/users/info')
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('email');
          expect(res.body.email).to.equal('testuser@example.com');
          done();
        });
    });

    it('should not return user info without a token', (done) => {
      chai
        .request(app)
        .get('/api/users/info')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message');
          done();
        });
    });

    
  });
});
