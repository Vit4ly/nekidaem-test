<template>
  <div
      class="col"
      @drop="onDrop($event, categoryId)"
      @dragover.prevent
      @dragenter.prevent>
    <div class="col__header" :class="`col__header__${color}`">
      <p class="col__header__title">{{ title }} ({{ filteredCategory.length }})</p>
    </div>

    <div
        class="drop-zone hover"

    >
      <div
          v-for="(item) in filteredCategory"
          :key="item.id"
          class="col__item drag-el"
          draggable="true"
          @dragstart="onDragStart($event, item)"
      >
        <div class="col__item__close" @click="deleteCard(item)">
          <icon-base title="close" height="12" width="12"></icon-base>
        </div>
        <p class="col__item__id">id: {{ item.id }}</p>
        <p class="col__item__text">{{ item.text }}</p>
      </div>
    </div>


    <div class="col__add">

      <transition name="add" mode="out-in">
        <div v-if="inputIsOpen" class="col__add__text">
          <textarea
              v-model="text"
              placeholder="Ввести заголовок для этой карточки"></textarea>
        </div>
      </transition>


      <transition name="add" mode="out-in">
        <div class="col__add__card" :class="{hover: !inputIsOpen}">

          <template v-if="!inputIsOpen">
            <icon-base @click="addedCard" title="plus"></icon-base>
            <button
                class="col__add__card__btn "
                @click="openInp"
            >
              Добавить карточку
            </button>
          </template>

          <template v-else>
            <button
                class="col__add__card__btn close"
                @click="addedCard"
            >
              Добавить карточку
            </button>
            <icon-base
                title="close"
                @click="closeAddedCard"
            ></icon-base>
          </template>
        </div>
      </transition>

    </div>
  </div>

</template>

<script>
import IconBase from "@/components/IconBase";
import {mapActions, mapGetters, mapMutations} from "vuex"

export default {
  name: "AppCard",
  props: {
    title: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    categoryId: {
      type: Number,
      required: true,
    }
  },
  data() {
    return {
      inputIsOpen: false,
      text: '',
    }
  },

  methods: {
    ...mapMutations(["dropCategory", 'removeItem']),
...mapActions(['createNewCard', "deleteCard", 'updateCard']),
    openInp() {
      this.inputIsOpen = true
    },

    addedCard() {
      if (this.text) {
        this.createNewCard({text: this.text, categoryId: this.categoryId})
        this.text = ''
        this.inputIsOpen = false
      }
    },

    closeAddedCard() {
      this.inputIsOpen = false
    },

    onDragStart(e, item) {
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.setData('itemId', item.id.toString())
    },

    onDrop(e, categoryId) {
      const itemId = parseInt(e.dataTransfer.getData('itemId'))
      this.dropCategory({categoryId: categoryId, id: itemId})
      this.updateCard(itemId)
    },
  },

  computed: {

    ...mapGetters(["getItems"]),

    randomId() {
      return Math.floor(Math.random() * 100000)
    },

    filteredCategory() {
      return this.getItems.filter(el => parseInt(el.row) === this.categoryId)
    }
  },
  components: {
    IconBase,
  }
}
</script>

<style scoped lang="scss">
.col {
  max-width: 300px;
  min-width: 210px;
  background-color: rgb(43, 45, 51);


  &__header {
    &__title {
      text-transform: uppercase;
      color: #fff;
      padding: 5px 10px;
    }

    &__hold {
      background-color: rgb(251, 126, 70);
    }

    &__progress {
      background-color: rgb(42, 146, 191);
    }

    &__review {
      background-color: rgb(244, 206, 70);
    }

    &__approved {
      background-color: rgb(0, 185, 97);
    }
  }

  &__item {
    margin: 6px;
    padding: 10px;
    background-color: rgb(28, 29, 32);
    position: relative;

    &__id {
      color: #fff;
    }

    &__text {
      color: rgb(117, 117, 112);
    }

    &__close {
      color: rgb(117, 117, 112);
      position: absolute;
      right: 3px;
      top: 0;

    }
  }

  &__add {

    &__text {
      margin: 6px;

      textarea {
        font-weight: 200;
        font-size: 14px;
        color: #fff;
        width: 100%;
        height: 100px;
        resize: none;
        background-color: rgb(81, 80, 81);
      }
    }

    &__card {
      padding: 6px;
      display: flex;
      align-items: center;
      color: rgb(117, 117, 112);
      cursor: pointer;
      transition: background-color .3s;


      &__btn {
        color: rgb(117, 117, 112);
        padding-left: 5px;
      }
    }
  }
}

.hover {
  &:hover {
    background-color: rgb(39, 39, 45);
  }
}

.close {
  margin-right: 10px;
  padding: 3px 10px;
  font-weight: 200;
  font-size: 12px;
  color: #ffffff;
  background: rgb(117, 117, 112);
}

.add-enter-active,
.add-leave-active {
  transition: opacity 0.1s;
}

.add-enter,
.add-leave-to {
  opacity: 0;
}

.hide {
  opacity: 0;
}

</style>
