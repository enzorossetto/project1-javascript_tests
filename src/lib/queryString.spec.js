const { queryString, parse } = require('./queryString');

describe('Object to query string', () => {
  it('should create a valid query string when an object is provided', () => {
    const obj = {
      name: 'Enzo',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Enzo&profession=developer');
  });

  it('should create a valid query string even when an array is passed as value', () => {
    const obj = {
      name: 'Enzo',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Enzo&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Enzo',
      abilities: {
        fist: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Enzo&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Enzo',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Enzo';

    expect(parse(qs)).toEqual({
      name: 'Enzo',
    });
  });

  it('should convert a query string to an object taking care of comma separated values', () => {
    const qs = 'name=Enzo&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Enzo',
      abilities: ['JS', 'TDD'],
    });
  });
});
