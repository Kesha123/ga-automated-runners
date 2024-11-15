import { AutoMap } from '@automapper/classes';

class Sender {
  @AutoMap()
  login: string;

  @AutoMap()
  id: number;

  @AutoMap()
  avatar_url: string;

  @AutoMap()
  html_url: string;
}

export default Sender;
