import { isDev } from '../common/utils/platforms';

export const API_URL = isDev() ? 'http://localhost:4000' : 'https://www.google.com';
