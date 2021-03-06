import { merge } from "rxjs/observable/merge";
import "rxjs/add/operator/share";
import "rxjs/add/operator/mergeMap";

import { IpcMonitor } from "../common/types";
import createIpcMainMonitor from "./monitor-ipc-main";
import createWebContentsMonitor from "./monitor-web-contents";
import onAllWebContents from "./on-all-webcontents";

const ipcMainMonitor: IpcMonitor = createIpcMainMonitor().share();
const webContentsMonitor: IpcMonitor = onAllWebContents()
  .mergeMap(createWebContentsMonitor)
  .share();

/** Aggregate Monitors */
const mainProcessMonitor: IpcMonitor = merge(
  ipcMainMonitor,
  webContentsMonitor
);

/** Export Constructors */
export { createIpcMainMonitor, createWebContentsMonitor };

/** Export singletons */
export { ipcMainMonitor, webContentsMonitor };

/** Default to Main Process Monitor */
export default mainProcessMonitor;
