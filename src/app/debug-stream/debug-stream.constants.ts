export const DEBUG_STREAM_ACTION_NAME_PATTERN = /\[.+\].*/g;
export const DEBUG_STREAM_ACTION_NAME_ERROR_MSG = (actionName: string): string =>
  `${actionName} Please provide correct action name. Example: [Component Name] Event name`;

export enum DebugStreamActionType {
  NEXT = 'NEXT',
  ERROR = 'ERROR',
  COMPLETE = 'COMPLETE'
}
