# 🍽️ CadMerenda

## 🗒️ Description

CadMerenda is a platform developed by the State Department of Education of Alagoas. It is the main management tool for the school meals program, ensuring nutritious and healthy food for thousands of students throughout the region.

This innovative solution aims to provide equitable, healthy, and cost-effective school meals. The system is based on carefully crafted bidding processes that allow registered suppliers to submit their offers according to the specific needs of each school.

CadMerenda simplifies and optimizes the entire process of purchasing food for schools. Qualified suppliers have the opportunity to participate in bids fairly and competitively, ensuring that schools can choose quality products at affordable prices.

## ⬇️ Installation

1. Clone the repository: `git clone https://github.com/SEDUC-TI/cad-merenda-front-end.git`
2. Open the project directory 
3. Install dependencies: `npm install`

## ▶️ Usage

### 1. 🧑‍💻 Development environment

- Open the project directory in the command line
- Execute the command: `echo "VITE_API_URL=some_api_url" > .env`, replacing **some_api_key** with the API url to be used
- Start the application: `npm start`

### 2. 🐳 Docker/Production

In the project directory, execute the following commands sequentially:
  
- For **Unix-based** operating systems: `chmod +x generateDockerfile.sh`
- For **Windows** operating systems: `attrib +x generateDockerfile.sh ` 
- `./generateDockerfile.sh some_api_url`, replacing **some_api_key** with the API url to be used
- `docker build -t cadmerenda-frontend .`
-  `docker run --name cadmerenda-frontend -p 3000:3000 cadmerenda-frontend`


## ℹ️ More Information

### 💱 Portuguese to English translations adopted

- Pauta -> GeneralList
- Pedido -> Order
- Proposta -> Offer

##### This list may be refactored eventually

### 📎Links
- Back-end [ [ X ](https://github.com/SEDUC-TI/cadMerenda-backend.git) ]
- Commit Standards (despite the page being in portuguese, we use english commits) [ [ X ](https://github.com/iuricode/padroes-de-commits) ]
