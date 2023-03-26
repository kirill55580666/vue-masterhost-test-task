import { defineComponent, computed } from "vue";

const UPDATE_EVENT = "update:modelValue";
const FILL_COLOR = "#f95c5c";

export default defineComponent({
  name: "MHRangeInput",
  emits: [UPDATE_EVENT],
  props: {
    modelValue: String,
    min: String,
    max: String,
    label: String,
  },
  setup(props, context) {
    const rangeInputBackground = computed(() => {
      const fillPercent =
        ((Number(props.modelValue) - Number(props.min)) /
          (Number(props.max) - Number(props.min))) *
        100;
      return `linear-gradient(90deg, ${FILL_COLOR} ${fillPercent}%, transparent ${fillPercent}%)`;
    });

    const updateModelValue = (event: InputEvent) => {
      const target = event.target as HTMLInputElement;

      context.emit(UPDATE_EVENT, target.value);
    };

    return {
      updateModelValue,
      rangeInputBackground,
    };
  },
});
