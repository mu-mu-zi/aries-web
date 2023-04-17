import React from 'react';
import { css } from '@emotion/react';
import classNames from 'classnames';

function App() {
  return (
    <div
      className={classNames('underline')}
      css={css`
        color: red;
      `}
    >
      Hello World
    </div>
  );
}

export default App;
