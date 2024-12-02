import { AutoMap } from '@automapper/classes';

export class Repository {
  @AutoMap()
  id: number;

  @AutoMap()
  name: string;

  @AutoMap()
  full_name: string;

  @AutoMap()
  private: boolean;

  @AutoMap()
  html_url: string;

  @AutoMap()
  description: string;
}
