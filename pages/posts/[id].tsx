import Layout from '../../components/layout'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getArticle, getIds } from '../../api/posts/_id'

export type Article = {
  title: string
  date: string
  contentHtml: string
}

export default function Post({
  postData
}: {
  postData: Article
}) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  let paths;

  try {
    paths = await getIds();
  } catch (error) {
    console.log(error);
  }

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  let postData;

  try {
    postData = await getArticle(params.id as string);
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      postData
    }
  }
}