import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.metrics import accuracy_score, classification_report

# 1. Load Dataset
data = pd.read_csv('/Users/sohamkarandikar/DownloadsFinal_Augmented_dataset_Diseases_and_Symptoms.csv')  # Replace with your dataset file

# 2. Inspect Data
print("Dataset shape:", data.shape)
print(data.head())

# 3. Handle Missing Values (if any)
data.fillna(0, inplace=True)

# 4. Encode the Target Variable
target_col = 'diseases'
X = data.drop(columns=[target_col])
y = data[target_col]

label_encoder = LabelEncoder()
y = label_encoder.fit_transform(y)

# 5. Normalize the Features
scaler = StandardScaler()
X = scaler.fit_transform(X)

# 6. Split the Dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 7. Define the Neural Network Model
model = Sequential([
    Dense(256, input_shape=(X_train.shape[1],), activation='relu'),
    Dropout(0.3),  # Dropout helps prevent overfitting
    Dense(128, activation='relu'),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dense(len(np.unique(y)), activation='softmax')  # Multi-class classification
])

# 8. Compile the Model
model.compile(optimizer=Adam(learning_rate=0.001), loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# 9. Train the Model with Early Stopping
# 9. Train the Model with Early Stopping
early_stopping = EarlyStopping(monitor='val_loss', patience=20, restore_best_weights=True)

history = model.fit(X_train, y_train, epochs=150, batch_size=256, validation_split=0.2, callbacks=[early_stopping])
# 10. Evaluate the Model
y_pred = np.argmax(model.predict(X_test), axis=1)
accuracy = accuracy_score(y_test, y_pred)

print(f"Accuracy: {accuracy:.4f}")
# print(classification_report(y_test, y_pred, target_names=label_encoder.classes_))

# # 11. Make Predictions on New Data
# new_sample = np.array([[1, 0, 1, 0, 1, 0, 0, 1, 0]])  # Example input
# new_sample = scaler.transform(new_sample)
# predicted_disease = label_encoder.inverse_transform(np.argmax(model.predict(new_sample), axis=1))

# print("Predicted disease for new sample:", predicted_disease[0])