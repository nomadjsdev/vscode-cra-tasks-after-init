const publicHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta
      name="description"
      content="Web site created using create-react-app"
    />
    <title>React App</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`

const tsIndex = `import React from 'react';
import ReactDOM from 'react-dom';
import App from './View/App';

ReactDOM.render(<App />, document.getElementById('root'));`

const tsApp = `import React from 'react';

const App: React.FC = () => {
  return (
    <>App</>
  );
}

export default App;`

const tsAppTest = `import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/App/i);
  expect(linkElement).toBeInTheDocument();
});`

const jsIndex = `import React from 'react';
import ReactDOM from 'react-dom';
import App from './View/App';

ReactDOM.render(<App />, document.getElementById('root'));`

const jsApp = `import React from 'react';

const App = () => {
  return (
    <>App</>
  );
}

export default App;`

const jsAppTest = `import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/App/i);
  expect(linkElement).toBeInTheDocument();
});`

const jsconfigJson = `{
  "compilerOptions": {
    "baseUrl": "src"
  },
  "include": ["src"]
}`

const netlifyRedirect = `/*    /index.html   200`

module.exports = {
  publicHtml,
  tsIndex,
  tsApp,
  tsAppTest,
  jsIndex,
  jsApp,
  jsAppTest,
  jsconfigJson,
  netlifyRedirect
}
