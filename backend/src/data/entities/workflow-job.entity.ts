import WorkflowJobConclusion from '../models/workflow-job-conclusion.enum';
import WorkflowJobStatus from '../models/workflow-job-status.enum';
import {
  Entity,
  ObjectIdColumn,
  ObjectId,
  Column,
  Index,
  ManyToOne,
} from 'typeorm';
import { RunnerEntity } from './runner.entity';
import { AutoMap } from '@automapper/classes';
import { WorkflowJob } from '../models/workflow-job.model';
import { Step } from '../models/step.model';

@Entity('workflow_jobs')
@Index('id_index', ['id'], { unique: true })
class WorkflowJobEntity implements WorkflowJob {
  @AutoMap()
  @ObjectIdColumn()
  _id: ObjectId;

  @AutoMap()
  @Column()
  id: number;

  @AutoMap()
  @Column()
  run_id: number;

  @AutoMap()
  @Column()
  run_url: string;

  @AutoMap()
  @Column()
  run_attempt: number;

  @AutoMap()
  @Column()
  node_id: string;

  @AutoMap()
  @Column()
  head_sha: string;

  @AutoMap()
  @Column()
  url: string;

  @AutoMap()
  @Column()
  html_url: string;

  @AutoMap()
  @Column({
    enum: WorkflowJobStatus,
  })
  status: WorkflowJobStatus;

  @AutoMap()
  @Column({
    enum: WorkflowJobConclusion,
    nullable: true,
  })
  conclusion: WorkflowJobConclusion | null;

  @AutoMap()
  @Column({
    nullable: true,
  })
  started_at: string | null;

  @AutoMap()
  @Column({
    nullable: true,
  })
  completed_at: string | null;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column(() => Step)
  steps: Step[];

  @AutoMap()
  @Column()
  labels: string[];

  @AutoMap()
  @Column({
    nullable: true,
  })
  runner_id: number | null;

  @AutoMap()
  @Column({
    nullable: true,
  })
  runner_name: string | null;

  @AutoMap()
  @Column({
    nullable: true,
  })
  runner_group_id: number | null;

  @AutoMap()
  @Column({
    nullable: true,
  })
  runner_group_name: string | null;

  @AutoMap()
  @ManyToOne(() => RunnerEntity, (runner) => runner.id)
  runner: RunnerEntity;
}

export default WorkflowJobEntity;
