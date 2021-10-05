import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn()
  readonly id: string;

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

  constructor(user?: Partial<User>) {
    if (!this.id) {
      this.id = uuid();
    }

    this.email = this?.email
    this.username = this?.username
    this.password = this?.password
    this.isVerified = this?.isVerified
    this.isAdmin = this?.isAdmin
    this.created_at = this?.created_at
  }
}
