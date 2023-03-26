import { computed, defineComponent, PropType, ref, watch } from "vue";
import cls from "./product-block.module.scss";
import {
  Codes,
  Parameter,
  ParameterWithValue,
  Property,
} from "shared/api/products";
import BikePng from "shared/assets/bike.png";
import TextTooltip from "shared/ui/text-tooltip";
import MHSelect from "shared/ui/select";
import MHButton from "shared/ui/button";
import MHModal from "shared/ui/modal";
import MHDynamicForm from "shared/ui/dynamic-form";

export default defineComponent({
  name: "MHProductBlock",
  components: {
    TextTooltip,
    MHSelect,
    MHButton,
    MHModal,
    MHDynamicForm,
  },
  props: {
    name: {
      type: String,
      default: "Модель",
    },
    brand: {
      type: String,
      default: "Бренд",
    },
    price: [String, Number],
    code: String,
    properties: {
      type: Array as PropType<Property[]>,
      default: () => [{ name: "Свойство", value: "Значение" }],
    },
    parameters: {
      type: Array as PropType<Parameter[]>,
    },
  },
  setup(props) {
    const isShowModal = ref(false);

    const color = ref<string | number | undefined>();
    const colors = ref<(number | string)[]>([]);

    watch(
      () => props.parameters,
      (parameters) => {
        if (!parameters) {
          color.value = undefined;
          colors.value = [];
          return;
        }
        const value = parameters?.find((item) => item.code === Codes.COLOR);
        if (value) {
          const arr = (value as ParameterWithValue).value;
          if (Array.isArray(arr)) {
            colors.value = arr;
            color.value = colors.value?.[0] || undefined;
          }
        } else {
          color.value = undefined;
          colors.value = [];
        }
      },
      {
        immediate: true,
        deep: true,
      }
    );

    const formattedPrice = computed(() =>
      props.price ? props.price + " ₽" : ""
    );

    const isShowSuccessBlock = ref(false);
    const updateDataHandler = (e: Record<string, string | number>) => {
      const data = {
        unitCode: props.code ?? "",
        unitPrice: props.price ?? "",
        ...e,
      };
      console.log(data);
      isShowSuccessBlock.value = true;
      setTimeout(() => {
        isShowModal.value = false;
      }, 5000);
    };

    const formRef = ref();
    const submitHandler = () => {
      formRef.value?.["$refs"]?.["buttonRef"]?.click();
    };
    return {
      cls,
      BikePng,
      color,
      colors,
      formattedPrice,
      isShowModal,
      updateDataHandler,
      submitHandler,
      formRef,
      isShowSuccessBlock,
    };
  },
});
