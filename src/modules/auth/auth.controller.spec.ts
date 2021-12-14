import { Test } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

const UserEntityList: User[] = [
  new User({
    email: 'johntre@gmail.com',
    username: 'johntree',
    password: 'johnhardpassword',
  }),
];

const token = [
  {
    token: 'token',
  },
];

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            auth: jest.fn().mockResolvedValue(token[0]),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
    authController = moduleRef.get<AuthController>(AuthController);
  });

  it('should be defined', async () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('Authentication', () => {
    it('should be able to receive jwt token after login', async () => {
      const result = await authController.auth(UserEntityList[0]);

      expect(result).toHaveProperty('token');
    });
  });
});
