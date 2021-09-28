import {
    PrimaryColumn,
    Column,
    CreateDateColumn,
    Entity
} from 'typeorm';

@Entity("news")
export class News {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    description: string;
    
    @Column()
    likes: number;

    @Column()
    views: number;

    @Column()
    thumbnail: string;

    @Column()
    categorie: string;

    @CreateDateColumn()
    created_at: Date;
}