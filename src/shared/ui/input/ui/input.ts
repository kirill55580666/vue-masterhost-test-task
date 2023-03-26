import { computed, defineComponent, onMounted, ref, watch } from "vue";
import cls from "./input.module.scss";

export default defineComponent({
  name: "MHInput",
  emits: ["update:modelValue", "updateError"],
  props: {
    placeholder: String,
    modelValue: String,
    validation: RegExp,
    validationText: {
      type: String,
      default: "Некорректно введено поле",
    },
    isTouching: Boolean,
  },
  setup(props, { emit }) {
    const isShowError = ref(false);
    //требуется для того, чтобы при первом рендере не подсвечивались ошибки
    const isNotFirstRender = ref(false);
    const model = computed<string | undefined>({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit("update:modelValue", value);
        checkError(value);
      },
    });
    onMounted(() => {
      checkError(model.value);
    });
    let countCallCheckError = 0;
    const checkError = (value: string | undefined) => {
      isNotFirstRender.value = countCallCheckError > 0;
      countCallCheckError += 1;
      if (props.validation && value !== undefined) {
        isShowError.value = !props.validation.test(value);
        //TODO баг, если убрать следующую строчку, то при отрабатывании checkError по событию onBlur, значение isShowError будет свайпится, то true, то false
        !props.validation.test(value);
        emit("updateError", isShowError.value);
      }
    };

    watch(
      () => props.isTouching,
      (isTouching) => {
        isNotFirstRender.value = isTouching;
      }
    );

    return { cls, model, isShowError, checkError, isNotFirstRender };
  },
});
