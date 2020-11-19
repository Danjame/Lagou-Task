<template>
  <Layout>
    <div class="container" v-for="edge in $page.posts.edges" :key="edge.node.id">
      <g-link :to="'/article/' + edge.node.id">
        <h2 class="post-title">
          {{edge.node.Title}}
        </h2>
        <p class="post-time">
          发布时间： {{edge.node.published_at}}
        </p>
        <p class="post-favor">
          <i class="el-icon-star-on" v-if="edge.node.favor"></i>
          <i class="el-icon-star-off" v-else></i>
          {{edge.node.favor}}
        </p>
      </g-link>
    </div>
    <div class="pagination">
        <pager linkClass="pagination-link" :info="$page.posts.pageInfo"></pager>
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int){
  posts: allStrapiPost(perPage:6, page: $page) @paginate {
    pageInfo{
        totalPages
        currentPage
    }
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
import { Pager } from 'gridsome'
export default {
  metaInfo: {
    title: 'Post List'
  },
  components:{
      Pager
  }
}
</script>

<style scoped>
.container{
    margin-bottom: 20px;
    border-bottom: solid 1px #eee;
}

.post-title,
.post-time,
.post-favor{
    text-align: center;
    padding: 10px;
}

.pagination{
    text-align: center;
}

.pagination-link{
    margin: 0 10px;
}

.active{
    text-decoration: none;
}

a{
    text-decoration: none;
    color: #333;
}
</style>
