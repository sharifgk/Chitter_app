const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server'); 
const expect = chai.expect;

chai.use(chaiHttp);

describe('Peep tests', () => {
    let token;

    before((done) => {
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

    describe('GET /api/peeps', () => {
        it('should return all peeps', (done) => {
            chai
                .request(app)
                .get('/api/peeps')
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('POST /api/peeps', () => {
        it('should create a peep', (done) => {
            const peep = {
                content: 'Test peep',
            };

            chai
                .request(app)
                .post('/api/peeps')
                .set('Authorization', `Bearer ${token}`)
                .send(peep)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('message');
                    expect(res.body.message).to.equal('Peep created successfully');
                    done();
                });
        });

        it('should not create a peep without content', (done) => {
            const peep = {};

            chai
                .request(app)
                .post('/api/peeps')
                .set('Authorization', `Bearer ${token}`)
                .send(peep)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
      
        it('should not create a peep without a token', (done) => {
            const peep = {
                content: 'Test peep',
            };

            chai
                .request(app)
                .post('/api/peeps')
                .send(peep)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(401);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    });

    describe('PUT /api/peeps/:id', () => {
        let peepId;

        before((done) => {
            const peep = {
                content: 'Test peep to be updated',
            };

            chai
                .request(app)
                .post('/api/peeps')
                .set('Authorization', `Bearer ${token}`)
                .send(peep)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(201);
                    peepId = res.body.peep._id;
                    done();
                });
        });

        it('should update a peep', (done) => {
            const updatedPeep = {
                content: 'Updated test peep',
            };

            chai
                .request(app)
                .put(`/api/peeps/${peepId}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedPeep)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });

        it('should not update a peep with an invalid ID', (done) => {
            const updatedPeep = {
                content: 'Updated test peep',
            };

            chai
                .request(app)
                .put('/api/peeps/invalidId')
                .set('Authorization', `Bearer ${token}`)
                .send(updatedPeep)
                .end((err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('message');
                    done();
                });
        });
    })
});