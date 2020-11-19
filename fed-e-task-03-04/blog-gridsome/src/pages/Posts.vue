<template>
  <Layout>
    <div class="post-wrapper" v-for="edge in $page.posts.edges" :key="edge.node.id">
      <g-link :to="'/article/' + edge.node.id">
      <!-- <g-link to="/article/"> -->
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
        <el-pagination
        background
        layout="prev, pager, next"
        :total="100"
        style=""
        >
    </el-pagination>
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
    title: 'Post List'
  }
}
</script>

<style>
.post-wrapper{
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

.active{
    text-decoration: none;
}

a{
    text-decoration: none;
    color: #333;
}

</style>
