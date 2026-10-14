
const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://eventhub.rahulshettyacademy.com/';


test('TC01 - EventHub redirects to login page', async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page).toHaveURL(/\/login/);

  await expect(page).toHaveTitle(
    'EventHub — Discover & Book Events'
  );

  console.log('Verified URL:', page.url());
  console.log('Page title:', await page.title());
});




test('TC02 - Check login form elements', async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page).toHaveURL(/\/login/);

  console.log('Input fields:', await page.locator('input').count());
  console.log('Buttons:', await page.getByRole('button').allTextContents());

  await expect(page.locator('form')).toBeVisible();
});






test('TC03 - Login form validation messages', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page.getByText('Enter a valid email')).toBeVisible();

  await expect(
    page.getByText('Password must be at least 6 characters')
  ).toBeVisible();

  console.log('Email validation verified');
  console.log('Password validation verified');
});





// test('TC03 - Check EventHub page and title', async ({ page }) => {
//   await page.goto(BASE_URL);

//   await expect(page.locator('body')).toBeVisible();

//   console.log('Actual URL:', page.url());
//   console.log('Actual title:', await page.title());
//   console.log(
//     'Visible page text:',
//     (await page.locator('body').innerText()).slice(0, 500)
//   );
// });


// test('TC04 - Discover available navigation links', async ({ page }) => {
//   await page.goto(BASE_URL);

//   const links = await page.locator('a').evaluateAll(items =>
//     items.map(a => ({
//       text: a.innerText.trim(),
//       url: a.href
//     })).filter(a => a.text.length > 0)
//   );

//   console.log('NAVIGATION LINKS:', JSON.stringify(links, null, 2));
// });


test('TC04 - Open Register page', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('link', { name: 'Register' }).click();

  await expect(page).toHaveURL(/register/i);

  console.log('Register page URL:', page.url());
});


// test('TC04 - Find EventHub navigation links', async ({ page }) => {
//   await page.goto(BASE_URL);

//   await page.waitForLoadState('domcontentloaded');

//   const links = await page.locator('a').evaluateAll(items =>
//     items.map(a => ({
//       text: a.innerText.trim(),
//       url: a.href
//     })).filter(a => a.text.length > 0)
//   );

//   console.log(
//     'NAVIGATION LINKS:',
//     JSON.stringify(links, null, 2)
//   );
// });




test('TC05 - Check Register page form elements', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('link', { name: 'Register' }).click();

  await expect(page).toHaveURL(/register/i);

  console.log('Input fields:', await page.locator('input').count());

  console.log(
    'Buttons:',
    await page.getByRole('button').allTextContents()
  );

  await expect(page.locator('form')).toBeVisible();
});




test('TC06 - Empty registration form validation', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('link', { name: 'Register' }).click();

  await page.getByRole('button', { name: 'Create Account' }).click();

  await expect(
    page.getByText('Enter a valid email')
  ).toBeVisible();

  await expect(
    page.getByText('At least 8 characters')
  ).toBeVisible();

  await expect(
    page.getByText('Password does not meet the requirements below')
  ).toBeVisible();

  console.log('Email and password validation verified');
});




test('TC07 - Identify registration form inputs', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('link', { name: 'Register' }).click();

  const inputs = await page.locator('input').evaluateAll(elements =>
    elements.map(input => ({
      type: input.type,
      name: input.name,
      placeholder: input.placeholder
    }))
  );

  console.log('Registration inputs:', JSON.stringify(inputs, null, 2));
});



test('TC08 - Equivalence Partitioning for email', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('link', { name: 'Register' }).click();

  const email = page.getByPlaceholder('you@email.com');

  // Invalid email equivalence class
  await email.fill('abc');
  console.log('Invalid email entered:', await email.inputValue());

  // Valid-format email equivalence class
  await email.fill('student@example.com');
  await expect(email).toHaveValue('student@example.com');
  console.log('Valid-format email verified');

  // Empty email equivalence class
  await email.fill('');
  await expect(email).toHaveValue('');
  console.log('Empty email verified');
});




test('TC09 - Boundary Value Analysis for password length', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('link', { name: 'Register' }).click();

  const password = page.getByPlaceholder(
    'Min 8 chars, uppercase, number & symbol'
  );

  // Below minimum boundary: 7 characters
  await password.fill('Abc@123');
  await expect(password).toHaveValue('Abc@123');
  console.log('Below boundary: 7 characters');

  // At minimum boundary: 8 characters
  await password.fill('Abc@1234');
  await expect(password).toHaveValue('Abc@1234');
  console.log('At boundary: 8 characters');

  // Above minimum boundary: 9 characters
  await password.fill('Abc@12345');
  await expect(password).toHaveValue('Abc@12345');
  console.log('Above boundary: 9 characters');
});



test('TC10 - Confirm Password field', async ({ page }) => {
  await page.goto(BASE_URL);

  await page.getByRole('link', { name: 'Register' }).click();

  const confirmPassword = page.getByPlaceholder('Repeat your password');

  await confirmPassword.fill('Abc@12345');

  await expect(confirmPassword).toHaveValue('Abc@12345');

  console.log('Confirm Password field verified');
});




test('TC11 - Open Home page', async ({ page }) => {
  await page.goto(BASE_URL);

  await expect(page).toHaveURL(/\/login|\/$/);

  console.log('Home URL:', page.url());
});

test('TC12 - Open Events page', async ({ page }) => {
  await page.goto('/events');

  await expect(page).toHaveURL(/\/events/);

  console.log('Events URL:', page.url());
});

test('TC13 - Open Bookings page', async ({ page }) => {
  await page.goto('/bookings');

  await expect(page).toHaveURL(/\/bookings/);

  console.log('Bookings URL:', page.url());
});
