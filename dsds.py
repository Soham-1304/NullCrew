from google import genai

def call_gemini_api(user_input):
    try:
        client = genai.Client(api_key="AIzaSyDKlYAQAvU5JCVuAS56kLOmkPa9pZSZa7c")  # Replace YOUR_API_KEY with your actual API key
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=user_input
        )
        return response.text
    except Exception as e:
        print(f"Error occurred: {e}")
        return None

if __name__ == "__main__":
    user_input = "Explain how AI works"
    result = call_gemini_api(user_input)
    if result:
        print("Gemini API Response:", result)
    else:
        print("No response from the Gemini API.")
