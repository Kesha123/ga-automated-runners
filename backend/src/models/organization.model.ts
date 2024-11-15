import { AutoMap } from '@automapper/classes';

class Organization {
  @AutoMap()
  login: string;

  @AutoMap()
  id: number;

  @AutoMap()
  url: string;

  @AutoMap()
  repos_url: string;

  @AutoMap()
  description: string;
}

export default Organization;
