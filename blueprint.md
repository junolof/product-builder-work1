# English Vocabulary Helper

## Overview

An interactive web application that helps users learn English vocabulary. The user enters a word in Korean, and the application provides a comprehensive set of information, including the English translation, pronunciation, example sentences, and usage notes.

## Features

*   **Korean to English Translation:** Translates the user's input from Korean to English.
*   **Detailed Word Analysis:** Provides phonetic pronunciation, definitions, and example sentences for the translated English word.
*   **Usage Guidance:** Offers insights into common usage and grammar patterns.
*   **Modern UI:** A clean, responsive, and visually appealing interface with a dark/light theme toggle.
*   **API Integration:** Uses free, public APIs for translation and dictionary lookups.

## Plan

### Phase 1: Application Scaffolding

*   **blueprint.md**: Redefine the project goals and features.
*   **index.html**: Create the new UI structure:
    *   An input field for the Korean word.
    *   A search button to initiate the lookup.
    *   A container to display the results.
    *   A theme-toggle button.
*   **style.css**: Style the new elements, ensuring a clean and readable layout for the input and results areas. Adapt the existing theme.
*   **main.js**: 
    *   Implement the event listener for the search button.
    *   Add the logic to fetch data from the translation and dictionary APIs.
    *   Implement the logic to dynamically render the results on the page.
    *   Preserve the theme-toggling functionality.
