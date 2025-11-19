<template>
  <div class="chat-list-container">
    <!-- 按钮列表 -->
    <div class="button-list">
      <div class="button-wrapper">
        <el-button
          type="primary"
          class="list-button transparent-blue-btn"
          @click="handleNewConversation"
        >
          新对话
        </el-button>
      </div>
      <div class="button-wrapper">
        <el-button class="list-button" @click="handleRag"> RAG </el-button>
      </div>
      <div class="button-wrapper">
        <el-button class="list-button" @click="handleTools"> TOOLS </el-button>
      </div>
    </div>

    <!-- 聊天记录列表 -->
    <div class="chat-history-list">
      <McList :data="options">
        <template #item="{ item }">
          <i :class="item.icon" style="margin-right: 4px"></i>
          {{ item.label }}
        </template>
      </McList>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ElButton } from "element-plus";

const options = ref([
  { label: `Option 1`, value: 1, icon: "icon-information" },
  { label: `Option 2`, value: 2, icon: "icon-inform" },
  { label: `Option 3`, value: 3, icon: "icon-infrastructure" },
]);

// 按钮点击事件处理函数
const handleNewConversation = () => {
  console.log("新建对话");
};

const handleRag = () => {
  console.log("RAG功能");
};

const handleTools = () => {
  console.log("TOOLS功能");
};
</script>

<style scoped lang="scss">
.chat-list-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.button-list {
  display: flex;
  flex-direction: column;
  padding: 12px;
  gap: 8px;
  border-bottom: 1px solid #eee;
}

.button-wrapper {
  width: 100%;
}

.list-button {
  width: 100%;
  text-align: center;
}

.chat-history-list {
  flex: 1;
  overflow-y: auto;
}
.transparent-blue-btn {
  background-color: transparent;
  border: 1px solid #1890ff; /* 蓝色边框 */
  color: #1890ff; /* 蓝色文字 */

  &:hover {
    background-color: rgba(24, 144, 255, 0.1); /* 悬停时轻微背景 */
    border-color: #40a9ff;
    color: #40a9ff;
  }
}
</style>
