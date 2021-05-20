// eslint-disable-next-line no-unused-vars
import * as React from 'react';
import { mount } from '@cypress/react';
import { store } from './store';
import { TaskList } from './use-current.task';

describe('useCurrent hook', () => {
  it('store current value is extracted by the hook', () => {
    const tasksStore = store({
      'uuid-1': 'task 1',
      'uuid-2': 'task 2'
    });
    mount(<TaskList tasksStore={tasksStore} />);

    cy.contains('task 1').should('exist');
    cy.contains('task 2').should('exist'); ;
  });
});
