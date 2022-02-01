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
  category: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(news?: Partial<News>) {
    if (!this.id) {
      this.id = uuid();
    }

    (this.title = this?.title),
      (this.description = this?.description),
      (this.category = this?.category),
      (this.likes = this?.likes),
      (this.views = this?.views),
      (this.thumbnail = this?.thumbnail),
      (this.created_at = this?.created_at);
  }
}
