/* router.put("/update-user/:id", authenticateUser, async (req, res) => {
    const userIdFromParams = req.params.id;
    
    const updatedFields = req.body;
  

  
    try {
      // Logic for updating user
      const updatedUser = await User.findByIdAndUpdate(userIdFromParams, updatedFields, {
        new: true,
      });
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }); */

