import {Body, Controller, Get, Post, UseGuards} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

import {PostService} from "../services";
import {PostDto} from "../dto";
import {Posts} from '../entities'

@Controller('post')
export class PostController {
    constructor(
        private postService: PostService
    ) {}

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getPosts() {
        return await this.postService.getPosts();
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createPost(@Body() post: PostDto): Promise<Posts> {
        return await this.postService.createPost(post);
    }
}