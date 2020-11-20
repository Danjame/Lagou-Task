<template>
  <Layout>
    <div class="container">
      <div class="article-head">
        <h2 class="article-title">{{ $page.post.Title }}</h2>
        <div class="article-info">
          <span class="article-date">{{ $page.post.published_at }}</span>
          <i class="el-icon-star-on" v-if="$page.post.favor"></i>
          <i class="el-icon-star-off" v-else></i>
          {{ $page.post.favor }}
        </div>
      </div>
      <div class="article-content" v-html="markdown($page.post.Content)"></div>
    </div>
  </Layout>
</template>

<page-query>
query($id: ID!){
  post: strapiPost(id:$id){
    id
    Title
    Content
    favor
    published_at
  }
}
</page-query>

<script>
import MarkdownIt from "markdown-it";
const md = new MarkdownIt();
export default {
  metaInfo() {
    return {
      title: this.$page.post.Title,
    };
  },
  methods: {
    markdown(article) {
      return md.render(article);
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.article-head {
  border-bottom: solid 1px #eee;
}

.article-title,
.article-info {
  padding: 10px;
}

.article-date {
  margin-right: 100px;
}

.article-content {
  padding: 20px;
}
</style>
