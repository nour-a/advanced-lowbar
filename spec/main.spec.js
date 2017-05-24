const path = require('path');
var expect = require('chai').expect;
// var indexOf = require('../main.js');
var _ = require(path.join(__dirname, '..', './main.js'));
var sinon = require('sinon');
describe('_', function () {
  'use strict';

  it('is an object', function () {
    expect(_).to.be.an('object');
  });
  describe('#indexOf', function () {
    it('is a function', function () {
      expect(_.indexOf).to.be.a('function');
    });
    it('returns -1 when the value is not in the array', function () {
      expect(_.indexOf([1, 2, 3], 7, true)).to.equal(-1);
      expect(_.indexOf([])).to.equal(-1);
      expect(_.indexOf([1, 2, 3])).to.equal(-1);
      expect(_.indexOf()).to.equal(-1);
    });
    it('returns the index of value when the value is  in the array', function () {
      expect(_.indexOf([1, 2, 3], 2, true)).to.equal(1);
      expect(_.indexOf([1, 2, 3], 3)).to.equal(2);
      expect(_.indexOf([1, 22, 3], 22)).to.equal(1);
    });
  });
  describe('#once', function () {
    it('is a function', function () {
      expect(_.once).to.be.a('function');
    });
    it('should return what the passed function is returning ', function () {
      function add (a, b) { return a + b; }
      var addonce = _.once(add);
      expect(addonce(1, 2)).to.equal(add(1, 2));
    });
    it('should return 1 even the function is called more than one time', function () {
      var spy = sinon.spy();
      var spyonce = _.once(spy);
      spyonce();
      spyonce();
      spyonce();
      expect(spy.callCount).to.equal(1);
    });
  });
  describe('#memoize', function () {
    it('is a function', function () {
      expect(_.memoize).to.be.a('function');
    });
    it('should only run the function if the results are not in the cache', function () {
      var spy = sinon.spy(function (n) {
        return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
      });
      var fibonacci = _.memoize(spy);
      expect(fibonacci(10)).to.equal(55);
      expect(spy.callCount).to.equal(11);
      expect(fibonacci(11)).to.equal(89);
      expect(spy.callCount).to.equal(12);
      fibonacci(10);
      expect(spy.callCount).to.equal(12);
    });
  });
  describe('#delay', function () {
    it('is a function', function () {
      expect(_.delay).to.be.a('function');
    });
    it(' invokes function after wait milliseconds. ', function () {
      let spy = sinon.spy();
      _.delay(spy, 50);
      expect(spy.calledOnce).to.be.false;
      setTimeout(function () {
        expect(spy.calledOnce).to.be.true;
         // done();
      }, 100);
    });
  });

  describe('#shuffel', function () {
    it('is a function', function () {
      expect(_.shuffel).to.be.a('function');
    });
    it('return empty array for invalid input ', function () {
      expect(_.shuffel(123)).to.eqls([]);
      expect(_.shuffel('hello')).to.eqls([]);
    });
    it('return suffeled array ', function () {
      expect(_.shuffel([5, 7, 9])).to.not.eqls([5, 7, 9]);
    });
    it('return suffeled array ', function () {
      expect(_.shuffel([5, 7, 9, 8, 4])).to.not.eqls([5, 7, 9, 8, 4]);
    });
    it('return suffeled object ', function () {
      expect(_.shuffel({a: 1, b: 2, c: 3})).to.not.eqls([1, 2, 3]);
    });

  });

  describe('#zip', function () {
    it('is a function', function () {
      expect(_.zip).to.be.a('function');
    });
    it('Merges together the values of each of the arrays with the values at the corresponding position', function () {
      expect(_.zip([1, 2, 3], [4, 5, 6])).to.eqls([[1,4],[2,5],[3,6]]);
      expect(_.zip([5, 7, 9])).to.eqls([[5],[7],[9]]);
      
      expect(_.zip('hi')).to.eqls([['h'],['i']]);
    });
    it('return empty array for invalid input ', function () {
      expect(_.zip([])).to.eqls([]);
      expect(_.zip(343)).to.eqls([]);
      expect(_.zip({a:9,v:8})).to.eqls([]);
    });

  });

});


