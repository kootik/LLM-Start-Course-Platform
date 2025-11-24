# Практический урок 1: Введение в n8n и создание AI-агента

**Цель:** Развернуть локальную среду автоматизации и создать workflow, подключающийся к GPT-4.

## Шаг 1: Установка окружения (Docker)

Мы будем использовать n8n внутри Docker-контейнера для безопасности и изоляции.

1.  Скачайте и установите **Docker Desktop** (для Mac/Windows) с [официального сайта](https://www.docker.com/).
2.  Откройте терминал (Console/Terminal).
3.  Запустите команду установки n8n:

```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

  * `-p 5678:5678`: Открывает порт для доступа через браузер.
  * `-v ...`: Сохраняет ваши workflow на диске, чтобы они не исчезли после перезагрузки.

<!-- end list -->

4.  После появления сообщения `Ready on http://0.0.0.0:5678` откройте браузер по адресу: [http://localhost:5678](https://www.google.com/search?q=http://localhost:5678).

-----

## Шаг 2: Создание первого Workflow

В интерфейсе n8n нажмите "Add Workflow". Наша цель — создать цепочку: **Кнопка (Триггер) $\rightarrow$ Запрос к OpenAI $\rightarrow$ Очистка ответа**.

### Узел 1: Manual Trigger

1.  Нажмите `+` (Add Node).
2.  Найдите **Manual Trigger**.
3.  Это стартовая точка (запуск по кнопке).

### Узел 2: HTTP Request (Связь с LLM)

1.  Нажмите `+` рядом с триггером.
2.  Выберите **HTTP Request**.
3.  Настройте параметры узла:
      * **Method:** `POST`
      * **URL:** `https://api.openai.com/v1/chat/completions`
      * **Authentication:** None (мы передадим ключ в заголовках).
      * **Headers:**
          * `Authorization`: `Bearer sk-ВАШ_КЛЮЧ_OPENAI`
          * `Content-Type`: `application/json`
      * **Body:** Выберите `JSON` и вставьте следующий код:

<!-- end list -->

```json
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "Ты полезный ассистент."
    },
    {
      "role": "user",
      "content": "Объясни, что такое машинное обучение в одном предложении."
    }
  ],
  "temperature": 0.7
}
```

### Узел 3: Set (Обработка данных)

Мы получим большой JSON от OpenAI. Нам нужен только текст.

1.  Добавьте узел **Set** после HTTP Request.
2.  Нажмите **Add Value** $\rightarrow$ **String**.
3.  **Name:** `ai_response`
4.  **Value:** Нажмите на иконку шестеренки/выражения (Expression) и введите:
    `{{ $json.choices[0].message.content }}`
    *(Или просто перетащите нужное поле из Input Data слева).*

-----

## Шаг 3: Тестирование и Эксперименты

1.  Нажмите **Execute Workflow**.
2.  Проверьте результат в узле Set.

### Эксперименты (Попробуйте изменить JSON в HTTP Request):

  * **Temperature:** Измените `0.7` на `0.1` (строгость) и `1.2` (креатив/бред). Сравните ответы.
  * **Max Tokens:** Добавьте `"max_tokens": 20`. Ответ обрежется?
  * **Model:** Поменяйте `"gpt-4"` на `"gpt-3.5-turbo"` для сравнения скорости.

<!-- end list -->