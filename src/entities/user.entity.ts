import {Entity, Column, ObjectIdColumn, ObjectID} from "typeorm";

@Entity()
export class Users {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}