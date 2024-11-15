import { AutoMap } from '@automapper/classes';
import RunnerOS from 'src/models/runner-os.enum';
import RunnerStatus from 'src/models/runner-status.enum';
import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('github_runner')
export class RunnerEntity {
  @AutoMap()
  @ObjectIdColumn()
  id: ObjectId;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: RunnerStatus,
  })
  status: RunnerStatus;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @Column({
    type: 'enum',
    enum: RunnerOS,
  })
  os: string;

  @AutoMap()
  @Column('array')
  labels: string[];
}
