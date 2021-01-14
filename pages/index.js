import Head from 'next/head'
import Link from 'next/link';
import { getPosts } from '../lib/wp-rest-api'

const posts = 'http://chlheadless.wpengine.com/wp-json/wp/v2/posts'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Click Here Labs Blog</title>
      </Head>
      <main>
        <h1>Click Here Labs Blog - Headless WPE</h1>
        {posts.map(post => (
          <article key={post.id}>
            <h2>{post.title.rendered}</h2>
            <Link href={`/posts/${post.slug}`}>
              <a>{`/posts/${post.slug}`}</a>
            </Link>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}></div>
          </article>
        ))}
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const posts = await getPosts();
  return {
    props: { posts }
  }
}
