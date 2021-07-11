import { environment } from 'src/environments/environment';
import { DebugStreamActionType } from './debug-stream.constants';

export type DevtoolsOptions = {
  /** instance name visible in devtools */
  name: string;
  /**  maximum allowed actions to be stored in the history tree */
  maxAge: number;
  latency: number;
  actionsBlacklist: string[];
  actionsWhitelist: string[];
  storesWhitelist: string[];
  shouldCatchErrors: boolean;
  logTrace: boolean;
  predicate: (state: any, action: any) => boolean;
  shallow: boolean;
  sortAlphabetically: boolean;
  jump: boolean;
};

export enum DevToolsEvent {
  DISPATCH = 'DISPATCH',
}

export function rxjsDevTools(options: Partial<DevtoolsOptions> = {}): void {
  console.info('MidCorp devTools initialized');
  const isBrowser: boolean = typeof window !== 'undefined';
  if (!isBrowser) {
    return;
  }
  /** Check whether redux devTools extension exist */
  if (!(window as any).__REDUX_DEVTOOLS_EXTENSION__) {
    return;
  }

  /** Property will be used in debug stream operator for logging */
  (window as any).DEBUG_STREAM = true;

  const defaultOptions: Partial<DevtoolsOptions> & { name: string } = { name: 'RxJS', shallow: false, jump: true, storesWhitelist: [] };
  const mergedOptions = Object.assign({}, defaultOptions, options);
  /** Connect to DevTools */
  const devTools = (window as any).__REDUX_DEVTOOLS_EXTENSION__.connect(mergedOptions);

  let appState: any;
  devTools.send({ type: `[RxJS DevTool] - @@INIT` }, null);

  document.addEventListener(DevToolsEvent.DISPATCH, (event: Event) => {
    const { action, actionType, value } = (event as CustomEvent).detail;
    const actionName: string = `${action} (${actionType})`;

    switch (actionType) {
      case DebugStreamActionType.NEXT:
      case DebugStreamActionType.ERROR:
        appState = {
          ...appState,
          [action]: value,
        };
        break;
      case DebugStreamActionType.COMPLETE:
          break;
    }
    devTools.send({ type: `${actionName}` }, appState);
  });

}
