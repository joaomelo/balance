import { of, timer } from "rxjs";
import { delayWhen } from "rxjs/operators";
import { store } from "./store.js";
import { select } from "./select.js";

describe("selectors", () => {
  it("can derive state from a source query", () => {
    const names = [{ name: "zero" }, { name: "one" }, { name: "two" }];
    const indexed = store({
      "uuid-0": names[0],
      "uuid-1": names[1],
      "uuid-2": names[2],
    });
    const list = select(indexed, (items) => Object.values(items));

    expect(list.current).toEqual(expect.arrayContaining(names));
  });

  it("can derive state from another selector", () => {
    const numberQuery = store(10);
    const doubleSelector = select(numberQuery, (value) => value * 2);
    const doubleDoubleSelector = select(doubleSelector, (value) => value * 2);

    expect(doubleDoubleSelector.current).toBe(40);

    numberQuery.update(20);
    expect(doubleDoubleSelector.current).toBe(80);
  });

  it("can derive from multiple sources", () => {
    const preferencesQuery = store({ dark: true });
    const contactQuery = store({ email: "some@emai.com" });
    const optionsSelector = select(
      [preferencesQuery, contactQuery],
      ([p, c]) => {
        return {
          ...p,
          ...c,
        };
      }
    );

    expect(optionsSelector.current).toMatchObject({
      dark: true,
      email: "some@emai.com",
    });
  });

  it("can provide a reactive solution to read relational data", () => {
    const citiesQuery = store({
      "uuid-1": { name: "brasilia" },
      "uuid-2": { name: "san diego" },
    });
    const studentsQuery = store({
      "uuid-4": { name: "pedro", cityId: "uuid-1" },
      "uuid-5": { name: "mary", cityId: "uuid-2" },
      "uuid-6": { name: "paul", cityId: "uuid-2" },
    });

    const project = ([students, cities]) => {
      return Object.values(students).map((student) => {
        const city = cities[student.cityId];
        return {
          name: student.name,
          city: city.name,
        };
      });
    };
    const studentsWithCityNameSelector = select(
      [studentsQuery, citiesQuery],
      project
    );

    expect(studentsWithCityNameSelector.current).toMatchObject([
      { name: "pedro", city: "brasilia" },
      { name: "mary", city: "san diego" },
      { name: "paul", city: "san diego" },
    ]);

    citiesQuery.update({
      "uuid-1": { name: "brasilia - df" },
      "uuid-2": { name: "san diego - ca" },
    });

    expect(studentsWithCityNameSelector.current).toMatchObject([
      { name: "pedro", city: "brasilia - df" },
      { name: "mary", city: "san diego - ca" },
      { name: "paul", city: "san diego - ca" },
    ]);
  });

  it("can derive from arbitrary sources provided that an valid observable property is present", () => {
    const one = store(1);

    const observable = of(0, 1, 2);
    const selectCompatible = { observable };

    const project = jest.fn(([first, second]) => first + second);
    const selector = select([one, selectCompatible], project);

    expect(project).toHaveBeenCalledTimes(3);
    expect(project).toHaveNthReturnedWith(1, 1);
    expect(project).toHaveNthReturnedWith(2, 2);
    expect(project).toHaveNthReturnedWith(3, 3);
    expect(selector.current).toBe(3);
  });

  it("can hold a initial state until every source has provided a value", () => {
    jest.useFakeTimers();

    const one = store(1);
    const observable = of(2).pipe(delayWhen(() => timer(1000)));
    const willBeTwo = { observable };

    const project = jest.fn(([a, b]) => a + b);
    const initialState = -1;
    const selector = select([one, willBeTwo], project, initialState);

    expect(selector.current).toBe(initialState);

    jest.runAllTimers();
    expect(selector.current).toBe(3);
  });
});
