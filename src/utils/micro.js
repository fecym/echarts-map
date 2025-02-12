export function isMicroApp() {
  return window.__MICRO_APP_ENVIRONMENT__;
}

export function getMicroAppName() {
  return window.__MICRO_APP_NAME__;
}
export function setupMountApp(initFn) {
  let app = null;
  // 微前端生命周期钩子
  function bootstrap() {
    console.log("vue app bootstraped");
  }

  function mount(props) {
    app = initFn(props);
  }

  function unmount() {
    console.log("vue app unmount");
    app?.unmount();
    app = null;
  }

  window[`micro-app-${getMicroAppName()}`] = {
    bootstrap,
    mount,
    unmount,
  };
}
