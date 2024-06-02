# MedMax

MedMax is a web application for online pharmacy services that integrates a personal healthcare assistant, BayMini.

## Key Features:

- BayMini: A chatbot that answers health-related questions and recommends medications and remedies based on user symptoms.
- Product Linking: BayMini seamlessly links recommended medications and remedies to their corresponding product pages on the MedMax website.
- User-friendly Interface: Intuitive chatbot interface for easy interaction and information access.

## Installation:

- Clone the repository:
  ```bash
  git clone https://github.com/dharanidharatdd/MedMax.git
  cd MedMax
  ```
- Install requirements:
  ```bash
  pip install -r requirements.txt
  ```

## Running it on local machine:

- Create a file name .env.local
- Add your google api key inside it:
  ```bash
  GOOGLE_API_KEY="paste_your_key_here"
  ```
- You can get api key from [here](https://aistudio.google.com/app/apikey)
- Run main.py present in the directory:
  ```bash
  python main.py
  #or
  python3 main.py
  ```
- Run the webpage using live-server.
