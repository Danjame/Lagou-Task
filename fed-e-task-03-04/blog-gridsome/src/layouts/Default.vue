<template>
  <div class="layout">
    <el-container>
      <el-header style="height: auto; padding: 50px">
        <div>
          <h1>Danjun Xie</h1>
          <p>Welcome to my page</p>
        </div>
        <el-row>
          <g-link to='https://danjunxie.com' style="marginRight: 20px">
            <el-button>Personal Site</el-button>
          </g-link>
           <g-link to= 'https://github.com/Danjame/Lagou-Task'>
            <el-button>Github</el-button>
           </g-link>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px" style="borderRight: solid 1px #ddd">
          <el-menu style="borderWidth: 0" :default-active = "this.$route.query.key" @select="handleSelect" >
              <el-menu-item index="1">
                <i class="el-icon-news"></i>
                <span slot="title">最新动态</span>
              </el-menu-item>
              <el-menu-item index="2">
                <i class="el-icon-connection"></i>
                <span slot="title">社交圈子</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-tickets"></i>
                <span slot="title">博客列表</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-coin"></i>
                <span slot="title">开源项目</span>
              </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <slot />
        </el-main>
      </el-container>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  methods: {
    handleSelect(key) {
      switch (key) {
        case '1':
          this.routerPush('/', key)
          break;
        case '2':
          this.routerPush('/social/', key)
          break;
        case '3':
          this.routerPush('/posts/', key)
          break;
        case '4':
          break;
      }
    },
    routerPush(path, key){
      this.$router.push({ path, query: { key }}).catch(err=>err);
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.el-header, .el-footer {
  background-color: #eee;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}
</style>