import { createService } from './factory';

describe('base service mechanism', () => {
  test('initial state is injected during creation', () => {
    const service = createService({ state: { hello: 'world' } });

    expect(service.state).toEqual({
      hello: 'world'
    });
  });

  test('state updates are limited to passed properties', () => {
    const service = createService({ state: { hello: 'world' } });
    service.update({ hi: 'there' });

    expect(service.state).toEqual({
      hello: 'world',
      hi: 'there'
    });

    service.update({ hello: 'friend' });

    expect(service.state).toEqual({
      hello: 'friend',
      hi: 'there'
    });
  });

  test('state subscription and updates trigger services observers', () => {
    const observer = jest.fn();
    const service = createService({ state: { hello: 'world' } });

    service.subscribe(observer);
    service.update({ hi: 'there' });

    expect(observer).toHaveBeenCalledTimes(2);
    expect(observer).toHaveBeenCalledWith(service);
  });

  test('selectors can derive from state or other selectors', () => {
    const service = createService({
      state: {
        amount: 10
      },
      selectors: {
        double: ({ state }) => state.amount * 2,
        doubleTimes: ({ selectors }, times) => selectors.double() * times
      }
    });

    expect(service.selectors.double()).toBe(20);
    expect(service.selectors.doubleTimes(2)).toBe(40);
  });

  test('actions can mutate state', () => {
    const service = createService({
      state: {
        amount: 10
      },
      actions: {
        discount: ({ state, update }, value) => update({ amount: state.amount - value })
      }
    });

    service.actions.discount(5);

    expect(service.state.amount).toBe(5);
  });
});
