import { Test } from '@nestjs/testing';
import { User } from './entities/user.entity';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const UserEntityList: User[] = [
    new User({
        email: 'johntre@gmail.com',
        username: 'johntree',
        password: 'johnhardpassword'
    })
]

describe('UserController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        me: jest.fn().mockResolvedValue(UserEntityList),
                        create: jest.fn().mockResolvedValue(UserEntityList)
                    }
                }
            ]
        }).compile();

        usersService = moduleRef.get<UsersService>(UsersService);
        usersController = moduleRef.get<UsersController>(UsersController);
    });

    it('should be defined', async () => {
        expect(usersController).toBeDefined();
        expect(usersService).toBeDefined();
    });

    describe('CreateNewAccount', () => {
        it('should be able to create a new account', async () => {
            const result = await usersController.create(UserEntityList[0]);

            expect(result).toEqual(UserEntityList);
            expect(typeof result).toEqual('object');
            expect(usersService.create).toHaveBeenCalledTimes(1);
        });
    });

    describe('GetUserData', () => {
        it('should be able to receive user details', async () => {
            const id = { user: UserEntityList[0].id };
            const result = await usersController.me(id);
            
            expect(result[0]).toHaveProperty('id');
            expect(typeof result).toEqual('object');
        });
    });
});