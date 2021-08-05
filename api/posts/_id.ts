import { microCMSClient, MicroCMSGetResponse } from "../../lib/microcms";
import { Article } from "../../pages/posts/[id]";

export type MicroCMSArticle = Article;

export const getIds = async () => {
    const postData = await microCMSClient.
        get<MicroCMSGetResponse<any>>('/article?fields=id');
    return postData.data.contents.map(({ id }) => {
        return {
            params: {
                id: id
            }
        }
    });
}


export const getArticle = async (id: string) => {
    const postData = await microCMSClient.
        get<MicroCMSGetResponse<MicroCMSArticle>>(`/article/${id}?`);
    return postData.data;
}