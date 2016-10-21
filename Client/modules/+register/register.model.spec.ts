import { RegisterModel } from './register.model';

describe('Register Model', () => {
  it('has email', () => {
    let registerModel: RegisterModel = { email: 'test@test.test', password: 'Super Cat', username: 'test' };
    expect(registerModel.email).toEqual('test@test.test');
  });
  it('has password', () => {
    let registerModel: RegisterModel = { email: 'test@test.test', password: 'Super Cat', username: 'test' };
    expect(registerModel.password).toEqual('Super Cat');
  });
  it('has username', () => {
    let registerModel: RegisterModel = { email: 'test@test.test', password: 'Super Cat', username: 'test' };
    expect(registerModel.username).toEqual('test');
  });
});
