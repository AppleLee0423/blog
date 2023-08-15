import { readFile, writeFile } from 'fs/promises'; //파일을 읽고 쓰는 모듈
import { PostDTO } from './blog.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';

export interface BlogRepository {
    getAllPost(): Promise<PostDTO[]>;
    createPost(postDTO: PostDTO);
    getPost(id: String): Promise<PostDTO>;
    deletePost(id: String);
    updatePost(id: String, postDTO: PostDTO);
}

@Injectable()
export class BlogFileRepository implements BlogRepository {
    FILE_NAME = './src/blog.data.json';

    //전체글 조회
    async getAllPost(): Promise<PostDTO[]> {
        const datas = await readFile(this.FILE_NAME, 'utf8');
        const posts = JSON.parse(datas);
        return posts;
    }

    //새 글 작성
    async createPost(postDTO: PostDTO) {
        const posts = await this.getAllPost();
        const id = posts.length + 1;
        const createPost = { id: id.toString(), ...postDTO, createdAt: new Date() };
        posts.push(createPost);
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }

    //특정 글 조회
    async getPost(id: String): Promise<PostDTO> {
        const posts = await this.getAllPost();
        const result = posts.find((post) => post.id === id);
        return result;
    }

    //글 삭제
    async deletePost(id: String) {
        const posts = await this.getAllPost();
        const filteredPosts = posts.filter((post) => post.id !== id);
        await writeFile(this.FILE_NAME, JSON.stringify(filteredPosts));
    }

    //글 수정
    async updatePost(id: String, postDTO: PostDTO) {
        const posts = await this.getAllPost();
        const index = posts.findIndex((post) => post.id === id);
        const updatePost = { id, ...postDTO, updatedAt: new Date() };
        posts[index] = updatePost;
        await writeFile(this.FILE_NAME, JSON.stringify(posts));
    }   
}

@Injectable()
export class BlogMongoRepository implements BlogRepository {

    //Model<BlogDocument> 타입의 blogModel 주입
    constructor(@InjectModel(Blog.name) private blogModel: Model<BlogDocument>) {}

    //전체 글 조회
    async getAllPost(): Promise<PostDTO[]> {
        return await this.blogModel.find().exec();
    }

    //새 글 작성
    async createPost(postDTO: PostDTO) {
        const createPost = {
            ...postDTO,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        this.blogModel.create(createPost);
    }

    //특정 글 조회
    async getPost(id: String): Promise<PostDTO> {
        return await this.blogModel.findById(id);
    }

    //글 삭제
    async deletePost(id: String) {
        await this.blogModel.findByIdAndDelete(id);
    }

    //글 수정
    async updatePost(id: String, postDTO: PostDTO) {
        const updatePost = { id, ...postDTO, updatedAt: new Date() };
        await this.blogModel.findByIdAndUpdate(id, updatePost);
    }
}