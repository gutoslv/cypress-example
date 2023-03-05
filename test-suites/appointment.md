# Test case 1: Successfully book a new appointment

## Test preconditions
- User is logged in
- User has rights to book an appointment

## Test steps
- **Step 1:** Go to the appointment page
- **Step 2:** Choose one Facility
- **Step 3:** Toggle Apply for Hospital readmission
- **Step 4:** Choose one Healthcare Program
- **Step 5:** Choose one valid Visit Date
- **Step 6:** Write any Comment
- **Step 7:** Click on the Book Appointment button

## Expected results
- User is redirected to the appointment confirmation page
- User sees a success message confirming the appointment has been booked
- User sees the appointment details with the following information being the same as the ones entered in the previous steps:
  - Facility
  - Apply for Hospital readmission
  - Healthcare Program
  - Visit Date
  - Comment
- User sees a button to go to the homepage
- User can see the appointment in the appointment history

# Test case 2: Book an appointment with invalid Visit Date

## Test preconditions
- User is logged in
- User has rights to book an appointment

## Test steps
- **Step 1:** Go to the appointment page
- **Step 2:** Choose one Facility
- **Step 3:** Toggle Apply for Hospital readmission
- **Step 4:** Choose one Healthcare Program
- **Step 5:** Choose any invalid Visit Date
- **Step 6:** Write any Comment
- **Step 7:** Click on the Book Appointment button

## Expected results
- User stays on the appointment page
- User sees an error message to choose a valid Visit Date

## Test case 3: Book an appointment with empty Visit Date

## Test preconditions
- User is logged in
- User has rights to book an appointment

## Test steps
- **Step 1:** Go to the appointment page
- **Step 2:** Choose one Facility
- **Step 3:** Toggle Apply for Hospital readmission
- **Step 4:** Choose one Healthcare Program
- **Step 5:** Leave Visit Date input field empty
- **Step 6:** Write any Comment
- **Step 7:** Click on the Book Appointment button

## Expected results
- User stays on the appointment page
- User sees an error message on the Visit Date input field

# Test case 4: Book an appointment for the same Visit Date as another appointment

## Test preconditions
- User is logged in
- User has rights to book an appointment
- User has an appointment with the same Visit Date

## Test steps
- **Step 1:** Go to the appointment page
- **Step 2:** Choose one Facility
- **Step 3:** Toggle Apply for Hospital readmission
- **Step 4:** Choose one Healthcare Program
- **Step 5:** Choose the same Visit Date as the one of the existing appointment
- **Step 6:** Write any Comment
- **Step 7:** Click on the Book Appointment button

## Expected results
- User is redirected to the appointment confirmation page
- User sees a success message confirming the appointment has been booked
- User sees the appointment details with the following information being the same as the ones entered in the previous steps:
  - Facility
  - Apply for Hospital readmission
  - Healthcare Program
  - Visit Date
  - Comment
- User sees a button to go to the homepage
- User can see the appointment in the appointment history

# Test case 5: Book an appointment without logging in
- User is not logged in

## Test steps
- **Step 1:** Go to the appointment page

## Expected results
- User is redirected to the login page
- User can't access the appointment page
