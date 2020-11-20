<template>
  <Layout>
    <div class="container">
      <el-menu mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">关注</el-menu-item>
        <el-menu-item index="2">粉丝</el-menu-item>
      </el-menu>
      <div v-if="index == 1">
        <div class="social-list">
          <div v-for="edge in $page.follows.edges" :key="edge.node.id">
            <p>{{ edge.node.name }}</p>
            <g-link :to="edge.node.link">主页</g-link>
            <g-image :src="edge.node.img" />
          </div>
        </div>
        <div class="pagination">
          <pager
            linkClass="pagination-link"
            :info="$page.follows.pageInfo"
          ></pager>
        </div>
      </div>
      <div v-if="index == 2">
        <div class="social-list">
          <div v-for="edge in $page.followers.edges" :key="edge.node.id">
            <p>{{ edge.node.name }}</p>
            <g-link :to="edge.node.link">主页</g-link>
            <g-image :src="edge.node.img" />
          </div>
        </div>
        <div class="pagination">
          <pager
            linkClass="pagination-link"
            :info="$page.followers.pageInfo"
          ></pager>
        </div>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query ($page: Int){
  follows: allStrapiFollow (perPage:1, page: $page) @paginate{
        pageInfo{
        totalPages
        currentPage
    }
    edges{
      node{
        name
        link
        img
      }
    }
  }
  followers: allStrapiFollower (perPage:6, page: $page) @paginate{
      pageInfo{
      totalPages
      currentPage
  }
    edges{
      node{
        name
        link
        img
      }
    }
  }
}
</page-query>


<script>
import { Pager } from "gridsome";
export default {
  metaInfo: {
    title: "Social",
  },
  components: {
    Pager,
  },
  data() {
    return {
      index: null,
    };
  },
  methods: {
    handleSelect(key) {
      this.index = key;
    },
  },
};
</script>

<style scoped>
.social-list {
  display: flex;
}

.social-list > div {
  width: 150px;
  padding: 10px;
  margin-top: 20px;
  margin-right: 20px;
  border: solid 1px #eee;
  text-align: center;
}

.g-image {
  width: 150px;
}

.pagination {
  text-align: center;
}

.pagination-link {
  margin: 0 10px;
}

.active {
  text-decoration: none;
}

a {
  text-decoration: none;
  color: #333;
}
</style>
