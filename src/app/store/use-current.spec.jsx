import { mount } from '@cypress/react';
import { store } from './store';
import { useCurrent } from './use-current';

describe('useCurrent hook', () => {
  it('store current value is extracted by the hook', () => {
    const tasksStore = store({
      'uuid-1': 'task 1',
      'uuid-2': 'task 2'
    });
    mount(<TaskList tasksStore={tasksStore} />);

    cy.contains('task 1').should('exist');
    cy.contains('task 2').should('exist');
  });

  it('hook keeps on par with store current value', () => {
    const tasksStore = store({
      'uuid-1': 'task 1',
      'uuid-2': 'task 2'
    });
    mount(<TaskList tasksStore={tasksStore} />);

    tasksStore.update({
      'uuid-1': 'task 3',
      'uuid-2': 'task 4'
    });

    cy.contains('task 1').should('not.exist');
    cy.contains('task 2').should('not.exist');
    cy.contains('task 3').should('exist');
    cy.contains('task 4').should('exist');
  });
});

export function TaskList ({ tasksStore }) {
  const tasks = useCurrent(tasksStore);
  return (
    <ul>
      {
        Object
          .values(tasks)
          .map(t => <li key={t}>{t}</li>)
      }
    </ul>
  );
}
