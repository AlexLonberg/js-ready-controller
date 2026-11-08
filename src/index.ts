/**
 * Универсальный контроллер состояний готовности ресурса.
 */
class ReadyController {
  protected _ready: null | boolean | { promise: null | Promise<boolean>, callbacks: ((status: boolean) => void)[] } = null

  /**
   * `true`, если ресурс находится в состоянии готовности (успешно инициализирован и доступен).
   */
  get isReady (): boolean {
    return this._ready === true
  }

  /**
   * `true`, если инициализация ресурса завершилась ошибкой и ожидать {@link isReady}`:true` не имеет смысла.
   */
  get isFailed (): boolean {
    return this._ready === false
  }

  /**
   * Возвращает Promise, который разрешается когда ресурс завершит успешную или неудачную инициализацию.
   */
  whenReady (): Promise<boolean> {
    if (this._ready === true || this._ready === false) {
      return Promise.resolve(this._ready)
    }
    if (this._ready === null) {
      const callbacks: ((status: boolean) => void)[] = []
      const promise = new Promise<boolean>((resolve) => {
        callbacks.push(resolve)
      })
      this._ready = { promise, callbacks }
      return promise
    }
    if (this._ready.promise) {
      return this._ready.promise
    }
    const promise = new Promise<boolean>((resolve) => {
      (this._ready as { callbacks: ((status: boolean) => void)[] }).callbacks.push(resolve)
    })
    this._ready.promise = promise
    return promise
  }

  /**
   * Подписаться на событие успешной или неудачной инициализации ресурса.
   *
   * Если ресурс уже завершил попытку инициализации, функция обратного вызова будет вызвана немедленно. Для избежания
   * синхронного вызова используй {@link whenReady()} или предварительно проверяй флаги {@link isReady}/{@link isFailed}.
   *
   * **Note:** Этот метод намеренно не вызывает `callback` через `queueMicrotask()`, во избежании ошибок при попытке
   * мгновенной отписки {@link offReady()}, которая была бы проигнорирована и отмененный `callback` был бы вызван.
   *
   * @example
   * ```ts
   * if (readyController.isReady) queueMicrotask(() => this.init())
   * else if (readyController.isFailed) queueMicrotask(() => this.fail())
   * else readyController((status) => status ? this.init() : this.fail())
   *
   * // Асинхронный вариант
   * void Promise.resolve(readyController.whenReady()).then((status) => ...)
   * ```
   */
  onReady (callback: ((status: boolean) => void)): void {
    if (this._ready === true || this._ready === false) {
      try {
        callback(this._ready)
      } catch (e) {
        console.error('ReadyController.onReady()', e)
      }
    }
    else if (this._ready === null) {
      this._ready = { promise: null, callbacks: [callback] }
    }
    else if (!this._ready.callbacks.includes(callback)) {
      this._ready.callbacks.push(callback)
    }
  }

  /**
   * Удаляет функцию обратного вызова установленную через {@link onReady()}.
   */
  offReady (callback: ((status: boolean) => void)): void {
    if (!this._ready || this._ready === true) {
      return
    }
    for (let i = 0; i < this._ready.callbacks.length; ++i) {
      if (this._ready.callbacks[i] === callback) {
        this._ready.callbacks.splice(i, 1)
        break
      }
    }
  }

  /**
   * Внутренний метод, используемый ресурсом, для установки окончательного статуса готовности.
   * Повторный вызов не имеет эффекта и будет проигнорирован.
   */
  internalSet (status: boolean): void {
    const ready = this._ready
    if (ready === true || ready === false) {
      return
    }
    this._ready = status
    if (ready) {
      for (const callback of ready.callbacks) {
        try {
          callback(status)
        } catch (e) {
          console.error('ReadyController.internalSet()', e)
        }
      }
    }
  }
}

export {
  ReadyController
}
