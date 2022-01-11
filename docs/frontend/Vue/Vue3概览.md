# vue3概览

### SlotApi的变化

- Using `v-slot` to declare the props passed to the scoped slots of `<foo>`:

```html
<!-- default slot -->
<foo v-slot="{ msg }">
  {{ msg }}
</foo>

<!-- named slot -->
<foo>
  <template v-slot:one="{ msg }">
    {{ msg }}
  </template>
</foo>
```

old vs new

```html
<!-- old -->
<foo>
  <template slot="one" slot-scope="{ msg }">
    text slot: {{ msg }}
  </template>

  <div slot="two" slot-scope="{ msg }">
    element slot: {{ msg }}
  </div>
</foo>

<!-- new -->
<foo>
  <template v-slot:one="{ msg }">
    text slot: {{ msg }}
  </template>

  <template v-slot:two="{ msg }">
    <div>
      element slot: {{ msg }}
    </div>
  </template>
</foo>
```

- Add shorthand syntax for the `v-slot` syntax proposed in [rfc-0001](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0001-new-slot-syntax.md)

```html
<foo>
  <template #header="{ msg }">
    Message from header: {{ msg }}
  </template>

   <template #footer>
    A static footer
  </template>
</foo>
```

### 全局API使用规范变化

- Make Vue runtime tree-shakable by exposing as much APIs through named exports as possible.

```js
import { nextTick, observable } from 'vue'

nextTick(() => {})

const obj = observable({})
```

old vs new

```js
//old
import Vue from 'vue'

Vue.nextTick(() => {})

const obj = Vue.observable({})

//new
import Vue, { nextTick, observable } from 'vue'

Vue.nextTick // undefined

nextTick(() => {})

const obj = observable({})
```

- Re-design app bootstrapping and global API.

old:

```js
import Vue from 'vue'
import App from './App.vue'

Vue.config.ignoredElements = [/^app-/]
Vue.use(/* ... */)
Vue.mixin(/* ... */)
Vue.component(/* ... */)
Vue.directive(/* ... */)

Vue.prototype.customProperty = () => {}

new Vue({
  render: h => h(App)
}).$mount('#app')
```

new:

```js
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

app.config.isCustomElement = tag => tag.startsWith('app-')
app.use(/* ... */)
app.mixin(/* ... */)
app.component(/* ... */)
app.directive(/* ... */)

app.config.globalProperties.customProperty = () => {}

app.mount(App, '#app')
```



### Teleport

Adds a `<teleport>` component to Vue core

远程传送  把内容渲染到非当前结点的其他结点上

```html
<body>
  <div id="app">
    <h1>Move the #content with the portal component</h1>
    <teleport to="#endofbody">
      <div id="content">
        <p>
          this will be moved to #endofbody.<br />
          Pretend that it's a modal
        </p>
        <Child />
      </div>
    </teleport>
  </div>
  <div id="endofbody"></div>
  <script>
    new Vue({
      el: "#app",
      components: {
        Child: { template: "<div>Placeholder</div>" }
      }
    });
  </script>
</body>
```



### Composition API

