import { expect, should } from 'chai';

describe('Tiny immutable', function() {
  let tiny;

  before(function() {
    should();

    tiny = require('../lib/tiny');
  });

  it('should be an object', function() {
    tiny.should.be.an('object');
  });

  describe('#set()', function() {
    it('should create new object', function() {
      const a = tiny.set();

      a.should.be.an('object');
    });

    it('should create new object with attributes', function() {
      const a = tiny.set({
        x: 1
      });

      a .should.be.an('object')
        .and.deep.equal({ x: 1 });
    });

    it('should create a clone object with attributes new attributes', function() {
      const a = tiny.set({
        x: 1
      });
      const b = a.set({
        y: 2
      });

      a .should.be.an('object')
        .and.deep.equal({ x: 1 });

      b .should.be.an('object')
        .and.deep.equal({ x: 1, y: 2 });

      a .should.not.equal(b);
    });
  });

  describe('#unset()', function() {
    it('should clone object', function() {
      const a = tiny.set({ x: 1 });
      const b = a.unset();

      a .should.be.an('object')
        .and.deep.equal({ x: 1 });

      b .should.be.an('object')
        .and.deep.equal({ x: 1 });

      a .should.not.equal(b);
    });

    it('should clone object and omit given string argument', function() {
      const a = tiny.set({ x: 1, y: 2 });
      const b = a.unset('x');

      a .should.be.an('object')
        .and.deep.equal({ x: 1, y: 2 });

      b .should.be.an('object')
        .and.deep.equal({ y: 2 });

      a .should.not.equal(b);
    });

    it('should clone object and omit given string arguments', function() {
      const a = tiny.set({ x: 1, y: 2, z: 3 });
      const b = a.unset('x', 'y');

      a .should.be.an('object')
        .and.deep.equal({ x: 1, y: 2, z: 3 });

      b .should.be.an('object')
        .and.deep.equal({ z: 3 });

      a .should.not.equal(b);
    });

    it('should clone object and omit given array of string argument', function() {
      const a = tiny.set({ x: 1, y: 2 });
      const b = a.unset(['x']);

      a .should.be.an('object')
        .and.deep.equal({ x: 1, y: 2 });

      b .should.be.an('object')
        .and.deep.equal({ y: 2 });

      a .should.not.equal(b);
    });
  });

  it('should throw for reassign property', function() {
    const a = tiny.set({ x: 1 });

    a.should.deep.equal({ x: 1 });

    expect(function() {
      a.x = 2;
    }).to.throw(TypeError);

    a.should.deep.equal({ x: 1 });
  });

  it('should throw for new property assign', function() {
    const a = tiny.set({ x: 1 });

    a.should.deep.equal({ x: 1 });

    expect(function() {
      a.y = 2;
    }).to.throw(TypeError);

    a.should.deep.equal({ x: 1 });
  });
});
