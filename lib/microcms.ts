const URL = process.env.NEXT_PUBLIC_API_URL;
const KEY = process.env.NEXT_PUBLIC_API_KEY;

interface Article {
    id: string;
    title: string;
    date: string;
    contentHtml?: string;
}

export async function getIndex() {
    const postData: Article[] = await fetch(`${URL}?orders=-date&fields=id,title,date`, {
        headers: {
            'X-API-KEY': KEY
        }
    }).then(res => res.json())
        .then(res => res.contents);

    return postData;
}

export async function getIds() {
    const postData = await fetch(`${URL}?fields=id`, {
        headers: {
            'X-API-KEY': KEY
        }
    }).then(res => res.json())
        .then(res => res.contents);

    return postData.map(({ id }) => {
        return {
            params: {
                id: id
            }
        }
    })
}


export async function getArticle(id: string) {
    const postData = await fetch(`${URL}/${id}`, {
        headers: {
            'X-API-KEY': KEY
        }
    }).then(res => res.json());
    console.log(postData)
    return postData;
}