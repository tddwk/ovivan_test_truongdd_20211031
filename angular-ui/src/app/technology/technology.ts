import {Project} from "../project/project";

export class Technology {
  constructor(
    public id?: number,
    public name?: string,
    public projects?: Project[],
  ) {  }
}
