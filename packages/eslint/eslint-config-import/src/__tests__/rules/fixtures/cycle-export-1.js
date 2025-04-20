import { exportB } from './cycle-export-2.js';

export const exportA = () => {
  return 42;
};

exportB();
