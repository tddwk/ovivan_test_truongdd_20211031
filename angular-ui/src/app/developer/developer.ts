import {Project} from "../project/project";

export class Developer {
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public projects?: Project[]
  ) {  }
}
