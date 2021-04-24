import ReactDOM from 'react-dom';
import { Root } from './root';

export function mountRoot (config) {
  mountView({
    ...config,
    Root
  });
}

function mountView (config) {
  const { element, Root, dependencies } = config;
  ReactDOM.render(
    <Root dependencies={dependencies}/>,
    document.getElementById(element)
  );
}
