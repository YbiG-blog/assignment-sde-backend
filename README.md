# SPYNE_SDE_BACKEND_ASSIGNMENT

## Overview
This project is a backend service that processes image data from a CSV file. It performs asynchronous image processing, validates CSV input, compresses images, stores the results in a database, and provides a webhook mechanism to notify users when processing is complete.

## Features
- **CSV Upload**: Upload CSV files containing product information and image URLs.
- **Image Processing**: Compress images by 50% asynchronously.
- **Webhook Notification**: After processing, a webhook can notify the client with the processing results.
- **Status Tracking**: Users can check the status of the image processing request using a request ID.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **MongoDB**: Database to store processed image data and status.
- **Multer**: Middleware for handling CSV file uploads.
- **Sharp**: Image processing and compression library.
- **AWS S3**: Storage for compressed images.
- **Axios**: For making HTTP requests (such as webhook notifications).
- **Joi**: Schema validation for input data.
- **Winston**: Logging tool.

## Folder Structure
```bash
├── node_modules/
├── src/
│   ├── config/
│   │   ├── axios.js          # Axios configuration
│   │   ├── db.js             # MongoDB connection setup
│   │   ├── s3Bucket.js       # S3 bucket setup for storing images
│   │   ├── winston.js        # Winston logger configuration
│   ├── controllers/
│   │   ├── product.js        # Handles CSV upload and product-related operations
│   │   ├── webhook.js        # Handles webhook callbacks
│   ├── middlewares/
│   │   ├── multer.js         # File upload middleware for handling CSV files
│   ├── models/
│   │   ├── File.js           # Model for uploaded files
│   │   ├── index.js          # Index file for models
│   │   ├── Product.js        # Model for product and image data
│   ├── routes/
│   │   ├── index.js          # Main router file
│   │   ├── product.js        # Routes related to products and CSV upload
│   │   ├── webhook.js        # Routes for webhook handling
│   ├── services/
│   │   ├── product.js        # Service for handling CSV upload, processing images
│   │   ├── s3Bucket.js       # Service for S3 bucket interactions
│   │   ├── sharp.js          # Service for image compression using Sharp
│   │   ├── webhook.js        # Service for handling webhook calls
│   ├── utils/
│   │   ├── constant.js       # Constants used across the application
│   │   ├── csvParser.js      # Utility to parse CSV files
│   │   ├── product.js        # Utility functions for products
│   │   ├── response.js       # Utility to send standardized responses
│   ├── validators/
│   │   ├── joi.js            # Input validation using Joi
├── .env                      # Environment variables (e.g., DB credentials, API keys)
├── .gitignore                 # Files and directories to be ignored by Git
├── index.js                   # Entry point for the application
├── package.json               # Project metadata and dependencies
├── package-lock.json          # Dependency lock file
```

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js
- npm (Node Package Manager)

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/YbiG-blog/assignment-sde-backend
    ```
2. Navigate to the project directory:
    ```sh
    cd SPYNE_SDE_BACKEND_ASSIGNMENT
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

### Configuration
1. Create a `.env` file in the root directory and add your environment variables. For example:
    ```env
    PORT=5003
    DB_URI=your-database-connection-string
    LOG_KEY=better-stack-key
    AWS_S3_CREDENTIALS_ACCESS_KEY=your-aws-access-key-id
    AWS_S3_CREDENTIALS_SECRET_KEY=your-aws-secret-access-key
    S3_REGION
    NODE_ENV
    STORAGE_BUCKET_NAME
    WEBHOOK_ENDPOINT
    WEBHOOK_API_KE

    ```


    ### Running the Application
1. Start the development server:
    ```sh
    npm run dev


    ## Project Overview

The **SPYNE_SDE_BACKEND_ASSIGNMENT** is a backend service designed to process image data from CSV files. Users can upload CSV files containing product information and image URLs. The system processes these images asynchronously, compressing them by 50% using the Sharp library, and stores the compressed images in an AWS S3 bucket. CSV input is validated using Joi, and the status of image processing is tracked in MongoDB.

Additionally, the service provides a webhook mechanism, notifying clients when image processing is complete by sending results to a configured webhook URL. Users can also check the status of their image processing requests via a unique request ID.

**Key features include:**
- Asynchronous image processing with status tracking.
- CSV file validation.
- 50% image compression using Sharp.
- Storage of processed images in AWS S3.
- Webhook notifications upon completion of image processing.
- Logging with Winston for monitoring and debugging.



## API Endpoints
`https://assignment-sde-backend.onrender.com/`

### 1. Upload CSV
- **Method**: POST  
- **Endpoint**: `/api/v1/file/upload
- **Description**: Upload a CSV file containing product data and image URLs.  
- **Payload**: Multipart form-data with the CSV file.
 ```json
  [
    {
      "serialNumber": "1",
      "productName": "SKU A",
      "inputImageUrls": "https://m.media-amazon.com/images/I/31iq8ieIg1L._SL500_.jpg,https://m.media-amazon.com/images/I/41z8hQ172xL._SL500_.jpg,https://m.media-amazon.com/images/I/51GhHsiXCvL._SL500_.jpg"
    }
  ]
```

### 2. Check Processing Status
- **Method**: GET  
- **Endpoint**: `/api/v1/file/status/:requestId`  
- **Description**: Check the status of image processing using the request ID.

### 3. Get uploaded file data
- **Method**: GET  
- **Endpoint**: `/api/v1/file/get-file-data/:requestId`  
- **Description**: Get the complete data of image processing using the request ID.

### 3. Webhook Endpoint
- **Method**: POST  
- **Endpoint**: `/api/v1/webhook/image-processing`  
- **Description**: Webhook for receiving notifications when image processing is completed.

### Postman Collection

`https://documenter.getpostman.com/view/32081765/2sAXxQdrbj`

