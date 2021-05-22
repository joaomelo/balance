import { store } from './store';

describe('store', () => {
  it('initial state is injected during creation', () => {
    const hello = store({ hello: 'world' });

    expect(hello.current).toMatchObject({ hello: 'world' });
  });

  it('state updates override all state data', () => {
    const greet = store({ hello: 'world' });
    greet.update({ hi: 'there' });

    expect(greet.current).toMatchObject({ hi: 'there' });
  });

  it('state reactivity is triggered on subscription and updates', () => {
    const observer = jest.fn();
    const greet = store({ hello: 'world' });

    greet.subscribe(observer);
    greet.update({ hi: 'there' });

    expect(observer).toHaveBeenCalledTimes(2);
    expect(observer).toHaveBeenCalledWith({ hello: 'world' });
    expect(observer).toHaveBeenCalledWith({ hi: 'there' });
  });

  it('state references are isolated after creation', () => {
    const initialHello = { hello: 'world' };
    const hello = store(initialHello);
    initialHello.hello = 'folks';
    expect(hello.current).toMatchObject({ hello: 'world' });

    let initialNumber = 5;
    const number = store(initialNumber);
    initialNumber = 6;
    expect(number.current).toBe(5);
  });

  it('state references are isolated after update', () => {
    const hello = store({ hello: 'world' });
    const updatedHello = { hello: 'folks' };
    hello.update(updatedHello);
    updatedHello.hello = 'you all';
    expect(hello.current).toMatchObject({ hello: 'folks' });

    const number = store(5);
    let updatedNumber = 6;
    number.update(updatedNumber);
    updatedNumber = 7;
    expect(number.current).toBe(6);
  });
});
