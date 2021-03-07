// THIS FILE MIGHT BE USED FOR DIRECTIVES. KEEPING IT HERE FOR NOW

// import { AuthenticationError } from 'apollo-server-micro';
// import {models} from '../../db'

// const secret = '5tQ6aAmA-LaxDC7h6kV7-3C6Rg!AV5';

// interface User {
//   id: string,
//   type: string,
//   iat: number
// }

// export const getUserFromUid = (token: string)  => {
//   try {
//     const user: string | User = jwt.verify(token, secret);
//     console.log('user from jwt.verify: ', user);
//     console.log('user from Token: ', models['Talent'].findOne({ id: user.id }))
//     return models['Talent'].findOne({ id: user.id });
//   } catch (e) {
//     return null;
//   }
// };

// export const authenticated = next => (root, args, context, info) => {
//   if (!context.user) {
//     throw new AuthenticationError('must authenticate')
//   }
//   return next(root, args, context, info)
// }

export {};
