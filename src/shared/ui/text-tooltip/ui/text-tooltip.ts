import { defineComponent, ref, watch } from "vue";
import cls from "./text-tooltip.module.scss";
import DotsPng from "shared/assets/three-dots.jpg";
import { MaxChars } from "../model/types/text-tooltip.types";

export default defineComponent({
  name: "MHTextTooltip",
  props: {
    text: String,
  },
  setup(props) {
    const formattedText = ref("");
    watch(
      () => props.text,
      (text) => {
        if (!text) {
          formattedText.value = "";
          return;
        }
        formattedText.value =
          text.length > MaxChars ? text.substring(0, MaxChars) + "..." : text;
      },
      {
        immediate: true,
      }
    );

    const isTipHover = ref(false);
    watch(
      () => isTipHover.value,
      () => {
        console.log(isTipHover.value);
      }
    );

    return { cls, formattedText, isTipHover, DotsPng, MaxChars };
  },
});
