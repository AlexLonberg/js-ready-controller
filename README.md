
# ReadyController

Минималистичный контроллер инициализации ресурсов.
После фиксации состояния готовности `ReadyController` имеет только одно поле `{ private _ready: boolean }`.

```typescript
import { ReadyController } from 'js-ready-controller'

const ready = new ReadyController()

// 1. Проверка флагов
if (ready.isReady) {
  startServer()
}

// 2. Ожидание через Promise
await ready.whenReady()

// 3. Подписка с мгновенным вызовом, если статус уже известен
ready.onReady((status) => {
  if (status) console.log('Подключено!')
  else console.error('Ошибка инициализации')
})

// 4. Установка статуса изнутри ресурса
ready.internalSet(true)
```
