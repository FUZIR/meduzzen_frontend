import CryptoJS from 'crypto-js';

export function hashQuizId(quiz_id, user_id) {
  const hashString = `${quiz_id}_${user_id}`;
  return CryptoJS.MD5(hashString).toString();
}