const express = require ('express');
const notebookController = require('../controllers/notebook-controller');
const notebookRouter = express.Router();

notebookRouter.get('/test', (req, res) => {
    res.status(200).json({ message: 'Notebook router is working' });
  });

// Save a cafe to notebook
notebookRouter.post('/save', notebookController.saveCafeToNotebook);

// Remove a cafe from notebook
notebookRouter.delete('/:cafeId', notebookController.removeSavedCafe);

// Update a note for a saved cafe
notebookRouter.patch('/:cafeId/note', notebookController.updateNotebookNote);

// Get user's entire notebook
notebookRouter.get('/', notebookController.getUserNotebook);

// Get specific saved cafe - note that order of routes matters in express
notebookRouter.get('/:cafeId', notebookController.getSavedCafe);


module.exports = notebookRouter;