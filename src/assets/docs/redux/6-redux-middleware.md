# Làm rõ về Middleware trong Redux
Middleware trong Redux là một cơ chế mà bạn có thể sử dụng để mở rộng hoặc thay đổi cách Redux xử lý actions khi chúng được gửi đến reducer. Middleware cung cấp một cách để chèn logic trung gian giữa việc dispatch một action và khi nó đến reducer.

Mỗi middleware trong Redux là một hàm nhận vào ba tham số: `store`, `next`, và `action`. Middleware có thể thực hiện các công việc như logging, xử lý các action không đồng bộ (async actions), hoặc thậm chí thay đổi action trước khi nó đến reducer.

Dưới đây là một ví dụ đơn giản về middleware:

```javascript
// middleware/logger.js
const loggerMiddleware = store => next => action => {
  console.log('Dispatching action:', action);
  const result = next(action);
  console.log('State after action:', store.getState());
  return result;
};

export default loggerMiddleware;
```

Trong ví dụ trên:

- `store`: Là store Redux hiện tại.
- `next`: Là một hàm chức năng, khi gọi nó, nó sẽ chuyển action đến middleware tiếp theo hoặc đến reducer nếu không còn middleware nào nữa.
- `action`: Là action được gửi đến middleware.

Bạn có thể sử dụng middleware này trong cấu hình Redux của bạn như sau:

```javascript
// store/index.js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import loggerMiddleware from './middleware/logger';

const store = createStore(
  rootReducer,
  applyMiddleware(loggerMiddleware)
);

export default store;
```

Trong ví dụ trên, `applyMiddleware` được sử dụng để kết hợp middleware vào Redux store.

Redux có một số middleware đã được xây dựng sẵn, như `redux-thunk` cho xử lý actions không đồng bộ, hoặc `redux-logger` cho logging. Để sử dụng middleware, bạn cần cài đặt nó thông qua npm và sau đó tích hợp nó vào cấu hình của Redux store.

```bash
npm install redux-thunk redux-logger
```

```javascript
// store/index.js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, loggerMiddleware)
);

export default store;
```

Ở đây, `redux-thunk` được sử dụng để xử lý các action không đồng bộ và `redux-logger` để ghi log các action và trạng thái.

Ngoài ra, các thư viện sau cũng hỗ trợ xử lý các action không đồng bộ. Tuỳ thuộc vào nhu cầu trong ứng dụng có thể lựa chọn các thư viện phù hợp.

- `Redux Promise` - FSA-compliant promise middleware for Redux.
- `Redux Saga` - An alternative side effect model for Redux apps