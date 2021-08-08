import { microCMSClient, MicroCMSGetResponse, MicroCMSGetResponseItem } from "../../lib/microcms";
import { Article } from "../../pages/posts/[id]";

export type MicroCMSArticle = Article;

export const getIds = async () => {
    const post = await microCMSClient.
        get<MicroCMSGetResponse<any>>('/article?fields=id');
    return post.data.contents.map(({ id }) => {
        return {
            params: {
                id: id
            }
        }
    });
}


export const getArticle = async (id: string, draftKey?: string) => {
    const post = await microCMSClient.
        get<MicroCMSGetResponseItem<MicroCMSArticle>>(`/article/${id}?${draftKey ? "draftKey=" + draftKey : ""}`);
    return post.data;
}