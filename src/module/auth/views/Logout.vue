<template></template>

<script>
export default {
    created () { 
        this.$store.dispatch('auth/logout')
        this.$router.push({ name: 'login' })
    }
}
</script>

<style scoped></style>