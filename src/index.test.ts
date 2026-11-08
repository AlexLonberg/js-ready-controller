import { describe, test, expect, vi } from 'vitest'
import {
  ReadyController
} from './index.ts'

describe('ReadyController', () => {
  test('initial state should not be ready or failed', () => {
    const rc = new ReadyController()
    expect(rc.isReady).toBe(false)
    expect(rc.isFailed).toBe(false)
  })

  test('should transition to ready state via internalSet(true)', async () => {
    const rc = new ReadyController()
    const promise = rc.whenReady()

    rc.internalSet(true)

    expect(rc.isReady).toBe(true)
    expect(rc.isFailed).toBe(false)

    const result = await promise
    expect(result).toBe(true)
  })

  test('should transition to failed state via internalSet(false)', async () => {
    const rc = new ReadyController()
    const promise = rc.whenReady()

    rc.internalSet(false)

    expect(rc.isReady).toBe(false)
    expect(rc.isFailed).toBe(true)

    const result = await promise
    expect(result).toBe(false)
  })

  test('whenReady should resolve immediately if status is already final', async () => {
    const rc = new ReadyController()
    rc.internalSet(true)

    const result = await rc.whenReady()
    expect(result).toBe(true)
  })

  test('onReady should execute immediately if status is already final', () => {
    const rc = new ReadyController()
    rc.internalSet(false)

    const spy = vi.fn()
    rc.onReady(spy)

    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(false)
  })

  test('onReady should queue callbacks and execute them on internalSet', () => {
    const rc = new ReadyController()
    const spy1 = vi.fn()
    const spy2 = vi.fn()

    rc.onReady(spy1)
    rc.onReady(spy2)

    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()

    rc.internalSet(true)

    expect(spy1).toHaveBeenCalledTimes(1)
    expect(spy1).toHaveBeenCalledWith(true)
    expect(spy2).toHaveBeenCalledTimes(1)
    expect(spy2).toHaveBeenCalledWith(true)
  })

  test('offReady should successfully remove a callback from the queue', () => {
    const rc = new ReadyController()
    const spy = vi.fn()

    rc.onReady(spy)
    rc.offReady(spy)

    rc.internalSet(true)
    expect(spy).not.toHaveBeenCalled()
  })

  test('should safely isolate errors thrown inside callbacks', () => {
    const rc = new ReadyController()
    // Глушим console.error чтобы тесты не шумели в консоли
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

    const errorCallback = () => { throw new Error('Boom') }
    const successCallback = vi.fn()

    rc.onReady(errorCallback)
    rc.onReady(successCallback)

    // Не должно упасть с исключением
    rc.internalSet(true)

    expect(successCallback).toHaveBeenCalledWith(true)
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })

  test('subsequent internalSet calls should be safely ignored', () => {
    const rc = new ReadyController()
    const spy = vi.fn()

    rc.onReady(spy)
    rc.internalSet(true)
    rc.internalSet(false) // Этот вызов должен проигнорироваться

    expect(rc.isReady).toBe(true)
    expect(spy).toHaveBeenCalledTimes(1)
    expect(spy).toHaveBeenCalledWith(true)
  })

  test('subsequent calls to whenReady before resolution should return the cached promise', async () => {
    const rc = new ReadyController()

    const p1 = rc.whenReady() // Первый вызов: инициализирует объект состояния
    const p2 = rc.whenReady() // Второй вызов: создает прокси-промис и записывает в this._ready.promise
    const p3 = rc.whenReady() // Третий вызов: попадает в нужную ветку if (this._ready.promise)

    expect(p3).toBe(p2) // p3 должен возвращать тот же закэшированный промис

    rc.internalSet(true)

    const [r1, r2, r3] = await Promise.all([p1, p2, p3])
    expect(r1).toBe(true)
    expect(r2).toBe(true)
    expect(r3).toBe(true)
  })

  test('whenReady should create and cache a promise if onReady was called first', async () => {
    const rc = new ReadyController()

    // Сначала регистрируем колбэк, создавая состояние { promise: null, callbacks: [...] }
    rc.onReady(() => { })

    // Вызываем whenReady, когда объект уже есть, но .promise еще null (попадаем в тот самый хвост)
    const promise = rc.whenReady()

    rc.internalSet(true)
    const result = await promise
    expect(result).toBe(true)
  })
})
