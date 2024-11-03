// 使用 import.meta.glob 动态引入 src/modules 目录下的所有路由配置
const routeModules = import.meta.glob("./modules/*js", {
  eager: true,
});

export default Object.values(routeModules).flatMap((routeModule) => {
  const routeConf = routeModule.default || routeModule;
  if (Array.isArray(routeConf)) {
    // 如果是数组，直接返回数组
    return routeConf;
  } else if (typeof routeConf === "object") {
    // 如果是对象，将其作为一个路由对象返回
    return [routeConf];
  }

  // 如果既不是数组也不是对象，返回空数组（处理异常情况）
  return [];
});