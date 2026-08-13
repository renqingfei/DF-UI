<template>
  <p class="demo-note">Space：横向、竖向、自定义间距、撑满均分</p>

  <DfSpace>
    <DfButton>取消</DfButton>
    <DfButton type="primary">确定</DfButton>
    <DfTag type="brand">附注</DfTag>
  </DfSpace>

  <div style="margin-top: 16px">
    <DfSpace direction="vertical" align="start">
      <DfInput placeholder="收货人" style="width: 220px" />
      <DfInput placeholder="联系电话" style="width: 220px" />
      <DfButton type="primary" block>保存地址</DfButton>
    </DfSpace>
  </div>

  <div style="margin-top: 16px">
    <DfSpace :size="30">
      <DfTag>间距 30px</DfTag>
      <DfTag>间距 30px</DfTag>
      <DfTag>间距 30px</DfTag>
    </DfSpace>
  </div>

  <div style="margin-top: 16px">
    <DfSpace block>
      <DfButton>均分一</DfButton>
      <DfButton>均分二</DfButton>
      <DfButton type="primary">均分三</DfButton>
    </DfSpace>
  </div>

  <DfDivider>Divider：三种对齐、虚线、竖向</DfDivider>

  <DfDivider>居中文字</DfDivider>
  <DfDivider align="left">靠左文字</DfDivider>
  <DfDivider align="right">靠右文字</DfDivider>
  <DfDivider dashed>虚线</DfDivider>
  <DfDivider />

  <div>
    首页
    <DfDivider direction="vertical" />
    文档
    <DfDivider direction="vertical" />
    组件
    <DfDivider direction="vertical" dashed />
    关于
  </div>
</template>
