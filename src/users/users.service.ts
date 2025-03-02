import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) {}

    create(email: string, password: string) {
        const user = this.repo.create({ email, password });
        return this.repo.save(user);
    }

    findOne(id: number) {
        return this.repo.findOne({ where: { id } });
    }

    find(email: string) {
        return this.repo.find({ where: { email } });
    }

    remove(id: number) {
        return this.repo.delete(id);
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('user not found');
        }
        Object.assign(user, attrs);
        return this.repo.save(user);
    }
}
