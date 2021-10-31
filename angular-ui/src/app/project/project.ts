import {Technology} from "../technology/technology";
import {Developer} from "../developer/developer";

export class Project {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public start_date: string,
    public technologies: Technology[],
    public developers: Developer[],
    public end_date?: string
  ) {  }
}
