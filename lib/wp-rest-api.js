export async function getPosts() {
  const response = await fetch(
    'http://chlheadless.wpengine.com/wp-json/wp/v2/posts'
  );
  const json = await response.json();
  if (json.errors) {
    console.error(json.errors);
  }
  return json;
}
