# APK Gaming - Mine Sweeper

APK Gaming - Mine Sweeper is a modern implementation of the classic Minesweeper game, built as a personal project to explore and demonstrate skills in React, TypeScript, and modern web development practices. The game is fully responsive, supports both desktop and mobile interactions, and includes robust unit testing to ensure reliability.

## Features

- **Classic Gameplay**: Enjoy the traditional Minesweeper experience with customizable grid sizes and mine counts.
- **Responsive Design**: Optimized for both desktop and mobile devices, with touch support for mobile users.
- **Dynamic Game State**: Real-time updates to the game board, timer, and flag counter.
- **Customizable Settings**: Configure the number of rows, columns, and mines before starting a new game.
- **Game Status Management**: Pause, resume, and reset the game with intuitive controls.
- **Visual Feedback**: Clear visual indicators for opened tiles, flagged tiles, and mines.
- **Winning and Losing Conditions**: Automatically detects when the player wins or loses the game.

## Technologies Used

This project leverages a modern tech stack to deliver a high-quality gaming experience:

- **React**: For building the user interface and managing component state.
- **TypeScript**: For type safety and improved developer productivity.
- **Vite**: As the build tool for fast development and optimized production builds.
- **SCSS**: For styling with modular and reusable stylesheets.
- **Jest**: For unit testing to ensure the reliability of the game logic and components.
- **React Testing Library**: For testing React components in a user-centric way.
- **React Device Detect**: For handling device-specific interactions (e.g., touch events on mobile).
- **ESLint**: For maintaining code quality and enforcing best practices.
- **Preconfigured TypeScript Configurations**: For bundler mode and strict linting.

## Testing

The project includes comprehensive unit tests written in Jest to validate the functionality of the game. Key areas covered by the tests include:

- **Game Logic**: Ensures correct placement of mines, calculation of proximity values, and game state transitions.
- **Components**: Tests for rendering, user interactions, and visual feedback in components like `Tile`, `MineSweeper`, and `GameSettings`.
- **Edge Cases**: Validates behavior for invalid inputs, edge cases, and winning/losing conditions.

To run the tests, use the following command:
```bash
npm test
```

## How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mine_sweeper.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mine_sweeper
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173`.

## Live Demo

Try the game live at: [APK Gaming - Mine Sweeper](https://minesweeper-lovat-psi.vercel.app/)

## Folder Structure

- **`src/`**: Contains the source code for the application.
  - **`components/`**: Reusable React components like `Tile`, `MineSweeper`, and `GameSettings`.
  - **`utils/`**: Utility functions for game logic.
  - **`styles/`**: SCSS files for styling.
- **`test/`**: Unit tests for components and utilities.
- **`public/`**: Static assets like the `index.html` file.
- **`dist/`**: Production build output (ignored in `.gitignore`).

## Future Enhancements

- Add animations for tile interactions.
- Implement a leaderboard to track high scores.
- Add support for multiple difficulty levels.
- Enhance accessibility for screen readers.

## Author

This project was created by **Ali Salehi** as a personal project to explore modern web development practices.

## License

This project is licensed under the MIT License.

---
Built with ❤️ by Ali Salehi.