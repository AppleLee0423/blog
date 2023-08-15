export interface PostDTO {
    id: string;
    title: string;
    content: string;
    name: string;
    createdAt: Date;
    updatedAt?: Date; //Null이 될 수 있는 필드는 ?를 붙여줌
}