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

### 要素操作

#### 判断指定图层是否存在

```js
isLayerExist(layerName) {
    let flag = false;
    this.map.getLayers().forEach((element) => {
      if (element && element.get('name') == layerName) {
        flag = true;
      }
    });
    return flag;
},
```

#### 根据图层名称移除指定图层

```js
removeLayerByName(layerName) {
    this.map.getLayers().forEach((element) => {
      if (element && element.get('name') == layerName) {
        this.$nextTick(() => {
          this.map.removeLayer(element);
        });
      }
    });
},
```

#### 添加图层要素点击选中事件

```js
import { Select } from "ol/interaction";
export function addLayerClick(clickLayer) {
	let selectClick = new Select({
		condition: singleClick,
		style: null,//取消默认选中样式
		// style: areaStyles,
		filter: (feature, layer) => {
			return layer === clickLayer; // 需要添加事件的layer
		}
	});
	return selectClick;
}
```

#### 展示点位

```js
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import Vector from "ol/layer/Vector";
import { Style, Icon } from "ol/style";

showPoints(coordinates, styleObj, layerName = 'pointLayer'){
  if (this.isLayerExist(layerName)) this.removeLayerByName(layerName);
  //构建数据源
  let vectorSource = new VectorSource({});
	coordinates.forEach(element => {
		let point = [element.lng, element.lat];
		const iconFeature = new Feature({
			geometry: new Point(point),
			data: element
		});
		vectorSource.addFeature(iconFeature);
	});
  //构建点位图层
  let vectorLayer = new Vector({
    name:layerName,
		source: vectorSource,
		zIndex: 10,
		style: feature => {
			const featureData = feature.getProperties().data;
			let style = new Style({
				image: new Icon({
					anchor: styleObj.anchor || [0.5, 0.5],
					anchorXUnits: styleObj.anchorXUnits || "fraction",
					anchorYUnits: styleObj.anchorYUnits || "fraction",
					src: featureData.src || styleObj.src, //点位图标从这边取
					scale: styleObj.scale || 1,
					rotation: featureData.rotation || 0
				}),
			});
			return style;
		}
	});
  //把图层添加到地图对象上
  this.map.addLayer(vectorLayer);
  let selectClick = addLayerClick(pointLayer);
  selectClick.on('select', (e) => {
    let features = e.target.getFeatures().getArray();
        //获取到选中要素信息进行操作
    });
  this.map.addInteraction(selectClick);
}
```

#### 展示聚合点位

```js
import VectorSource from "ol/source/Vector";
import { Feature } from "ol";
import { Point } from "ol/geom";
import Vector from "ol/layer/Vector";
import { Style, Icon, Fill, Icon, Text } from "ol/style";
import Cluster from "ol/source/Cluster";
import { boundingExtent } from 'ol/extent';

/**
     * 画聚合点位并将图层点位绑定事件
     * @param {Array} coordinate 点位列表
     * @param {Object} styleObj 样式对象
     * @param {String} layerName 点位图层名称
*/
showClusterPoint(coordinates, styleObj, layerName = 'pointLayer') {
  if (this.isLayerExist(layerName)) this.removeLayerByName(layerName);
  const features = coordinates
		.filter(item => item.lng && item.lat)
		.map(point => {
			return new Feature({
				geometry: new Point([point.lng, point.lat]),
				data: point
			});
		});
  
  //聚合源
	const clusterSource = new Cluster(
    { 
      distance: styleObj.distance || 20, 
      source: new VectorSource({ features }) 
    }
  );
  
  /**
	 * 计算聚合点位样式
	 */
  const computedClusterStyle = feature => {
    const size = feature.get("features").length;
    let textOption = { font: "normal 12px 微软雅黑", padding: [1, 2, 1, 2] };
    const featureData = feature.getProperties().features[0].values_.data;
    if (size == 1) {
      let titleData = `${featureData.name}`;
      textOption = {
				...textOption,
				fill: new Fill({ color: "#333" }),
				backgroundFill: new Fill({ color: "#fff" }),
				text: titleData,
				offsetY: styleObj.textOffsetY || -36 //调整标题显示位置
			};
    } else if (size > 1) {
			textOption = {
				...textOption,
				text: `${size}`,
				fill: new Fill({ color: "#fff" }),
				backgroundFill: new Fill({ color: "#fff0" }),
				offsetX: styleObj.textOffsetX || 15,
				offsetY: styleObj.textOffsetY || -10
			};
		}
    const titleText = new Text(textOption);
    return new Style({
			image: new Icon({
				radius: 10,
				anchor: styleObj.anchor || [0.5, 0.5],
				anchorXUnits: styleObj.anchorXUnits || "fraction",
				anchorYUnits: styleObj.anchorYUnits || "fraction",
				src: size == 1 ? featureData.src || styleObj.src : featureData.srcs || styleObj.srcs || "",//根据点位数量判断图标
				scale: styleObj.scale || 1
			}),
			text: titleText
		});
  }
  
  const pointLayer = new Vector({
    name: layerName,
		source: clusterSource,
		zIndex: 10,
		style: computedClusterStyle
	});
  this.map.addLayer(pointLayer);
  let selectClick = addLayerClick(pointLayer);
  selectClick.on('select', (e) => {
  		let features = e.target.getFeatures().getArray()[0].values_.features;
  		//点击层级放大 点位散开
  		if (features.length > 1) {
  			const extent = boundingExtent(features.map((r) => r.getGeometry().getCoordinates()));
  			this.map.getView().fit(extent, { duration: 1000, padding: [100, 100, 100, 100] });
      }
      if (features.length == 1) {
        //执行获取到点位数据后的具体操作
        //this.$emit('point-click', features[0].values_.data);
      }
   });   
   this.map.addInteraction(selectClick);
},
```

#### 展示线要素

```js

showLine(arr,layerName) {
  if (this.isLayerExist(layerName)) this.removeLayerByName(layerName);
  let vectorSource = new VectorSource({});
  arr.forEach(element => {
		const lineFeature = new Feature({
			geometry: new LineString(element.coordinates),
			data: element
		});
		const lineStyle = new Style({
			fill: new Fill({
				color: element.fillColor || "rgba(255, 255, 255, 1)"
			}),
			stroke: new Stroke({
				color: element.lineColor || "#00C1FF",
				width: element.lineWidth || 2,
				lineDash: [10, 10]
			}),
			text: new Text({
				text: element.text, // 路线标签文字
				font: "normal 12px 微软雅黑", //字体样式
				fill: new Fill({
					//文字填充样式
					color: element.fontColor || [16, 168, 218, 1]
				}),
				backgroundFill: new Fill({
					color: [255, 255, 255, 0]
				}),
				padding: [1, 2, 1, 2]
			})
		});
		lineFeature.setStyle(lineStyle);
		vectorSource.addFeature(lineFeature);
	});
  let vectorLayer = new Vector({
    name:layerName,
		source: vectorSource,
		zIndex: 10
	});
  this.map.addLayer(vectorLayer);
  const selectClick = addLayerClick(tempLayer);
 	selectClick.on('select', (e) => {
    let features = e.target.getFeatures().getArray();
        //获取到选中要素信息进行操作
    });
  this.map.addInteraction(selectClick);
}
```



