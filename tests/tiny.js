import { should } from 'chai';

describe('Tiny immutable', function() {
  let tiny;

  before(function() {
    should();

    tiny = require('../lib/tiny');
  });

  it('should be an object', function() {
    tiny.should.be.an('object');
  });

  describe('#new()', function() {
    it('should create new object', function() {
      const a = tiny.new();

      a.should.be.an('object');
    });

    it('should create new object with attributes', function() {
      const a = tiny.new({
        x: 1
      });

      a .should.be.an('object')
        .and.deep.equal({ x: 1 });
    });

    it('should create a clone object with attributes new attributes', function() {
      const a = tiny.new({
        x: 1
      });
      const b = a.new({
        y: 2
      });

      a .should.be.an('object')
        .and.deep.equal({ x: 1 });

      b .should.be.an('object')
        .and.deep.equal({ x: 1, y: 2 });

      a .should.not.equal(b);
    });
  });

  describe('#delete()', function() {
    it('should clone object', function() {
      const a = tiny.new({ x: 1 });
      const b = a.delete();

      a .should.be.an('object')
        .and.deep.equal({ x: 1 });

      b .should.be.an('object')
        .and.deep.equal({ x: 1 });

      a .should.not.equal(b);
    });

    it('should clone object and omit given string argument', function() {
      const a = tiny.new({ x: 1, y: 2 });
      const b = a.delete('x');

      a .should.be.an('object')
        .and.deep.equal({ x: 1, y: 2 });

      b .should.be.an('object')
        .and.deep.equal({ y: 2 });

      a .should.not.equal(b);
    });

    it('should clone object and omit given string arguments', function() {
      const a = tiny.new({ x: 1, y: 2, z: 3 });
      const b = a.delete('x', 'y');

      a .should.be.an('object')
        .and.deep.equal({ x: 1, y: 2, z: 3 });

      b .should.be.an('object')
        .and.deep.equal({ z: 3 });

      a .should.not.equal(b);
    });

    it('should clone object and omit given array of string argument', function() {
      const a = tiny.new({ x: 1, y: 2 });
      const b = a.delete(['x']);

      a .should.be.an('object')
        .and.deep.equal({ x: 1, y: 2 });

      b .should.be.an('object')
        .and.deep.equal({ y: 2 });

      a .should.not.equal(b);
    });
  });
});
