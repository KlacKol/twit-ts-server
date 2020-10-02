import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {Posts} from "../entities";

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Posts) private postRepository: Repository<Posts>
    ) {}
    public async getPosts() {
        return await this.postRepository.find();
    }

    public async createPost(post) {
        return await this.postRepository.save(post);
    }
}