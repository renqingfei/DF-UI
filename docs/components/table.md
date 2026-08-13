# Table / Pagination

表格与翻页器。**只有 PC 端** —— 手机上放不下一张宽表格，硬塞只会两头不讨好，移动端用
[List](/components/mobile) 代替。

<script setup>
import TableAll from '../.vitepress/demos/pc/table-all.vue'
</script>

<ThemeSwitch />

<DemoBlock title="固定列 + 固定表头 + 排序 + 自定义单元格 + 翻页">
  <TableAll />
</DemoBlock>

<<< @/.vitepress/demos/pc/table-all.vue

## 固定表头与固定列都是纯 CSS

表头 `position: sticky; top: 0`，固定列 `position: sticky; left/right`。**没有测量任何元素**，
所以不用监听滚动、不用处理窗口缩放，也不会出现「滚动时表头抖动」这种老毛病。

代价只有一条：**固定列必须显式给 `width`**。因为第二个固定列的左偏移是它前面所有固定列宽度之和，
这个和只能由配置算出来，不能靠测量。

## Table API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `columns` | 列配置，见下 | `TableColumn[]` | `[]` |
| `data` | 数据数组 | `Record<string, unknown>[]` | `[]` |
| `row-key` | 行的唯一标识字段 | `string` | 用下标（数据会变时务必给） |
| `stripe` | 斑马纹 | `boolean` | `false` |
| `border` | 画竖线 | `boolean` | `false` |
| `size` | 密度 | `small` \| `medium` \| `large` | `medium` |
| `show-header` | 显示表头 | `boolean` | `true` |
| `max-height` | 超过就固定表头、内容区滚动 | `string \| number` | — |
| `loading` | 加载中，盖一层遮罩 | `boolean` | `false` |
| `empty-text` | 没数据时的提示 | `string` | `暂无数据` |
| `local-sort` | 在组件内部排序。接后端分页排序时关掉，只听 `sortChange` | `boolean` | `true` |
| `sort-key` / `sort-order` | 受控排序状态 | `string` / `asc`\|`desc`\|`null` | 组件自己维护 |

### 列配置 TableColumn

| 字段 | 说明 |
| --- | --- |
| `key` | 取数据的字段名，**也是自定义单元格插槽的名字** |
| `title` | 表头文字 |
| `width` | 列宽；固定列必须给 |
| `align` | `left` \| `center` \| `right` |
| `fixed` | `left` \| `right` |
| `sortable` | 点表头可排序，三态循环：升 → 降 → 不排序 |

### 自定义单元格

插槽名就是列的 `key`，能拿到 `row` / `value` / `index`：

```vue
<df-table :columns="columns" :data="rows">
  <template #status="{ value }">
    <df-tag :type="value === 'on' ? 'success' : 'default'">{{ value }}</df-tag>
  </template>
  <template #action="{ row }">
    <df-button size="small" variant="text" @click="edit(row)">编辑</df-button>
  </template>
</df-table>
```

表头也能自定义，插槽名是 `header-{key}`。

事件：`rowClick(row, index)`、`sortChange(key, order)`。

::: tip 排序不会改你传进来的数组
组件内部排序时会先拷一份再排。这一点有测试守着 —— 直接排原数组会让上层的数据源莫名其妙变顺序，
是很难查的那类 bug。
:::

::: warning 表格正文不用玻璃或渐变材质
表格是要盯着看很久的内容，底下透着东西会看得眼睛疼。所以表格正文一律用实底色，
这条写在设计规范里，不是随便定的。
:::

## Pagination API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `model-value` / `v-model` | 当前页，从 1 开始 | `number` | `1` |
| `total` | 总条数 | `number` | `0` |
| `page-size` | 每页条数 | `number` | `10` |
| `pager-count` | 中间最多显示几个页码（省略号不算） | `number` | `7` |
| `show-total` | 显示「共 N 条」 | `boolean` | `true` |
| `disabled` | 禁用 | `boolean` | `false` |

事件：`update:model-value`、`change`。

页数很多时首尾页码常驻、中间跟着当前页滑动，断开处显示省略号。
`total` 为 0 时仍然是 1 页 —— 不会出现「0 / 0」这种看着像坏了的显示。
