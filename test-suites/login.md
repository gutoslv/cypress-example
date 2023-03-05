# Test case 1: Login with valid credentials

## Test preconditions
- User has valid credentials
- User is not logged in

## Test steps
- **Step 1:** Go to the login page
- **Step 2:** Enter valid username and password in input field
- **Step 3:** Click on the login button

## Expected results
- User is logged in
- User is redirected to the appointment page

# Test case 2: Login with invalid credentials

## Test preconditions
- User has invalid credentials
- User is not logged in

## Test steps
- **Step 1:** Go to the login page
- **Step 2:** Enter invalid username and password in input field
- **Step 3:** Click on the login button

## Expected results
- User is not logged in
- User sees an error message to ensure the username and password are valid
- User is stays on the login page

# Test case 3: Login with empty credentials
- User is not logged in

## Test steps
- **Step 1:** Go to the login page
- **Step 2:** Leave username and password input field empty
- **Step 3:** Click on the login button

## Expected results
- User is not logged in
- User sees an error message to ensure the username and password are valid
- User is stays on the login page

# Test case 4: Login with invalid password and valid username

## Test preconditions
- User has valid username and invalid password
- User is not logged in

## Test steps
- **Step 1:** Go to the login page
- **Step 2:** Enter valid username and invalid password in input field
- **Step 3:** Click on the login button

## Expected results
- User is not logged in
- User sees an error message to ensure the username and password are valid
- User is stays on the login page

# Test case 5: Login with valid password and invalid username
- User has invalid username and valid password
- User is not logged in

## Test steps
- **Step 1:** Go to the login page
- **Step 2:** Enter invalid username and valid password in input field
- **Step 3:** Click on the login button

## Expected results
- User is not logged in
- User sees an error message to ensure the username and password are valid
- User is stays on the login page
