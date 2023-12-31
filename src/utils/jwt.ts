import { sign, verify } from 'jsonwebtoken';
import { authCredentials } from '../config';
import { JWTPayloadType } from '../types';

const generateJWTToken = (payload: JWTPayloadType) => {
  return sign(payload, authCredentials.privateKey, {
    issuer: authCredentials.issuer,
    expiresIn: `${authCredentials.tokenExpiresIn}h`,
    algorithm: 'HS256',
  });
};

const verifyJWTToken = (token: string) => {
  try {
    const decoded = verify(token, authCredentials.privateKey, {
      issuer: authCredentials.issuer,
      algorithms: ['HS256'],
    });

    return decoded;
  } catch (error) {
    return null;
  }
};

export { generateJWTToken, verifyJWTToken };
