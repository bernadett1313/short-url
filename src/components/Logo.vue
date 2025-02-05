<script setup>
import LinkIcon from './icons/LinkIcon.vue';

</script>

<template>
    <RouterLink to="/">
        <div class="flex items-center gap-x-1.5">
            <LinkIcon></LinkIcon>
            <h1 class="text-orange-500 font-semibold text-xl">ShortURL</h1>
        </div>   
    </RouterLink>
</template>

