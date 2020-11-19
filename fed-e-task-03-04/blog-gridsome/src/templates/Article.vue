<template>
  <Layout>
    <div class="article-wrapper">
      <h1 class="article-title">{{$page.post.Title}}</h1>
      <p>{{$page.post.published_at}}</p>
      <p class="article-favor">
          <i class="el-icon-star-on" v-if="$page.post.favor"></i>
          <i class="el-icon-star-off" v-else></i>
          {{$page.post.favor}}
      </p>
      <div v-html="markdown($page.post.Content)"></div>
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
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt()
export default {
  metaInfo() {
    return{
      title: this.$page.post.Title
    }
  },
  methods:{
    markdown(article){
      return md.render(article)
    }
  }
}
</script>

<style>
.article-wrapper{
  padding: 20px;
}

.article-title, .article-favor{
  text-align: center;
}
</style>
