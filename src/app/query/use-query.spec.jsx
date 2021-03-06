import '@testing-library/jest-dom/extend-expect';
import { render, screen, act } from '@testing-library/react';
import { query } from '../query';
import { useQuery } from './use-query';

describe('useQuery hook', () => {
  it('query current value is extracted by the hook', () => {
    const tasksQuery = query({
      'uuid-1': 'task 1',
      'uuid-2': 'task 2'
    });
    render(<TaskList tasksQuery={tasksQuery} />);

    expect(screen.getByText('task 1')).toBeInTheDocument();
    expect(screen.getByText('task 2')).toBeInTheDocument();
  });

  it('hook keeps on par with query current value', () => {
    const tasksQuery = query({
      'uuid-1': 'task 1',
      'uuid-2': 'task 2'
    });
    render(<TaskList tasksQuery={tasksQuery} />);

    act(() => tasksQuery.update({
      'uuid-1': 'task 3',
      'uuid-2': 'task 4'
    }));

    expect(screen.getByText('task 3')).toBeInTheDocument();
    expect(screen.getByText('task 4')).toBeInTheDocument();
  });
});

function TaskList ({ tasksQuery }) {
  const tasks = useQuery(tasksQuery);
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
