import { PrimaryColumn, Column, CreateDateColumn, Entity } from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('news')
export class News {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  likes: number;

  @Column({ default: 0 })
  views: number;

  @Column()
  thumbnail: string;

  @Column()
  categorie: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
