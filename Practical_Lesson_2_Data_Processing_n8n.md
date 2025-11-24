
# Практический урок 2: Работа с данными в n8n
## Полный видео-скрипт (120 минут) + примеры workflows

**Длительность:** 120 минут  
**Структура:** 4 части (30 мин каждая)  
**Кейсы:** Реальные примеры обработки данных  
**Готовые workflows:** JSON для импорта

---

## ЧАСТЬ 1: ОСНОВНЫЕ БЛОКИ ТРАНСФОРМАЦИИ (30 минут)

### Сцена 1.1: Введение в data nodes (0:00-5:00)

**Видео:** n8n интерфейс с панелью узлов

**Говорить (3 мин):**
"Добро пожаловать на практический урок про работу с данными!

На первом уроке мы создали простой workflow с одним HTTP Request. Сегодня делаем что-то более мощное.

В real-world сценариях данные редко приходят в нужном формате. Их нужно:
- Фильтровать (оставить нужное)
- Сортировать (по дате, цене)
- Объединять (данные из разных источников)
- Трансформировать (изменять структуру)
- Агрегировать (считать суммы, средние)

На этом уроке выучим узлы, которые все это делают!

Начинаем."

---

### Сцена 1.2: Узел FILTER (Фильтр) (5:00-15:00)

**Видео:** n8n canvas с Filter узлом

**Говорить (2 мин):**
"Первый узел - FILTER. Это как WHERE в SQL.

Задача: у нас есть 1000 заказов, нам нужны только дорогие (> $100)."

[Показываем пример данных]

```json
[
  {"id": 1, "amount": 50, "status": "completed"},
  {"id": 2, "amount": 150, "status": "completed"},
  {"id": 3, "amount": 75, "status": "pending"},
  {"id": 4, "amount": 200, "status": "completed"}
]
```

**Говорить (2 мин):**
"Добавляем узел FILTER:

1. Кликаем на '+' и выбираем Filter
2. Конфигурируем условие:
   - Condition: `amount > 100`
   - Operator: `AND` или `OR`

3. Результат:"

```json
[
  {"id": 2, "amount": 150, "status": "completed"},
  {"id": 4, "amount": 200, "status": "completed"}
]
```

**Показываем интерфейс:**

```
┌─ FILTER Node ─────────────────┐
│                               │
│ Condition Type: Conditions    │
│                               │
│ [Amount] [Greater than] [100] │
│                               │
│ Combine with: AND             │
│                               │
│ [+] Add condition             │
└───────────────────────────────┘
```

**Говорить (1 мин):**
"Видите? Очень просто! FILTER оставляет только строки, которые соответствуют условию.

Примеры:
- amount > 100
- status == 'completed' AND amount < 1000
- date >= '2024-01-01' OR priority == 'high'"

---

### Сцена 1.3: Узел SORT (Сортировка) (15:00-25:00)

**Видео:** n8n с Sort узлом

**Говорить (2 мин):**
"Узел SORT - это ORDER BY в SQL.

Сценарий: у нас есть продажи, нужно их отсортировать по сумме (больше всего вверху)."

[Входные данные]

```json
[
  {"product": "Laptop", "amount": 1200},
  {"product": "Mouse", "amount": 25},
  {"product": "Monitor", "amount": 350},
  {"product": "Keyboard", "amount": 100}
]
```

**Говорить (1 мин):**
"Добавляем SORT узел:
- Sort By: amount
- Order: Descending (от большего к меньшему)"

[Выходные данные]

```json
[
  {"product": "Laptop", "amount": 1200},
  {"product": "Monitor", "amount": 350},
  {"product": "Keyboard", "amount": 100},
  {"product": "Mouse", "amount": 25}
]
```

**Показываем интерфейс:**

```
┌─ SORT Node ──────────────────┐
│                              │
│ Field to sort by: amount     │
│                              │
│ Direction: Descending        │
│  ○ Ascending                 │
│  ● Descending                │
│                              │
│ [+] Add another sort field   │
└──────────────────────────────┘
```

**Говорить (1 мин):**
"Можно сортировать по нескольким полям:

Пример:
- Сортировать по category (А-Я)
- Потом по price (дорогие вверху)

Результат: красиво упорядоченные данные."

---

### Сцена 1.4: Узел LIMIT (Ограничение количества) (25:00-30:00)

**Видео:** n8n

**Говорить (2 мин):**
"LIMIT узел - ограничивает количество строк.

Сценарий: у нас 10,000 заказов, нужны только топ-100."

**Показываем интерфейс:**

```
┌─ LIMIT Node ──────────────────┐
│                               │
│ Max number of items: 100      │
│                               │
│ Skip: 0                        │
│ (Опционально: пропустить первые N)
│                               │
└───────────────────────────────┘
```

**Говорить (1 мин):**
"Параметры:
- Max number of items: сколько оставить (100)
- Skip: сколько пропустить с начала (0)

Пример для pagination:
- Страница 1: Skip=0, Max=20
- Страница 2: Skip=20, Max=20
- Страница 3: Skip=40, Max=20"

---

## ЧАСТЬ 2: ОБЪЕДИНЕНИЕ И ТРАНСФОРМАЦИЯ (30 минут)

### Сцена 2.1: Узел MERGE (Объединение данных) (30:00-45:00)

**Видео:** n8n с 2+ входящими стрелками

**Говорить (3 мин):**
"MERGE узел - объединяет данные из нескольких источников.

Сценарий реальный:
- Узел 1: Получаем заказы из БД
- Узел 2: Получаем данные о клиентах из API
- MERGE: Объединяем их в один объект"

[Показываем диаграмму]

```
    ┌─ HTTP: Orders API ─┐
    │                    │
    ▼                    
┌─ MERGE ─────┐
    ▲                    
    │                    
    ┌─ HTTP: Clients API ┐
    │                    │
    
    Результат:
    {
      "order": {...},
      "client": {...}
    }
```

**Показываем интерфейс и конфигурацию:**

```
┌─ MERGE Node ──────────────────┐
│                               │
│ Combine: Combine All Into     │
│          Single Object        │
│                               │
│ ○ Combine All Into Single Array
│ ○ Keep Combination Index      │
│                               │
└───────────────────────────────┘
```

**Говорить (2 мин):**
"Есть 3 режима:
1. **Combine All Into Single Object** - объединить всё в один объект
2. **Combine All Into Single Array** - объединить в массив
3. **Keep Combination Index** - сохранить информацию об источнике"

**Пример результата режима 1:**

```json
{
  "orders": [
    {"id": 1, "amount": 100},
    {"id": 2, "amount": 200}
  ],
  "clients": [
    {"id": 1, "name": "John"},
    {"id": 2, "name": "Jane"}
  ]
}
```

---

### Сцена 2.2: Узел SPLIT (Разделение данных) (45:00-55:00)

**Видео:** n8n

**Говорить (2 мин):**
"SPLIT узел - противоположность MERGE. Разделяет один объект на несколько.

Сценарий:
- Получили один большой JSON
- Нужно обработать каждый элемент отдельно"

[Входные данные]

```json
{
  "success": true,
  "data": [
    {"id": 1, "name": "Product A"},
    {"id": 2, "name": "Product B"},
    {"id": 3, "name": "Product C"}
  ]
}
```

**Показываем конфигурацию:**

```
┌─ SPLIT Node ──────────────────┐
│                               │
│ Mode: Extract Array           │
│                               │
│ Field to split: data          │
│                               │
└───────────────────────────────┘
```

[Выходные данные - 3 отдельных выполнения]

```
Выполнение 1:
{"id": 1, "name": "Product A"}

Выполнение 2:
{"id": 2, "name": "Product B"}

Выполнение 3:
{"id": 3, "name": "Product C"}
```

**Говорить (1 мин):**
"SPLIT создаёт отдельное выполнение (execution) для каждого элемента!

Это важно для loop'ов. Каждый элемент обрабатывается отдельно."

---

### Сцена 2.3: Узел SET (Трансформация структуры) (55:00-70:00)

**Видео:** n8n

**Говорить (3 мин):**
"SET узел - это мощный инструмент для трансформации структуры данных.

Сценарий:
- Пришли данные в одном формате
- Нам нужны другие поля, новые имена, вычисленные значения"

[Входные данные]

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "birthYear": 1990
}
```

[Конфигурация SET узла]

```
┌─ SET Node ─────────────────────┐
│                                │
│ [+] Add Field                  │
│                                │
│ Field name: fullName           │
│ Value: {{ $json.firstName }} {{ $json.lastName }}
│                                │
│ [+] Add Field                  │
│                                │
│ Field name: age                │
│ Value: {{ 2024 - $json.birthYear }}
│                                │
│ [+] Add Field                  │
│                                │
│ Field name: email              │
│ Value: {{ $json.firstName.toLowerCase() }}@company.com
│                                │
└────────────────────────────────┘
```

[Выходные данные]

```json
{
  "fullName": "John Doe",
  "age": 34,
  "email": "john@company.com"
}
```

**Говорить (2 мин):**
"Видите мощь?

- `{{ $json.firstName }}` - вставить значение поля
- `{{ $json.firstName.toLowerCase() }}` - применить функцию
- `{{ 2024 - $json.birthYear }}` - математика
- Строк можно объединять

Это как SQL SELECT с преобразованиями!"

---

## ЧАСТЬ 3: АГРЕГИРОВАНИЕ И ЛОГИКА (30 минут)

### Сцена 3.1: Узел AGGREGATE (Суммирование) (70:00-85:00)

**Видео:** n8n с AGGREGATE

**Говорить (3 мин):**
"AGGREGATE узел - считает суммы, средние, количество. Это GROUP BY в SQL.

Сценарий:
- Есть список заказов
- Нужно узнать: сколько заказов, общая сумма, средняя сумма"

[Входные данные]

```json
[
  {"product": "Laptop", "amount": 1200, "category": "Electronics"},
  {"product": "Mouse", "amount": 25, "category": "Electronics"},
  {"product": "Book", "amount": 15, "category": "Books"},
  {"product": "Monitor", "amount": 350, "category": "Electronics"}
]
```

**Показываем интерфейс:**

```
┌─ AGGREGATE Node ──────────────┐
│                               │
│ Group By: category            │
│                               │
│ [+] Add Aggregate            │
│                               │
│ Aggregation: Count            │
│ Field: (для count не нужно)   │
│                               │
│ [+] Add Aggregate            │
│                               │
│ Aggregation: Sum              │
│ Field: amount                 │
│                               │
│ [+] Add Aggregate            │
│                               │
│ Aggregation: Average          │
│ Field: amount                 │
│                               │
└───────────────────────────────┘
```

[Выходные данные]

```json
[
  {
    "category": "Electronics",
    "count": 3,
    "sum": 1575,
    "average": 525
  },
  {
    "category": "Books",
    "count": 1,
    "sum": 15,
    "average": 15
  }
]
```

**Говорить (2 мин):**
"Агрегационные функции:
- Count: количество элементов
- Sum: сумма
- Average: средняя
- Min: минимум
- Max: максимум

Это супер полезно для отчётов!"

---

### Сцена 3.2: Узел IF/SWITCH (Условная логика) (85:00-95:00)

**Видео:** n8n с IF узлом

**Говорить (2 мин):**
"IF узел - условная логика. Как if/else в программировании.

Сценарий:
- Если amount > 1000, отправляем уведомление директору
- Если amount < 100, автоматически одобряем
- Иначе требуется проверка"

**Показываем интерфейс:**

```
┌─ IF Node ─────────────────────┐
│                               │
│ IF: amount > 1000             │
│                               │
│  → Then: Send Email (Director)
│  → Else If: amount < 100      │
│     → Then: Auto Approve      │
│  → Else: Request Review       │
│                               │
└───────────────────────────────┘
```

**Говорить (1 мин):**
"IF узел создаёт несколько веток:
- TRUE branch: если условие верно
- FALSE branch: если условие неверно

Каждая ветка может вести к разным узлам!"

---

### Сцена 3.3: Узел SWITCH (Множественные условия) (95:00-105:00)

**Видео:** n8n

**Говорить (2 мин):**
"SWITCH узел - выбор из нескольких вариантов. Как switch/case.

Сценарий:
- Если статус = 'new', отправить приветствие
- Если статус = 'premium', дать особые привилегии
- Если статус = 'inactive', отправить напоминание"

**Показываем интерфейс:**

```
┌─ SWITCH Node ────────────────┐
│                              │
│ Switch: status               │
│                              │
│ Case 1: 'new'                │
│  → Send Welcome Email        │
│                              │
│ Case 2: 'premium'            │
│  → Grant Premium Features    │
│                              │
│ Case 3: 'inactive'           │
│  → Send Re-engagement Email  │
│                              │
│ Default:                     │
│  → Log Unknown Status        │
│                              │
└──────────────────────────────┘
```

---

## ЧАСТЬ 4: РЕАЛЬНЫЕ ПРИМЕРЫ И КОМПЛЕКСНЫЕ WORKFLOWS (30 минут)

### Сцена 4.1: Пример 1 - Обработка заказов (105:00-120:00)

**Видео:** Полный workflow на экране

**Говорить (3 мин):**
"Полный пример: обработка заказов из магазина.

Workflow:
1. Получить заказы из API
2. Фильтровать незавершённые
3. Сортировать по сумме (больше вверху)
4. Оставить топ-10
5. Для каждого: получить данные о клиенте
6. Слить данные
7. Если сумма > 500, отправить спецпредложение"

[Показываем блок-схему]

```
┌─ HTTP Get Orders ──────┐
│                        │
▼                        
┌─ FILTER status=pending ┐
│                        │
▼                        
┌─ SORT amount DESC      ┐
│                        │
▼                        
┌─ LIMIT 10             ┐
│                        │
▼                        
┌─ SPLIT orders        ┐
│                        │
▼                        
┌─ HTTP Get Customer    ┐
│                        │
▼                        
┌─ MERGE                ┐
│                        │
▼                        
┌─ IF amount > 500      ┐
│   ├─ True: Email      │
│   └─ False: Skip      │
│                        
```

**Показываем JSON результата:**

```json
{
  "order": {
    "id": 12345,
    "amount": 750,
    "status": "pending"
  },
  "customer": {
    "id": 789,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "action": "Send Special Offer Email"
}
```

---

### Сцена 4.2: Пример 2 - Аналитика продаж (с визуализацией на экране)

**Говорить (2 мин):**
"Ещё один пример: собрать статистику по продажам.

Workflow:
1. Получить все заказы за месяц
2. Агрегировать по категориям (count, sum, average)
3. Отсортировать по сумме (топ-5)
4. Сохранить в гугл-таблицу для боса"

**Блок-схема:**

```
┌─ HTTP: Get Orders (last 30 days) ┐
│                                  │
▼                                  
┌─ AGGREGATE by category          ┐
│  - Count items                   │
│  - Sum amount                    │
│  - Average amount                │
│                                  
▼                                  
┌─ SORT by sum (DESC)             ┐
│                                  
▼                                  
┌─ LIMIT 5                        ┐
│                                  
▼                                  
┌─ Google Sheets (Add rows)       ┐
```

**Результат в гугл-таблице:**

```
Category    | Count | Sum  | Average
────────────┼───────┼──────┼────────
Electronics | 45    | 25000| 556
Books       | 120   | 3600 | 30
Clothing    | 80    | 4800 | 60
Home        | 15    | 2250 | 150
Sports      | 25    | 1250 | 50
```

---

### Сцена 4.3: Советы и трюки (последние 5 минут видео)

**Говорить (3 мин):**
"Несколько советов для эффективной работы:

**Совет 1: Используйте Expressions ({{ }}) для вычислений**
- {{ $json.price * $json.quantity }}
- {{ $json.date.slice(0, 10) }} (только дата)
- {{ JSON.stringify($json) }} (конвертить в строку)

**Совет 2: Тестируйте каждый узел по отдельности**
- Нажимайте 'Preview' на каждом узле
- Видите результат перед тем как идти дальше
- Если что-то не так, вы знаете где

**Совет 3: Используйте Variables для переиспользуемых значений**
- Вместо hardcode значений используйте переменные
- Легче менять, если что-то изменится

**Совет 4: Комбинируйте узлы (не всё в одном)**
- Вместо одного мега-узла используйте несколько простых
- Проще отдебажить и модифицировать

**Совет 5: Сохраняйте результаты промежуточных шагов**
- Перед отправкой в БД, сохраняйте в файл
- Пригодится для отката или аудита"

---

## ГОТОВЫЕ JSON WORKFLOWS ДЛЯ ИМПОРТА

### Workflow 1: Фильтрация и сортировка

```json
{
  "nodes": [
    {
      "parameters": {},
      "name": "Start",
      "type": "n8n-nodes-base.start",
      "typeVersion": 1,
      "position": [250, 300]
    },
    {
      "parameters": {
        "method": "GET",
        "url": "https://jsonplaceholder.typicode.com/todos"
      },
      "name": "Get Todos",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4,
      "position": [450, 300]
    },
    {
      "parameters": {
        "options": {},
        "conditions": {
          "booleanProperties": ["completed"]
        }
      },
      "name": "Filter Completed",
      "type": "n8n-nodes-base.filter",
      "typeVersion": 1,
      "position": [650, 300]
    },
    {
      "parameters": {
        "sortBy": {
          "fields": [{"name": "id", "direction": "desc"}]
        }
      },
      "name": "Sort by ID",
      "type": "n8n-nodes-base.sort",
      "typeVersion": 1,
      "position": [850, 300]
    }
  ],
  "connections": {
    "Start": {"main": [{"node": "Get Todos", "type": "main", "index": 0}]},
    "Get Todos": {"main": [{"node": "Filter Completed", "type": "main", "index": 0}]},
    "Filter Completed": {"main": [{"node": "Sort by ID", "type": "main", "index": 0}]}
  }
}
```

### Workflow 2: Merge и Aggregate

```json
{
  "nodes": [
    {
      "parameters": {
        "method": "GET",
        "url": "https://jsonplaceholder.typicode.com/users"
      },
      "name": "Get Users",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4,
      "position": [250, 200]
    },
    {
      "parameters": {
        "method": "GET",
        "url": "https://jsonplaceholder.typicode.com/posts"
      },
      "name": "Get Posts",
      "type": "n8n-nodes-base.httpRequest",
      "typeVersion": 4,
      "position": [250, 400]
    },
    {
      "parameters": {
        "mode": "combine",
        "options": {}
      },
      "name": "Merge Data",
      "type": "n8n-nodes-base.merge",
      "typeVersion": 1,
      "position": [450, 300]
    }
  ],
  "connections": {
    "Get Users": {"main": [{"node": "Merge Data", "type": "main", "index": 0}]},
    "Get Posts": {"main": [{"node": "Merge Data", "type": "main", "index": 1}]}
  }
}
```

### Workflow 3: Split и Conditional

```json
{
  "nodes": [
    {
      "parameters": {
        "fieldName": "items"
      },
      "name": "Split Items",
      "type": "n8n-nodes-base.splitInBatches",
      "typeVersion": 1,
      "position": [450, 300]
    },
    {
      "parameters": {
        "conditions": {
          "number": [{"value1": "{{ $json.price }}", "operation": "greater", "value2": 100}]
        }
      },
      "name": "Check Price",
      "type": "n8n-nodes-base.if",
      "typeVersion": 1,
      "position": [650, 300]
    }
  ]
}
```


## КОНЕЦ ПРАКТИЧЕСКОГО УРОКА 2
