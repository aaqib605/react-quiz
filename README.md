**React Quiz App**

A React-based Quiz Web App designed to test your knowledge of React concepts across beginner, intermediate, and advanced levels. The app features a timer to challenge your speed and a high score functionality to track your best performance.

**Features**

- **Multiple Difficulty Levels**: Test your knowledge with questions categorized into beginner, intermediate, and advanced levels.

- **Interactive Timer**: Challenge yourself by answering questions within a set time limit.

- **High Score Tracking**: Keep track of your best performance and aim to beat your own records.

- **User-Friendly Interface**: A React-based design ensures smooth and responsive interactions.

- **Progressive Learning**: Improve your understanding of React concepts as you progress through varying levels of difficulty.

**Prerequisites**

Before you begin, make sure you have the following installed on your local machine:

- **Node.js** (version 14 or higher)

- **npm** (Node package manager)

**Setup Instructions**

**1\. Clone the Repository**

First, clone the repository to your local machine:

```bash
git clone https://github.com/aaqib605/react-quiz.git

cd react-quiz
```

**2\. Install Dependencies**

Next, install the required npm packages by running:

```bash
npm install
```

**3\. Run the JSON Server**

In a separate terminal session, run the following command to start a fake API server. This will populate the questions array in the application state:

```bash
npx json-server --watch ./src/data/questions.json
```

**4\. Start the Development Server**

To start the development server and run the application, use the following command:

```bash
npm run dev
```

Once the server starts, open your browser and visit http://localhost:5173 to see the app in action.
