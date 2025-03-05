import requests
import re
from fuzzywuzzy import process
import google.generativeai as genai

# ------------------------------------------------------------------------------
# 1. Define the Main Keyword List (Replace with your full list of 377 keywords)
# ------------------------------------------------------------------------------
main_keywords = symptoms = [
    "diseases",
    "anxiety and nervousness",
    "depression",
    "shortness of breath",
    "depressive or psychotic symptoms",
    "sharp chest pain",
    "dizziness",
    "insomnia",
    "abnormal involuntary movements",
    "chest tightness",
    "palpitations",
    "irregular heartbeat",
    "breathing fast",
    "hoarse voice",
    "sore throat",
    "difficulty speaking",
    "cough",
    "nasal congestion",
    "throat swelling",
    "diminished hearing",
    "lump in throat",
    "throat feels tight",
    "difficulty in swallowing",
    "skin swelling",
    "retention of urine",
    "groin mass",
    "leg pain",
    "hip pain",
    "suprapubic pain",
    "blood in stool",
    "lack of growth",
    "emotional symptoms",
    "elbow weakness",
    "back weakness",
    "pus in sputum",
    "symptoms of the scrotum and testes",
    "swelling of scrotum",
    "pain in testicles",
    "flatulence",
    "pus draining from ear",
    "jaundice",
    "mass in scrotum",
    "white discharge from eye",
    "irritable infant",
    "abusing alcohol",
    "fainting",
    "hostile behavior",
    "drug abuse",
    "sharp abdominal pain",
    "feeling ill",
    "vomiting",
    "headache",
    "nausea",
    "diarrhea",
    "vaginal itching",
    "vaginal dryness",
    "painful urination",
    "involuntary urination",
    "pain during intercourse",
    "frequent urination",
    "lower abdominal pain",
    "vaginal discharge",
    "blood in urine",
    "hot flashes",
    "intermenstrual bleeding",
    "hand or finger pain",
    "wrist pain",
    "hand or finger swelling",
    "arm pain",
    "wrist swelling",
    "arm stiffness or tightness",
    "arm swelling",
    "hand or finger stiffness or tightness",
    "wrist stiffness or tightness",
    "lip swelling",
    "toothache",
    "abnormal appearing skin",
    "skin lesion",
    "acne or pimples",
    "dry lips",
    "facial pain",
    "mouth ulcer",
    "skin growth",
    "eye deviation",
    "diminished vision",
    "double vision",
    "cross-eyed",
    "symptoms of eye",
    "pain in eye",
    "eye moves abnormally",
    "abnormal movement of eyelid",
    "foreign body sensation in eye",
    "irregular appearing scalp",
    "swollen lymph nodes",
    "back pain",
    "neck pain",
    "low back pain",
    "pain of the anus",
    "pain during pregnancy",
    "pelvic pain",
    "impotence",
    "infant spitting up",
    "vomiting blood",
    "regurgitation",
    "burning abdominal pain",
    "restlessness",
    "symptoms of infants",
    "wheezing",
    "peripheral edema",
    "neck mass",
    "ear pain",
    "jaw swelling",
    "mouth dryness",
    "neck swelling",
    "knee pain",
    "foot or toe pain",
    "bowlegged or knock-kneed",
    "ankle pain",
    "bones are painful",
    "knee weakness",
    "elbow pain",
    "knee swelling",
    "skin moles",
    "knee lump or mass",
    "weight gain",
    "problems with movement",
    "knee stiffness or tightness",
    "leg swelling",
    "foot or toe swelling",
    "heartburn",
    "smoking problems",
    "muscle pain",
    "infant feeding problem",
    "recent weight loss",
    "problems with shape or size of breast",
    "underweight",
    "difficulty eating",
    "scanty menstrual flow",
    "vaginal pain",
    "vaginal redness",
    "vulvar irritation",
    "weakness",
    "decreased heart rate",
    "increased heart rate",
    "bleeding or discharge from nipple",
    "ringing in ear",
    "plugged feeling in ear",
    "itchy ear(s)",
    "frontal headache",
    "fluid in ear",
    "neck stiffness or tightness",
    "spots or clouds in vision",
    "eye redness",
    "lacrimation",
    "itchiness of eye",
    "blindness",
    "eye burns or stings",
    "itchy eyelid",
    "feeling cold",
    "decreased appetite",
    "excessive appetite",
    "excessive anger",
    "loss of sensation",
    "focal weakness",
    "slurring words",
    "symptoms of the face",
    "disturbance of memory",
    "paresthesia",
    "side pain",
    "fever",
    "shoulder pain",
    "shoulder stiffness or tightness",
    "shoulder weakness",
    "arm cramps or spasms",
    "shoulder swelling",
    "tongue lesions",
    "leg cramps or spasms",
    "abnormal appearing tongue",
    "ache all over",
    "lower body pain",
    "problems during pregnancy",
    "spotting or bleeding during pregnancy",
    "cramps and spasms",
    "upper abdominal pain",
    "stomach bloating",
    "changes in stool appearance",
    "unusual color or odor to urine",
    "kidney mass",
    "swollen abdomen",
    "symptoms of prostate",
    "leg stiffness or tightness",
    "difficulty breathing",
    "rib pain",
    "joint pain",
    "muscle stiffness or tightness",
    "pallor",
    "hand or finger lump or mass",
    "chills",
    "groin pain",
    "fatigue",
    "abdominal distention",
    "regurgitation.1",
    "symptoms of the kidneys",
    "melena",
    "flushing",
    "coughing up sputum",
    "seizures",
    "delusions or hallucinations",
    "shoulder cramps or spasms",
    "joint stiffness or tightness",
    "pain or soreness of breast",
    "excessive urination at night",
    "bleeding from eye",
    "rectal bleeding",
    "constipation",
    "temper problems",
    "coryza",
    "wrist weakness",
    "eye strain",
    "hemoptysis",
    "lymphedema",
    "skin on leg or foot looks infected",
    "allergic reaction",
    "congestion in chest",
    "muscle swelling",
    "pus in urine",
    "abnormal size or shape of ear",
    "low back weakness",
    "sleepiness",
    "apnea",
    "abnormal breathing sounds",
    "excessive growth",
    "elbow cramps or spasms",
    "feeling hot and cold",
    "blood clots during menstrual periods",
    "absence of menstruation",
    "pulling at ears",
    "gum pain",
    "redness in ear",
    "fluid retention",
    "flu-like syndrome",
    "sinus congestion",
    "painful sinuses",
    "fears and phobias",
    "recent pregnancy",
    "uterine contractions",
    "burning chest pain",
    "back cramps or spasms",
    "stiffness all over",
    "muscle cramps, contractures, or spasms",
    "low back cramps or spasms",
    "back mass or lump",
    "nosebleed",
    "long menstrual periods",
    "heavy menstrual flow",
    "unpredictable menstruation",
    "painful menstruation",
    "infertility",
    "frequent menstruation",
    "sweating",
    "mass on eyelid",
    "swollen eye",
    "eyelid swelling",
    "eyelid lesion or rash",
    "unwanted hair",
    "symptoms of bladder",
    "irregular appearing nails",
    "itching of skin",
    "hurts to breath",
    "nailbiting",
    "skin dryness, peeling, scaliness, or roughness",
    "skin on arm or hand looks infected",
    "skin irritation",
    "itchy scalp",
    "hip swelling",
    "incontinence of stool",
    "foot or toe cramps or spasms",
    "warts",
    "bumps on penis",
    "too little hair",
    "foot or toe lump or mass",
    "skin rash",
    "mass or swelling around the anus",
    "low back swelling",
    "ankle swelling",
    "hip lump or mass",
    "drainage in throat",
    "dry or flaky scalp",
    "premenstrual tension or irritability",
    "feeling hot",
    "feet turned in",
    "foot or toe stiffness or tightness",
    "pelvic pressure",
    "elbow swelling",
    "elbow stiffness or tightness",
    "early or late onset of menopause",
    "mass on ear",
    "bleeding from ear",
    "hand or finger weakness",
    "low self-esteem",
    "throat irritation",
    "itching of the anus",
    "swollen or red tonsils",
    "irregular belly button",
    "swollen tongue",
    "lip sore",
    "vulvar sore",
    "hip stiffness or tightness",
    "mouth pain",
    "arm weakness",
    "leg lump or mass",
    "disturbance of smell or taste",
    "discharge in stools",
    "penis pain",
    "loss of sex drive",
    "obsessions and compulsions",
    "antisocial behavior",
    "neck cramps or spasms",
    "pupils unequal",
    "poor circulation",
    "thirst",
    "sleepwalking",
    "skin oiliness",
    "sneezing",
    "bladder mass",
    "knee cramps or spasms",
    "premature ejaculation",
    "leg weakness",
    "posture problems",
    "bleeding in mouth",
    "tongue bleeding",
    "change in skin mole size or color",
    "penis redness",
    "penile discharge",
    "shoulder lump or mass",
    "polyuria",
    "cloudy eye",
    "hysterical behavior",
    "arm lump or mass",
    "nightmares",
    "bleeding gums",
    "pain in gums",
    "bedwetting",
    "diaper rash",
    "lump or mass of breast",
    "vaginal bleeding after menopause",
    "infrequent menstruation",
    "mass on vulva",
    "jaw pain",
    "itching of scrotum",
    "postpartum problems of the breast",
    "eyelid retracted",
    "hesitancy",
    "elbow lump or mass",
    "muscle weakness",
    "throat redness",
    "joint swelling",
    "tongue pain",
    "redness in or around nose",
    "wrinkles on skin",
    "foot or toe weakness",
    "hand or finger cramps or spasms",
    "back stiffness or tightness",
    "wrist lump or mass",
    "skin pain",
    "low back stiffness or tightness",
    "low urine output",
    "skin on head or neck looks infected",
    "stuttering or stammering",
    "problems with orgasm",
    "nose deformity",
    "lump over jaw",
    "sore in nose",
    "hip weakness",
    "back swelling",
    "ankle stiffness or tightness",
    "ankle weakness",
    "neck weakness"
]

def call_gemini_api(user_input):
    # Configure the API key
    genai.configure(api_key='API KEY')
    
    # Initialize the model
    model = genai.GenerativeModel('gemini-1.5-pro')
    
    try:
        # Generate response
        response = model.generate_content(user_input)
        return response.text
    except Exception as e:
        print(f"Error calling Gemini API: {e}")
        return None

# ------------------------------------------------------------------------------
# 2. Function to call Gemini API to extract relevant keywords
# ------------------------------------------------------------------------------
def gemini_extract_keywords(user_input, keywords_list):
    """
    Uses Gemini API to interpret user input and match it against the predefined keywords list.
    The API maps similar phrases in the user input to predefined medical keywords based on meaning.
    """
    try:
        # Call Gemini API to generate text based on the user input
        gemini_response = call_gemini_api(user_input)
        
        if not gemini_response:
            print("No response from Gemini API.")
            return []
        
        # Match API's interpretation with the keywords list
        extracted_keywords = []
        
        for keyword in keywords_list:
            # Check if Gemini's response contains phrases or keywords related to our predefined list
            if keyword.lower() in gemini_response.lower():
                extracted_keywords.append(keyword)
        
        # Remove duplicates while preserving order
        matched_keywords = list(dict.fromkeys(extracted_keywords))
        
        return matched_keywords
    
    except Exception as e:
        print(f"Error occurred in extracting keywords: {e}")
        return []

# ------------------------------------------------------------------------------
# 3. Function to generate a binary vector from the active keywords.
# ------------------------------------------------------------------------------
def generate_1d_binary_array(user_input, keywords_list):
    """
    Generates a 1D array where each element represents whether a keyword was inferred from the user input.
    """
    matched_keywords = gemini_extract_keywords(user_input, keywords_list)
    
    # Generate 1D binary array (1 for inferred keyword, 0 for not inferred)
    binary_array = [1 if keyword in matched_keywords else 0 for keyword in keywords_list]
    
    return binary_array

def generate_followup_questions(disease, user_conditions):
    """
    Uses Gemini to generate follow-up questions for risk assessment based on the predicted disease.
    """
    prompt = f"""
    Given a patient with possible {disease} and these conditions: {user_conditions}
    Generate 5 specific medical assessment questions to evaluate risk level.
    Questions should help determine severity and urgency of the condition.
    Format as a numbered list.
    """
    
    try:
        response = genai.generate_content(prompt)
        questions = response.text.split('\n')
        # Clean up and return only actual questions
        questions = [q.strip() for q in questions if q.strip() and q[0].isdigit()]
        return questions
    except Exception as e:
        print(f"Error generating follow-up questions: {e}")
        return []

def analyze_risk_and_recommend(disease, user_conditions, question_answers):
    """
    Uses Gemini to analyze answers and provide risk assessment score and recommendations.
    """
    answers_text = "\n".join([f"Q: {q}\nA: {a}" for q, a in question_answers])
    
    prompt = f"""
    Analyze these responses for a patient with possible {disease}:
    Patient conditions: {user_conditions}
    
    Assessment responses:
    {answers_text}
    
    Provide:
    1. Risk level (Low/Medium/High) with a simple explanation of what this means for the patient.
    2. Numerical risk score (0-10) with an explanation of how this score is calculated.
    3. Specific, detailed recommendations for next steps, including lifestyle changes, when to seek medical attention, and preventive measures.
    """
    
    try:
        response = genai.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating risk analysis: {e}")
        return "Unable to generate risk assessment"

def conduct_risk_assessment(predicted_disease, user_conditions):
    """
    Conducts a complete risk assessment workflow.
    """
    # Generate follow-up questions
    questions = generate_followup_questions(predicted_disease, user_conditions)
    
    if not questions:
        return "Unable to generate assessment questions"
    
    # Collect answers from user
    question_answers = []
    print("\nPlease answer these follow-up questions for better assessment:")
    for i, question in enumerate(questions, 1):
        print(f"\n{i}. {question}")
        answer = input("Your answer: ")
        question_answers.append((question, answer))
    
    # Generate risk assessment and recommendations
    assessment = analyze_risk_and_recommend(predicted_disease, user_conditions, question_answers)
    return assessment

# ------------------------------------------------------------------------------
# 4. Main Execution Flow
# ------------------------------------------------------------------------------
def main():
    print("Please describe your symptoms in detail (e.g., 'I have a cold and a fever'):")
    user_input = input("> ")
    
    # Call Gemini API to extract relevant keywords from the user input.
    active_keywords = gemini_extract_keywords(user_input, main_keywords)
    print("\nExtracted Relevant Keywords:")
    print(active_keywords)
    
    # Generate the binary vector (0101 list of 377 elements)
    binary_array = generate_1d_binary_array(user_input, main_keywords)
    print("\nGenerated Binary Vector (first 30 bits):")
    print(binary_array)
    print("... (total length: {})".format(len(binary_array)))
    
    # Placeholder for ML model prediction
    # In reality, you would use your actual ML model here
    predicted_disease = "Predicted Disease"  # Replace with actual ML prediction
    
    # Conduct risk assessment
    print("\nConducting risk assessment...")
    assessment_result = conduct_risk_assessment(predicted_disease, user_input)
    
    print("\nRisk Assessment Results:")
    print(assessment_result)

if __name__ == "__main__":
    main()
