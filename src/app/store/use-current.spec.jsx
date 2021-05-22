import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';
import { store } from './store';
import { useCurrent } from './use-current';

describe('useCurrent hook', () => {
  it('store current value is extracted by the hook', () => {
    const tasksStore = store({
      'uuid-1': 'task 1',
      'uuid-2': 'task 2'
    });
    render(<TaskList tasksStore={tasksStore} />);

    expect(screen.getByText('task 1')).toBeInTheDocument();
    expect(screen.getByText('task 2')).toBeInTheDocument();
  });

  it('hook keeps on par with store current value', () => {
    const tasksStore = store({
      'uuid-1': 'task 1',
      'uuid-2': 'task 2'
    });
    render(<TaskList tasksStore={tasksStore} />);

    act(() => tasksStore.update({
      'uuid-1': 'task 3',
      'uuid-2': 'task 4'
    }));

    expect(screen.getByText('task 3')).toBeInTheDocument();
    expect(screen.getByText('task 4')).toBeInTheDocument();
  });
});

function TaskList ({ tasksStore }) {
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
