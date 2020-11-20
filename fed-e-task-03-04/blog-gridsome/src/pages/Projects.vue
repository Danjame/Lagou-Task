<template>
  <Layout>
    <div>
      <div class="project-list">
        <div v-for="edge in $page.projects.edges" :key="edge.node.id">
          <div class="project-head">
            <g-link :to="edge.node.link">
              <h2>{{ edge.node.title }}</h2>
            </g-link>
            <p>{{ edge.node.published_at }}</p>
          </div>
          <div class="project-tags">
            <div v-for="tag in edge.node.tags">
              {{ tag.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="pagination">
        <pager
          linkClass="pagination-link"
          :info="$page.projects.pageInfo"
        ></pager>
      </div>
    </div>
  </Layout>
</template>

<page-query>
query($page: Int){
  projects: allStrapiProject (perPage:6, page: $page) @paginate{
    pageInfo{
        totalPages
        currentPage
    }
    edges{
      node{
        id
        title
        link
        published_at
        tags{
          name
        }
      }
    }
  }
}
</page-query>

<script>
export default {
  metaInfo: {
    title: "Projects",
  },
};
</script>

<style scoped>
.project-list > div {
  padding: 20px;
  border-bottom: solid 1px #eee;
}

.project-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
}

.project-tags {
  display: flex;
  justify-content: space-around;
}

.project-tags > div {
  padding: 2px 5px;
  background-color: #9ad3bc;
  border-radius: 5px;
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
