<script lang="ts" setup>
import ShowItem from '@/components/ShowItem.vue'

const friendsImage = 'https://play-images-prod-ctf.tech.tvnz.co.nz/api/v1/web/image/3CLEzO37tocxCoSmzzcxwx/2733ae58689b3e59e477a86d2da48a36/friends-showtile.png.2733ae58689b3e59e477a86d2da48a36.jpg?width=1200&height=630'
const officeImage = 'https://images.hola.com/us/images/0266-117f1e1bfa6b-90b6fc2f2c37-1000/horizontal-1200/the-office-poster-with-steve-carell.jpg'
const familyGuyImage = 'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/7238583A12BC3EE570A6D8E240D67D0E6CACE9C782B434F7FFE09747512BDE0C/scale?width=1200&aspectRatio=1.78&format=webp'

</script>

<template>
    <div>
        <ShowItem :thumbnail="friendsImage" show="Friends"/>
        <ShowItem :thumbnail="officeImage" show="Office"/>
        <ShowItem :thumbnail="familyGuyImage" show="FamilyGuy"/>
    </div>
</template>

<style scoped>
div {
    display: flex;
    flex-direction: row;
    gap: 1em;
    align-items: center;
    padding: 1em;
}
</style>
