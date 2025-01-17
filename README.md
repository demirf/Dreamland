# Dreamland - Children's Story App

Dreamland is a story reading application designed for children. It consists of a React Native mobile app and a Node.js backend.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Expo CLI
- React Native development environment

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/dreamland.git
cd dreamland
```

2. Backend setup:
```bash
cd backend
cp .env.example .env  # Create .env file and configure environment variables
npm install
npm run dev
```

3. Mobile app setup:
```bash
cd mobile
npm install
npm start
```

## Features

- View list of stories
- Read story details
- Save favorite stories
- Send feedback
- User-friendly interface for children
- Offline storage for favorites

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- TypeScript
- RESTful API architecture
- Environment configuration with dotenv

### Mobile
- React Native with Expo
- TypeScript
- React Navigation for routing
- React Native Paper for UI components
- Axios for API communication
- AsyncStorage for local storage

## Project Structure

```
dreamland/
├── backend/             # Node.js backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── config/       # Configuration files
│   └── ...
│
└── mobile/             # React Native app
    ├── src/
    │   ├── screens/     # App screens
    │   ├── components/  # Reusable components
    │   ├── navigation/  # Navigation setup
    │   ├── services/    # API services
    │   ├── context/     # React Context
    │   └── theme/       # UI theme
    └── ...
```

## API Endpoints

- `GET /api/stories` - Get all stories
- `GET /api/stories/:id` - Get story by ID
- `POST /api/feedback` - Submit feedback

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Thanks to all contributors
- Inspired by classic children's stories
- Built with love for children's education and entertainment 