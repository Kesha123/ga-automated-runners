import { AutoMap } from '@automapper/classes';
import RunnerStatus from '../models/runner-status.enum';
import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('github_runner')
export class RunnerEntity {
  @AutoMap()
  @ObjectIdColumn()
  _id: ObjectId;

  @AutoMap()
  id: number;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: RunnerStatus,
  })
  status: RunnerStatus;

  @AutoMap()
  @Column('array')
  labels: string[];

  @AutoMap()
  @Column()
  current_job_id: number;

  @AutoMap()
  @Column()
  next_job_id: number;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;

  @AutoMap()
  @Column({ nullable: true })
  shutdown_at: Date;

  @AutoMap()
  @Column({ nullable: true })
  urn: string;
}
