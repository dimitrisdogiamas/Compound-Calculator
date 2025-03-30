import { RolesGuard } from '../roles-guard/RolesGuard.guard';

describe('RolesGuard', () => {
  it('should be defined', () => {
    expect(new RolesGuard()).toBeDefined();
  });
});
