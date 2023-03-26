import { defineComponent } from "vue";
import cls from "./button.module.scss";

export default defineComponent({
  name: "MHButton",
  setup() {
    return { cls };
  },
});
