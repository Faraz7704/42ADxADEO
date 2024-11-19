import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      };

      const savedUser = {
        ...createUserDto,
        id: '1',
        createdAt: new Date(),  // Mocked field
        updatedAt: new Date(),  // Mocked field
      };

      // Mocking the save method
      jest.spyOn(repository, 'save').mockResolvedValue(savedUser);

      const result = await service.createUser(createUserDto);
      expect(result).toEqual(savedUser);
    });
  });

  describe('findUserByEmail', () => {
    it('should return a user by email', async () => {
      const user = {
        id: '1',
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
        createdAt: new Date(),  // Mocked field
        updatedAt: new Date(),  // Mocked field
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      const result = await service.findUserByEmail('test@example.com');
      expect(result).toEqual(user);
    });

    it('should return undefined if no user found', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      const result = await service.findUserByEmail('nonexistent@example.com');
      expect(result).toBeUndefined();
    });
  });
});
