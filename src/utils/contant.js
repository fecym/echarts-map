import mapJson from "@/assets/json/china.json";
export const mapName = "China";
export const mapOptions = {
  tooltip: {
    show: true,
    formatter: function (params) {
      // 根据需要进行数据处理或格式化操作
      if (params && params.data) {
        if (!params.data.name) return;
        const { adcode, name, value, dataIndex } = params.data;
        // 返回自定义的tooltip内容
        return `省份: ${name}<br>adcode: ${adcode}<br>点位数: ${value}<br>dataIndex：${dataIndex}`;
      }
    },
  },
  backgroundColor: "#004e92",
  // visualMap: {
  //   show: true,
  //   min: 0,
  //   max: 100,
  //   left: "left",
  //   top: "bottom",
  //   text: ["高", "低"], // 文本，默认为数值文本
  //   calculable: true,
  //   seriesIndex: [0],
  //   inRange: {
  //     color: ["#00467F", "#A5CC82"], // 蓝绿
  //   },
  // },
  geo: {
    map: mapName,
    roam: true,
    zoom: 1.2,
    scaleLimit: {
      min: 1,
      max: 5,
    },
    itemStyle: {
      areaColor: "rgba(0, 82, 204, 0.6)", // 地图区域颜色，带透明度
      borderColor: "#00FFFF", // 边框颜色为青色
      borderWidth: 1.5,
      shadowColor: "#00FFFF", // 光晕颜色
      shadowBlur: 15, // 边界的光晕模糊
    },
    emphasis: {
      itemStyle: {
        areaColor: "rgba(255, 255, 255, 0.5)", // 鼠标悬停时的区域颜色
      },
      label: {
        show: false,
      },
    },
    label: {
      show: false,
      color: "#fff", // 省市名称颜色
      fontSize: 12,
    },
  },
  series: [
    {
      type: "map",
      map: mapName, // 与注册的地图名称一致
      geoIndex: 0,
      roam: true,
      emphasis: {
        label: {
          show: true,
          color: "#fff",
        },
        itemStyle: {
          areaColor: "rgba(255, 255, 255, 0.5)",
        },
      },
      data: mapJson.features.map((feature, idx) => {
        return {
          ...feature.properties,
          geometry: feature.geometry,
          name: feature.properties.name,
          value: Math.floor(Math.random() * 100), // 随机生成数据作为示例
          dataIndex: idx,
        };
      }),
    },
  ],
};

export const pinghuCoords = { name: "平湖市", coords: [121.015142, 30.67575] };

export const provinceCenters = mapJson.features
  .filter(x => x.properties.name)
  .map(x => x.properties);
export const provinceNames = provinceCenters.map(x => x.name);

export function getCoordsByName(name) {
  return provinceCenters.find(item => item.name === name);
}

/**
 *
 * @param coords
 * @param name
 * @returns {{data: *, symbolSize: number, name, itemStyle: {color: string}, coordinateSystem: string, label: {formatter: string, show: boolean, position: string}, type: string}}
 */
export function genPointSeries(coords, name) {
  return {
    type: "scatter",
    coordinateSystem: "geo",
    name: name,
    data: coords.map(item => {
      return {
        name: item.name,
        value: item.center || item.coords,
      };
    }),
    symbolSize: 10,
    label: {
      show: true,
      position: "right",
      formatter: "{b}",
    },
    itemStyle: {
      color: "red",
    },
  };
}

/**
 * 生成线图
 * @param data
 * @returns {{lineStyle: {curveness: number, width: number, opacity: number}, data, effect: {symbol: string, period: number, symbolSize: number, show: boolean, trailLength: number}, zlevel: number, rippleEffect: {period: number, brushType: string, scale: number}, type: string}}
 */
export function genLinesSeries(data) {
  return {
    type: "lines",
    zlevel: 2,
    // 线特效
    effect: {
      show: true,
      period: 4, // 箭头指向速度，值越小速度越快
      trailLength: 0.02, // 特效尾迹长度[0,1]值越大，尾迹越长重
      symbol: "arrow", // 箭头图标
      symbolSize: 5, // 图标大小
    },
    // 线条样式配置
    lineStyle: {
      width: 1, // 线条宽度
      opacity: 0.6, // 线条透明度
      curveness: 0.3, // 线条曲直度
    },
    // 涟漪特效
    rippleEffect: {
      period: 4, // 动画时间
      brushType: "stroke", //波纹绘制方式
      scale: 4, // 波纹圆环大小
    },
    // 线条数据 { coords: [[87.9236, 43.5883], [113.27, 23.13]] },
    data,
  };
}
