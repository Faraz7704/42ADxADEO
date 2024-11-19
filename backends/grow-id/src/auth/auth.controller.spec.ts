import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtModule } from '@nestjs/jwt';
import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
  let usersService: UsersService;

  const mockUserService = {
    findUserByEmail: jest.fn(),
    createUser: jest.fn(),
  };

  const mockAuthService = {
    validateUser: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'testsecret',
          signOptions: { expiresIn: '60s' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        { provide: UsersService, useValue: mockUserService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('register', () => {
    it('should create a user and return it', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password123',
        role: 'user',
      };

      mockUserService.createUser.mockResolvedValue(createUserDto);

      const result = await authController.register(createUserDto);
      expect(result).toEqual(createUserDto);
    });
  });

  describe('login', () => {
    it('should return a JWT token for valid user', async () => {
      const loginDto = { email: 'test@example.com', password: 'password123' };
      const user = { id: '1', email: 'test@example.com', role: 'user' };
      const token = 'jwt-token';

      mockAuthService.validateUser.mockResolvedValue(user);
      mockAuthService.login.mockResolvedValue({ access_token: token });

      const result = await authController.login(loginDto);
      expect(result).toEqual({ access_token: token });
    });

    it('should throw UnauthorizedException if invalid credentials', async () => {
      const loginDto = { email: 'test@example.com', password: 'wrongpassword' };

      mockAuthService.validateUser.mockResolvedValue(null);

      try {
        await authController.login(loginDto);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
        expect(e.response.message).toBe('Invalid credentials');
      }
    });
  });
});
