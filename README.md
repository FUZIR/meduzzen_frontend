# Meduzzen_frontend

### Repository for meduzzen internature front-end

### To start project:

1. Clone repo ```git clone https://github.com/FUZIR/meduzzen_frontend.git```
2. Install dependencies ```npm install```
3. Start project ```npm run dev```
4. Open ```http://localhost:3000```

### Steps to start project in docker:

1. Clone repo ```git clone https://github.com/FUZIR/meduzzen_frontend.git```
2. Build image ```sudo buildx build -t react_frontend .```
3. Start container ```sudo run -p 3000:3000 react_frontend```
4. Open ```http://localhost:3000```