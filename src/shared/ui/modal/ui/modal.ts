import { computed, defineComponent } from "vue";
import MHButton from "shared/ui/button";

export default defineComponent({
  name: "MHModal",
  emits: ["update:isShow"],
  components: {
    MHButton,
  },
  props: {
    isShow: Boolean,
    textButton: {
      type: String,
      default: "Ок",
    },
  },
  setup(props, { emit }) {
    const model = computed({
      get() {
        return props.isShow;
      },
      set(value: boolean) {
        emit("update:isShow", value);
      },
    });

    return { model };
  },
});
