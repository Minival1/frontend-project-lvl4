import { createContext, useContext } from 'react';

const socketContext = createContext();

export const useSocket = () => useContext(socketContext);

export default socketContext
