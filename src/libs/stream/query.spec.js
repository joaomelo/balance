import { query } from './query';

describe('query', () => {
  it('initial state is injected during creation', () => {
    const helloQuery = query({ hello: 'world' });

    expect(helloQuery.current).toMatchObject({ hello: 'world' });
  });

  it('state updates override all state data', () => {
    const greetQuery = query({ hello: 'world' });
    greetQuery.update({ hi: 'there' });

    expect(greetQuery.current).toMatchObject({ hi: 'there' });
  });

  it('state reactivity is triggered on subscription and updates', () => {
    const observer = jest.fn();
    const greetQuery = query({ hello: 'world' });

    greetQuery.subscribe(observer);
    greetQuery.update({ hi: 'there' });

    expect(observer).toHaveBeenCalledTimes(2);
    expect(observer).toHaveBeenCalledWith({ hello: 'world' });
    expect(observer).toHaveBeenCalledWith({ hi: 'there' });
  });

  it('state references are isolated after creation', () => {
    const initialHello = { hello: 'world' };
    const helloQuery = query(initialHello);
    initialHello.hello = 'folks';
    expect(helloQuery.current).toMatchObject({ hello: 'world' });

    let initialNumber = 5;
    const number = query(initialNumber);
    initialNumber = 6;
    expect(number.current).toBe(5);
  });

  it('state references are isolated after update', () => {
    const helloQuery = query({ hello: 'world' });
    const updatedHello = { hello: 'folks' };
    helloQuery.update(updatedHello);
    updatedHello.hello = 'you all';
    expect(helloQuery.current).toMatchObject({ hello: 'folks' });

    const numberQuery = query(5);
    let updatedNumber = 6;
    numberQuery.update(updatedNumber);
    updatedNumber = 7;
    expect(numberQuery.current).toBe(6);
  });

  it('state references are isolated from consumers', () => {
    const helloQuery = query({ hello: 'world' });

    helloQuery.subscribe(v => (v.hello = 'folks'));

    expect(helloQuery.current).toMatchObject({ hello: 'world' });
  });
});
