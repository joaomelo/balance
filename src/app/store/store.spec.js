import { store } from './store';

describe('store', () => {
  it('initial state is injected during creation', () => {
    const hello = store({ hello: 'world' });

    expect(hello.current).to.deep.equal({ hello: 'world' });
  });

  it('state updates override all state data', () => {
    const greet = store({ hello: 'world' });
    greet.update({ hi: 'there' });

    expect(greet.current).to.deep.equal({ hi: 'there' });
  });

  it('state reactivity is triggered on subscription and updates', () => {
    const observer = cy.spy();
    const greet = store({ hello: 'world' });

    greet.subscribe(observer);
    greet.update({ hi: 'there' });

    expect(observer).to.have.been.calledTwice;
    expect(observer).to.have.been.calledWith({ hello: 'world' });
    expect(observer).to.have.been.calledWith({ hi: 'there' });
  });

  it('state references are isolated after creation', () => {
    const initialHello = { hello: 'world' };
    const hello = store(initialHello);
    initialHello.hello = 'folks';
    expect(hello.current).to.deep.equal({ hello: 'world' });

    let initialNumber = 5;
    const number = store(initialNumber);
    initialNumber = 6;
    expect(number.current).to.equal(5);
  });

  it('state references are isolated after update', () => {
    const hello = store({ hello: 'world' });
    const updatedHello = { hello: 'folks' };
    hello.update(updatedHello);
    updatedHello.hello = 'you all';
    expect(hello.current).to.deep.equal({ hello: 'folks' });

    const number = store(5);
    let updatedNumber = 6;
    number.update(updatedNumber);
    updatedNumber = 7;
    expect(number.current).to.equal(6);
  });
});
