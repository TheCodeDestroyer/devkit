import { exportA } from './cycle-export-1.js';

export const exportB = () => {
  return 42;
};

exportA();
