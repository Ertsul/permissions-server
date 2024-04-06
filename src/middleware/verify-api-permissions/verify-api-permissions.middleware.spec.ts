import { VerifyApiPermissionsMiddleware } from './verify-api-permissions.middleware';

describe('VerifyApiPermissionsMiddleware', () => {
  it('should be defined', () => {
    expect(new VerifyApiPermissionsMiddleware()).toBeDefined();
  });
});
