# A-Level Physics Marking App

An app that marks long answer A-Level physics questions, provides a mark, and explains the rationale behind the awarded marks. It references a knowledge base of mark schemes. Upon further prompting, it presents the full mark scheme and an example full-mark answer.

## User Journeys

1. [Submit Answer](docs/journeys/submit-answer.md) - Upload a photo of a physics question and your answer to receive a mark and feedback.
2. [View Mark Scheme](docs/journeys/view-mark-scheme.md) - After receiving feedback, request to see the full mark scheme.
3. [View Example Answer](docs/journeys/view-example-answer.md) - Request an example full-mark answer for the question.

## External APIs

- **Tesseract.js**: Used for Optical Character Recognition (OCR) to extract text from uploaded images of handwritten physics questions.

## Environment Variables

The app requires the following environment variables to function correctly:

- **COCKROACH_DB_URL**: Database connection URL.
- **NPM_TOKEN**: Token for accessing private npm packages.
- **VITE_PUBLIC_APP_ID**: Public identifier for the application.
- **VITE_PUBLIC_APP_ENV**: Environment setting (e.g., development, production).
- **VITE_PUBLIC_SENTRY_DSN**: DSN for Sentry error tracking.
- **VITE_PUBLIC_UMAMI_WEBSITE_ID**: Website ID for Umami analytics.

## Design Details

Refer to the [Design Documentation](docs/design/design-details.md) for information on color palettes, fonts, and other design elements used in the app.

## Adding API Keys

If using external APIs that require API keys, ensure to add them to the `.env` file following these steps:

1. Open the `.env` file in the root directory.
2. Add your API key in the following format:
   ```
   API_KEY_NAME=your_api_key_here
   ```
3. Save the file.

**Note**: Do not commit the `.env` file to version control to keep your API keys secure.

## Running the App

1. **Install Dependencies**
   ```
   npm install
   ```

2. **Start the Development Server**
   ```
   npm run dev
   ```

3. **Build for Production**
   ```
   npm run build
   ```

4. **Preview the Production Build**
   ```
   npm run serve
   ```