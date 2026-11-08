// Console
// node_modules/typescript/lib/lib.dom.d.ts 37837
// node_modules/@types/node/console.d.ts 67

// Полная копия DOM Console. Интерфейсы полностью сходятся с Node, за исключением отсутствия в DOM методов
// profile(label?: string): void
// profileEnd(label?: string): void

/** The **`console`** object provides access to the debugging console (e.g., the Web console in Firefox). */
/**
 * The **`console`** object provides access to the debugging console (e.g., the Web console in Firefox).
 *
 * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console)
 */
interface Console {
  /**
   * The **`console.assert()`** static method writes an error message to the console if the assertion is false.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/assert_static)
   */
  assert (condition?: boolean, ...data: any[]): void
  /**
   * The **`console.clear()`** static method clears the console if possible.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/clear_static)
   */
  clear (): void
  /**
   * The **`console.count()`** static method logs the number of times that this particular call to `count()` has been called.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/count_static)
   */
  count (label?: string): void
  /**
   * The **`console.countReset()`** static method resets counter used with console/count_static.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/countReset_static)
   */
  countReset (label?: string): void
  /**
   * The **`console.debug()`** static method outputs a message to the console at the 'debug' log level.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/debug_static)
   */
  debug (...data: any[]): void
  /**
   * The **`console.dir()`** static method displays a list of the properties of the specified JavaScript object.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dir_static)
   */
  dir (item?: any, options?: any): void
  /**
   * The **`console.dirxml()`** static method displays an interactive tree of the descendant elements of the specified XML/HTML element.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/dirxml_static)
   */
  dirxml (...data: any[]): void
  /**
   * The **`console.error()`** static method outputs a message to the console at the 'error' log level.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/error_static)
   */
  error (...data: any[]): void
  /**
   * The **`console.group()`** static method creates a new inline group in the Web console log, causing any subsequent console messages to be indented by an additional level, until console/groupEnd_static is called.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/group_static)
   */
  group (...data: any[]): void
  /**
   * The **`console.groupCollapsed()`** static method creates a new inline group in the console.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupCollapsed_static)
   */
  groupCollapsed (...data: any[]): void
  /**
   * The **`console.groupEnd()`** static method exits the current inline group in the console.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/groupEnd_static)
   */
  groupEnd (): void
  /**
   * The **`console.info()`** static method outputs a message to the console at the 'info' log level.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/info_static)
   */
  info (...data: any[]): void
  /**
   * The **`console.log()`** static method outputs a message to the console.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/log_static)
   */
  log (...data: any[]): void
  /**
   * The **`console.table()`** static method displays tabular data as a table.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/table_static)
   */
  table (tabularData?: any, properties?: string[]): void
  /**
   * The **`console.time()`** static method starts a timer you can use to track how long an operation takes.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/time_static)
   */
  time (label?: string): void
  /**
   * The **`console.timeEnd()`** static method stops a timer that was previously started by calling console/time_static.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeEnd_static)
   */
  timeEnd (label?: string): void
  /**
   * The **`console.timeLog()`** static method logs the current value of a timer that was previously started by calling console/time_static.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/timeLog_static)
   */
  timeLog (label?: string, ...data: any[]): void
  timeStamp (label?: string): void
  /**
   * The **`console.trace()`** static method outputs a stack trace to the console.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/trace_static)
   */
  trace (...data: any[]): void
  /**
   * The **`console.warn()`** static method outputs a warning message to the console at the 'warning' log level.
   *
   * [MDN Reference](https://developer.mozilla.org/docs/Web/API/console/warn_static)
   */
  warn (...data: any[]): void
}

declare var console: Console
