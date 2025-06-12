# Từ khoá Yield trong Javascript và trong Redux
"Yield" có ý nghĩa khác nhau trong hai ngữ cảnh khác nhau: trong JavaScript thông thường và trong Redux Saga.

1. **Yield trong JavaScript:**
   - Trong JavaScript, `yield` được sử dụng trong hàm generator để tạo ra một điểm dừng (pause) trong quá trình thực thi hàm và trả về giá trị cho người gọi hàm generator.
   - Hàm generator không chạy toàn bộ ngay từ đầu, mà chỉ chạy cho đến khi gặp một câu lệnh `yield`. Khi gặp `yield`, hàm sẽ tạm dừng và giá trị của `yield` sẽ được trả về cho người gọi hàm.
   - Dưới đây là một ví dụ đơn giản:

     ```javascript
     function* exampleGenerator() {
       yield 1;
       yield 2;
       yield 3;
     }
     
     const generator = exampleGenerator();
     console.log(generator.next()); // { value: 1, done: false }
     console.log(generator.next()); // { value: 2, done: false }
     console.log(generator.next()); // { value: 3, done: false }
     console.log(generator.next()); // { value: undefined, done: true }
     ```

2. **Yield trong Redux Saga:**
   - Trong Redux Saga, `yield` được sử dụng để xử lý các công việc bất đồng bộ một cách tuần tự và dễ đọc.
   - Các effect của Redux Saga như `call`, `put`, `take`,... được kết hợp với `yield` để quản lý luồng xử lý và đồng bộ hóa các tác vụ.
   - Dưới đây là một ví dụ sơ bộ:

     ```javascript
     import { put, call, takeEvery } from 'redux-saga/effects';
     
     function* fetchDataSaga() {
       try {
         const data = yield call(fetch, 'https://api.example.com/data');
         yield put({ type: 'FETCH_DATA_SUCCESS', payload: data });
       } catch (error) {
         yield put({ type: 'FETCH_DATA_FAILURE', payload: error.message });
       }
     }
     
     function* watchFetchData() {
       yield takeEvery('FETCH_DATA', fetchDataSaga);
     }
     ```

   Trong ví dụ này, `yield call(fetch, 'https://api.example.com/data')` sẽ gọi hàm `fetch` bất đồng bộ và tạm dừng cho đến khi nó hoàn thành trước khi tiếp tục thực hiện các công việc khác.

---

Ví dụ khác:

```javascript
import { takeEvery, put, delay } from 'redux-saga/effects';

function* incrementAsync() {
  yield delay(1000);
  yield put({ type: 'INCREMENT' });
}

function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga() {
  yield watchIncrementAsync();
  // Add other sagas here
}
```

- Trong `incrementAsync`, `yield delay(1000)` tạm dừng saga trong 1 giây.
- Sau đó, `yield put({ type: 'INCREMENT' })` dispatch một action `'INCREMENT'`.

Bằng cách này, Redux Saga giúp quản lý logic không đồng bộ trong ứng dụng Redux một cách có tổ chức và dễ bảo trì hơn.