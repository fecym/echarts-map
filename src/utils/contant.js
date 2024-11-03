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

export const provinceCenters = [
  { name: "北京", coords: [116.407396, 39.9042] },
  { name: "天津", coords: [117.190182, 39.125596] },
  { name: "上海", coords: [121.473701, 31.230416] },
  { name: "重庆", coords: [106.504962, 29.533155] },
  { name: "河北", coords: [114.502461, 38.045474] },
  { name: "山西", coords: [112.549248, 37.857014] },
  { name: "辽宁", coords: [123.429096, 41.796767] },
  { name: "吉林", coords: [125.3245, 43.886841] },
  { name: "黑龙江", coords: [126.642464, 45.756967] },
  { name: "江苏", coords: [118.767413, 32.041544] },
  { name: "浙江", coords: [120.153576, 30.287459] },
  { name: "安徽", coords: [117.283042, 31.86119] },
  { name: "福建", coords: [119.306239, 26.075302] },
  { name: "江西", coords: [115.892151, 28.676493] },
  { name: "山东", coords: [117.000923, 36.675807] },
  { name: "河南", coords: [113.665412, 34.757975] },
  { name: "湖北", coords: [114.298572, 30.584355] },
  { name: "湖南", coords: [112.982279, 28.19409] },
  { name: "广东", coords: [113.280637, 23.125178] },
  { name: "广西", coords: [108.320004, 22.82402] },
  { name: "海南", coords: [110.33119, 20.031971] },
  { name: "四川", coords: [104.065735, 30.659462] },
  { name: "贵州", coords: [106.713478, 26.578343] },
  { name: "云南", coords: [102.712251, 25.040609] },
  { name: "西藏", coords: [91.132212, 29.660361] },
  { name: "陕西", coords: [108.948024, 34.263161] },
  { name: "甘肃", coords: [103.823557, 36.058039] },
  { name: "青海", coords: [101.778916, 36.623178] },
  { name: "宁夏", coords: [106.278179, 38.46637] },
  { name: "新疆", coords: [87.617733, 43.792818] },
  { name: "香港", coords: [114.109497, 22.396428] },
  { name: "澳门", coords: [113.54909, 22.198951] },
  { name: "台湾", coords: [121.509062, 25.044332] },
];

export const mapScatter = {
  type: "scatter",
  zlevel: 2,
  coordinateSystem: "geo",
  symbol: "pin",
  symbolSize: 10,
  label: {
    show: true,
    position: "right",
    formatter: "{b}",
  },
  data: provinceCenters.map((item) => {
    return {
      name: item.name,
      value: item.coords,
    };
  }),
};
export const mapLines = {
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
  // 线条数据
  data: [
    {
      coords: [
        [87.9236, 43.5883],
        [113.27, 23.13],
      ],
    },
  ],
};
