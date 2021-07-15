import { query } from './query';
import { select } from './select';

describe('selectors', () => {
  it('selectors can derive state from a source query', () => {
    const items = query({
      'uuid-1': { name: 'first item' },
      'uuid-2': { name: 'second item' },
      'uuid-3': { name: 'third item' }
    });
    const itemSelector = select(items, items => items['uuid-1']);

    expect(itemSelector.current).toMatchObject({ name: 'first item' });
  });

  it('selectors can derive state from another selector', () => {
    const numberQuery = query(10);
    const doubleSelector = select(numberQuery, value => value * 2);
    const doubleDoubleSelector = select(doubleSelector, value => value * 2);

    expect(doubleDoubleSelector.current).toBe(40);

    numberQuery.update(20);
    expect(doubleDoubleSelector.current).toBe(80);
  });

  it('selectors can derive from multiple sources', () => {
    const preferencesQuery = query({ dark: true });
    const contactQuery = query({ email: 'some@emai.com' });
    const optionsSelector = select([preferencesQuery, contactQuery], ([p, c]) => {
      return {
        ...p,
        ...c
      };
    });

    expect(optionsSelector.current).toMatchObject({
      dark: true,
      email: 'some@emai.com'
    });
  });

  it('select from multiple sources provide a reactive solution to read relational data', () => {
    const citiesQuery = query({
      'uuid-1': { name: 'brasilia' },
      'uuid-2': { name: 'san diego' }
    });
    const studentsQuery = query({
      'uuid-4': { name: 'pedro', cityId: 'uuid-1' },
      'uuid-5': { name: 'mary', cityId: 'uuid-2' },
      'uuid-6': { name: 'paul', cityId: 'uuid-2' }
    });

    const project = ([students, cities]) => {
      return Object
        .values(students)
        .map(student => {
          const city = cities[student.cityId];
          return {
            name: student.name,
            city: city.name
          };
        });
    };
    const studentsWithCityNameSelector = select([studentsQuery, citiesQuery], project);

    expect(studentsWithCityNameSelector.current).toMatchObject([
      { name: 'pedro', city: 'brasilia' },
      { name: 'mary', city: 'san diego' },
      { name: 'paul', city: 'san diego' }
    ]);

    citiesQuery.update({
      'uuid-1': { name: 'brasilia - df' },
      'uuid-2': { name: 'san diego - ca' }
    });

    expect(studentsWithCityNameSelector.current).toMatchObject([
      { name: 'pedro', city: 'brasilia - df' },
      { name: 'mary', city: 'san diego - ca' },
      { name: 'paul', city: 'san diego - ca' }
    ]);
  });
});
