import numpy as np

# ------------------------------------------------------------------------------
# Placeholder ML model call
# ------------------------------------------------------------------------------
def predict_disease(binary_vector):
    """
    Replace this with your actual ML model call.
    For instance, if you have a trained model:
      scaled_vector = scaler.transform(binary_vector)
      pred_probs = model.predict(scaled_vector)
      predicted_class = np.argmax(pred_probs, axis=1)
      disease = label_encoder.inverse_transform(predicted_class)[0]
      return disease
    Here, we simply simulate the prediction.
    """
    diseases = ["Diabetes", "Panic Disorder", "Hypertension"]
    return np.random.choice(diseases)

# ------------------------------------------------------------------------------
# Gemini placeholder functions
# ------------------------------------------------------------------------------

def gemini_generate_binary_from_text(user_text):
    """
    Simulate Gemini processing a free-form symptom description and generating a 377-bit binary string.
    For demonstration, we use keyword matching to set specific bits.
    """
    binary_list = ['0'] * 377
    text = user_text.lower()
    
    # Define keyword mappings for each symptom
    symptom_keywords = [
    "diseases", "anxiety and nervousness", "depression", "shortness of breath",
    "depressive or psychotic symptoms", "sharp chest pain", "dizziness", "insomnia",
    "abnormal involuntary movements", "chest tightness", "palpitations",
    "irregular heartbeat", "breathing fast", "hoarse voice", "sore throat",
    "difficulty speaking", "cough", "nasal congestion", "throat swelling",
    "diminished hearing", "lump in throat", "throat feels tight", "difficulty in swallowing",
    "skin swelling", "retention of urine", "groin mass", "leg pain", "hip pain",
    "suprapubic pain", "blood in stool", "lack of growth", "emotional symptoms",
    "elbow weakness", "back weakness", "pus in sputum", "symptoms of the scrotum and testes",
    "swelling of scrotum", "pain in testicles", "flatulence", "pus draining from ear",
    "jaundice", "mass in scrotum", "white discharge from eye", "irritable infant",
    "abusing alcohol", "fainting", "hostile behavior", "drug abuse", "sharp abdominal pain",
    "feeling ill", "vomiting", "headache", "nausea", "diarrhea", "vaginal itching",
    "vaginal dryness", "painful urination", "involuntary urination", "pain during intercourse",
    "frequent urination", "lower abdominal pain", "vaginal discharge", "blood in urine",
    "hot flashes", "intermenstrual bleeding", "hand or finger pain", "wrist pain",
    "hand or finger swelling", "arm pain", "wrist swelling", "arm stiffness or tightness",
    "arm swelling", "hand or finger stiffness or tightness", "wrist stiffness or tightness",
    "lip swelling", "toothache", "abnormal appearing skin", "skin lesion", "acne or pimples",
    "dry lips", "facial pain", "mouth ulcer", "skin growth", "eye deviation",
    "diminished vision", "double vision", "cross-eyed", "symptoms of eye", "pain in eye",
    "eye moves abnormally", "abnormal movement of eyelid", "foreign body sensation in eye",
    "irregular appearing scalp", "swollen lymph nodes", "back pain", "neck pain",
    "low back pain", "pain of the anus", "pain during pregnancy", "pelvic pain",
    "impotence", "infant spitting up", "vomiting blood", "regurgitation", "burning abdominal pain",
    "restlessness", "symptoms of infants", "wheezing", "peripheral edema", "neck mass",
    "ear pain", "jaw swelling", "mouth dryness", "neck swelling", "knee pain",
    "foot or toe pain", "bowlegged or knock-kneed", "ankle pain", "bones are painful",
    "knee weakness", "elbow pain", "knee swelling", "skin moles", "knee lump or mass",
    "weight gain", "problems with movement", "knee stiffness or tightness", "leg swelling",
    "foot or toe swelling", "heartburn", "smoking problems", "muscle pain", "infant feeding problem",
    "recent weight loss", "problems with shape or size of breast", "underweight", "difficulty eating",
    "scanty menstrual flow", "vaginal pain", "vaginal redness", "vulvar irritation", "weakness",
    "decreased heart rate", "increased heart rate", "bleeding or discharge from nipple",
    "ringing in ear", "plugged feeling in ear", "itchy ear(s)", "frontal headache",
    "fluid in ear", "neck stiffness or tightness", "spots or clouds in vision", "eye redness",
    "lacrimation", "itchiness of eye", "blindness", "eye burns or stings", "itchy eyelid",
    "feeling cold", "decreased appetite", "excessive appetite", "excessive anger",
    "loss of sensation", "focal weakness", "slurring words", "symptoms of the face",
    "disturbance of memory", "paresthesia", "side pain", "fever", "shoulder pain",
    "shoulder stiffness or tightness", "shoulder weakness", "arm cramps or spasms", "shoulder swelling",
    "tongue lesions", "leg cramps or spasms", "abnormal appearing tongue", "ache all over",
    "lower body pain", "problems during pregnancy", "spotting or bleeding during pregnancy",
    "cramps and spasms", "upper abdominal pain", "stomach bloating", "changes in stool appearance",
    "unusual color or odor to urine", "kidney mass", "swollen abdomen", "symptoms of prostate",
    "leg stiffness or tightness", "difficulty breathing", "rib pain", "joint pain",
    "muscle stiffness or tightness", "pallor", "hand or finger lump or mass", "chills",
    "groin pain", "fatigue", "abdominal distention", "regurgitation.1", "symptoms of the kidneys",
    "melena", "flushing", "coughing up sputum", "seizures", "delusions or hallucinations",
    "shoulder cramps or spasms", "joint stiffness or tightness", "pain or soreness of breast",
    "excessive urination at night", "bleeding from eye", "rectal bleeding", "constipation",
    "temper problems", "coryza", "wrist weakness", "eye strain", "hemoptysis", "lymphedema",
    "skin on leg or foot looks infected", "allergic reaction", "congestion in chest", "muscle swelling",
    "pus in urine", "abnormal size or shape of ear", "low back weakness", "sleepiness", "apnea",
    "abnormal breathing sounds", "excessive growth", "elbow cramps or spasms", "feeling hot and cold",
    "blood clots during menstrual periods", "absence of menstruation", "pulling at ears", "gum pain",
    "redness in ear", "fluid retention", "flu-like syndrome", "sinus congestion", "painful sinuses",
    "fears and phobias", "recent pregnancy", "uterine contractions", "burning chest pain",
    "back cramps or spasms", "stiffness all over", "muscle cramps, contractures, or spasms",
    "low back cramps or spasms", "back mass or lump", "nosebleed", "long menstrual periods",
    "heavy menstrual flow", "unpredictable menstruation", "painful menstruation", "infertility",
    "frequent menstruation", "sweating", "mass on eyelid", "swollen eye", "eyelid swelling",
    "eyelid lesion or rash", "unwanted hair", "symptoms of bladder", "irregular appearing nails",
    "itching of skin", "hurts to breath", "nailbiting", "skin dryness, peeling, scaliness, or roughness",
    "skin on arm or hand looks infected", "skin irritation", "itchy scalp", "hip swelling",
    "incontinence of stool", "foot or toe cramps or spasms", "warts", "bumps on penis",
    "too little hair", "foot or toe lump or mass", "skin rash", "mass or swelling around the anus",
    "low back swelling", "ankle swelling", "hip lump or mass", "drainage in throat",
    "dry or flaky scalp", "premenstrual tension or irritability", "feeling hot", "feet turned in",
    "foot or toe stiffness or tightness", "pelvic pressure", "elbow swelling", "elbow stiffness or tightness",
    "early or late onset of menopause", "mass on ear", "bleeding from ear", "hand or finger weakness",
    "low self-esteem", "throat irritation", "itching of the anus", "swollen or red tonsils",
    "irregular belly button", "swollen tongue", "lip sore", "vulvar sore", "hip stiffness or tightness",
    "mouth pain", "arm weakness", "leg lump or mass", "disturbance of smell or taste",
    "discharge in stools", "penis pain", "loss of sex drive", "obsessions and compulsions",
    "antisocial behavior", "neck cramps or spasms", "pupils unequal", "poor circulation",
    "thirst", "sleepwalking", "skin oiliness", "sneezing", "bladder mass", "knee cramps or spasms",
    "premature ejaculation", "leg weakness", "posture problems", "bleeding in mouth", "tongue bleeding",
    "change in skin mole size or color", "penis redness", "penile discharge", "shoulder lump or mass",
    "polyuria", "cloudy eye", "hysterical behavior", "arm lump or mass", "nightmares",
    "bleeding gums", "pain in gums", "bedwetting", "diaper rash", "lump or mass of breast",
    "vaginal bleeding after menopause", "infrequent menstruation", "mass on vulva", "jaw pain",
    "itching of scrotum", "postpartum problems of the breast", "eyelid retracted", "hesitancy",
    "elbow lump or mass", "muscle weakness", "throat redness", "joint swelling", "tongue pain",
    "redness in or around nose", "wrinkles on skin", "foot or toe weakness", "hand or finger cramps or spasms",
    "back stiffness or tightness", "wrist lump or mass", "skin pain", "low back stiffness or tightness",
    "low urine output", "skin on head or neck looks infected", "stuttering or stammering",
    "problems with orgasm", "nose deformity", "lump over jaw", "sore in nose", "hip weakness",
    "back swelling", "ankle stiffness or tightness", "ankle weakness", "neck weakness"
]

    
    # Iterate over the symptom keywords and update the binary list
    for index, keywords in symptom_keywords.items():
        if any(keyword in text for keyword in keywords):
            binary_list[index] = '1'
    
    return "".join(binary_list)

# Example usage
user_input = "I have been feeling anxious and experiencing shortness of breath."
binary_string = gemini_generate_binary_from_text(user_input)
print(binary_string)

def gemini_generate_followup(predicted_disease, aggregated_text):
    """
    Simulate Gemini generating follow-up questions and a risk assessment based on the predicted disease
    and the patient's detailed symptom description.
    """
    if predicted_disease == "Panic Disorder":
        followup = (
            "Based on the predicted condition of Panic Disorder, please describe how frequently "
            "you experience panic attacks and whether they are accompanied by sweating or rapid heartbeat."
        )
    elif predicted_disease == "Hypertension":
        followup = (
            "Since Hypertension is predicted, can you elaborate on any recent headaches, blurred vision, "
            "or episodes of fatigue you might have experienced?"
        )
    elif predicted_disease == "Diabetes":
        followup = (
            "Given the possibility of Diabetes, please provide additional details about any episodes of "
            "increased thirst, frequent urination, or unexplained weight loss."
        )
    else:
        followup = "Could you provide further details about your symptoms?"
    
    risk_assessment = (
        "Risk Assessment: Your current symptoms suggest an early stage condition. "
        "It is recommended that you consult a healthcare professional for a thorough evaluation."
    )
    
    return f"{followup}\n\n{risk_assessment}"

def binary_str_to_vector(binary_str):
    """
    Convert a binary string into a numpy vector with shape (1, 377).
    """
    vector = np.array([int(bit) for bit in binary_str]).reshape(1, -1)
    return vector

# ------------------------------------------------------------------------------
# Main Execution Flow
# ------------------------------------------------------------------------------

def main():
    print("Welcome to the Medical Symptom Assessment Tool.\n")
    
    # Open-ended questions to capture detailed symptom information.
    questions = [
        "1. Please describe your primary physical symptoms in detail:",
        "2. Can you elaborate on any pain or discomfort you have experienced (include location, intensity, and duration)?",
        "3. Describe any breathing difficulties or cardiovascular symptoms you have noticed:",
        "4. Please share details about your emotional or mental state (e.g., feelings of anxiety, depression):",
        "5. Is there any other symptom or health concern you'd like to mention?"
    ]
    
    responses = []
    for question in questions:
        print(question)
        answer = input("> ")
        responses.append(answer.strip())
    
    # Combine all responses into one aggregated free-form text.
    aggregated_text = " ".join(responses)
    print("\nAggregated Symptom Description:")
    print(aggregated_text)
    
    # Use Gemini to convert the free-form text into a 377-bit binary string.
    binary_string = gemini_generate_binary_from_text(aggregated_text)
    print("\nGenerated 377-bit Binary String (first 20 bits):")
    print(binary_string[:20] + " ...")
    
    # Convert the binary string into a numeric feature vector.
    binary_vector = binary_str_to_vector(binary_string)
    
    # Call your ML model to predict the disease (replace with actual model call).
    predicted_disease = predict_disease(binary_vector)
    print("\nPredicted Disease:", predicted_disease)
    
    # Generate follow-up questions and a risk assessment using Gemini.
    followup = gemini_generate_followup(predicted_disease, aggregated_text)
    print("\nFollow-Up Questions and Risk Assessment:")
    print(followup)

if __name__ == "__main__":
    main()
