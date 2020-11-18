<template>
  <Layout>
       <div v-for="edge in $page.posts.edges" :key="edge.node.id">
      <a href="">
        <h2>
          {{edge.node.Title}}
        </h2>
        <p>
          {{edge.node.published_at}}
        </p>
        <p>
          {{edge.node.favor}}
        </p>
      </a>
    </div>
  </Layout>
</template>

<page-query>
query{
  posts: allStrapiPost{
    edges{
      node{
        id
        Title
        Content
        favor
        published_at
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
