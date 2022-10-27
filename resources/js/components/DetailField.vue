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
                <span
                    class="w-full flex space-2 max-col-2"
                    v-if="field.withGroups"
                >
                    <div
                        v-for="(permissions, group) in field.options"
                        :key="group"
                        class="mb-4 ml-3 border p-2"
                    >
                        <h3 class="my-2 font-bold">{{ __(group) }}</h3>
                        <div
                            v-for="(permission, option) in permissions"
                            :key="option"
                            class="flex-auto mb-2"
                        >
                            <span :class="optionClass(permission)">{{
                                permission.label
                            }}</span>
                        </div>
                    </div>
                </span>
                <span class="w-full max-col-2" v-else>
                    <div
                        v-for="(label, option) in field.options"
                        :key="option"
                        class="flex-auto"
                    >
                        <span :class="optionClass(permission)">{{
                            label
                        }}</span>
                    </div>
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

<style>
.max-col-3 {
    -moz-column-count: 3;
    -webkit-column-count: 3;
    column-count: 3;
    white-space: nowrap;
}
.max-col-2 {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
    white-space: nowrap;
}
</style>
