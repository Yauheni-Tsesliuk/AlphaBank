# Google Test Plan

Target: https://www.google.com/  
Type: Smoke + core functional coverage  
Starting state: Fresh browser session, no signed-in Google account required

## Scope

This plan covers:
- Homepage availability
- Search input and primary actions
- Search execution
- Autocomplete suggestions
- Navigation to key Google surfaces
- Basic footer/header validation
- Core responsiveness and accessibility checks

This plan does not cover:
- Signed-in account flows
- Personalized search results
- Regional/legal content variations beyond basic presence checks
- Browser permission handling beyond basic UI availability

## Assumptions

- Tests start from a clean browser context
- Network connectivity is available
- Google may localize some labels based on region/language
- Cookie/consent banners may appear depending on geolocation

## Success Criteria

- Homepage loads without browser or server error
- Search can be performed successfully
- Core navigation elements are visible and usable
- Search results page renders expected result areas
- No broken layout on common viewport sizes

## Failure Conditions

- Homepage does not load
- Search box is missing or unusable
- Search submission does not navigate to results
- Core navigation links fail to respond
- Major UI elements overlap, disappear, or break on load

## Test Scenarios

### 1. Homepage loads successfully
Steps:
1. Open https://www.google.com/
2. Wait for page load to complete
3. Observe the page title and main content

Expected result:
- The page title contains "Google"
- The Google homepage is displayed
- No error page is shown

### 2. Search input is visible and usable
Steps:
1. Open the homepage
2. Locate the main search input
3. Click into the search input
4. Type a short query such as `Playwright`

Expected result:
- Search input is visible
- Input receives focus
- Typed text appears correctly

### 3. Google Search button is visible
Steps:
1. Open the homepage
2. Locate the `Google Search` button

Expected result:
- The button is visible
- The button is enabled after text is entered

### 4. I'm Feeling Lucky button is visible
Steps:
1. Open the homepage
2. Locate the `I'm Feeling Lucky` button

Expected result:
- The button is visible
- The button is interactable

### 5. Search works with Enter key
Steps:
1. Open the homepage
2. Enter `Playwright testing` in the search input
3. Press Enter

Expected result:
- The browser navigates to the search results page
- The results area is visible
- The query remains present in the search box on the results page

### 6. Search works with Google Search button
Steps:
1. Open the homepage
2. Enter `TypeScript`
3. Click `Google Search`

Expected result:
- The browser navigates to the results page
- Results matching the query are displayed

### 7. Autocomplete suggestions appear while typing
Steps:
1. Open the homepage
2. Type `play` into the search field
3. Observe the suggestion list

Expected result:
- An autocomplete suggestion list appears
- At least one suggestion is shown

### 8. Autocomplete can be dismissed
Steps:
1. Open the homepage
2. Type `news`
3. Confirm suggestions appear
4. Press Escape

Expected result:
- Suggestion list closes
- The entered query remains in the input

### 9. Empty search does not break the page
Steps:
1. Open the homepage
2. Leave the search field empty
3. Attempt to submit the search

Expected result:
- The page remains stable
- No crash or browser error occurs

### 10. Search handles long input
Steps:
1. Open the homepage
2. Paste a long string of approximately 300 to 500 characters
3. Submit the query

Expected result:
- Search submission completes
- Results page loads or the query is safely handled
- No visual or functional breakage occurs

### 11. Search handles special characters safely
Steps:
1. Open the homepage
2. Enter a query containing special characters such as `<script>alert(1)</script>`
3. Submit the query

Expected result:
- Search results page loads normally
- No script execution occurs
- No broken DOM or visible injection appears

### 12. Images results can be opened
Steps:
1. Search for `Playwright`
2. On the results page, click `Images`

Expected result:
- Images results view opens
- Image-related results are displayed

### 13. News results can be opened
Steps:
1. Search for `Playwright`
2. On the results page, click `News`

Expected result:
- News results view opens
- News-related results are displayed

### 14. Sign in link is visible and opens account page
Steps:
1. Open the homepage
2. Click `Sign in`

Expected result:
- Navigation proceeds to a Google account sign-in page

### 15. Google apps menu opens
Steps:
1. Open the homepage
2. Click the Google apps icon in the header

Expected result:
- Apps panel opens
- Common apps such as Gmail are visible

### 16. Footer links are visible
Steps:
1. Open the homepage
2. Scroll to or inspect the footer
3. Locate `Privacy` and `Terms`

Expected result:
- Footer links are present
- Links are visible and interactable

### 17. Privacy link opens correctly
Steps:
1. Open the homepage
2. Click `Privacy`

Expected result:
- A Google privacy-related page opens

### 18. Terms link opens correctly
Steps:
1. Open the homepage
2. Click `Terms`

Expected result:
- A Google terms-related page opens

### 19. Search input is focused on page load
Steps:
1. Open the homepage
2. Check the currently focused element

Expected result:
- The main search input is focused by default or can be focused immediately with no obstruction

### 20. Mobile viewport renders core UI correctly
Steps:
1. Open the homepage in a mobile-sized viewport such as 375x812
2. Observe the logo, search input, and primary actions

Expected result:
- Core elements remain visible
- Layout is not broken or overlapping

### 21. Tablet viewport renders core UI correctly
Steps:
1. Open the homepage in a tablet-sized viewport such as 768x1024
2. Inspect layout and search controls

Expected result:
- Search input and core actions remain usable
- No major alignment issues appear

### 22. Desktop viewport renders core UI correctly
Steps:
1. Open the homepage in a desktop viewport such as 1920x1080
2. Inspect header, search area, and footer

Expected result:
- Layout appears stable and centered
- All key controls are accessible

## Notes and Risks

- Google often changes DOM structure and localized labels
- Consent or region-specific banners may affect flow
- Tests should prefer stable selectors such as role, accessible name, and semantic attributes over CSS classes