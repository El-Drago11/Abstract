import { io } from 'socket.io-client';

// Set up the socket connection based on the environment
const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:8000';

export const socket = io(URL, {
    withCredentials: true, // Enable credentials
    transports: ['websocket'], // try both websocket and polling
});

