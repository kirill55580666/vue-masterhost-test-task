import { defineComponent, onBeforeMount, ref } from "vue";
import cls from "./main-page.module.scss";
import { getProducts, Products } from "shared/api/products";
import ProductBlock from "features/product-block";

export default defineComponent({
  name: "MHMainPage",
  components: {
    ProductBlock,
  },
  setup() {
    const products = ref<Products>([]);

    onBeforeMount(() => {
      getProducts()
        .then((response) => {
          if (!response) return;

          products.value = response;
        })
        .catch((e) => {
          console.log(e);
        });
    });

    return { cls, products };
  },
});
