import axios from "axios";
import { ArticleListItem } from "../pages";

export const microCMSClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'X-API-KEY': process.env.NEXT_PUBLIC_API_KEY
    },
});

export type MicroCMSGetResponseItem<T> = T & {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
};

export interface MicroCMSGetResponse<T> {
    contents: MicroCMSGetResponseItem<T>[];
    totalCount: number;
    offset: number;
    limit: number;
}

// export type MicroCMSParams = {
//     limit?: number;
//     offset?: number;
//     orders?: '-publishedAt' | 'publishedAt'; // 降順：-publishedAt 昇順：publishedA
//     filters?: string;
// };

