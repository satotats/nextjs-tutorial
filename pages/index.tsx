import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'
import { GetStaticProps } from 'next'
import { getIndex, getIntroduction } from '../api'

export type Introduction = {
  contentHtml: string;
}

export type ArticleListItem = {
  id: number | string;
  date: string;
  title: string;
}

export default function Home({
  introduction,
  allPostsData,
}: {
  introduction: Introduction,
  allPostsData: ArticleListItem[],
}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <div dangerouslySetInnerHTML={{ __html: introduction.contentHtml }} />
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <p>
          (This is a sample website - you’ll be building a site like this in{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  let allPostsData: ArticleListItem[];
  let introduction: Introduction;

  try {
    allPostsData = await getIndex();
    introduction = await getIntroduction();
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      allPostsData,
      introduction
    }
  }
}