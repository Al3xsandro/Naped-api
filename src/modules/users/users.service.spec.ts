import { Test, TestingModule } from '@nestjs/testing';

import { getRepositoryToken } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const UserEntityList: User[] = [
    new User({
        email: 'johntree@gmail.com',
        username: 'johntree',
        password: 'johnhardpassword',
        created_at: new Date()
    })
]

describe('UsersService', () => {
    let usersService: UsersService;
    let usersRepository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: {
                        me: jest.fn().mockResolvedValue(UserEntityList),
                        create: jest.fn().mockReturnValue(UserEntityList),
                        findOne: jest.fn().mockResolvedValue(UserEntityList),
                        getUser: jest.fn().mockResolvedValue(UserEntityList[0])
                    },
                },
            ],
        }).compile();
        
        usersService = module.get<UsersService>(UsersService);
        usersRepository = module.get<Repository<User>>(
            getRepositoryToken(User)
        );
    })

    it('should be defined', async () => {
        expect(usersService).toBeDefined();
        expect(usersRepository).toBeDefined();
    });

    describe('GetUserData', () => {
        it('should be able to receive user details', async () => {
            const id = UserEntityList[0].id

            const result = await usersService.me(id);

            expect(result[0]).toHaveProperty('id');
        });

        it('should be able to receive user details', async () => {
            const result = await usersService.getUser('johntree');

            expect(result.rest[0]).toEqual(UserEntityList[0]);
        });
    });
});