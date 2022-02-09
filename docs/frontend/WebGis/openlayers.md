## openlayers

### 概述

openlayers一个高性能、功能丰富的JavaScript库，可以在网页中展示动态地图，是一款免费开源的JavaScript库。

### 主要类

#### Map类

Map是Openlayers的核心类，对于要渲染的地图，需要一个视图、一个或多个图层以及一个目标容器。

#### View类

View对象表示地图的2D视图

#### Layer类

- ol/layer/Tile (瓦片图层)

- ol/layer/Image (图片图层)
- ol/layer/Vector (矢量图层)
- ol/layer/VectorTile (矢量瓦片图层)
- ol/layer/WebGLTile(webgl瓦片图层)

Layer类的数据来源是Source类，不同类型的Layer加载不同类型的Source

#### Source类

- [Tile sources](https://openlayers.org/en/latest/apidoc/module-ol_source_Tile-TileSource.html) for [ol/layer/Tile](https://openlayers.org/en/latest/apidoc/module-ol_layer_Tile-TileLayer.html) or [ol/layer/WebGLTile](https://openlayers.org/en/latest/apidoc/module-ol_layer_WebGLTile-WebGLTileLayer.html)
- [Image sources](https://openlayers.org/en/latest/apidoc/module-ol_source_Image-ImageSource.html) for [ol/layer/Image](https://openlayers.org/en/latest/apidoc/module-ol_layer_Image-ImageLayer.html)
- [Vector sources](https://openlayers.org/en/latest/apidoc/module-ol_source_Vector-VectorSource.html) for [ol/layer/Vector](https://openlayers.org/en/latest/apidoc/module-ol_layer_Vector-VectorLayer.html)
- [Vector tile sources](https://openlayers.org/en/latest/apidoc/module-ol_source_VectorTile-VectorTile.html) for [ol/layer/VectorTile](https://openlayers.org/en/latest/apidoc/module-ol_layer_VectorTile-VectorTileLayer.html)



```vue
<template>
  <div class="vm">
    <h2 class="h-title">加载天地图底图</h2>
    <div id="map" class="map-x"></div>
  </div>
</template>

<script>
import 'ol/ol.css'
import { Map, View } from 'ol'
import Tile from 'ol/layer/Tile'
import XYZ from 'ol/source/XYZ'

export default {
  name: 'FirstMap',
  data () {
    return {
      map: null
    }
  },
  methods: {
    initMap () {
      // 地图实例
      this.map = new Map({
        target: "map", // 对应页面里 id 为 map 的dom元素
        layers: [ // 图层
          new Tile({
            source: new XYZ({ //天地图矢量底图
              url: 'http://t0.tianditu.com/DataServer?T=vec_c&x={x}&y={y}&l={z}&tk=4d314458b2e0a90a498c0ae62142c9fd',
              projection: "EPSG:4326",
            }),
          }),
          new Tile({
            source: new XYZ({  
              url: 'http://t6.tianditu.com/DataServer?T=cva_c&x={x}&y={y}&l={z}&tk=4d314458b2e0a90a498c0ae62142c9fd',
            })
          }),  
        ],
        view: new View({ // 地图视图
          projection: "EPSG:4326", // 坐标系，有EPSG:4326和EPSG:3857
          center: [110.064839, 32.548857], // 中心点坐标
          // minZoom:10, // 地图缩放最小级别
          zoom: 5 // 地图缩放级别（打开页面时默认级别）
        })
      })
    },
  },
  mounted () {
    this.initMap();
  }
}
</script>
```





