<template>
  <Layout>
    <div class="container">
      <g-link :to="'/article/' + $page.posts.edges[0].node.id">
        <h2 class="post-title">
          {{$page.posts.edges[0].node.Title}}
        </h2>
        <p class="post-time">
          发布时间： {{$page.posts.edges[0].node.published_at}}
        </p>
        <p class="post-favor">
          <i class="el-icon-star-on" v-if="$page.posts.edges[0].node.favor"></i>
          <i class="el-icon-star-off" v-else></i>
          {{$page.posts.edges[0].node.favor}}
        </p>
      </g-link>
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

<style scoped>
.post-title,
.post-time,
.post-favor{
    text-align: center;
    padding: 10px;
}

.active{
    text-decoration: none;
}

a{
    text-decoration: none;
    color: #333;
}
</style>
