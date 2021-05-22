import { store } from './store';
import { select } from './select';

describe('selectors', () => {
  it('selectors can derive state from a source store', () => {
    const items = store({
      'uuid-1': { name: 'first item' },
      'uuid-2': { name: 'second item' },
      'uuid-3': { name: 'third item' }
    });
    const item = select(items, items => items['uuid-1']);

    expect(item.current).toMatchObject({ name: 'first item' });
  });

  it('selectors can derive state from another selector', () => {
    const number = store(10);
    const doubleSelector = select(number, value => value * 2);
    const doubleDoubleSelector = select(doubleSelector, value => value * 2);

    expect(doubleDoubleSelector.current).toBe(40);

    number.update(20);
    expect(doubleDoubleSelector.current).toBe(80);
  });

  it('selectors can derive from multiple sources', () => {
    const preferences = store({ dark: true });
    const contact = store({ email: 'some@emai.com' });
    const options = select([preferences, contact], ([p, c]) => {
      return {
        ...p,
        ...c
      };
    });

    expect(options.current).toMatchObject({
      dark: true,
      email: 'some@emai.com'
    });
  });

  it('select from multiple sources provide a reactive solution to read relational data', () => {
    const citiesStore = store({
      'uuid-1': { name: 'brasilia' },
      'uuid-2': { name: 'san diego' }
    });
    const studentsStore = store({
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
    const studentsWithCityName = select([studentsStore, citiesStore], project);

    expect(studentsWithCityName.current).toMatchObject([
      { name: 'pedro', city: 'brasilia' },
      { name: 'mary', city: 'san diego' },
      { name: 'paul', city: 'san diego' }
    ]);

    citiesStore.update({
      'uuid-1': { name: 'brasilia - df' },
      'uuid-2': { name: 'san diego - ca' }
    });

    expect(studentsWithCityName.current).toMatchObject([
      { name: 'pedro', city: 'brasilia - df' },
      { name: 'mary', city: 'san diego - ca' },
      { name: 'paul', city: 'san diego - ca' }
    ]);
  });
});
