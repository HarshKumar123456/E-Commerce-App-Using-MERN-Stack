const registerController = async (req,res) => {
    console.log("Inside Register controller function....");
    res.status(200).json({message: "Inside Register controller function...."})
};

export {registerController};