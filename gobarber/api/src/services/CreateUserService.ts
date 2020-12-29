import { getRepository } from 'typeorm';
import { hash } from 'bcrypt';
import User from '../models/User';

interface Request {
  name: string;
  email: string;
  password: string;
}
class CreateUserService {
  public async execute({ email, name, password }: Request): Promise<User> {
    const userRepository = getRepository(User);
    const userExists = await userRepository.findOne({ where: { email } });

    if (userExists) throw new Error('This User is already exist');

    const passawordHash = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: passawordHash,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
