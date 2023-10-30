import { User } from '../../src/entities/User.entity';
import { handleGetRepository } from '../../src/utils';
import { UserInputType } from '../../src/types/user';

export const createUser = async (userInput: UserInputType) => {
  const userRepository = handleGetRepository(User);

  const newUser = Object.assign(new User(), userInput);

  const user = await userRepository.save(newUser);
  return user;
};
