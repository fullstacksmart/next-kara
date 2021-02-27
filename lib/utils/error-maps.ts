const errorMap = new Map();
errorMap.set('auth/user-not-found', 'errors.auth.userNotFound');
errorMap.set('auth/wrong-password', 'errors.auth.wrongPassword');
errorMap.set('auth/too-many-requests', 'errors.auth.tooManyRequests');

// SIGNUP ONLY
errorMap.set('auth/weak-password', 'errors.auth.weakPassword');
errorMap.set('auth/email-already-in-use', 'errors.auth.emailAlreadyInUse');

export default errorMap;
