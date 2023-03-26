import { defineComponent, PropType, ref, watch } from "vue";
import cls from "./dynamic-form.module.scss";
import { Codes, Parameter } from "shared/api/products";
import MHInput from "shared/ui/input";
import MHSelect from "shared/ui/select";
import MHRangeInput from "shared/ui/slider/range-input.vue";
import { isDynamicSwitchCase } from "../lib/is-dynamic-swtch-case";
import { MaxCountSlider } from "../model/types/dynamic-form.types";

export default defineComponent({
  name: "MHDynamicForm",
  emits: ["updateData"],
  components: {
    MHInput,
    MHSelect,
    MHRangeInput,
  },
  props: {
    schema: Array as PropType<Parameter[]>,
    preFilledData: Object,
  },
  setup(props, { emit }) {
    const buttonRef = ref();
    const model = ref<Record<string, string | number>>({});
    watch(
      [() => props.schema, () => props.preFilledData],
      ([schema, preFilledData]) => {
        model.value = {};
        if (!schema) return;
        schema.forEach((item) => {
          const key = item.code;
          if (item.code === Codes.COUNT && typeof item.value === "number") {
            model.value[key] = String(item.value);
          } else {
            model.value[key] = "";
          }
        });
        if (preFilledData) {
          Object.entries(preFilledData).forEach(([key, value]) => {
            if (Object.prototype.hasOwnProperty.call(model.value, key)) {
              model.value[key] = value;
            }
          });
        }
      },
      {
        deep: true,
        immediate: true,
      }
    );
    const validation = (item: {
      code: Codes;
      [key: string]: any;
    }): { text: string; reg: RegExp } | undefined => {
      if (item)
        if (item.code === Codes.EMAIL) {
          return {
            text: "Неккоректный E-Mail",
            reg: /^\w+?@\w+?.(ru|com)$/g,
          };
        }
      if (item.code === Codes.NAME) {
        return {
          text: "Минимум два слова",
          reg: /^[a-zA-Zа-яА-Я -]{2,} [a-zA-Zа-яА-Я -]{2,}$/g,
        };
      }
      if (item?.necessary) {
        return {
          text: "Обязательное поле",
          reg: /^.+$/g,
        };
      }
      return undefined;
    };

    const setErrors = ref<Set<string>>(new Set());
    const updateErrorHandler = (error: boolean, code: string) => {
      if (error) {
        setErrors.value.add(code);
      } else {
        setErrors.value.delete(code);
      }
    };

    const isTouchingValidation = ref(false);
    const submitHandler = () => {
      if (setErrors.value.size === 0) {
        emit("updateData", model.value);
      } else {
        isTouchingValidation.value = true;
      }
    };
    return {
      cls,

      buttonRef,
      isDynamicSwitchCase,

      updateErrorHandler,
      validation,
      isTouchingValidation,

      model,
      submitHandler,

      MaxCountSlider,
    };
  },
});
