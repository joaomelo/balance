import { useCurrent } from './use-current';

export function TaskList ({ tasksStore }) {
  const tasks = useCurrent(tasksStore);
  return (
    <ul>{Object.values(tasks).map(t => <li key={t}>{t}</li>)}</ul>
  );
}
