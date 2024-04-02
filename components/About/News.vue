<script setup lang="ts">

</script>


<template>
    <div class="news margin-top-80">
        <div class="section-header-links">
            <h5 class='each-section-header'>Новости</h5>
            <button class="look-all-btn" @click="navigateTo('/news')">
                <span>Смотреть все</span>
                <img src='../../assets/icons/icon=components-more.svg' />
            </button>
        </div>

        <div class="news-list">
            <NewsItem />
            <NewsItem />
            <NewsItem />
        </div>

    </div>
</template>
