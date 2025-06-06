# Task Manager Frontend

![Task Manager Screenshot](./screenshot.png) <!-- Add a screenshot if available -->

A modern, responsive task management application built with React and Vite. This frontend connects to a Node.js/Express backend with MongoDB to provide a complete task management solution with JWT authentication.

## Features

- 🔒 **JWT Authentication** - Secure login/registration with access/refresh tokens
- ✅ **Task Management** - Create, read, update, and delete tasks
- 🔄 **Real-time Updates** - Instant UI updates when tasks change
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Built with Vite for optimal speed
- 🎨 **Clean UI** - Intuitive interface with modern styling

## Technologies Used

- [Vite](https://vitejs.dev/) - Next-gen frontend tooling
- [React](https://reactjs.org/) - JavaScript library for building UIs
- [Redux toolkit](https://redux-toolkit.js.org/) - The official, opinionated, batteries-included toolset for efficient Redux development
- [React Router](https://reactrouter.com/) - Client-side routing
- [Axios](https://axios-http.com/) - HTTP client for API requests
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) - Popular icons library

## Prerequisites

- Node.js (v16 or higher recommended)
- Backend API server running (see [backend repository](https://github.com/nonso-uj/Task-app-backend))
- Modern web browser

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-manager-frontend.git
   cd task-manager-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your environment variables:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=Task Manager
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser to [http://localhost:5173](http://localhost:5173)

## Available Scripts

- `dev` - Starts the development server
- `build` - Builds the app for production
- `preview` - Locally preview production build
- `test` - Runs tests (if configured)
- `lint` - Runs linter (if configured)

## Project Structure

```
/src
|-- /assets          # Static assets
|-- /components      # Reusable UI components
|-- /pages           # Page components
|-- /redux           # Redux specific configuration
|-- /utils           # Utility functions
|-- App.jsx          # Main app component
|-- main.jsx         # App entry point
|-- index.css        # Main css file
```

## Connecting to Backend

This frontend is designed to work with the [Task Manager Backend API](https://github.com/nonso-uj/Task-app-backend). Ensure your backend is running and update the `VITE_API_BASE_URL` in your `.env` file to point to your backend server.

## Deployment

### Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build and deploy:
   ```bash
   npm run build
   netlify deploy --prod
   ```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback, please contact:  
[Chinonso Udonne] - [nonso.udonne@gmail.com]  
Project Link: [https://nonso-react-auth-app.netlify.app/](https://nonso-react-auth-app.netlify.app/)
