import { store } from "./store.js";

describe("store", () => {
  it("initial state is injected during creation", () => {
    const hello = store({ hello: "world" });

    expect(hello.current).toMatchObject({ hello: "world" });
  });

  it("state updates override all state data", () => {
    const greet = store({ hello: "world" });
    greet.update({ hi: "there" });

    expect(greet.current).toMatchObject({ hi: "there" });
  });

  it("state reactivity is triggered on subscription and updates", () => {
    const observer = jest.fn();
    const greet = store({ hello: "world" });

    greet.subscribe(observer);
    greet.update({ hi: "there" });

    expect(observer).toHaveBeenCalledTimes(2);
    expect(observer).toHaveBeenCalledWith({ hello: "world" });
    expect(observer).toHaveBeenCalledWith({ hi: "there" });
  });

  it("creation share state references like vanilla js", () => {
    const initialHello = { hello: "world" };
    const hello = store(initialHello);
    initialHello.hello = "folks";
    expect(hello.current).toMatchObject({ hello: "folks" });

    let initialNumber = 5;
    const number = store(initialNumber);
    initialNumber = 6;
    expect(number.current).toBe(5);
  });

  it("updates share state references like vanilla js", () => {
    const hello = store({ hello: "world" });
    const updatedHello = { hello: "folks" };
    hello.update(updatedHello);
    updatedHello.hello = "you all";
    expect(hello.current).toMatchObject({ hello: "you all" });

    const number = store(5);
    let updatedNumber = 6;
    number.update(updatedNumber);
    updatedNumber = 7;
    expect(number.current).toBe(6);
  });

  it("subscribers share state references like vanilla js", () => {
    const hello = store({ hello: "world" });

    hello.subscribe((v) => (v.hello = "folks"));

    expect(hello.current).toMatchObject({ hello: "folks" });
  });

  it("tear down logic can be set on construction", () => {
    const tearDown = jest.fn();
    const hello = store({ hello: "world" }, tearDown);

    hello.close();

    expect(tearDown).toHaveBeenCalledTimes(1);
  });

  it("reactivity is stalled after the stream is closed", () => {
    const hello = store({ hello: "world" });
    const subscriberOne = jest.fn();
    const subscriberTwo = jest.fn();

    hello.subscribe(subscriberOne);
    hello.close();

    hello.subscribe(subscriberTwo);
    hello.update({ hi: "there" });

    expect(subscriberOne).toHaveBeenCalledTimes(1);
    expect(subscriberTwo).not.toHaveBeenCalled();
  });
});
