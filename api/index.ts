import { microCMSClient, MicroCMSGetResponse, MicroCMSGetResponseItem } from "../lib/microcms";
import { ArticleListItem, Introduction } from "../pages";
import { MicroCMSArticle } from "./posts/_id";

export type MicroCMSArticleListItem = ArticleListItem;
export type MicroCMSIntroduction = Introduction;

export const getIndex = async () => {
    const postData = await microCMSClient.
        get<MicroCMSGetResponse<MicroCMSArticleListItem>>('/article?orders=-date&fields=id,title,date');
    return postData.data.contents;
}

export const getIntroduction = async () => {
    const postData = await microCMSClient.
        get<MicroCMSGetResponseItem<MicroCMSIntroduction>>('/introduction?fields=contentHtml');
    return postData.data;
}