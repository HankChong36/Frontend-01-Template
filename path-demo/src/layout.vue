<style lang="less" scoped>
.base-layout {
  min-height: 100vh;
}
.base-content {
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  justify-self: center;
  flex-direction: row;
  .left {
    width: 800px;
    height: 100%;
  }
  .right {
    display: flex;
    width: 440px;
    margin: 0 0 auto 10px;
  }
}
</style>
<template>
  <Layout class="base-layout">
    <Layout>
      <Layout :style="{ padding: '0 24px 24px' }">
        <Content class="base-content">
          <div class="left">
            <Card>
              <slot name="left"></slot>
            </Card>
          </div>
          <div class="right">
            <Card>
              <slot name="right"></slot>
            </Card>
          </div>
        </Content>
      </Layout>
    </Layout>
  </Layout>
</template>
<script>
export default {
  name: "layout"
};
</script>
