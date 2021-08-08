import { NextApiRequest, NextApiResponse } from 'next'
import { microCMSClient,  MicroCMSGetResponseItem } from '../../../lib/microcms'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== process.env.NEXT_PREVIEW_TOKEN || !req.query.slug) {
        return res.status(401).json({ message: 'Invalid token' })
    }

    // Fetch the headless CMS to check if the provided `slug` exists
    // getPostBySlug would implement the required fetching logic to the headless CMS
    const post = await getPostBySlug(req.query.slug as string, req.query.draftKey as string)

    // If the slug doesn't exist prevent preview mode from being enabled
    if (!post) {
        return res.status(401).json({ message: 'Invalid slug' })
    }

    // Enable Preview Mode by setting the cookies
    res.setPreviewData(req.query.draftKey)

    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.redirect(`/posts/${post.id}`)
}

const getPostBySlug = async (slug: string, draftKey: string): Promise<any> => {
    const post = await microCMSClient.
        get<MicroCMSGetResponseItem<any>>(`${slug}?draftKey=${draftKey}&fields=id`);
    return post.data;
}