Search App

A search app for stock tickers using the public api https://www.alphavantage.co/documentation/#symbolsearch. The App can
be used as a standalone or be easily integrated as a component. I decided to keep it simple and slim thus only used a few 3rd party
frameworks - no react/vue/jquery or similar. However parts of the solution has sprinkles of React/Marionette/Redux,
basically I used concepts and ideas I enjoy working with.

 I very much enjoyed the task (and had a lot of fun fiddling around with it :smile:).


The app can be created in the following way:
```html
<div class="app"></div>
```
```javascript
import App from './app/App.js';
new App('.app');
```

To get the actions, use:
```javascript
import { actions } from '../store/Actions.js';
```

I've set up some scripts for building the app, after npm install please use:
- npm run dev (should run webpack in watch mode)
- npm run build (should run the sparsely tests and then build the app)
- npm run test (should run mocha/chai tests)
