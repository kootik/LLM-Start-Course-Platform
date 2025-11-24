
---

### Домашнее задание 1: Практическое применение ML алгоритмов

**Задача 1.1: Линейная регрессия**

```
Задача: На датасете Boston Housing предсказать стоимость дома

Шаги:
1. Загрузить датасет:
   from sklearn.datasets import load_boston
   boston = load_boston()
   X = boston.data  # 506 домов, 13 признаков
   y = boston.target  # цены

2. Реализовать линейную регрессию с нуля (NumPy):
   def linear_regression(X, y):
       # Добавить колонку единиц для смещения
       X_with_bias = np.column_stack([np.ones(X.shape[0]), X])
       
       # Нормальное уравнение: w = (X^T * X)^-1 * X^T * y
       w = np.linalg.inv(X_with_bias.T @ X_with_bias) @ X_with_bias.T @ y
       return w
   
   w = linear_regression(X, y)

3. Сделать предсказания:
   y_pred = X_with_bias @ w

4. Рассчитать метрики:
   mse = np.mean((y - y_pred)**2)
   rmse = np.sqrt(mse)
   r2 = 1 - (np.sum((y - y_pred)**2) / np.sum((y - np.mean(y))**2))
   
   print(f"MSE: {mse:.2f}")
   print(f"RMSE: {rmse:.2f}")
   print(f"R²: {r2:.3f}")

5. Сравнить с sklearn:
   from sklearn.linear_model import LinearRegression
   model = LinearRegression()
   model.fit(X, y)
   y_pred_sklearn = model.predict(X)
   
   # Проверить, что результаты совпадают

6. Визуализировать:
   import matplotlib.pyplot as plt
   plt.scatter(y, y_pred, alpha=0.5)
   plt.plot([y.min(), y.max()], [y.min(), y.max()], 'r--')
   plt.xlabel('Реальная цена')
   plt.ylabel('Предсказанная цена')
   plt.title('Линейная регрессия: реальность vs предсказание')
   plt.show()

Ожидаемый результат:
- R² ≈ 0.68
- Точки должны быть близко к красной линии
```

**Задача 1.2: Дерево решений**

```
Задача: Классифицировать ирисы (Iris dataset)

Шаги:
1. Загрузить датасет:
   from sklearn.datasets import load_iris
   iris = load_iris()
   X = iris.data  # 150 цветов, 4 признака
   y = iris.target  # 3 класса (ирисы)

2. Обучить дерево решений:
   from sklearn.tree import DecisionTreeClassifier
   dt = DecisionTreeClassifier(max_depth=3, random_state=42)
   dt.fit(X, y)

3. Сделать предсказания:
   y_pred = dt.predict(X)

4. Оценить точность:
   from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
   acc = accuracy_score(y, y_pred)
   print(f"Точность: {acc:.3f}")
   
   print(confusion_matrix(y, y_pred))
   print(classification_report(y, y_pred))

5. Визуализировать дерево:
   from sklearn.tree import plot_tree
   plot_tree(dt, 
             feature_names=iris.feature_names,
             class_names=iris.target_names,
             filled=True)
   plt.show()

6. Экспериментировать с max_depth:
   depths = range(1, 11)
   accuracies = []
   
   for d in depths:
       dt = DecisionTreeClassifier(max_depth=d, random_state=42)
       dt.fit(X, y)
       acc = accuracy_score(y, dt.predict(X))
       accuracies.append(acc)
   
   plt.plot(depths, accuracies, 'o-')
   plt.xlabel('Максимальная глубина дерева')
   plt.ylabel('Точность')
   plt.title('Влияние глубины на точность')
   plt.show()

Ожидаемый результат:
- max_depth=1: точность ≈ 0.67
- max_depth=3: точность ≈ 0.97
- max_depth>5: точность = 1.0 (переобучение)
```

**Задача 1.3: Multi-layer Perceptron (MLP)**

```
Задача: Классифицировать рукописные цифры (MNIST)

Шаги:
1. Загрузить данные:
   import torch
   import torch.nn as nn
   from torchvision import datasets, transforms
   
   transform = transforms.Compose([
       transforms.ToTensor(),
       transforms.Normalize((0.5,), (0.5,))
   ])
   
   train_data = datasets.MNIST(root='./data', train=True, 
                               download=True, transform=transform)
   test_data = datasets.MNIST(root='./data', train=False, 
                              download=True, transform=transform)
   
   train_loader = torch.utils.data.DataLoader(train_data, batch_size=32, shuffle=True)
   test_loader = torch.utils.data.DataLoader(test_data, batch_size=32)

2. Определить архитектуру MLP:
   class MLP(nn.Module):
       def __init__(self):
           super(MLP, self).__init__()
           self.fc1 = nn.Linear(28*28, 128)  # 784 входа → 128
           self.dropout1 = nn.Dropout(0.2)
           self.bn1 = nn.BatchNorm1d(128)
           
           self.fc2 = nn.Linear(128, 64)    # 128 → 64
           self.dropout2 = nn.Dropout(0.2)
           self.bn2 = nn.BatchNorm1d(64)
           
           self.fc3 = nn.Linear(64, 10)     # 64 → 10 классов
       
       def forward(self, x):
           x = x.view(-1, 28*28)  # Развернуть изображение
           
           x = self.fc1(x)
           x = nn.ReLU()(x)
           x = self.dropout1(x)
           x = self.bn1(x)
           
           x = self.fc2(x)
           x = nn.ReLU()(x)
           x = self.dropout2(x)
           x = self.bn2(x)
           
           x = self.fc3(x)
           return x
   
   model = MLP()

3. Определить optimizer и loss function:
   optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
   criterion = nn.CrossEntropyLoss()

4. Цикл обучения:
   num_epochs = 10
   
   for epoch in range(num_epochs):
       for batch_idx, (data, target) in enumerate(train_loader):
           optimizer.zero_grad()
           
           output = model(data)
           loss = criterion(output, target)
           
           loss.backward()
           optimizer.step()
           
           if batch_idx % 100 == 0:
               print(f"Epoch {epoch}, Loss: {loss.item():.4f}")

5. Оценка на тестовом наборе:
   model.eval()
   correct = 0
   total = 0
   
   with torch.no_grad():
       for data, target in test_loader:
           output = model(data)
           _, predicted = torch.max(output, 1)
           
           total += target.size(0)
           correct += (predicted == target).sum().item()
   
   accuracy = correct / total
   print(f"Точность на тесте: {accuracy:.3f}")

6. Визуализировать результаты:
   # График loss по эпохам
   # Confusion matrix
   # Примеры правильных и неправильных предсказаний

Ожидаемый результат:
- После 10 эпох: точность ≈ 0.97
- Model имеет ~93K параметров
```

