// ==UserScript==
// @name         E-Hentai移动端界面适配
// @namespace    https://sleazyfork.org/zh-CN/users/1140711-steven-fake
// @homepageURL  https://github.com/Steven-Fake/E-Hentai-mobile-layout
// @version      1.0
// @description  使E-Hentai的界面适配移动端
// @author       Steven-Fake
// @license      MIT
// @match        *://e-hentai.org/*
// @icon         https://www.google.com/s2/favicons?domain=e-hentai.org
// @run-at       document-idle
// @grant        none
// @downloadURL https://update.sleazyfork.org/scripts/567011/E-Hentai%E7%A7%BB%E5%8A%A8%E7%AB%AF%E7%95%8C%E9%9D%A2%E9%80%82%E9%85%8D.user.js
// @updateURL https://update.sleazyfork.org/scripts/567011/E-Hentai%E7%A7%BB%E5%8A%A8%E7%AB%AF%E7%95%8C%E9%9D%A2%E9%80%82%E9%85%8D.meta.js
// ==/UserScript==

const VERSION = "1.0"
const EMBEDDED_CSS = `
@media (max-width: 768px) {
  /* 页首 */
  div#nb.nosel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    height: auto;
    max-width: 100%;
    min-width: unset;
    overflow-x: auto;
    margin: 0;
    padding-left: 0;
    padding-right: 0;

    & > div {
      padding: 0;
    }
  }

  /* 页脚 */
  div.dp {
    min-width: unset;
  }

  /* 首页/列表页 */
  div.ido {
    max-width: 100dvw;
    min-width: unset;

    div#searchbox.idi {
      width: unset;
      max-width: 100%;

      table.itc tbody {
        display: flex;
        justify-content: start;
        flex-wrap: wrap;

        tr {
          display: contents;

          td {
            flex: 0 0 calc(33.33% - 10px);

            .cs {
              width: 100%;
            }
          }
        }
      }

      div:has(> input#f_search) {
        display: flex;

        input#f_search {
          width: 80%;
          flex: 1;
        }
      }
    }

    div#rangebar {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      gap: 0.5em;
      width: auto;
      height: auto;
      max-width: 100dvw;

      div {
        width: 2em;
        border-radius: 0.5em;
      }
    }

    div.searchnav {
      flex-wrap: wrap;
      justify-content: start;
      border: 2px ridge #5C0D12;
      margin-bottom: 1em;

      & > div:first-child,
      & > div:last-child {
        flex-grow: 0;
        width: auto;
      }
    }

    table.itg {
      width: 100%;
      max-width: 100%;
      overflow-x: auto;

      tbody {
        & > tr:first-child {
          display: none;
        }

        tr {
          display: grid;
          grid-template-columns: auto 1fr;

          td.gl1c {
            width: unset;

            div.cn {
              width: 86px;
              height: auto;
              line-height: 2em;
            }
          }

          td.gl2c {
            width: auto;

            div:not([class]) {
              height: auto;
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              gap: 0.25em;

              * {
                position: static;
                left: auto;
                top: auto;
              }
            }
          }

          td.gl3c {
            grid-column: span 2;
          }

          button.preview-thumb-btn {
            display: block;
          }
        }
      }
    }
  }

  /* 详情页 > 元信息*/
  div.gm {
    max-width: 100dvw;
    min-width: unset;

    #gleft {
      display: none;
    }

    #gd2 {
      width: 100%;
    }

    #gmid {
      width: 100%;
      height: unset;
      display: grid;
      grid-template-areas: unset;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: none;
      gap: 1em;

      #gd3, #gd5 {
        grid-column: unset;
        grid-row: unset;
        width: 100%;
      }

      #gd4 {
        grid-column: 1 / 3;
        grid-row: 2;
        margin: 0;
        border: 1px solid #5C0D12;
        border-radius: 9px;
        padding: 0.5em;

        #taglist {
          height: unset;
        }
      }

      .c {
        display: none;
      }
    }
  }

  /*  详情页 > 分页器 */
  div.gtb {
    min-width: unset;
  }

  /* 详情页 > 图片区域 */
  div#gdt {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin: 0;
    min-width: unset;
    width: auto;

    a {
      width: 100%;
      height: 100%;

      div {
        width: 100% !important;
        height: 30vh !important;
      }
    }
  }

  /* 详情页 > 评论区 */
  div#cdiv {
    min-width: unset;
  }

  /* 下载页 */
  div.stuffbox {
    width: unset !important;
    height: auto !important;

    div#torrentinfo {
      height: unset !important;
    }
  }

  /* 图片页 */
  div.sni {
    width: unset !important;
    min-width: unset;

    div#i3 {
      img {
        width: 100% !important;
        height: auto !important;
        object-fit: contain;
        object-position: center;
      }
    }
  }
}

table.itg tbody tr {
  button.preview-thumb-btn {
    display: none;

    border: 1px solid #b5a4a4;
    border-radius: 0.1875rem;

    font-size: 12px;
    font-weight: bold;
    line-height: 2em;

    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    color: #5c0d12;
    margin-left: 0.25em;

    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    text-shadow: 2px 2px 3px rgba(0, 0, 0, .3);
    cursor: pointer;
  }
}
`;


function useLog() {
  const prefix = `E-Hentai移动端界面适配 v${VERSION}`
  const info = (message: any) => console.info(prefix, message)
  const warn = (message: any) => console.warn(prefix, message)
  const error = (message: any) => console.error(prefix, message)

  return {
    info,
    warn,
    error
  }
}

function useUtils() {
  /**
   * 注入viewport属性
   */
  function injectViewport() {
    const viewport = document.querySelector('meta[name="viewport"]');

    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
    } else {
      const meta = document.createElement('meta');
      meta.name = "viewport";
      meta.content = "width=device-width, initial-scale=1.0";
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }

  /**
   * 注入写好的移动端CSS
   */
  function injectEmbeddedCSS() {
    const style = document.createElement("style");
    style.innerHTML = EMBEDDED_CSS;
    document.head.appendChild(style)
  }

  /**
   * 首页 > 注入预览按钮 (手机端很难触发原先为电脑端设计的mouseover触发器)
   */
  function addHomePagePreviewButton() {
    const tbody = document.querySelector("table.itg tbody");
    if (!tbody) return
    tbody.querySelectorAll("tr").forEach((tr: HTMLTableRowElement) => {
      const glthumbId = tr.querySelector("div.glthumb")?.id
      if (!glthumbId) return

      const button = document.createElement("button")
      button.classList = "preview-thumb-btn"
      button.innerText = "Preview"

      button.onclick = () => {
        const glthumbElem = document.querySelector(`div.glthumb#${glthumbId}`) as HTMLDivElement;
        if (!glthumbElem) return

        // 创建dialog
        const dialog = document.createElement('dialog')
        dialog.style.cssText = 'padding: 0; border: none; background: transparent; width: 100%; height: 100%; max-width: 90vw; max-height: 90vh;'

        // 克隆glthumb内容到dialog
        const content = glthumbElem.cloneNode(true) as HTMLDivElement;
        content.style.cssText = "display: block; width: 100%";

        (content.firstChild as HTMLDivElement).style.visibility = "visible";
        content.querySelector("img").style.cssText = "height: 100%; width: 100%; object-fit: contain; object-position: top center;"
        dialog.appendChild(content)

        // 点击dialog外部关闭
        dialog.onclick = (e) => {
          if (e.target === dialog) {
            dialog.close()
          }
        }

        document.body.appendChild(dialog)
        dialog.showModal()

        // dialog关闭后移除DOM
        dialog.onclose = () => {
          dialog.remove()
        }
      }
      tr.firstChild.appendChild(button)
    })
  }


  return {
    injectViewport,
    injectEmbeddedCSS,

    addHomePagePreviewButton,
  }
}

(function () {
  'use strict';

  const logger = useLog()
  const utils = useUtils()

  utils.injectViewport()
  utils.injectEmbeddedCSS()

  try {
    utils.addHomePagePreviewButton()
  } catch (e) {
    logger.error(`注入预览按钮失败，${e}`)
  }
})();
