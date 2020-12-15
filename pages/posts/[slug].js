import { useRouter } from 'next/router';
import { getPosts } from '../../lib/wp-rest-api';
import Link from 'next/link';

export default function Posts({ post }) {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <main>
      <Link href="/">
        <a>Home</a>
      </Link>
      <h1>This is a post page { slug }.</h1>
      <section>
        <h2>{post.title.rendered}</h2>
        <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
      </section>
    </main>
  )
}

export async function getPost(slug) {
  const response = await fetch(
    `http://chlheadless.wpengine.com/wp-json/wp/v2/posts?slug=${slug}`
  );

  const json = await response.json();
  if (json.errors) {
    console.error(json.errors);
  }

  return json[0];
};

export async function getStaticProps({ params }) {
  const post = await getPost(params.slug);

  return {
    props: { post }
  };
}

export async function getStaticPaths() {
  const posts = await getPosts();
  const paths = posts.map((post) => `/posts/${post.slug}`)

  return {
    paths,
    fallback: true,
  }
}
