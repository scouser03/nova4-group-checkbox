<template>
    <div
        class="flex flex-col md:flex-row -mx-6 px-6 py-2 md:py-0 space-y-2 md:space-y-0"
    >
        <div class="md:w-1/4 md:py-3">
            <slot>
                <h4 class="font-bold md:font-normal">{{ field.name }}</h4>
            </slot>
        </div>
        <div class="w-3/4 py-4 break-words">
            <slot name="value" class="text-90 flex">
                <span>
                    {{ `${field.value.length} permissions attached this role` }}
                </span>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ["index", "resource", "resourceName", "resourceId", "field"],

    methods: {
        optionClass(permission) {
            return {
                "text-primary-500": this.field.value
                    ? this.field.value.includes(permission.option)
                    : false,
                "text-red-500": this.field.value
                    ? !this.field.value.includes(permission.option)
                    : true,
            };
        },
    },
};
</script>
