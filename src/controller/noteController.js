const noteModel=require('../modles/note');



const getNote = async function(req,res){
    
  

    try {

        const notes= await noteModel.find({userId:req.userId});
        res.status(201).json(notes);

    } catch (error) {
        
         console.log(error);
         res.status(500).json({message:"Something went wrong"});

    }

}
const createNote = async (req,res) => {
     
 

    try {
        
        const newNote =  new noteModel({

            title:req.body.title,
            description:req.body.description,
            userId:req.userId    
        })
        await newNote.save();
        res.status(201).json(newNote);

    } catch (error) {
        
       console.log(error);
       res.status(500).json({message:"Something went wrong"});

    }


}

const deleteNote = async function(req,res){

try {
    
    const noteId= req.params.id;
    const newNote = await noteModel.findByIdAndRemove(noteId);
     res.status(202).json(newNote);

} catch (error) {
    
     res.status(500).json({message:"Something went wrong"});

}

}

const updateNote = async function(req,res){
     const noteId= req.params.id;

     try {
        
        const {title,description} = req.body;

        const newNote={
           title:title,
           description:description,
           userId:req.userId
        }
        await noteModel.findByIdAndUpdate(noteId,newNote,{new:true});
        res.status(200).json(newNote);

     } catch (error) {
        res.status(500).json({message:"Something went wrong"})
     }

}

module.exports={
    createNote,
    getNote,
    deleteNote,
    updateNote

}