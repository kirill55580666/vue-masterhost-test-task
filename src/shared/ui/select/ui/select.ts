import { computed, defineComponent, PropType } from "vue";
import cls from "./select.module.scss";

export default defineComponent({
  name: "MHSelect",
  emits: ["update:modelValue"],
  props: {
    options: {
      type: Array as PropType<(string | number)[]>,
      required: true,
    },
    modelValue: {
      type: [String, Number],
    },
    label: String,
  },
  setup(props, context) {
    const model = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        context.emit("update:modelValue", value);
      },
    });
    return { cls, model };
  },
});
