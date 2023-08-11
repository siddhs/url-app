# URL Shortener App

Welcome to the URL Shortener App! This is a simple web application that allows you to shorten long URLs and track their usage statistics.

## Getting Started

To get started with the URL Shortener App on your local machine, follow these steps:

### Prerequisites
- Node.js and npm should be installed on your machine.

### Installation

1. Clone this repository to your local machine:
```bash
git clone https://github.com/siddhs/url-app.git
```
2. Navigate to the project directory:
```bash
cd url-app
```
3. Install the dependencies:
```bash
npm install
```

## Usage

### Shorten Url

1. Run the development server:
```bash
npm start
```
2. Open your web browser and navigate to `http://localhost:3000`.
3. In the Home page, enter a valid URL in the "URL" field.
4. (Optional) Choose an expiration date for the shortened URL.
5. Click the "Shorten URL" button.
6. The shortened URL will be displayed below, along with a success message.

### View Statistics

1. Run the development server if it's not already running.
2. Open your web browser and navigate to `http://localhost:3000/stats`
3. The URL statistics table will display various data for each shortened URL, including clicks, clicks in the last 24 hours, clicks in the past week and more.
4. To delete a shortened URL, click the "Delete" button in the corresponding row.

## Screenshots

1. ![Home Page](https://github.com/siddhs/url-app/blob/main/screenshots/homepage1.png)
2. ![Short url](https://github.com/siddhs/url-app/blob/main/screenshots/homepage2.png)
3. ![Stats Page](https://github.com/siddhs/url-app/blob/main/screenshots/statspage.png)
