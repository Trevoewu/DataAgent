<template>
  <RouterView />
</template>

<script setup>
import { computed } from "vue";
import { ConfigProvider, App as AntdApp } from "ant-design-vue";
import { useTheme } from "./hooks/useTheme";
import { RouterView } from "vue-router";
</script>
