import { microCMSClient, MicroCMSGetResponse } from "../lib/microcms";
import { ArticleListItem } from "../pages";

export type MicroCMSArticleListItem = ArticleListItem;

export const getIndex = async () => {
    const postData = await microCMSClient.
        get<MicroCMSGetResponse<MicroCMSArticleListItem>>('/article?orders=-date&fields=id,title,date');
    console.log(postData.data.contents)
    return postData.data.contents;
}