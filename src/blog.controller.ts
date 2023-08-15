import { Controller, Param, Body, Delete, Get, Post, Put } from '@nestjs/common';
import { BlogService } from  './blog.service';

@Controller('blog')
export class BlogController {
    private blogService: BlogService;

    constructor(blogService: BlogService) {
        this.blogService = blogService;
    }

    //모든 글 조회
    @Get()
    getAllPosts() {
        console.log("모든 게시글 가져오기");
        return this.blogService.getAllPost();
    }

    //새 글 작성
    @Post()
    createPost(@Body() postDTO) {
        console.log("게시글 작성");
        this.blogService.createPost(postDTO);
        return 'success';
    }

    //특정 글 조회
    @Get('/:id')
    async getPost(@Param('id') id: string) {
        console.log("특정 글 조회");

        const post = await this.blogService.getPost(id);
        console.log(post);
        return post;
    }

    //글 삭제
    @Delete('/:id')
    deletePost(@Param('id') id: string) {
        console.log("게시글 삭제");
        this.blogService.deletePost(id);
        return 'success';
    }

    //글 수정
    @Put('/:id')
    updatePost(@Param('id') id: string, @Body() postDTO) {
        console.log("게시글 업데이트", id, postDTO);
        return this.blogService.updatePost(id, postDTO);
    }
}