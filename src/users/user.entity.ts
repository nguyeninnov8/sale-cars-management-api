import { Exclude } from "class-transformer";
import { AfterInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    email: string;
    @Column()
    @Exclude()
    password: string;

    @AfterInsert()
    logAfterInsert() {
        console.log('Insert object ', this.password);
    }


}