<template>
  <Layout>
    <div>
      update
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
    title: 'My Blog'
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
