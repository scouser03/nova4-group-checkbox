<template>
    <span class="w-full">
        <span>
            {{ `${field.value.length} permissions attached this role` }}
        </span>
    </span>
</template>

<script>
export default {
    props: ["resourceName", "field"],
};
</script>
