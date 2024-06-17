import "./assets/main.css";

import { createApp } from "vue";
import App from "@/App.vue";

const app = createApp(App);

//fort-awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faCircleXmark,
  faMagnifyingGlass,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFileLines,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-regular-svg-icons";

library.add(
  faCircleXmark,
  faFileLines,
  faTrashCan,
  faPenToSquare,
  faMagnifyingGlass,
  faMinus
);

app.component("font-awesome-icon", FontAwesomeIcon);

app.config.productionTip = false;

app.mount("#app");
