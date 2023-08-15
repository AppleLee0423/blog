import { PostDTO } from "./blog.model";
import { Injectable } from "@nestjs/common";
import { BlogMongoRepository } from "./blog.repository";

@Injectable()
export class BlogService {
    private blogRepository: BlogMongoRepository;

    constructor(blogRepository: BlogMongoRepository) {
        this.blogRepository = blogRepository;
    }

    //모든 글 조회
    async getAllPost() {
        return await this.blogRepository.getAllPost();
    }

    createPost(postDTO: PostDTO) {
        this.blogRepository.createPost(postDTO);
    }

    //특정 글 조회
    async getPost(id): Promise<PostDTO> {
        return await this.blogRepository.getPost(id);
    }

    //글 삭제
    deletePost(id) {
        this.blogRepository.deletePost(id);
    }

    //글 수정
    updatePost(id, postDTO: PostDTO) {
        this.blogRepository.updatePost(id, postDTO);
    }
}