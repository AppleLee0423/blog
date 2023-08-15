import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document; //블로그이면서 도큐먼트인 타입 정의

@Schema()
export class Blog {
    @Prop() //Schema의 property 명시
    id: string;

    @Prop()
    title: string;

    @Prop()
    content: string;

    @Prop()
    name: string;

    @Prop()
    createdAt: Date;

    @Prop()
    updatedAt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog); //스키마 생성