const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const formsQ = require('../../MOUDLE/formsQ');
const pagesQ = require('../../MOUDLE/PagesQ');
const recipesQ = require('../../MOUDLE/recipesQ');

const app = express();
app.use(cors());
app.use(express.json());

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true }); // Create the directory if it does not exist
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Use the correct upload directory path
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage: storage });

// Route to handle form data based on pageName
app.post("/formsData/:pageName", (req, res) => {
  const pageName = req.params.pageName;
  const userInput = req.body;

  console.log(`Received request for formsData with pageName: ${pageName}`);
  console.log(`Received userInput: ${JSON.stringify(userInput)}`);

  formsQ.getFormData(pageName, (err, formsPage) => {
    if (err) {
      console.error('Error retrieving form data:', err);
      return res.status(500).json({ error: 'Error retrieving form data' });
    }

    if (formsPage) {
      console.log(`Form found for page: ${pageName}`);
      res.json({
        formsPage: formsPage,
        userInput: userInput
      });
    } else {
      console.error(`Form not found for page: ${pageName}`);
      res.status(404).json({ error: "Form not found" });
    }
  });
});

// Route to get page content by pageName
app.post('/pageData/:pageName', (req, res) => {
  const pageName = req.params.pageName;
  console.log(`Received request for pageData with pageName: ${pageName}`);

  pagesQ.getPageContent(pageName, (err, content) => {
    if (err) {
      console.error(`Error fetching content for page: ${pageName}`, err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    if (content) {
      res.json({ content: content });
    } else {
      console.error(`Page not found for page: ${pageName}`);
      res.status(404).json({ error: "Page not found" });
    }
  });
});

// Route to save a recipe with an optional image
app.post('/saveRecipe', upload.single('image'), (req, res) => {
  console.log('Received recipe data:', req.body);
  console.log('Received file data:', req.file);

  const recipe = req.body;
  if (req.file) {
    recipe.image = `/uploads/${req.file.filename}`;
  }

  recipesQ.saveRecipe(recipe, (err, recipeId) => {
    if (err) {
      console.error('Error saving recipe:', err);
      return res.status(500).json({ error: 'Error saving recipe', details: err.message });
    }
    res.json({ success: true, recipeId: recipeId, recipe });
  });
});

// Route to get all user recipes
app.get('/getRecipes', (req, res) => {
  recipesQ.getUserRecipes((err, recipes) => {
    if (err) {
      console.error('Error fetching recipes:', err);
      return res.status(500).json({ error: 'Error fetching recipes' });
    }
    res.json(recipes);
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
