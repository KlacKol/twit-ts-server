import {Entity, Column, ObjectIdColumn, ObjectID} from "typeorm";

@Entity()
export class Posts {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    text: string
}