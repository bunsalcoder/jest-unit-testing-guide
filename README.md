# Unit Testing with JavaScript and Jest Guide

## Introduction to Unit Testing and Jest

### What is Unit Testing?
Unit testing is a way of testing individual units or components of a software. A "unit" can be a function, method, or class. The goal is to ensure that each part of the program behaves as expected.

### What is Jest?
Jest is a JavaScript testing framework used for unit testing. It’s widely used for testing JavaScript code, especially in projects using frameworks like React, Node.js, etc.

### Installing Jest
To install Jest in your project, run:

```bash
npm init -y  # Initialize a new project if you haven’t already
npm install --save-dev jest
```

After this, add a script in your `package.json` to run Jest:

```json
"scripts": {
  "test": "jest"
}
```

## Writing Your First Test

### Example: Testing a Simple Function

Here’s a function that we want to test:

```javascript
// sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;
```

Now let’s write a test for this function. Create a file named `sum.test.js`:

```javascript
// sum.test.js
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### Running the Test
Run the following command in the terminal:

```bash
npm test
```

## Jest Matchers
Jest provides several matchers for assertions. Some examples:

- **Exact equality:**
  ```javascript
  expect(2 + 2).toBe(4);
  ```
- **Deep equality:**
  ```javascript
  expect({ name: 'Lika' }).toEqual({ name: 'Lika' });
  ```
- **Truthy and falsy values:**
  ```javascript
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
  ```
- **Exception testing:**
  ```javascript
  function throwError() {
    throw new Error('Oops');
  }
  expect(() => throwError()).toThrow('Oops');
  ```

## Testing Asynchronous Code

### Example with async/await

```javascript
// fetchData.js
async function fetchData(url) {
  const response = await fetch(url);
  return response.json();
}
module.exports = fetchData;
```

Now write a test for it:

```javascript
// fetchData.test.js
const fetchData = require('./fetchData');

test('fetches data from an API', async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  expect(data).toHaveProperty('id', 1);
});
```

## Mocking in Jest
Sometimes, you need to mock functions, especially when your code interacts with external systems (like databases or APIs).

### Example of Mocking a Function

```javascript
// api.js
function getUser() {
  return fetch('https://api.example.com/user').then(res => res.json());
}
module.exports = getUser;
```

To test this function without calling the API, mock the `fetch` function:

```javascript
// api.test.js
const getUser = require('./api');

jest.mock('node-fetch', () => jest.fn()); // Mocking fetch
const fetch = require('node-fetch');

test('fetches user data', async () => {
  const fakeUser = { name: 'Lika' };
  fetch.mockResolvedValueOnce({
    json: () => Promise.resolve(fakeUser),
  });

  const user = await getUser();
  expect(user).toEqual(fakeUser);
});
```

## Intermediate to Advanced Test Cases

### Example 1: Testing a Controller

```javascript
// userController.js
const UserService = require('./userService');

async function getAllUsers(req, res) {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
}

module.exports = { getAllUsers };
```

#### Test:

```javascript
// userController.test.js
const { getAllUsers } = require('./userController');
const UserService = require('./userService');

jest.mock('./userService');

describe('UserController', () => {
  let res;

  beforeEach(() => {
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  });

  test('should return a list of users', async () => {
    const mockUsers = [{ id: 1, name: 'Malis' }];
    UserService.getAllUsers.mockResolvedValue(mockUsers);

    await getAllUsers({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  test('should handle errors', async () => {
    UserService.getAllUsers.mockRejectedValue(new Error('Database error'));

    await getAllUsers({}, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Error fetching users' });
  });
});
```

## Test Coverage
Jest can generate a test coverage report:

```bash
npm test -- --coverage
```

Jest will show which lines of code are covered by tests and which are not.

## Conclusion
This guide covers unit testing with Jest, from basics to advanced concepts, including mock functions, async testing, and service/controller testing. Jest is a powerful tool that ensures your JavaScript code is reliable and maintainable.

