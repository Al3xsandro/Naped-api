import { 
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn
} from 'typeorm';

@Entity("users")
export class User {
    @PrimaryColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: false })
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;
}