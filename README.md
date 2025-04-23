# Crop Health Analyzer - React Frontend (Gemini Pro Powered)

**Content:**

This web application, built with React, provides a user interface for analyzing the health of your crops. You can upload images of your plants, and the application sends these images to a backend powered by Google's Gemini Pro (v1beta) machine learning model. The backend processes the image using Gemini Pro's advanced image recognition capabilities to identify potential issues affecting the crop's health.

**Use:**

1.  **Upload Image:** You'll see an option to upload an image file (e.g., JPG, PNG) of the crop you want to analyze. Simply click the upload button or drag and drop the image into the designated area.
2.  **Image Preview:** After uploading, the application will display a preview of the image you selected, allowing you to confirm it's the correct one.
3.  **Analyze:** Once you're satisfied with the preview, click the "Analyze" button. This action sends the image data to the backend server.
4.  **View Results:** After a short processing time, the application will display the analysis results received from the backend. These results may include:
    * An overall assessment of the crop's health (e.g., "Healthy," "Potentially Diseased").
    * Identification of specific potential issues (e.g., "Possible nutrient deficiency," "Signs of fungal infection").
    * Confidence levels associated with the predictions.

**How it Works (Frontend Perspective):**

1.  **User Interaction:** You, the user, interact with the React web application in your browser.
2.  **Image Handling:** When you upload an image, the React application uses browser APIs to read the file data.
3.  **Communication with Backend:** When you click "Analyze," the frontend sends this image data to a specific web address (API endpoint) on a separate backend server. This communication typically happens using standard web protocols (like HTTP).
4.  **Receiving Results:** The backend server, after processing the image with the Gemini Pro model, sends back the analysis results to the React frontend.
5.  **Displaying Information:** The React application then receives these results and dynamically updates the user interface to display the health assessment and any identified issues in an easy-to-understand format.

**Important Note:** The actual image analysis is performed by the Gemini Pro model on the backend server. This frontend application is responsible for providing the user interface for image upload and displaying the results.
