import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DebugStreamActionType } from './debug-stream.constants';
import { DevToolsEvent } from './dev-tools';
/**
 * Shows log on dev mode.
 * @usageNotes
 * @params message => message to log. Should be [Component Name] Event Name
 * Example : of(100).pipe(debugStream('[Component Name] Event name'))
 */
/** TODO: unable to mock environment to test environment condition */
/* istanbul ignore next */
export const debugStream = (action: string) => (source: Observable<any>) =>
  source.pipe(
    tap({
      next: (value) => {
       logEvent(action, DebugStreamActionType.NEXT, value);
      },
      error: (value) => {
        logEvent(action, DebugStreamActionType.ERROR, value);
      },
      complete: () => {
        logEvent(action, DebugStreamActionType.COMPLETE);
      }
    })
  );

  function logEvent(action: string, actionType: DebugStreamActionType, value?: any): void {
    if (!(window as any).DEBUG_STREAM) {
      return;
    }

    const event: CustomEvent = new CustomEvent(DevToolsEvent.DISPATCH, {
      detail: {
        action,
        actionType,
        value,
      },
    });
    document.dispatchEvent(event);
  }
