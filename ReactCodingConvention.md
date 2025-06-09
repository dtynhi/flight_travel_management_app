# Javascript Coding Convention

## 1. Sử dụng const và let thay cho var.

```javascript

// Bad
var a = 1;
var b = 2;

// Good
const a = 1;
let b = 2;

```

## 2. Sử dụng dấu chấm phẩy `;` sau mỗi câu lệnh.

```javascript

// Bad
const a = 1
const b = 2

// Good
const a = 1;
const b = 2;

```

## 3. Sử dụng dấu ngoặc nhọn `{}`.

```javascript

// Bad
if (a === 1)
    return true;

// Good
if (a === 1) {
    return true;
}

```

## 4. Quy tắc đặt tên biến.

Sử dụng camelCase cho tên biến. Tên biến phải mang ý nghĩa và không nên dài quá 30 ký tự.

```javascript

// Bad
const first_number = 1;
const b = 2;
const c = 3;

// Good
const firstNumber = 1;
const secondNumber = 2;
const sum = 3;

```

## 5. Quy tắc đặt tên hằng số.

Sử dụng ký tự viết hoa và dấu gạch dưới (_) để phân cách các từ trong tên hằng số.

```javascript

// Bad
const a = 1;
const b = 2;
const c = 3;

// Good
const FIRST_NUMBER = 1;
const SECOND_NUMBER = 2;
const SUM = 3;

```

## 6. Quy tắc đặt tên hàm

Sử dụng camelCase cho tên hàm. Tên hàm phải mang ý nghĩa và không nên dài quá 45 ký tự.

```javascript

// Bad
function a() {
    return true;
}

// Good
function shouldUpdateUI() {
    return true;
}

```

## 7. Sử dụng template string thay cho chuỗi thông thường.

```javascript

// Bad
const name = 'John';
const message = 'Hello ' + name + '!';

// Good
const name = 'John';
const message = `Hello ${name}!`;

```

## 8. Sử dụng arrow function thay cho function thông thường.

```javascript

// Bad
function sum(a, b) {
    return a + b;
}

// Good
const sum = (a, b) => a + b;

```

## 9. Sử dụng destructuring.

```javascript

// Bad
const a = obj.a;
const b = obj.b;

// Good
const {a, b} = obj;

```

## 10. Sử dụng default parameters.

```javascript

// Bad
const sum = (a, b) => {
    a = a || 0;
    b = b || 0;
    return a + b;
}

// Good
const sum = (a = 0, b = 0) => a + b;

```

## 11. Sử dụng object parameters.

Lưu ý: Nên sử dụng cho các hàm có số lượng parameters lớn hơn 3.

```javascript

// Bad
const sum = (a, b, c) => a + b + c;
sum(1, 2, 3);

// Good
const sum = ({a, b, c}) => a + b + c;
sum({a: 1, b: 2, c: 3});

``` 

## 12. Sử dụng spread operator.

```javascript

// Bad
const a = [1, 2, 3];
const b = [4, 5, 6];
const c = a.concat(b);

// Good
const a = [1, 2, 3];
const b = [4, 5, 6];
const c = [...a, ...b];

```

## 13. Sử dụng map, filter, reduce, some, every thay cho vòng lặp for.

```javascript

// Bad
const numbers = [1, 2, 3, 4, 5];
const newNumbers = [];
for (let i = 0; i < numbers.length; i++) {
    newNumbers.push(numbers[i] * 2);
}

// Good
const numbers = [1, 2, 3, 4, 5];
const newNumbers = numbers.map(number => number * 2);

```

## 14. Sử dụng async/await thay cho Promise.

Sử dụng try/catch để bắt lỗi khi sử dụng async/await nếu cần thiết.

```javascript

// Bad
fetch('https://api.github.com/users')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));

// Good
const fetchData = async () => {
    try {
        const response = await fetch('https://api.github.com/users');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}
fetchData();

```

# React Coding Convention With Typescript

## 1. Sử dụng functional component thay cho class component.

```tsx

// Bad
class App extends React.Component {
    render() {
        return <div>Hello World!</div>;
    }
}

// Good
function App() {
    return <div>Hello World!</div>;
}

```

## 2. Sử dụng hooks.

```tsx

// Bad
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    render() {
        return (
            <div>
                <p>{this.state.count}</p>
                <button onClick={() => this.setState({count: this.state.count + 1})}>Increase</button>
            </div>
        );
    }
}

// Good
function App() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>{count}</p>
            <button onClick={() => setCount(count + 1)}>Increase</button>
        </div>
    );
}

```

## 3. Ưu tiên sử dụng interface thay cho type.

```ts

// Should avoid
type Props = {
    name: string;
    age: number;
}

// Should use
interface Props {
    name: string;
    age: number;
}

```

## 4. Sử dụng utitlitie types.

1. Sử dụng Partial để tạo props optional.

```ts

interface Props {
    name: string;
    age: number;
}

const defaultProps: Partial<Props> = {
    name: 'John'
}

```

2. Sử dụng Required để tạo props bắt buộc.

```ts

interface Props {
    name?: string;
    age?: number;
}

const requiredProps: Required<Props> = {
    name: 'John',
    age: 20
}

```

3. Sử dụng Omit để loại bỏ các props không cần thiết.

```ts

interface Props {
    name: string;
    age: number;
    address: string;
}

const newProps: Omit<Props, 'address'> = {
    name: 'John',
    age: 20
}

```

4. Sử dụng Pick để chọn các props cần thiết.

```ts

interface Props {
    name: string;
    age: number;
    address: string;
}

const newProps: Pick<Props, 'name' | 'age'> = {
    name: 'John',
    age: 20
}

```

5. Sử dụng union type.

```ts

type Status = 'active' | 'inactive' | 'pending';

```

6. Sử dụng intersection type.

```ts

type User = {
    name: string;
    age: number;
}

type Role = {
    role: string;
}

type Account = User & Role;

```

7. Sử dụng keyof.

```ts

interface Props {
    name: string;
    age: number;
}

type Keys = keyof Props; // 'name' | 'age'

```

8. Sử dụng generics.

```ts

function identity<T>(arg: T): T {
    return arg;
}

const result = identity<string>('Hello World');

```

## 5. Import thư viện trong react.

- Khi sử dụng lodash hoặc các thư viện khác chỉ nên import những thành phần cần thiết. Không import toàn bộ thư viện.

```ts

// Bad
import _ from 'lodash';

// Good
import {sum} from 'lodash';

```

- Khi import các thành phần của ứng dụng nên sử dụng alias `~` để tránh lỗi import.

```ts

// Bad
import {User} from '../../types/user.type';

// Good
import {User} from '~/types/user.type';

```

- Các import của thư viện bên thứ 3 được đẩy lên trên cùng và phân cách với thành phần của ứng dụng bằng 1 dòng.

```ts

// Bad
import React from 'react';
import {User} from '~/types/user.type';
import {sum} from 'lodash';

// Good
import React from 'react';
import {sum} from 'lodash';

import {User} from '~/types/user.type';

```

# React Coding Convention Working Flow

## Cấu trúc thư mục:

```

|-- Root
    |-- app_modules
        |-- eager-*
    |-- node_modules
    |-- public
    |-- src
        |-- api
        |-- assets
        |-- components
        |-- constant
        |-- hooks
        |-- layout
        |-- mocks
        |-- pages
        |-- routers
        |-- types
        |-- utils
        |-- App.tsx
        |-- index.css
        |-- main.tsx
        |-- vite-env.d.ts
    |-- .env.dev
    |-- .env.production
    |-- package.json
    |-- README.md
    |-- LICENSE
    |-- tsconfig.json
    |-- vite.config.ts
    |-- ...some config file
    
```

## 1. Khai báo type cho các thành phần của dự án.

- Các type của props và states được khai báo trong chính componet chứa props và state cần khai báo.
- Các type dùng chung được khai báo trong file `src/types/utils.type.ts`.
- Các type định nghĩa cho dữ liệu của dự án được khai báo trong file `src/types/<type-name>.type.ts`.

```ts

// src/types/utils.type.ts
export type Status = 'active' | 'inactive' | 'pending';

// src/types/user.type.ts
export interface User {
    id: string;
    name: string;
    age: number;
    status: Status;
}

// src/components/User/User.tsx
import {User} from '~/types/user.type';

interface Props {
    user: User;
}

```

## 2. Thêm một thuộc tính mới cho config của dự án.

Bước 1: Cấu hình biến môi trường với tiền tố `VITE_` trong file `env.<enviroment>`.

```env

VITE_BACK_END_URL=http://localhost:8081

```

Bước 2: import biến môi trường vào file cấu hình trong thư mục `src/constant/config.ts`.

```ts

const config = {
    BACK_END_URL: import.meta.env.VITE_BACK_END_URL,
    // ... other config
};

export default config;

```

## 3. Tạo một page mới cho dự án.

Cấu trúc :

```

|-- Root
    ...
    |-- src
        |-- pages
            |-- page-name
                ...
                |-- sub-page-name
                    |-- components
                    |-- contexts
                    |-- Page.tsx
                    |-- index.tsx
                    |-- styles.module.css
                ...
                
```

Bước 1: Tạo thư mục mới trong thư mục `src/pages`.

Bước 2: Tạo file `Page.tsx` trong thư mục vừa tạo.

```tsx

import React from 'react';

function Page() {
    return (
        <div>
            Hello World!
        </div>
    );
}

export default Page;

```

Bước 3: Tạo file `index.tsx` trong thư mục vừa tạo.

```tsx

import Page from './Page';

export default Page;

```

Bước 4: Định nghĩa router cho page mới trong file `src/routers/router.ts`.

```ts

const routers = {
    // ...
    page: {
        pathName: 'page',
        fullPath: '/page',

        subPage: {
            pathName: 'sub-page',
            fullPath: '/page/sub-page',
        }
    }
    // ...
}

export default routers;

```

Buớc 5: Cấu hình router cho page mới trong file `src/routers/useRouteElement.tsx`.

Lưu ý:

- Sử dụng `ProtectedRoute`, `RejectRoute`,... được định nghĩa trong file src/routers/PermissionRoute.tsx để phân quyền cho
  route.
- Sử dụng `Layout` để cấu hình layout cho page.
- Sử dụng kỹ thuật nesting route để cấu hình route con.
- Sử dụng kỹ thuật lazy loading để tối ưu hiệu suất với những page lớn khác.

```tsx

// ... some import
import {Suspense, lazy} from 'react';
import routers from './routers';
import ProtectedRoute from './PermissionRoute';
import Layout from '~/layout/Layout';
import Page from '~/pages/page-name';
import FallBack from '~/components/FallBack';

const SubPage = lazy(() => import('~/pages/page-name/sub-page-name'));

export default function useRouteElement() {
    return useRoutes([
        // ... some route definition

        {
            path: '',
            element: <ProtectedRoute/>,
            children: [
                {
                    path: '',
                    element: <Layout/>,
                    children: [
                        {
                            path: routers.page.pathName,
                            element: <Page/>
                        },
                        {
                            path: routers.page.subPage.pathName,
                            element: (
                                <Suspense fallback={<FallBack/>}>
                                    <SubPage/>
                                </Suspense>
                            )
                        }
                    ]
                }
            ]
        }
    ]);
}

```

## 4. Tạo một component mới cho dự án.

- Đối với component dùng chung sẽ được khai báo trong file `src/components/component-name/Component.tsx` và được export
  trong file `src/components/component-name/index.tsx`.
- Đối với component chỉ sử dụng trong một page cụ thể sẽ được khai báo trong thư
  mục `src/pages/page-name/sub-page-name/components`.

```tsx

// src/components/HelloWorld/HelloWorld.tsx
import React from 'react';

interface Props {
    name: string;
}

function HelloWorld({name}: Props) {
    return (
        <div>
            Hello {name}!
        </div>
    );
}

export default HelloWorld;

```

```tsx

// src/pages/page-name/sub-page-name/components/HelloWorld/HelloWorld.tsx
import React from 'react';

interface Props {
    name: string;
}

function HelloWorld({name}: Props) {
    return (
        <div>
            Hello {name}!
        </div>
    );
}

export default HelloWorld;

```

## 5. Định nghĩa một custom hook mới cho dự án.

Các custome hook bắt đầu bằng từ `use` và được định nghĩa trong thư mục `src/hooks`.

```tsx

// src/hooks/useDebounce.ts
import {useEffect, useState} from 'react';

function useDebounce(value: any, delay: number) {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        }
    }, [value, delay]);

    return debounceValue;
}

export default useDebounce;

```

## 6. Định nghĩa một util mới cho dự án.

Các util được định nghĩa trong thư mục `src/utils`.

```ts

// src/utils/formatDate.ts
function formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US').format(date);
}

export default formatDate;

```

## 7. Định nghĩa một context mới cho dự án.

- Đối với context dùng chung sẽ được định nghĩa trong thư mục `src/contexts`.
- Đối với context chỉ sử dụng trong một page cụ thể sẽ được định nghĩa trong thư
  mục `src/pages/page-name/sub-page-name/contexts`.
- Đối với mỗi context cần một custom hook để sử dụng context đó. Nếu context chỉ sử dụng trong một page cụ thể thì
  custom hook sẽ được định nghĩa trong thư mục `src/pages/page-name/sub-page-name/hooks`.
- Với mỗi context cần đảm bảo các thành phần sau: Provider, Consumer, Context, Custom Hook, Initial State, Type State.

```tsx

// src/contexts/ThemeContext.tsx
// ... All import definition

interface IThemeContext {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
}

interface IThemeProvider {
    children: React.ReactNode;
    initialContext?: IThemeContext;
}

const initialThemeContext: IThemeContext = {
    theme: 'light',
    setTheme: () => {
    }
}

const ThemeContext = createContext<IThemeContext>(initialThemeContext);

export const ThemeProvider = ({children, initialContext = initialThemeContext}: IThemeProvider) => {
    const [theme, setTheme] = useState(initialContext.theme);

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

```

```ts

// src/hooks/useTheme.ts
import {useContext} from 'react';
import {ThemeContext} from '~/contexts/ThemeContext';

export default function useTheme() {
    return useContext(ThemeContext);
}

```

## 8. Call API trong dự án.

Dự án sử dụng http là 1 instance của axios và react-query để call API. Các api được định nghĩa trong thư mục `src/api`.

Bước 1: Định nghĩa 1 api bằng http.

```ts

// src/api/user.api.ts
import http from './http';
import {User} from '~/types/user.type';

const getUser = async (id: string) => {
    return http.get(`/api/user/${id}`);
}

const saveUser = async (user: User) => {
    return http.post('/api/user', user);
}

const userApi = {
    getUser,
    saveUser
}

export default userApi;

```

Bước 2: Định nghĩa 1 queryKey trong file `src/constant/query-key.ts`.

```ts

// src/constant/query-key.ts
const queryKey = {
    user: {
        getUser: 'user/getUser',
        saveUser: 'user/saveUser'
    }
}

export default queryKey;

```

Bước 3: Sử dụng useQuery để call API.

```tsx

// src/pages/page-name/Page.tsx
// ... some import

function Page() {
    const {data: user, isLoading, isError} = useQuery(queryKey.user.getUser, () => userApi.getUser('1'));

    if (isLoading) {
        return <FallBack/>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            <p>{user.name}</p>
            <p>{user.age}</p>
        </div>
    );
}

export default Page;

```

Bước 4: Caching dữ liệu với react-query.

Thêm một options `staleTime` cho useQuery để cấu hình thời gian cache dữ liệu.</br>
Lưu ý rằng `staleTime` chỉ áp dụng cho dữ liệu đã fetch từ server, dữ liệu mới fetch sẽ không bị ảnh hưởng
bởi `staleTime`.</br>
Cách tính `staleTime`: `hour` * `minute` * `second` * `milisecond`.

```tsx

// src/pages/page-name/Page.tsx
// ... Before code
const {data: user, isLoading, isError} = useQuery({
    queryKey: queryKey.user.getUser,
    queryFn: () => userApi.getUser('1'),
    staleTime: 1000 * 60 * 60 // 1 hour
});
// ... After code

```

Bước 5: Clear cache dữ liệu.
Sử dụng useCacheService để clear cache dữ liệu.

```tsx

// src/pages/page-name/Page.tsx
// ... Before code
const cacheService = useCacheService();

const clearCache = () => {
    cacheService.invalidateQuery({
        queryKey: queryKey.user.getUser,
        filter: {exact: true}, // optional filter
        options: {exact: true} // optional options
    });
}

const clearAllCache = () => {
    cacheService.clearAll();
}
// ... After code

```

## 9. Sử dụng thư viện lodash để xử lý dữ liệu.

Xem thêm tại [https://lodash.com/docs/4.17.15](https://lodash.com/docs/4.17.15)

```ts

import {sum} from 'lodash';

const numbers = [1, 2, 3, 4, 5];
const sum = sum(numbers);

```

## 10. Optimize performance với memoization.

Sử dụng kỹ thuật memoization để tối ưu hiệu suất của ứng dụng.

Xem thêm
tại [https://reactjs.org/docs/hooks-reference.html#usememo](https://reactjs.org/docs/hooks-reference.html#usememo)

```tsx

// src/pages/page-name/Page.tsx
// ... Before code
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
// ... After code

```

# Document History

- #### 2024-04-12: Initial document.

  __Author__: Ngoc Duc </br>
  __Description__: </br>
    - Javascript Coding Convention. </br>
    - Coding Convention With Typescript.
    - React Coding Convention Working Flow.
