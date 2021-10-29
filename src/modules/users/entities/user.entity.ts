import { Role } from '../../../shared/infra/http/enum/role.enum';
import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

@Entity('users')
export class User {
  @PrimaryColumn()
  readonly id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @CreateDateColumn()
  created_at: Date;

  @Column({ type: 'enum', enum: Role, default: Role.User})
  roles: Role[];

  constructor(user?: Partial<User>) {
    if (!this.id) {
      this.id = uuid();
    }

    this.email = this?.email
    this.username = this?.username
    this.password = this?.password
    this.isVerified = this?.isVerified
    this.created_at = this?.created_at
  }
}
