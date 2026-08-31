/**
 * DIAGNÓSTICO DE VIEWPORT / SCALE — StoryPlay Empreendedor
 * -----------------------------------------------------------
 * Objetivo: capturar o estado de geometria da tela ANTES e DEPOIS
 * de reduzir/ampliar (pinch-zoom) no mobile.
 */

(function () {
  const LOG = [];
  window.__viewportLog = LOG;

  function snapshot(motivo) {
    const vv = window.visualViewport;
    const data = {
      motivo,
      timestamp: new Date().toISOString().slice(11, 23),
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
      outerWidth: window.outerWidth,
      outerHeight: window.outerHeight,
      docClientWidth: document.documentElement.clientWidth,
      docScrollWidth: document.documentElement.scrollWidth,
      bodyClientWidth: document.body.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
      scrollX: window.scrollX,
      scrollY: window.scrollY,
      devicePixelRatio: window.devicePixelRatio,
      vvWidth: vv ? vv.width : "n/a",
      vvHeight: vv ? vv.height : "n/a",
      vvScale: vv ? vv.scale : "n/a",
      vvOffsetLeft: vv ? vv.offsetLeft : "n/a",
      vvOffsetTop: vv ? vv.offsetTop : "n/a",
      vvPageLeft: vv ? vv.pageLeft : "n/a",
      vvPageTop: vv ? vv.pageTop : "n/a",
    };

    data.FLAG_scaleDiferenteDe1 = vv ? vv.scale !== 1 : "n/a";
    data.FLAG_vvWidthDiferenteDeInner = vv ? vv.width !== window.innerWidth : "n/a";

    const htmlStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);
    const rootEl = document.getElementById("conteudo-principal");
    const rootStyle = rootEl ? getComputedStyle(rootEl) : null;

    data.htmlTransform = htmlStyle.transform;
    data.bodyTransform = bodyStyle.transform;
    data.bodyZoom = bodyStyle.zoom || "n/a";
    data.rootTransform = rootStyle ? rootStyle.transform : "n/a";
    data.rootWidth = rootStyle ? rootStyle.width : "n/a";

    LOG.push(data);
    render(data);
    console.log(`[VIEWPORT-DEBUG] ${motivo}`, data);
    return data;
  }

  let panel = document.getElementById("__viewport_debug_panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "__viewport_debug_panel";
    panel.style.cssText = `
      position: fixed; bottom: 0; left: 0; right: 0; z-index: 999999;
      background: rgba(0,0,0,0.92); color: #0f0; font: 11px/1.4 monospace;
      padding: 8px; max-height: 45vh; overflow-y: auto; white-space: pre-wrap;
    `;
    document.body.appendChild(panel);
  }

  function render(data) {
    const alerta =
      data.FLAG_scaleDiferenteDe1 || data.FLAG_vvWidthDiferenteDeInner
        ? "⚠️ POSSÍVEL CAUSA: viewport/scale preso pelo navegador"
        : "";
    panel.textContent =
      `DIAGNÓSTICO VIEWPORT — ${data.motivo} @ ${data.timestamp}\n` +
      `innerWidth=${data.innerWidth}  outerWidth=${data.outerWidth}  dpr=${data.devicePixelRatio}\n` +
      `docClientWidth=${data.docClientWidth}  docScrollWidth=${data.docScrollWidth}\n` +
      `bodyClientWidth=${data.bodyClientWidth}  bodyScrollWidth=${data.bodyScrollWidth}\n` +
      `scrollX=${data.scrollX}  scrollY=${data.scrollY}\n` +
      `visualViewport.width=${data.vvWidth}  height=${data.vvHeight}  scale=${data.vvScale}\n` +
      `visualViewport.offsetLeft=${data.vvOffsetLeft}  offsetTop=${data.vvOffsetTop}\n` +
      `visualViewport.pageLeft=${data.vvPageLeft}  pageTop=${data.vvPageTop}\n` +
      `html transform=${data.htmlTransform}  body transform=${data.bodyTransform}  body zoom=${data.bodyZoom}\n` +
      `root transform=${data.rootTransform}  root width=${data.rootWidth}\n` +
      (alerta ? `\n${alerta}\n` : `\n✅ scale=1 e vvWidth=innerWidth (normal)\n`) +
      `\n--- histórico: ${LOG.length} snapshot(s). Exporte com: copy(JSON.stringify(window.__viewportLog)) ---`;
  }

  snapshot("carga inicial");
  window.addEventListener("resize", () => snapshot("window.resize"));
  window.addEventListener("orientationchange", () =>
    setTimeout(() => snapshot("orientationchange"), 300)
  );

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", () =>
      snapshot("visualViewport.resize")
    );
    window.visualViewport.addEventListener("scroll", () =>
      snapshot("visualViewport.scroll")
    );
  } else {
    console.warn("[VIEWPORT-DEBUG] visualViewport API não disponível neste navegador.");
  }

  setInterval(() => snapshot("polling 2s"), 2000);

  console.log(
    "%c[VIEWPORT-DEBUG] Instrumentação ativa. Painel fixo no rodapé. Faça o pinch-zoom (reduzir e ampliar) e observe.",
    "color: lime; font-weight: bold;"
  );
})();
