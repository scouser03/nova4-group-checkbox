<template>
    <DefaultField
        :field="field"
        :errors="errors"
        :show-help-text="showHelpText"
        :full-width-content="fullWidthContent"
    >
        <template #field>
            <div class="w-full mb-4">
                <span
                    class="shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900 cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 inline-flex items-center justify-center h-9 px-3 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900"
                    @click="checkAll()"
                    >{{ __("Select all") }}</span
                >
                <span
                    class="ml-3 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900 cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 inline-flex items-center justify-center h-9 px-3 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900"
                    @click="uncheckAll()"
                    >{{ __("Do not select any") }}</span
                >
            </div>
            <div class="w-full" v-if="field.withGroups">
                <div
                    v-for="(permissions, group) in field.options"
                    :key="group"
                    class="mb-4"
                >
                    <div class="px-1 py-3 border-2 rounded">
                        <div class="flex items-center justify-between">
                            <button
                                type="button"
                                @click="toggle(group)"
                                class="mb-1 pr-2 font-bold text-base"
                            >
                                {{ __(group) }}
                            </button>
                            <div
                                v-for="(permission, option) in onlyResource(
                                    permissions
                                )"
                                :key="permission.option"
                                class="flex items-center mb-2"
                            >
                                <checkbox
                                    v-if="!permission.is_field"
                                    :value="permission.option"
                                    :checked="isChecked(permission.option)"
                                    @input="toggleOption(permission.option)"
                                    class="pr-2 mr-2"
                                />
                                <label
                                    v-if="!permission.is_field"
                                    :for="field.name"
                                    v-text="permission.label"
                                    @click="toggleOption(permission.option)"
                                    class="w-full"
                                ></label>
                            </div>
                            <button
                                v-if="fields_toggle !== group"
                                @click="fields_toggle = group"
                                class="shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900 cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 inline-flex items-center justify-center h-6 px-2 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900"
                                type="button"
                            >
                                +
                            </button>
                            <button
                                v-if="fields_toggle == group"
                                @click="fields_toggle = null"
                                class="shadow relative bg-red-500 hover:bg-red-400 text-white cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 inline-flex items-center justify-center h-6 px-2 shadow relative bg-red-500 hover:bg-red-400 text-white"
                                type="button"
                            >
                                -
                            </button>
                        </div>
                        <div
                            class="flex flex-col items-center"
                            v-show="fields_toggle == group"
                        >
                            <div
                                class="flex items-center justify-between space-x-2"
                            >
                                <button
                                    class="shadow relative bg-red-500 hover:bg-red-400 text-white cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 inline-flex items-center justify-center h-6 px-2 shadow relative bg-red-500 hover:bg-red-400 text-white"
                                    @click="selectAllField(permissions, 'd')"
                                    type="button"
                                >
                                    Invisable
                                </button>
                                <button
                                    class="shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900 cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-primary-200 dark:ring-gray-600 inline-flex items-center justify-center h-6 px-2 shadow relative bg-primary-500 hover:bg-primary-400 text-white dark:text-gray-900"
                                    @click="selectAllField(permissions, 'w')"
                                    type="button"
                                >
                                    Write All
                                </button>
                                <button
                                    class="shadow relative bg-yellow-500 hover:bg-yellow-400 text-white dark:text-gray-900 cursor-pointer rounded text-sm font-bold focus:outline-none focus:ring ring-yellow-200 dark:ring-gray-600 inline-flex items-center justify-center h-6 px-2 shadow relative bg-yellow-500 hover:bg-yellow-400 text-white dark:text-gray-900"
                                    @click="selectAllField(permissions, 'r')"
                                    type="button"
                                >
                                    Read only
                                </button>
                            </div>
                            <div class="flex flex-wrap items-center">
                                <div
                                    v-for="(_permission, option) in groupBy(
                                        permissions
                                    )"
                                    class="flex flex-col items-center p-2 mx-2 mt-3 border rounded border-gray-200"
                                >
                                    <p
                                        class="inline-block pt-2 text-lg leading-tight"
                                    >
                                        {{ option }}
                                    </p>
                                    <div class="flex items-center flex-wrap">
                                        <div class="flex items-center mr-4">
                                            <input
                                                :id="`field.${group}.${option}.d`"
                                                type="radio"
                                                :checked="
                                                    !isChecked(
                                                        `${group}.${option}.d`
                                                    )
                                                "
                                                value=""
                                                @input="
                                                    toggleOption(
                                                        `${group}.${option}.d`,
                                                        true
                                                    )
                                                "
                                                :name="`field.${group}.${option}`"
                                                class="red-i w-4 h-4 text-red-600 cursor-pointer bg-gray-100 border-gray-300 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                @click="
                                                    toggleOption(
                                                        `${group}.${option}.d`,
                                                        true
                                                    )
                                                "
                                                :for="`field.${group}.${option}.d`"
                                                class="ml-2 text-sm font-medium cursor-pointer text-gray-900 dark:text-gray-300"
                                                >x</label
                                            >
                                        </div>
                                        <div class="flex items-center mr-4">
                                            <input
                                                :id="`field.${group}.${option}.r`"
                                                type="radio"
                                                :checked="
                                                    isChecked(
                                                        `${group}.${option}.r`
                                                    )
                                                "
                                                :value="`${group}.${option}.r`"
                                                @input="
                                                    toggleOption(
                                                        `${group}.${option}.r`,
                                                        true
                                                    )
                                                "
                                                :name="`field.${group}.${option}`"
                                                class="yellow-i w-4 h-4 cursor-pointer text-yellow-600 bg-yellow-100 border-yellow-300"
                                            />
                                            <label
                                                @click="
                                                    toggleOption(
                                                        `${group}.${option}.r`,
                                                        true
                                                    )
                                                "
                                                :for="`field.${group}.${option}.r`"
                                                class="ml-2 text-sm font-medium cursor-pointer text-gray-900 dark:text-gray-300"
                                                >R</label
                                            >
                                        </div>
                                        <div class="flex items-center mr-4">
                                            <input
                                                :id="`field.${group}.${option}.w`"
                                                type="radio"
                                                :checked="
                                                    isChecked(
                                                        `${group}.${option}.w`
                                                    )
                                                "
                                                @input="
                                                    toggleOption(
                                                        `${group}.${option}.w`,
                                                        true
                                                    )
                                                "
                                                :value="`${group}.${option}.w`"
                                                :name="`field.${group}.${option}`"
                                                class="green-i w-4 h-4 cursor-pointer text-purple-600 bg-gray-100 border-gray-300 dark:focus:ring-purple-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                @click="
                                                    toggleOption(
                                                        `${group}.${option}.w`,
                                                        true
                                                    )
                                                "
                                                :id="`field.${group}.${option}.w`"
                                                class="ml-2 text-sm cursor-pointer font-medium text-gray-900 dark:text-gray-300"
                                                >W</label
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p v-if="hasError" class="my-2 text-danger">{{ firstError }}</p>
        </template>
    </DefaultField>
</template>

<script>
import { FormField, HandlesValidationErrors } from "laravel-nova";

export default {
    mixins: [FormField, HandlesValidationErrors],

    props: ["resourceName", "resourceId", "field"],

    data() {
        return {
            fields_toggle: null,
            gorup_checked: [],
        };
    },

    methods: {
        checkAll() {
            // With Groups
            if (this.field.withGroups) {
                let permissions = _.flatMap(this.field.options);
                for (var i = 0; i < permissions.length; i++) {
                    if (permissions[i].is_field == false) {
                        this.check(permissions[i].option);
                    }
                }
            }
            // Todo: Without Groups
        },

        selectAllField(permissions, type) {
            const filterPerms = permissions.filter(
                (item) => item.is_field == true
            );
            for (var i = 0; i < filterPerms.length; i++) {
                this.uncheck(filterPerms[i].option);
            }

            if (type == "w" || type == "r") {
                for (var i = 0; i < filterPerms.length; i++) {
                    if (_.endsWith(filterPerms[i].option, type)) {
                        this.check(filterPerms[i].option);
                    }
                }
            }

            console.log(filterPerms);
        },

        toggle(group) {
            let permissions = _.flatMap(this.field.options[group]);

            if (this.gorup_checked.includes(group)) {
                for (var i = 0; i < permissions.length; i++) {
                    if (permissions[i].is_field == false) {
                        this.uncheck(permissions[i].option);
                    }
                }
                this.gorup_checked = this.gorup_checked.filter(
                    (item) => item != group
                );
            } else {
                for (var i = 0; i < permissions.length; i++) {
                    if (permissions[i].is_field == false) {
                        this.check(permissions[i].option);
                    }
                }
                this.gorup_checked.push(group);
            }
        },

        uncheckAll() {
            // With Groups
            if (this.field.withGroups) {
                let permissions = _.flatMap(this.field.options);
                for (var i = 0; i < permissions.length; i++) {
                    if (permissions[i].is_field == false) {
                        this.uncheck(permissions[i].option);
                    }
                }
            }
            // Todo: Without Groups
        },
        isChecked(option) {
            return this.value ? this.value.includes(option) : false;
        },
        check(option) {
            if (!this.isChecked(option)) {
                this.value.push(option);
            }
        },
        uncheck(option) {
            if (this.isChecked(option)) {
                this.value = this.value.filter((item) => item != option);
            }
        },
        onlyResource(permissions) {
            const filterPerms = permissions.filter(
                (item) => item.is_field == false
            );
            return filterPerms;
        },
        toggleOption(option, field = false) {
            if (field) {
                this.value = this.value.filter(
                    (item) =>
                        !_.startsWith(
                            item,
                            option.substring(0, option.length - 1)
                        )
                );
                if (!_.endsWith(option, "d")) {
                    this.check(option);
                }
            } else {
                if (this.isChecked(option)) {
                    return this.uncheck(option);
                }
                this.check(option);
            }
        },
        toggleField(group) {
            this.fields_toggle.push(group);
        },
        /*
         * Set the initial, internal value for the field.
         */
        setInitialValue() {
            this.value = this.field.value || [];
        },
        /**
         * Fill the given FormData object with the field's internal value.
         */
        fill(formData) {
            formData.append(this.field.attribute, this.value || []);
        },
        /**
         * Update the field's internal value.
         */
        handleChange(value) {
            this.value = value;
        },

        groupBy(permissions) {
            const filterPerms = permissions.filter(
                (item) => item.is_field == true
            );

            var grouped = _.mapValues(
                _.groupBy(filterPerms, "label"),
                (plist) => plist.map((p) => _.omit(p, "label"))
            );

            return grouped;
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

.red-i {
    accent-color: red;
}
.red-i:focus {
    accent-color: red;
}
.yellow-i:focus {
    accent-color: yellow;
}
.yellow-i {
    accent-color: yellow;
}
.green-i:focus {
    accent-color: green;
}
.green-i {
    accent-color: green;
}
</style>
