const notebookService= require ('../services/notebook-service');

const saveCafeToNotebook = async (req, res) =>{
    const {cafeId, title, note, media, is_journal_entry} = req.body;
    const visited_at = req.body.visited_ad || new Date(); // fallback to current date

    if (!req.isAuthenticated()) {
        return res.status(401).json({message: 'User is not logged in'});
    }
    if (!cafeId) {
        return res.status(400).json({ message: 'Cafe ID is required' });
    }
    try {
        const userId = req.user.id;
        const savedCafe = await notebookService.saveCafeToNotebook(userId, cafeId, title||'', note || '', media, visited_at, is_journal_entry) //handle empty note
        return res.status(200).json({
            message: 'Cafe saved to notebook succesfully!',
            savedCafe

        });
    }catch (error){
        console.error("Error saving cafe to notebook: ", error)
        return res.status(500).json({ message: 'Failed to save cafe to notebook' });
    }
    
}
const removeSavedCafe = async (req,res) => {
    const {cafeId} = req.params;

    if (!req.isAuthenticated()) {
        return res.status(401).json({message: 'User is not logged in'});
    }
    if (!cafeId) {
        return res.status(400).json({ message: 'Cafe ID is required' });
    }
    try {
        const userId = req.user.id;
        const removedCafe = await notebookService.removeSavedCafe(userId, cafeId) //handle empty note
        return res.status(200).json({
            message: 'Cafe deleted from notebook succesfully!',
            removedCafe
        });
    }catch (error){
        console.error("Error saving cafe to notebook: ", error)
        return res.status(500).json({ message: 'Failed to save cafe to notebook' });
    }
    

}

const updateNotebookNote = async (req,res) => {
    const {cafeId} = req.params;
    const {title, note, media, visited_at, is_journal_entry} = req.body;
    if (!req.isAuthenticated()) {
        return res.status(401).json({message: 'User is not logged in'});
    }
    if (!cafeId) {
        return res.status(400).json({ message: 'Cafe ID is required' });
    }
    try{
        const userId = req.user.id;
        const updatedCafe = await notebookService.updateNotebookNote(userId, cafeId, title, note, media||'', visited_at, is_journal_entry);
        return res.status(201).json({
            message: 'Note successfully updated to cafe notebook',
            updatedCafe
        })
    }catch (error){
        console.error("Error updating note to cafe notebook", error);
        return res.status(500).json({message: 'Failed to update note in cafe notebook'});
    }

}
const getUserNotebook = async (req,res) => {
    
    if (!req.isAuthenticated()) {
        return res.status(401).json({message: 'User is not logged in'});
    }
    try{
        const userId = req.user.id;
        const notebook = await notebookService.getUserNotebook(userId);
        return res.status(200).json({
            message: 'Notebook retrieved successfully',
            notebook
        });
    }catch (error){
        console.error("Error fetching saved cafe and notes: ", error);
        return res.status(500).json({message: 'Failed to fetch note from notebook'});
    }
}

const getSavedCafe = async (req, res) => {
    const {cafeId} = req.params;
    
    if (!req.isAuthenticated()) {
        return res.status(401).json({message: 'User is not logged in'});
    }
    if (!cafeId) {
        return res.status(400).json({ message: 'Cafe ID is required' });
    }
    
    try {
        const userId = req.user.id;
        const savedCafe = await notebookService.getSavedCafe(userId, cafeId);
        
        if (!savedCafe) {
            return res.status(404).json({ message: 'Cafe not found in notebook' });
        }
        return res.status(200).json({
            message: 'Saved cafe retrieved successfully',
            savedCafe
        });
    } catch (error) {
        console.error("Error fetching saved cafe:", error);
        return res.status(500).json({message: 'Failed to fetch saved cafe'});
    }
}



const notebookController = {
    saveCafeToNotebook,
    removeSavedCafe,
    updateNotebookNote,
    getUserNotebook,
    getSavedCafe
}
module.exports = notebookController