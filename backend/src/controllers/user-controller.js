//handles request/response for user routes 
const userService = require('../services/user-service')

const getUserData = async (req,res) => {

    //if not logged in, return error messgae
    if (!req.isAuthenticated()) {
        return res.status(200).json({ message: 'Not active session' });
    }
   
    try {
        const user_id = req.user.id;
        const userData = await userService.getUserById(user_id);
        if (!userData){
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(userData);
    }catch (error){
        console.error('Error fetching user: ',error);
        res.status(500).json({message: 'Server error'}); 
    }

}
const deleteUserData = async (req,res) => {

        //if not logged in, return error messgae
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Not authenticated' });
        }
        try {
            const userId = req.user.id;
            await userService.deleteUser(userId);
            req.logout((err)=>{
                if (err){
                    return res.status(500).json({message: 'Error logging out'});
                }
                res.json({message: 'User deleted successfully'});
            });
        }catch (error){
            console.error('Error deleting use:');
            res.status(500).json({messgae:'Server error'});
        }
}

userController = {
    getUserData,
    deleteUserData
}
module.exports = userController;
