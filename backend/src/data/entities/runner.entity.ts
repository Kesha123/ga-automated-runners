import { AutoMap } from '@automapper/classes';
import RunnerStatus from '../models/runner-status.enum';
import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Runner } from '../models/runner.model';

@Entity('github_runner')
export class RunnerEntity implements Runner {
  @AutoMap()
  @ObjectIdColumn()
  _id: string;

  @AutoMap()
  id: number;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: RunnerStatus,
  })
  status: RunnerStatus;

  @AutoMap()
  @Column()
  labels: string[];

  @AutoMap()
  @Column()
  current_job_id: number;

  @AutoMap()
  @Column()
  next_job_id: number;

  @AutoMap()
  @CreateDateColumn()
  created_at: Date;

  @AutoMap()
  @UpdateDateColumn()
  updated_at: Date;

  @AutoMap()
  @Column({ nullable: true })
  shutdown_at: Date;

  @AutoMap()
  @Column({ nullable: true })
  urn: string;
}
